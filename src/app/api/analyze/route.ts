import { OpenAI } from "openai"
import { NextResponse } from "next/server"
import { createClient } from '@supabase/supabase-js'
import { logger } from '@/lib/logger'
import { aiAnalysisLimiter, getClientIP } from '@/lib/rate-limiter'

// Initialize OpenAI (API key required at runtime)
const getOpenAI = () => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured')
    }
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

// Supabase client for auth verification
const getSupabase = () => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Supabase environment variables not configured')
    }
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
}

export async function POST(req: Request) {
    try {
        // 🔒 인증 확인
        const supabase = getSupabase()
        const authHeader = req.headers.get('Authorization')
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: '인증이 필요합니다' }, { status: 401 })
        }

        const token = authHeader.substring(7)
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)

        if (authError || !user) {
            return NextResponse.json({ error: '유효하지 않은 토큰입니다' }, { status: 401 })
        }

        // 🔒 Rate Limiting 확인 (사용자 ID 기준)
        const rateLimitResult = await aiAnalysisLimiter.consume(user.id)
        if (!rateLimitResult.success) {
            logger.warn('AI analysis rate limit exceeded', { userId: user.id })
            return NextResponse.json(
                { error: '요청이 너무 많습니다. 5 분 후 다시 시도해주세요.' },
                { status: 429 }
            )
        }

        const { image, serviceTypes, description } = await req.json()

        if (!image) {
            return NextResponse.json({ error: "Image is required" }, { status: 400 })
        }

        const openai = getOpenAI()

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: `You are an expert furniture restoration specialist at 'Bestea'. 
          Analyze the furniture image and provide a repair estimate in Korean.
          
          User Request:
          - Desired Services: ${serviceTypes?.join(", ") || "General Repair"}
          - User Description: ${description || "None"}

          Consider the user's specific requests when estimating.
          
          Return ONLY a JSON object with the following structure:
          {
            "type": "Furniture Type (e.g., 3-seater Sofa)",
            "damage": "Brief description of visible damage",
            "minPrice": Number (Minimum estimated cost in KRW),
            "maxPrice": Number (Maximum estimated cost in KRW),
            "reasoning": "Brief explanation of the estimate (1-2 sentences), specifically addressing the user's requested services."
          }
          
          Pricing guidelines (KRW):
          - Chair reupholstery: 100,000 - 300,000
          - Sofa reupholstery (per seat): 150,000 - 300,000
          - Table refinishing: 200,000 - 500,000
          - Minor repairs: 50,000 - 150,000
          `
                },
                {
                    role: "user",
                    content: [
                        { type: "text", text: "Analyze this furniture and estimate repair costs based on my request." },
                        {
                            type: "image_url",
                            image_url: {
                                url: image, // base64 or url
                            },
                        },
                    ],
                },
            ],
            max_tokens: 500,
            response_format: { type: "json_object" },
        })

        const result = JSON.parse(response.choices[0].message.content || "{}")
        return NextResponse.json(result)

    } catch (error) {
        logger.error('AI Analysis failed', error)
        return NextResponse.json({ error: "이미지 분석에 실패했습니다" }, { status: 500 })
    }
}

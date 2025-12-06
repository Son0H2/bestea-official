import { OpenAI } from "openai"
import { NextResponse } from "next/server"

// Initialize OpenAI only if key is present to avoid startup errors
const openai = process.env.OPENAI_API_KEY
    ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    : null


export async function POST(req: Request) {
    try {
        const { image, serviceTypes, description } = await req.json()

        if (!image) {
            return NextResponse.json({ error: "Image is required" }, { status: 400 })
        }

        // If no API key or client, return mock data
        if (!openai) {
            console.warn("OpenAI client not initialized. Returning mock data.")
            await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate delay

            // Map service IDs to Korean labels
            const serviceMap: Record<string, string> = {
                repair: "수리/복원",
                recolor: "염색/도장",
                upholstery: "천갈이"
            }
            const selectedServices = serviceTypes?.map((id: string) => serviceMap[id] || id).join(", ") || "일반 수리"

            // Dynamic mock price based on service count
            const baseMin = 150000
            const baseMax = 300000
            const multiplier = serviceTypes?.length || 1

            return NextResponse.json({
                type: "앤틱 3인용 소파",
                damage: "가죽 표면 마모 및 프레임 스크래치",
                minPrice: baseMin * multiplier,
                maxPrice: baseMax * multiplier,
                reasoning: `고객님께서 요청하신 **[${selectedServices}]** 작업을 중점적으로 분석했습니다. ${description ? `"${description}"에 대한 부분도 고려하여,` : ""} 전체적인 복원 공정이 필요할 것으로 보입니다. 특히 이태리 천연 가죽을 사용하여 오리지널의 느낌을 살리는 방향으로 견적을 산출했습니다.`
            })
        }

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
        console.error("AI Analysis Error:", error)
        return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
    }
}

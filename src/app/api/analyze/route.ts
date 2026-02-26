import { OpenAI } from "openai"
import { NextResponse } from "next/server"

// Initialize OpenAI (API key required at runtime)
const getOpenAI = () => {
    if (!process.env.OPENAI_API_KEY) {
        throw new Error('OPENAI_API_KEY is not configured')
    }
    return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}


export async function POST(req: Request) {
    try {
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
        console.error("AI Analysis Error:", error)
        return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
    }
}

export type QuoteStatus = "new" | "sent" | "pickup" | "completed"

export interface Quote {
    id: string
    customer: string
    status: QuoteStatus
    furnitureType: string
    damage: string
    aiPrice: string
    image: string
    createdAt: string
    description: string
}

export const quotes: Quote[] = [
    {
        id: "1023",
        customer: "홍길동",
        status: "new",
        furnitureType: "4인용 카우치 소파",
        damage: "좌석 가죽 찢어짐 (상)",
        aiPrice: "120 ~ 150만 원",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
        createdAt: "2023-10-25T10:00:00",
        description: "가죽이 찢어졌어요. 견적 좀 부탁드립니다.",
    },
    {
        id: "1022",
        customer: "김철수",
        status: "sent",
        furnitureType: "6인용 식탁 의자",
        damage: "다리 흔들림",
        aiPrice: "30 ~ 40만 원",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
        createdAt: "2023-10-24T15:30:00",
        description: "의자 다리가 흔들려서 불안해요. 수리 가능한가요?",
    },
    {
        id: "1021",
        customer: "이영희",
        status: "pickup",
        furnitureType: "서랍장",
        damage: "레일 고장",
        aiPrice: "10 ~ 15만 원",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
        createdAt: "2023-10-23T09:15:00",
        description: "서랍이 잘 안 열려요.",
    },
]

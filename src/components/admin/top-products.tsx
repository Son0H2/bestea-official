import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const topProducts = [
    {
        id: 1,
        name: "4인용 카우치 소파 리폼",
        sales: 12,
        revenue: "15,600,000원",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "식탁 의자 천갈이 (개당)",
        sales: 45,
        revenue: "4,500,000원",
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "원목 서랍장 수리",
        sales: 8,
        revenue: "1,200,000원",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 4,
        name: "앤틱 화장대 복원",
        sales: 3,
        revenue: "2,400,000원",
        image: "https://images.unsplash.com/photo-1540932296774-3ed6d13aa6c0?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 5,
        name: "패브릭 소파 클리닝",
        sales: 20,
        revenue: "2,000,000원",
        image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1000&auto=format&fit=crop",
    },
]

export function TopProducts() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>인기 상품 TOP 5</CardTitle>
                <CardDescription>이번 달 가장 많이 찾은 서비스입니다.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {topProducts.map((product, index) => (
                        <div key={product.id} className="flex items-center">
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500">
                                {index + 1}
                            </div>
                            <div className="ml-4 flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">{product.name}</p>
                                <p className="text-xs text-muted-foreground">{product.sales}건 판매</p>
                            </div>
                            <div className="font-medium">{product.revenue}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

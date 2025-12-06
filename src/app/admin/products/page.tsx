"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const initialProducts = [
    {
        id: 1,
        name: "4인용 카우치 소파 리폼",
        price: "1,200,000원",
        category: "소파",
        status: true,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 2,
        name: "식탁 의자 천갈이 (개당)",
        price: "100,000원",
        category: "의자",
        status: true,
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1000&auto=format&fit=crop",
    },
    {
        id: 3,
        name: "원목 서랍장 수리",
        price: "150,000원",
        category: "수납장",
        status: false,
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop",
    },
]

export default function ProductsPage() {
    const [products, setProducts] = useState(initialProducts)

    const handleToggle = (id: number) => {
        setProducts((prev) =>
            prev.map((p) => {
                if (p.id === id) {
                    const newStatus = !p.status
                    toast.success(newStatus ? "판매 중으로 변경되었습니다." : "품절 처리되었습니다.")
                    return { ...p, status: newStatus }
                }
                return p
            })
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">상품 관리</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    상품 등록
                </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                    <Card key={product.id} className="overflow-hidden">
                        <div className="aspect-video w-full bg-gray-100 relative">
                            <img
                                src={product.image}
                                alt={product.name}
                                className={`h-full w-full object-cover transition-opacity ${!product.status ? "opacity-50 grayscale" : ""
                                    }`}
                            />
                            {!product.status && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                    <Badge variant="destructive" className="text-lg px-4 py-1">
                                        품절
                                    </Badge>
                                </div>
                            )}
                        </div>
                        <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <h3 className="font-bold leading-tight">{product.name}</h3>
                                    <p className="text-sm text-gray-500">{product.category}</p>
                                </div>
                                <Switch
                                    checked={product.status}
                                    onCheckedChange={() => handleToggle(product.id)}
                                />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-lg font-bold">{product.price}</span>
                                <Button variant="ghost" size="sm">
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}

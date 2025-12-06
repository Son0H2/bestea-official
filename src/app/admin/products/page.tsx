"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

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
                <Link href="/admin/products/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        상품 등록
                    </Button>
                </Link>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">이미지</TableHead>
                            <TableHead>상품명</TableHead>
                            <TableHead>카테고리</TableHead>
                            <TableHead>판매가</TableHead>
                            <TableHead>상태</TableHead>
                            <TableHead className="text-right">관리</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <div className="relative h-16 w-16 rounded overflow-hidden bg-gray-100">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className={`h-full w-full object-cover ${!product.status ? "opacity-50 grayscale" : ""}`}
                                        />
                                        {!product.status && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                <span className="text-[10px] font-bold text-white bg-red-500 px-1 rounded">품절</span>
                                            </div>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>{product.category}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <Switch
                                        checked={product.status}
                                        onCheckedChange={() => handleToggle(product.id)}
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={`/admin/products/${product.id}`}>
                                        <Button variant="ghost" size="sm">
                                            <Edit className="h-4 w-4" />
                                            <span className="sr-only">수정</span>
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

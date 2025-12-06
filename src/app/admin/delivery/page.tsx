"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Camera, CheckCircle, Truck } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const deliveries = [
    {
        id: "DEL-001",
        customer: "홍길동",
        product: "4인용 카우치 소파",
        address: "서울시 송파구 잠실동",
        status: "scheduled",
        date: "2023-10-27 (오후 2시)",
        method: "직접 배송 (트럭)",
    },
    {
        id: "DEL-002",
        customer: "김철수",
        product: "식탁 의자 4개",
        address: "경기도 성남시 분당구",
        status: "delivering",
        date: "2023-10-27 (오전 10시)",
        method: "용달 화물",
    },
    {
        id: "DEL-003",
        customer: "이영희",
        product: "앤틱 서랍장",
        address: "서울시 강남구 역삼동",
        status: "completed",
        date: "2023-10-26",
        method: "직접 배송",
        completedImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=2070&auto=format&fit=crop",
    },
]

const statusMap: Record<string, { label: string; color: string }> = {
    scheduled: { label: "배송 예정", color: "bg-yellow-500" },
    delivering: { label: "배송 중", color: "bg-blue-500" },
    completed: { label: "배송 완료", color: "bg-green-500" },
}

export default function DeliveryPage() {
    const [items, setItems] = useState(deliveries)

    const handleComplete = (id: string) => {
        // In a real app, this would open a camera/upload modal
        toast.success("배송 완료 사진이 등록되었습니다.", {
            description: "고객님께 배송 완료 알림을 보냈습니다.",
        })
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, status: "completed" } : item
            )
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">배송 관리</h1>
                <Button>
                    <Truck className="mr-2 h-4 w-4" />
                    배송 일정 등록
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>배송 현황</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>배송 ID</TableHead>
                                <TableHead>상태</TableHead>
                                <TableHead>고객명</TableHead>
                                <TableHead>상품명</TableHead>
                                <TableHead>배송지/일정</TableHead>
                                <TableHead>배송 방법</TableHead>
                                <TableHead className="text-right">관리</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.id}</TableCell>
                                    <TableCell>
                                        <Badge className={statusMap[item.status].color}>
                                            {statusMap[item.status].label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{item.customer}</TableCell>
                                    <TableCell>{item.product}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-medium">{item.date}</span>
                                            <span className="text-xs text-gray-500">{item.address}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.method}</TableCell>
                                    <TableCell className="text-right">
                                        {item.status === "completed" ? (
                                            <Button variant="outline" size="sm" className="text-green-600 border-green-200">
                                                <CheckCircle className="mr-1 h-3 w-3" />
                                                완료됨
                                            </Button>
                                        ) : (
                                            <Button size="sm" onClick={() => handleComplete(item.id)}>
                                                <Camera className="mr-1 h-3 w-3" />
                                                완료 사진 등록
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

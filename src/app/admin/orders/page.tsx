"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import * as Hangul from "hangul-js"
import { CalendarIcon, CreditCard, Search, Truck, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const orders = [
    {
        id: "ORD-001",
        customer: "김철수",
        product: "식탁 의자 천갈이 (4개)",
        amount: "450,000원",
        status: "paid",
        date: "2023-10-24",
        payment: "토스페이",
    },
    {
        id: "ORD-002",
        customer: "이영희",
        product: "앤틱 서랍장 수리",
        amount: "1,200,000원",
        status: "delivering",
        date: "2023-10-23",
        payment: "카드결제",
    },
    {
        id: "ORD-003",
        customer: "박민수",
        product: "식탁 다리 수리",
        amount: "150,000원",
        status: "pending",
        date: "2023-10-22",
        payment: "무통장입금",
    },
]

const statusMap: Record<string, { label: string; color: string }> = {
    pending: { label: "입금 대기", color: "bg-gray-500" },
    paid: { label: "결제 완료", color: "bg-blue-500" },
    delivering: { label: "배송 중", color: "bg-yellow-500" },
    completed: { label: "구매 확정", color: "bg-green-500" },
}

export default function OrdersPage() {
    const [searchTerm, setSearchTerm] = useState("")
    const [date, setDate] = useState<Date | undefined>()

    const handleConfirm = () => {
        toast.success("주문이 확인되었습니다.", {
            description: "배송 준비 단계로 넘어갑니다.",
        })
    }

    const filteredOrders = orders.filter((order) => {
        // 1. Search Filter (Hangul supported)
        const searcher = new Hangul.Searcher(searchTerm)
        const matchesSearch = !searchTerm ||
            searcher.search(order.customer) >= 0 ||
            searcher.search(order.product) >= 0 ||
            searcher.search(order.id) >= 0

        // 2. Date Filter
        let matchesDate = true
        if (date) {
            const orderDate = new Date(order.date)
            // Compare YYYY-MM-DD
            matchesDate =
                orderDate.getFullYear() === date.getFullYear() &&
                orderDate.getMonth() === date.getMonth() &&
                orderDate.getDate() === date.getDate()
        }

        return matchesSearch && matchesDate
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">주문 관리</h1>
                <Button variant="outline">엑셀 다운로드</Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                        <CardTitle className="whitespace-nowrap">주문 내역</CardTitle>

                        <div className="flex flex-1 items-center gap-2">
                            {/* Search Input */}
                            <div className="relative flex-1">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                <Input
                                    placeholder="주문번호, 고객명, 상품명 검색..."
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Date Picker */}
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP", { locale: ko }) : <span>날짜 선택</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>

                            {/* Clear Filters */}
                            {(searchTerm || date) && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => {
                                        setSearchTerm("")
                                        setDate(undefined)
                                    }}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            )}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>주문번호</TableHead>
                                <TableHead>상태</TableHead>
                                <TableHead>고객명</TableHead>
                                <TableHead>상품명</TableHead>
                                <TableHead>결제금액</TableHead>
                                <TableHead>결제수단</TableHead>
                                <TableHead className="text-right">관리</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredOrders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.id}</TableCell>
                                    <TableCell>
                                        <Badge className={statusMap[order.status].color}>
                                            {statusMap[order.status].label}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{order.customer}</TableCell>
                                    <TableCell>{order.product}</TableCell>
                                    <TableCell className="font-bold">{order.amount}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 text-sm text-gray-500">
                                            <CreditCard className="h-3 w-3" />
                                            {order.payment}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {order.status === "paid" && (
                                            <Button size="sm" onClick={handleConfirm}>
                                                <Truck className="mr-1 h-3 w-3" />
                                                배송 준비
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredOrders.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        검색 결과가 없습니다.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

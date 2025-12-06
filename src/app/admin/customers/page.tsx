"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import * as Hangul from "hangul-js"
import { Search, User } from "lucide-react"
import { useState } from "react"

const customers = [
    {
        id: 1,
        name: "홍길동",
        phone: "010-1234-5678",
        address: "서울시 송파구 잠실동",
        lastOrder: "2023-10-25",
        totalOrders: 3,
        totalSpent: "2,500,000원",
        tags: ["VIP", "소파리폼"],
    },
    {
        id: 2,
        name: "김철수",
        phone: "010-9876-5432",
        address: "경기도 성남시 분당구",
        lastOrder: "2023-10-24",
        totalOrders: 1,
        totalSpent: "450,000원",
        tags: ["신규", "의자천갈이"],
    },
    {
        id: 3,
        name: "이영희",
        phone: "010-5555-7777",
        address: "서울시 강남구 역삼동",
        lastOrder: "2023-09-15",
        totalOrders: 5,
        totalSpent: "5,200,000원",
        tags: ["VIP", "단골", "앤틱가구"],
    },
    {
        id: 4,
        name: "박민수",
        phone: "010-1111-2222",
        address: "서울시 강동구 천호동",
        lastOrder: "2023-08-30",
        totalOrders: 2,
        totalSpent: "800,000원",
        tags: ["식탁수리"],
    },
]

export default function CustomersPage() {
    const [searchTerm, setSearchTerm] = useState("")

    const filteredCustomers = customers.filter((customer) => {
        if (!searchTerm) return true
        const searcher = new Hangul.Searcher(searchTerm)
        return (
            searcher.search(customer.name) >= 0 ||
            searcher.search(customer.phone) >= 0 ||
            searcher.search(customer.address) >= 0
        )
    })

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">고객 관리</h1>
                <Button>+ 고객 수동 등록</Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="이름(초성가능), 전화번호로 검색..."
                                className="pl-9"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>고객명</TableHead>
                                <TableHead>연락처</TableHead>
                                <TableHead className="hidden md:table-cell">주소</TableHead>
                                <TableHead>최근 주문</TableHead>
                                <TableHead className="text-right">총 주문액</TableHead>
                                <TableHead>태그</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredCustomers.map((customer) => (
                                <TableRow key={customer.id} className="cursor-pointer hover:bg-gray-50">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                                                <User className="h-4 w-4 text-gray-500" />
                                            </div>
                                            {customer.name}
                                        </div>
                                    </TableCell>
                                    <TableCell>{customer.phone}</TableCell>
                                    <TableCell className="hidden md:table-cell">{customer.address}</TableCell>
                                    <TableCell>{customer.lastOrder}</TableCell>
                                    <TableCell className="text-right font-bold">{customer.totalSpent}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {customer.tags.map((tag) => (
                                                <Badge key={tag} variant="secondary" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredCustomers.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center">
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

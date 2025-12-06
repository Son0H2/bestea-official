"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Truck, CreditCard, RefreshCw, User, MapPin, Heart, MessageSquare, Star, ChevronRight } from "lucide-react"

export default function MyPage() {
    // Mock Order Data
    const recentOrders = [
        {
            id: "ORD-20241207-001",
            date: "2024.12.07",
            status: "배송중",
            items: [
                { name: "프리미엄 이태리 천연가죽 소파 3인용", option: "색상: 카멜 / 쿠션감: 하드", price: 1649000, quantity: 1 }
            ]
        },
        {
            id: "ORD-20241120-045",
            date: "2024.11.20",
            status: "배송완료",
            items: [
                { name: "식탁 의자 천갈이 (개당)", option: "소재: 인조가죽 / 색상: 블랙", price: 100000, quantity: 4 }
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl tracking-tighter">BESTEA</Link>
                    <div className="flex items-center gap-4 text-sm">
                        <span className="text-gray-500">홍길동님 환영합니다.</span>
                        <Button variant="outline" size="sm">로그아웃</Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 grid md:grid-cols-[240px_1fr] gap-8">
                {/* Sidebar Navigation */}
                <aside className="space-y-6">
                    <div className="bg-white p-6 rounded-lg border text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                            <User className="h-10 w-10 text-gray-400" />
                        </div>
                        <h2 className="font-bold text-lg">홍길동</h2>
                        <p className="text-sm text-gray-500 mb-4">Silver 등급</p>
                        <Button variant="outline" size="sm" className="w-full">내 정보 수정</Button>
                    </div>

                    <nav className="space-y-1">
                        <p className="px-4 text-xs font-semibold text-gray-500 mb-2">쇼핑 정보</p>
                        <Link href="/my/orders" className="flex items-center gap-3 px-4 py-2 text-sm font-medium bg-gray-100 rounded-md text-black">
                            <Package className="h-4 w-4" /> 주문/배송 내역
                        </Link>
                        <Link href="/my/claims" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black rounded-md">
                            <RefreshCw className="h-4 w-4" /> 취소/반품/교환
                        </Link>
                        <Link href="/my/wishlist" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black rounded-md">
                            <Heart className="h-4 w-4" /> 찜한 상품
                        </Link>
                    </nav>

                    <nav className="space-y-1">
                        <p className="px-4 text-xs font-semibold text-gray-500 mb-2 mt-4">활동 정보</p>
                        <Link href="/my/reviews" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black rounded-md">
                            <Star className="h-4 w-4" /> 나의 리뷰
                        </Link>
                        <Link href="/my/qna" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-black rounded-md">
                            <MessageSquare className="h-4 w-4" /> 상품 문의
                        </Link>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="space-y-8">
                    {/* Order Status Dashboard */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">진행 중인 주문</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-5 gap-4 text-center py-4">
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-gray-300">0</div>
                                    <div className="text-sm text-gray-500">입금대기</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-black">1</div>
                                    <div className="text-sm text-gray-500">결제완료</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-black">1</div>
                                    <div className="text-sm text-gray-500">배송준비</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-blue-600">1</div>
                                    <div className="text-sm text-blue-600 font-medium">배송중</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-3xl font-bold text-gray-300">0</div>
                                    <div className="text-sm text-gray-500">배송완료</div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Orders */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-lg">최근 주문 정보</h3>
                            <Link href="/my/orders" className="text-sm text-gray-500 hover:text-black flex items-center">
                                더보기 <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="space-y-4">
                            {recentOrders.map((order) => (
                                <Card key={order.id} className="overflow-hidden">
                                    <div className="bg-gray-50 px-6 py-3 border-b flex items-center justify-between text-sm">
                                        <div className="flex gap-4">
                                            <span className="font-bold">{order.date}</span>
                                            <span className="text-gray-500">주문번호 {order.id}</span>
                                        </div>
                                        <Link href={`/my/orders/${order.id}`} className="text-gray-500 hover:text-black underline">
                                            주문상세
                                        </Link>
                                    </div>
                                    <CardContent className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`font-bold ${order.status === '배송중' ? 'text-blue-600' : 'text-black'}`}>
                                                {order.status}
                                            </span>
                                            {order.status === '배송중' && (
                                                <Button size="sm" variant="outline">배송조회</Button>
                                            )}
                                        </div>
                                        <div className="space-y-4">
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="flex gap-4">
                                                    <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                                                        {/* Mock Image */}
                                                        <div className="w-full h-full bg-gray-200" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-gray-500 mt-1">{item.option}</p>
                                                        <p className="text-sm font-bold mt-2">{item.price.toLocaleString()}원 <span className="font-normal text-gray-400">| {item.quantity}개</span></p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}

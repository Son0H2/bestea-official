"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, ChevronRight, Calendar, CreditCard } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { getCurrentUser } from "@/lib/supabase/auth"

interface Order {
    id: string
    order_number: string
    status: string
    total_amount: number
    shipping_address: any
    created_at: string
    order_items: {
        quantity: number
        price: number
        products: {
            name: string
            images: string[] | null
        }
    }[]
}

const statusLabels: Record<string, string> = {
    pending: "결제대기",
    paid: "결제완료",
    preparing: "배송준비",
    shipped: "배송중",
    delivered: "배송완료",
    cancelled: "취소",
    refunded: "환불"
}

const statusColors: Record<string, string> = {
    pending: "bg-gray-100 text-gray-700",
    paid: "bg-blue-100 text-blue-700",
    preparing: "bg-yellow-100 text-yellow-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refunded: "bg-orange-100 text-orange-700"
}

export default function OrdersPage() {
    const [user, setUser] = useState<any>(null)
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            fetchOrders()
        }
    }, [user])

    async function fetchUser() {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
            window.location.href = '/login'
            return
        }
        setUser(currentUser)
    }

    async function fetchOrders() {
        const { data, error } = await supabase
            .from('orders')
            .select(`
                id,
                order_number,
                status,
                total_amount,
                shipping_address,
                created_at,
                order_items (
                    quantity,
                    price,
                    products:product_id (
                        name,
                        images
                    )
                )
            `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching orders:', error)
        } else {
            // Map products array to single object
            const mappedData = (data || []).map(order => ({
                ...order,
                order_items: order.order_items.map(item => ({
                    ...item,
                    products: Array.isArray(item.products) ? item.products[0] : item.products
                }))
            }))
            setOrders(mappedData)
        }
        setLoading(false)
    }

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">로딩중...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="container mx-auto px-4 h-16 flex items-center">
                    <Link href="/" className="font-bold text-2xl tracking-tighter">BESTEA</Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/my">
                        <Button variant="ghost" size="sm">
                            마이페이지
                        </Button>
                    </Link>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <h1 className="text-2xl font-bold">주문내역</h1>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">주문내역이 없습니다.</p>
                        <Link href="/store">
                            <Button>쇼핑하러 가기</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-white rounded-2xl overflow-hidden">
                                {/* Order Header */}
                                <div className="border-b p-4 flex items-center justify-between bg-gray-50">
                                    <div className="flex items-center gap-4">
                                        <span className="text-sm text-gray-500">
                                            {order.order_number}
                                        </span>
                                        <span className={`text-xs font-bold px-2 py-1 rounded ${statusColors[order.status]}`}>
                                            {statusLabels[order.status]}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(order.created_at).toLocaleDateString('ko-KR')}
                                    </div>
                                </div>

                                {/* Order Items */}
                                <div className="divide-y">
                                    {order.order_items.map((item, idx) => (
                                        <div key={idx} className="p-4 flex gap-4">
                                            <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={item.products.images?.[0] || 'https://via.placeholder.com/100'}
                                                    alt={item.products.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-medium mb-2">{item.products.name}</h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-500">
                                                    <span>{item.quantity}개</span>
                                                    <span>{item.price.toLocaleString()}원</span>
                                                </div>
                                                <p className="text-lg font-bold text-red-600 mt-2">
                                                    {(item.price * item.quantity).toLocaleString()}원
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Footer */}
                                <div className="border-t p-4 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <CreditCard className="h-4 w-4" />
                                        <span>총 결제금액</span>
                                    </div>
                                    <span className="text-xl font-bold text-red-600">
                                        {order.total_amount.toLocaleString()}원
                                    </span>
                                </div>

                                {/* Actions */}
                                <div className="border-t p-4 flex justify-end gap-2">
                                    <Button variant="outline" size="sm">
                                        주문상세
                                    </Button>
                                    {order.status === 'delivered' && (
                                        <Button variant="outline" size="sm">
                                            리뷰작성
                                        </Button>
                                    )}
                                    {order.status === 'pending' && (
                                        <Button variant="outline" size="sm" className="text-red-600">
                                            주문취소
                                        </Button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

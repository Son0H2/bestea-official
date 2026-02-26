"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Trash2, Minus, Plus, ChevronRight, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { getCurrentUser } from "@/lib/supabase/auth"

interface CartItem {
    id: string
    product_id: string
    quantity: number
    products: {
        name: string
        price: number
        original_price: number | null
        discount: number | null
        images: string[] | null
        stock: number
    }
}

export default function CartPage() {
    const router = useRouter()
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState<string | null>(null)
    const [user, setUser] = useState<any>(null)

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            fetchCart()
        }
    }, [user])

    async function fetchUser() {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
    }

    async function fetchCart() {
        if (!user) return

        try {
            const { data, error } = await supabase
                .from('cart_items')
                .select(`
                    id,
                    product_id,
                    quantity,
                    products:product_id (
                        name,
                        price,
                        original_price,
                        discount,
                        images,
                        stock
                    )
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })

            if (error) throw error
            
            // Map products array to single object
            const mappedData = (data || []).map((item: any) => ({
                ...item,
                products: Array.isArray(item.products) ? item.products[0] : item.products
            }))
            
            setCartItems(mappedData)
        } catch (error) {
            console.error('Error fetching cart:', error)
        } finally {
            setLoading(false)
        }
    }

    async function updateQuantity(itemId: string, newQuantity: number) {
        if (newQuantity < 1) return

        setUpdating(itemId)
        try {
            const { error } = await (supabase as any)
                .from('cart_items')
                .update({ quantity: newQuantity })
                .eq('id', itemId)

            if (error) throw error
            fetchCart()
        } catch (error) {
            console.error('Error updating quantity:', error)
            alert("수량 변경 실패")
        } finally {
            setUpdating(null)
        }
    }

    async function removeItem(itemId: string) {
        if (!confirm("장바구니에서 제거하시겠습니까?")) return

        try {
            const { error } = await supabase
                .from('cart_items')
                .delete()
                .eq('id', itemId)

            if (error) throw error
            fetchCart()
        } catch (error) {
            console.error('Error removing item:', error)
            alert("제거 실패")
        }
    }

    function handleCheckout() {
        router.push('/checkout')
    }

    const totalAmount = cartItems.reduce((sum, item) => {
        return sum + (item.products.price * item.quantity)
    }, 0)

    const totalOriginalAmount = cartItems.reduce((sum, item) => {
        const price = item.products.original_price || item.products.price
        return sum + (price * item.quantity)
    }, 0)

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">로그인이 필요합니다.</p>
                    <Link href="/login">
                        <Button>로그인하기</Button>
                    </Link>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">로딩중...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="font-bold text-2xl tracking-tighter">BESTEA</Link>
                    </div>
                    <Link href="/store">
                        <Button variant="ghost" size="sm">
                            쇼핑 계속하기
                        </Button>
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="flex items-center gap-2 mb-8">
                    <Link href="/store">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            스토어
                        </Button>
                    </Link>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                    <h1 className="text-2xl font-bold">장바구니</h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="bg-white rounded-2xl p-12 text-center">
                                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 mb-4">장바구니가 비었습니다.</p>
                                <Link href="/store">
                                    <Button>쇼핑하러 가기</Button>
                                </Link>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl p-6 flex gap-6">
                                    <div className="w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                        <img
                                            src={item.products.images?.[0] || 'https://via.placeholder.com/200'}
                                            alt={item.products.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-medium text-lg mb-2">
                                                {item.products.name}
                                            </h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="font-bold text-red-600">
                                                    {(item.products.price * item.quantity).toLocaleString()}원
                                                </span>
                                                {item.products.original_price && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        {(item.products.original_price * item.quantity).toLocaleString()}원
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                                                    disabled={updating === item.id}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </button>
                                                <span className="w-12 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50 disabled:opacity-50"
                                                    disabled={updating === item.id}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-gray-400 hover:text-red-600 transition-colors"
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Order Summary */}
                    {cartItems.length > 0 && (
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 sticky top-24 space-y-4">
                                <h2 className="text-lg font-bold">주문 요약</h2>

                                <div className="space-y-3 pt-4 border-t">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">상품금액</span>
                                        <span>{totalOriginalAmount.toLocaleString()}원</span>
                                    </div>
                                    {totalOriginalAmount > totalAmount && (
                                        <div className="flex justify-between text-sm text-red-600">
                                            <span>할인금액</span>
                                            <span>-{(totalOriginalAmount - totalAmount).toLocaleString()}원</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">배송비</span>
                                        <span className="text-green-600">무료배송</span>
                                    </div>
                                </div>

                                <div className="flex justify-between pt-4 border-t font-bold text-lg">
                                    <span>총 결제금액</span>
                                    <span className="text-red-600">{totalAmount.toLocaleString()}원</span>
                                </div>

                                <Button
                                    className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg"
                                    onClick={handleCheckout}
                                >
                                    주문하기
                                </Button>

                                <div className="text-xs text-gray-500 text-center pt-2">
                                    안전한 결제 과정입니다
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

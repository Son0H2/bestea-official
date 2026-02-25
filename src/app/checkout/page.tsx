"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRight, CreditCard, Truck } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { getCurrentUser } from "@/lib/supabase/auth"

interface CartItem {
    id: string
    product_id: string
    quantity: number
    products: {
        name: string
        price: number
        images: string[] | null
    }
}

export default function CheckoutPage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [loading, setLoading] = useState(true)
    const [processing, setProcessing] = useState(false)

    // Form state
    const [addressName, setAddressName] = useState("")
    const [phone, setPhone] = useState("")
    const [zonecode, setZonecode] = useState("")
    const [address, setAddress] = useState("")
    const [detailAddress, setDetailAddress] = useState("")
    const [request, setRequest] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("bank")

    useEffect(() => {
        fetchUser()
    }, [])

    useEffect(() => {
        if (user) {
            fetchCart()
            fetchProfile()
        }
    }, [user])

    async function fetchUser() {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
            router.push('/login')
            return
        }
        setUser(currentUser)
    }

    async function fetchProfile() {
        const { data } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user?.id)
            .single()

        if (data) {
            setAddressName(data.full_name || "")
            setPhone(data.phone || "")
        }
    }

    async function fetchCart() {
        const { data, error } = await supabase
            .from('cart_items')
            .select(`
                id,
                product_id,
                quantity,
                products:product_id (
                    name,
                    price,
                    images
                ).single()
            `)
            .eq('user_id', user?.id)

        if (error || !data || data.length === 0) {
            router.push('/cart')
            return
        }

        setCartItems(data)
        setLoading(false)
    }

    async function handleOrder() {
        if (!address || !detailAddress) {
            alert("배송지를 입력해주세요.")
            return
        }

        setProcessing(true)
        try {
            // Generate order number
            const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`

            // Calculate total
            const totalAmount = cartItems.reduce((sum, item) => {
                return sum + (item.products.price * item.quantity)
            }, 0)

            // Create order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: user.id,
                    order_number: orderNumber,
                    status: 'pending',
                    total_amount: totalAmount,
                    shipping_address: {
                        name: addressName,
                        phone: phone,
                        zonecode: zonecode,
                        address: address,
                        detail_address: detailAddress,
                        request: request
                    },
                    payment_method: paymentMethod
                })
                .select()
                .single()

            if (orderError) throw orderError

            // Create order items
            const orderItems = cartItems.map(item => ({
                order_id: order.id,
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.products.price
            }))

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems)

            if (itemsError) throw itemsError

            // Clear cart
            const { error: clearError } = await supabase
                .from('cart_items')
                .delete()
                .in('id', cartItems.map(item => item.id))

            if (clearError) throw clearError

            alert("주문이 완료되었습니다!")
            router.push(`/my/orders?id=${order.id}`)
        } catch (error: any) {
            console.error('Order error:', error)
            alert("주문 실패: " + error.message)
        } finally {
            setProcessing(false)
        }
    }

    const totalAmount = cartItems.reduce((sum, item) => {
        return sum + (item.products.price * item.quantity)
    }, 0)

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
                    <h1 className="text-2xl font-bold">주문/결제</h1>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Order Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Delivery Info */}
                        <div className="bg-white rounded-2xl p-6 space-y-4">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <Truck className="h-5 w-5" />
                                배송 정보
                            </h2>

                            <div className="grid gap-4">
                                <div>
                                    <Label htmlFor="addressName">수령인</Label>
                                    <Input
                                        id="addressName"
                                        value={addressName}
                                        onChange={(e) => setAddressName(e.target.value)}
                                        placeholder="홍길동"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="phone">휴대전화</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="010-0000-0000"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="zonecode">우편번호</Label>
                                        <Input
                                            id="zonecode"
                                            value={zonecode}
                                            onChange={(e) => setZonecode(e.target.value)}
                                            placeholder="00000"
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="address">주소</Label>
                                        <Input
                                            id="address"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="주소"
                                            readOnly
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="detailAddress">상세주소</Label>
                                    <Input
                                        id="detailAddress"
                                        value={detailAddress}
                                        onChange={(e) => setDetailAddress(e.target.value)}
                                        placeholder="아파트명, 동호수 등"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="request">배송메모 (선택)</Label>
                                    <Textarea
                                        id="request"
                                        value={request}
                                        onChange={(e) => setRequest(e.target.value)}
                                        placeholder="문 앞에만 두세요, 벨 눌러주세요 등"
                                        rows={2}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-2xl p-6 space-y-4">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <CreditCard className="h-5 w-5" />
                                결제 수단
                            </h2>

                            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                                <div className="flex items-center space-x-3 border rounded-lg p-4">
                                    <RadioGroupItem value="bank" id="bank" />
                                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                                        무통장 입금
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 border rounded-lg p-4">
                                    <RadioGroupItem value="card" id="card" />
                                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                                        신용카드
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-3 border rounded-lg p-4">
                                    <RadioGroupItem value="kakao" id="kakao" />
                                    <Label htmlFor="kakao" className="flex-1 cursor-pointer">
                                        카카오페이
                                    </Label>
                                </div>
                            </RadioGroup>

                            <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
                                현재는 결제가 연동되지 않았습니다. 주문 후 고객센터에서 결제 안내를 받으실 수 있습니다.
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-6 sticky top-24 space-y-4">
                            <h2 className="text-lg font-bold">주문 상품</h2>

                            <div className="space-y-4 max-h-96 overflow-auto">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                            <img
                                                src={item.products.images?.[0] || 'https://via.placeholder.com/100'}
                                                alt={item.products.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.products.name}</p>
                                            <p className="text-xs text-gray-500">{item.quantity}개</p>
                                            <p className="text-sm font-bold text-red-600">
                                                {(item.products.price * item.quantity).toLocaleString()}원
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between pt-4 border-t font-bold text-lg">
                                <span>총 결제금액</span>
                                <span className="text-red-600">{totalAmount.toLocaleString()}원</span>
                            </div>

                            <Button
                                className="w-full bg-black hover:bg-gray-800 text-white py-6 text-lg"
                                onClick={handleOrder}
                                disabled={processing}
                            >
                                {processing ? "처리중..." : `주문하기 (${totalAmount.toLocaleString()}원)`}
                            </Button>

                            <div className="text-xs text-gray-500 text-center">
                                주문 완료 후 문자로 안내드립니다
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

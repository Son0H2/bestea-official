"use client"

import { CheckoutForm } from "@/components/checkout-form"
import { CheckoutSummary } from "@/components/checkout-summary"

// Mock Data (In a real app, this would come from the cart state or URL params)
const MOCK_ORDER_TOTAL = 1300000
const MOCK_SHIPPING_FEE = 0

export default function CheckoutPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-2xl font-bold mb-8">주문/결제</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left: Forms */}
                <div className="flex-1 space-y-8">
                    {/* Order Items Summary */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold">주문 상품</h2>
                        <div className="border rounded-lg p-4 space-y-4">
                            <div className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                                    <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop" alt="Product" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-medium">프리미엄 이태리 천연가죽 소파 3인용</h3>
                                    <p className="text-sm text-gray-500 mt-1">색상: 카멜 (이태리 천연가죽) / 쿠션감: 하드</p>
                                    <div className="flex gap-2 text-sm mt-2">
                                        <span className="font-bold">1,649,000원</span>
                                        <span className="text-gray-500">| 1개</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden shrink-0">
                                    <img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800" alt="Product" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-medium">식탁 의자 천갈이 (개당)</h3>
                                    <p className="text-sm text-gray-500 mt-1">소재: 인조가죽 / 색상: 블랙</p>
                                    <div className="flex gap-2 text-sm mt-2">
                                        <span className="font-bold">100,000원</span>
                                        <span className="text-gray-500">| 4개</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <CheckoutForm />
                </div>

                {/* Right: Summary */}
                <div className="lg:w-[360px]">
                    <CheckoutSummary
                        totalPrice={MOCK_ORDER_TOTAL}
                        shippingFee={MOCK_SHIPPING_FEE}
                    />
                </div>
            </div>
        </div>
    )
}

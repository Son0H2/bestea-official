"use client"

import { useState } from "react"
import { CartItem } from "@/components/cart-item"
import { CartSummary } from "@/components/cart-summary"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

// Mock Data
const INITIAL_CART_ITEMS = [
    {
        id: 1,
        name: "프리미엄 이태리 천연가죽 소파 3인용",
        option: "색상: 카멜 (이태리 천연가죽) / 쿠션감: 하드",
        price: 1649000, // 1299000 + 300000 + 50000
        originalPrice: 2150000, // 1800000 + 350000
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
        quantity: 1,
        selected: true,
    },
    {
        id: 2,
        name: "식탁 의자 천갈이 (개당)",
        option: "소재: 인조가죽 / 색상: 블랙",
        price: 100000,
        originalPrice: 120000,
        image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800",
        quantity: 4,
        selected: true,
    },
]

export default function CartPage() {
    const [items, setItems] = useState(INITIAL_CART_ITEMS)

    // Handlers
    const handleToggle = (id: number) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, selected: !item.selected } : item
        ))
    }

    const handleToggleAll = (checked: boolean) => {
        setItems(items.map(item => ({ ...item, selected: checked })))
    }

    const handleQuantityChange = (id: number, delta: number) => {
        setItems(items.map(item => {
            if (item.id === id) {
                const newQuantity = Math.max(1, item.quantity + delta)
                return { ...item, quantity: newQuantity }
            }
            return item
        }))
    }

    const handleRemove = (id: number) => {
        setItems(items.filter(item => item.id !== id))
    }

    // Calculations
    const selectedItems = items.filter(item => item.selected)
    const totalPrice = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const shippingFee = totalPrice >= 50000 || totalPrice === 0 ? 0 : 3000
    const allSelected = items.length > 0 && items.every(item => item.selected)

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 text-center">
                <h2 className="text-2xl font-bold mb-4">장바구니가 비어있습니다.</h2>
                <p className="text-gray-500 mb-8">원하는 상품을 담아보세요!</p>
                <Link href="/store">
                    <Button className="bg-black text-white hover:bg-gray-800">
                        쇼핑 계속하기
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-2xl font-bold mb-8">장바구니</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Left: Cart Items */}
                <div className="flex-1">
                    {/* Header Actions */}
                    <div className="flex items-center justify-between border-b border-black pb-4 mb-4">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="select-all"
                                checked={allSelected}
                                onCheckedChange={(checked) => handleToggleAll(checked as boolean)}
                            />
                            <label htmlFor="select-all" className="text-sm font-medium cursor-pointer select-none">
                                전체 선택 ({selectedItems.length}/{items.length})
                            </label>
                        </div>
                        <button
                            onClick={() => setItems(items.filter(item => !item.selected))}
                            className="text-sm text-gray-500 hover:text-black"
                        >
                            선택 삭제
                        </button>
                    </div>

                    {/* Item List */}
                    <div>
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onToggle={handleToggle}
                                onQuantityChange={handleQuantityChange}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>

                    <div className="mt-8">
                        <Link href="/store" className="inline-flex items-center text-sm text-gray-500 hover:text-black">
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            쇼핑 계속하기
                        </Link>
                    </div>
                </div>

                {/* Right: Summary */}
                <div className="lg:w-[360px]">
                    <CartSummary
                        selectedItemsCount={selectedItems.length}
                        totalPrice={totalPrice}
                        shippingFee={shippingFee}
                    />
                </div>
            </div>
        </div>
    )
}

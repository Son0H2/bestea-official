"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

interface CartSummaryProps {
    selectedItemsCount: number
    totalPrice: number
    shippingFee: number
}

export function CartSummary({ selectedItemsCount, totalPrice, shippingFee }: CartSummaryProps) {
    const finalAmount = totalPrice + shippingFee

    return (
        <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-6">결제 예정 금액</h3>

            <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">총 상품금액</span>
                    <span className="font-medium">{totalPrice.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-600">배송비</span>
                    <span className="font-medium">
                        {shippingFee === 0 ? "무료" : `+${shippingFee.toLocaleString()}원`}
                    </span>
                </div>
                {shippingFee > 0 && (
                    <p className="text-xs text-blue-600 text-right">
                        * 50,000원 이상 구매 시 무료배송
                    </p>
                )}
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-end">
                    <span className="font-bold">총 결제금액</span>
                    <span className="text-2xl font-bold text-brand-accent">
                        {finalAmount.toLocaleString()}원
                    </span>
                </div>
            </div>

            <Link href="/checkout">
                <Button
                    className="w-full h-12 text-lg font-bold bg-black text-white hover:bg-gray-800"
                    disabled={selectedItemsCount === 0}
                >
                    {selectedItemsCount}개 상품 주문하기
                </Button>
            </Link>
        </div>
    )
}

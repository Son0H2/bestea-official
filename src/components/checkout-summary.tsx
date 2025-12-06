"use client"

import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface CheckoutSummaryProps {
    totalPrice: number
    shippingFee: number
}

export function CheckoutSummary({ totalPrice, shippingFee }: CheckoutSummaryProps) {
    const router = useRouter()
    const finalAmount = totalPrice + shippingFee

    const handlePayment = () => {
        // Mock payment processing
        toast.promise(
            new Promise((resolve) => setTimeout(resolve, 2000)),
            {
                loading: '결제 처리 중입니다...',
                success: () => {
                    router.push('/') // Redirect to home or order success page
                    return '결제가 완료되었습니다!'
                },
                error: '결제에 실패했습니다.',
            }
        )
    }

    return (
        <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-6">최종 결제 금액</h3>

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
                <div className="flex justify-between text-sm text-blue-600">
                    <span>총 할인금액</span>
                    <span>-0원</span>
                </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between items-end">
                    <span className="font-bold">총 결제금액</span>
                    <span className="text-2xl font-bold text-brand-accent">
                        {finalAmount.toLocaleString()}원
                    </span>
                </div>
            </div>

            <div className="space-y-3">
                <div className="flex items-start gap-2">
                    <input type="checkbox" id="agree" className="mt-1" />
                    <label htmlFor="agree" className="text-xs text-gray-500 cursor-pointer">
                        주문 내용을 확인하였으며, 정보 제공 등에 동의합니다.
                    </label>
                </div>
                <Button
                    onClick={handlePayment}
                    className="w-full h-12 text-lg font-bold bg-black text-white hover:bg-gray-800"
                >
                    {finalAmount.toLocaleString()}원 결제하기
                </Button>
            </div>
        </div>
    )
}

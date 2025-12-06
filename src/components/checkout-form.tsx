"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { CreditCard, Smartphone, Wallet } from "lucide-react"

export function CheckoutForm() {
    return (
        <div className="space-y-8">
            {/* Shipping Address */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">배송지 정보</h2>
                <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">받는 분</Label>
                            <Input id="name" placeholder="이름" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">연락처</Label>
                            <Input id="phone" placeholder="010-0000-0000" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">주소</Label>
                        <div className="flex gap-2">
                            <Input id="postcode" placeholder="우편번호" className="w-32" readOnly />
                            <button className="text-sm bg-gray-100 px-4 rounded hover:bg-gray-200 transition-colors">
                                주소 찾기
                            </button>
                        </div>
                        <Input id="address" placeholder="기본 주소" readOnly />
                        <Input id="detailAddress" placeholder="상세 주소를 입력해주세요" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="memo">배송 메모</Label>
                        <Textarea id="memo" placeholder="배송 기사님께 전달할 메시지를 입력해주세요." />
                    </div>
                </div>
            </section>

            {/* Payment Method */}
            <section className="space-y-4">
                <h2 className="text-xl font-bold">결제 수단</h2>
                <RadioGroup defaultValue="card" className="grid grid-cols-3 gap-4">
                    <div>
                        <RadioGroupItem value="card" id="card" className="peer sr-only" />
                        <Label
                            htmlFor="card"
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-black peer-data-[state=checked]:text-black cursor-pointer transition-all"
                        >
                            <CreditCard className="mb-2 h-6 w-6" />
                            신용카드
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="virtual" id="virtual" className="peer sr-only" />
                        <Label
                            htmlFor="virtual"
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-black peer-data-[state=checked]:text-black cursor-pointer transition-all"
                        >
                            <Wallet className="mb-2 h-6 w-6" />
                            무통장입금
                        </Label>
                    </div>
                    <div>
                        <RadioGroupItem value="simple" id="simple" className="peer sr-only" />
                        <Label
                            htmlFor="simple"
                            className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-black peer-data-[state=checked]:text-black cursor-pointer transition-all"
                        >
                            <Smartphone className="mb-2 h-6 w-6" />
                            간편결제
                        </Label>
                    </div>
                </RadioGroup>
            </section>
        </div>
    )
}

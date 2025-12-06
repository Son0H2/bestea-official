"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Quote } from "@/lib/mock-data"
import { Loader2, MessageCircle } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface QuoteDetailFormProps {
    quote: Quote
}

export function QuoteDetailForm({ quote }: QuoteDetailFormProps) {
    const [price, setPrice] = useState("")
    const [comment, setComment] = useState("")
    const [isSending, setIsSending] = useState(false)

    const handleQuickComment = (text: string) => {
        setComment((prev) => (prev ? `${prev}\n${text}` : text))
    }

    const handleSend = async () => {
        if (!price) {
            toast.error("견적 금액을 입력해주세요.")
            return
        }

        setIsSending(true)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSending(false)

        toast.success("견적서가 카카오톡으로 발송되었습니다!", {
            description: `${quote.customer}님에게 ${parseInt(price).toLocaleString()}원 견적을 보냈습니다.`,
        })
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="price" className="text-lg font-bold">
                    확정 견적 금액 (원)
                </Label>
                <Input
                    id="price"
                    type="number"
                    placeholder="예: 1200000"
                    className="h-14 text-xl"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                    AI 추천가: <span className="font-bold text-brand-accent">{quote.aiPrice}</span>
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="comment" className="text-lg font-bold">
                    사장님 코멘트
                </Label>
                <div className="flex flex-wrap gap-2 mb-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickComment("쿠션 보강비가 포함된 가격입니다.")}
                    >
                        + 쿠션 보강
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickComment("최고급 천연 가죽을 사용합니다.")}
                    >
                        + 천연 가죽
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickComment("수거 및 배송비 무료입니다.")}
                    >
                        + 배송비 무료
                    </Button>
                </div>
                <Textarea
                    id="comment"
                    placeholder="고객님에게 전할 말을 적어주세요."
                    className="min-h-[100px] text-base"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>

            <Button
                className="w-full h-14 text-lg bg-[#FAE100] text-[#371D1E] hover:bg-[#F7D600]"
                onClick={handleSend}
                disabled={isSending}
            >
                {isSending ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        발송 중...
                    </>
                ) : (
                    <>
                        <MessageCircle className="mr-2 h-5 w-5 fill-current" />
                        카카오톡으로 견적 보내기
                    </>
                )}
            </Button>
        </div>
    )
}

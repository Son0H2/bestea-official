"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Star, ThumbsUp } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const mockReviews = [
    {
        id: 1,
        customer: "김철수",
        rating: 5,
        content: "사장님이 너무 친절하시고 소파가 새것처럼 변했어요! 감사합니다.",
        date: "2023-10-26",
        reply: "",
    },
    {
        id: 2,
        customer: "이영희",
        rating: 4,
        content: "배송이 조금 늦었지만 결과물은 만족스럽습니다.",
        date: "2023-10-25",
        reply: "",
    },
]

export function ReviewManager() {
    const [reviews, setReviews] = useState(mockReviews)
    const [replyText, setReplyText] = useState<Record<number, string>>({})

    const generateAiReply = (reviewId: number, content: string, rating: number) => {
        let reply = ""
        if (rating === 5) {
            reply = "고객님, 소중한 리뷰 감사합니다! 😍 마음에 드셨다니 저도 정말 기쁘네요. 예쁘게 사용하시고 불편한 점 있으시면 언제든 연락 주세요!"
        } else {
            reply = "고객님, 소중한 리뷰 감사합니다. 배송 문제로 불편을 드려 죄송합니다. 😥 더 노력하는 베스티아 파트너스가 되겠습니다. 예쁘게 사용하세요!"
        }

        setReplyText((prev) => ({ ...prev, [reviewId]: reply }))
    }

    const handleRegisterReply = (reviewId: number) => {
        if (!replyText[reviewId]) return

        setReviews((prev) =>
            prev.map((r) => (r.id === reviewId ? { ...r, reply: replyText[reviewId] } : r))
        )
        toast.success("답글이 등록되었습니다.")
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    고객 리뷰 관리
                </CardTitle>
                <CardDescription>
                    고객님의 소중한 리뷰에 AI가 추천하는 답글을 달아보세요.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {reviews.map((review) => (
                    <div key={review.id} className="border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span className="font-bold">{review.customer}</span>
                                <div className="flex text-yellow-400">
                                    {Array.from({ length: review.rating }).map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>
                            </div>
                            <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-4">{review.content}</p>

                        {review.reply ? (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p className="text-sm font-bold text-gray-900 mb-1">사장님 답글:</p>
                                <p className="text-sm text-gray-600">{review.reply}</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => generateAiReply(review.id, review.content, review.rating)}
                                        className="text-brand-accent border-brand-accent/20 hover:bg-brand-accent/5"
                                    >
                                        <Sparkles className="mr-1 h-3 w-3" />
                                        AI 답글 추천받기
                                    </Button>
                                </div>
                                {replyText[review.id] && (
                                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                                        <Textarea
                                            value={replyText[review.id]}
                                            onChange={(e) =>
                                                setReplyText((prev) => ({ ...prev, [review.id]: e.target.value }))
                                            }
                                            className="min-h-[80px]"
                                        />
                                        <Button onClick={() => handleRegisterReply(review.id)} size="sm">
                                            답글 등록하기
                                        </Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    )
}

function Sparkles({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            <path d="M5 3v4" />
            <path d="M9 3v4" />
            <path d="M3 5h4" />
            <path d="M3 9h4" />
        </svg>
    )
}

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Quote } from "@/lib/mock-data"
import { Copy, Loader2, Sparkles, Wand2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface BlogPostGeneratorProps {
    quote: Quote
}

export function BlogPostGenerator({ quote }: BlogPostGeneratorProps) {
    const [keywords, setKeywords] = useState(`${quote.furnitureType}, 가구리폼, 친환경`)
    const [generatedContent, setGeneratedContent] = useState("")
    const [isGenerating, setIsGenerating] = useState(false)

    const handleGenerate = async () => {
        setIsGenerating(true)
        // Simulate AI generation
        await new Promise((resolve) => setTimeout(resolve, 2000))

        const mockContent = `
# ${quote.furnitureType} 새것처럼 변신! (송파구 가구 리폼)

안녕하세요, 베스티아 파트너스입니다.
오늘은 **${quote.customer} 고객님**께서 의뢰해주신 **${quote.furnitureType}** 리폼 후기를 들고 왔습니다.

## 🛠️ 작업 전 (Before)
"${quote.damage}" 문제로 고민이 많으셨는데요.
오래된 가죽이 찢어지고 쿠션도 많이 꺼져 있었습니다.

## ✨ 작업 후 (After)
짜잔! 최고급 천연 가죽으로 교체하고, 쿠션도 빵빵하게 보강해 드렸습니다.
고객님께서도 "새 가구를 산 것 같다"며 너무 좋아하셨어요. ^^

## 💡 리폼 포인트
- **소재**: 이태리 천연 면피 가죽
- **보강**: 고탄성 스펀지 추가
- **비용**: 합리적인 가격 (문의 환영!)

가구 리폼, 고민하지 말고 연락 주세요!
📞 문의: 010-1234-5678
#${keywords.replace(/, /g, " #")}
    `.trim()

        setGeneratedContent(mockContent)
        setIsGenerating(false)
        toast.success("블로그 포스팅이 생성되었습니다!")
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(generatedContent)
        toast.success("클립보드에 복사되었습니다.")
    }

    return (
        <Card className="border-brand-accent/20 bg-gradient-to-br from-white to-brand-accent/5">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-brand-accent" />
                    AI 블로그 포스팅 생성기
                </CardTitle>
                <CardDescription>
                    작업 완료 사진과 키워드로 홍보 글을 자동으로 작성합니다.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>SEO 추천 키워드</Label>
                    <Input
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        placeholder="키워드를 쉼표로 구분해 입력하세요"
                    />
                </div>

                {!generatedContent ? (
                    <Button
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="w-full bg-brand-accent hover:bg-brand-accent/90"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                AI가 글을 쓰는 중...
                            </>
                        ) : (
                            <>
                                <Wand2 className="mr-2 h-4 w-4" />
                                블로그 글 자동 생성하기
                            </>
                        )}
                    </Button>
                ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="rounded-md border bg-white p-4">
                            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700">
                                {generatedContent}
                            </pre>
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={handleCopy} className="flex-1" variant="outline">
                                <Copy className="mr-2 h-4 w-4" />
                                복사하기
                            </Button>
                            <Button
                                onClick={() => setGeneratedContent("")}
                                variant="ghost"
                                className="text-gray-500"
                            >
                                다시 쓰기
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

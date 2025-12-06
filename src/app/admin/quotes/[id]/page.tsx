import { BlogPostGenerator } from "@/components/admin/blog-post-generator"
import { QuoteDetailForm } from "@/components/admin/quote-detail-form"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { quotes } from "@/lib/mock-data"
import { ArrowLeft, Bot, User } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// In Next.js 15, params is a Promise
export default async function QuoteDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const quote = quotes.find((q) => q.id === id)

    if (!quote) {
        notFound()
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex items-center space-x-4">
                <Link href="/admin/quotes" className="p-2 -ml-2 text-gray-500 hover:text-gray-900">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <h1 className="text-xl font-bold">견적 요청 #{quote.id}</h1>
                <Badge variant="outline" className="ml-auto">
                    {quote.status === "new" ? "신규" : "처리중"}
                </Badge>
            </div>

            {/* Section 1: Original Request */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center text-lg">
                        <User className="mr-2 h-5 w-5" />
                        고객 요청
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
                        <img
                            src={quote.image}
                            alt={quote.furnitureType}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="space-y-1">
                        <p className="font-bold text-lg">{quote.furnitureType}</p>
                        <p className="text-gray-600">{quote.description}</p>
                    </div>
                </CardContent>
            </Card>

            {/* Section 2: AI Analysis */}
            <Card className="border-brand-accent/20 bg-brand-accent/5">
                <CardHeader>
                    <CardTitle className="flex items-center text-lg text-brand-accent">
                        <Bot className="mr-2 h-5 w-5" />
                        AI 분석 리포트
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="flex justify-between border-b border-brand-accent/10 pb-2">
                        <span className="text-gray-600">가구 종류</span>
                        <span className="font-medium">{quote.furnitureType}</span>
                    </div>
                    <div className="flex justify-between border-b border-brand-accent/10 pb-2">
                        <span className="text-gray-600">손상 상태</span>
                        <span className="font-medium text-red-500">{quote.damage}</span>
                    </div>
                    <div className="flex justify-between pt-2">
                        <span className="text-gray-600">AI 추천 견적</span>
                        <span className="font-bold text-xl">{quote.aiPrice}</span>
                    </div>
                </CardContent>
            </Card>

            {/* Section 3: Action Form */}
            <Card className="border-2 border-brand-black">
                <CardHeader>
                    <CardTitle className="text-lg">견적 보내기</CardTitle>
                </CardHeader>
                <CardContent>
                    <QuoteDetailForm quote={quote} />
                </CardContent>
            </Card>

            {/* Section 4: Marketing (New) */}
            <div className="pt-4">
                <h2 className="mb-4 text-lg font-bold text-gray-900">마케팅 관리</h2>
                <BlogPostGenerator quote={quote} />
            </div>
        </div>
    )
}

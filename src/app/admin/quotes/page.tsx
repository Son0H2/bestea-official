import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { quotes, QuoteStatus } from "@/lib/mock-data"
import { ArrowRight, Calendar, User } from "lucide-react"
import Link from "next/link"

const statusMap: Record<QuoteStatus, { label: string; color: string }> = {
    new: { label: "신규 요청", color: "bg-red-500 hover:bg-red-600" },
    sent: { label: "견적 발송", color: "bg-blue-500 hover:bg-blue-600" },
    pickup: { label: "수거 중", color: "bg-yellow-500 hover:bg-yellow-600" },
    completed: { label: "완료", color: "bg-gray-500 hover:bg-gray-600" },
}

export default function QuotesPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">리폼 견적 관리</h1>
                <Button>새로고침</Button>
            </div>

            <div className="grid gap-4">
                {quotes.map((quote) => (
                    <Link key={quote.id} href={`/admin/quotes/${quote.id}`}>
                        <Card className="transition-shadow hover:shadow-md">
                            <CardContent className="flex items-center p-4">
                                {/* Image Thumbnail */}
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                                    <img
                                        src={quote.image}
                                        alt={quote.furnitureType}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="ml-4 flex-1 space-y-1">
                                    <div className="flex items-center justify-between">
                                        <Badge className={statusMap[quote.status].color}>
                                            {statusMap[quote.status].label}
                                        </Badge>
                                        <span className="flex items-center text-xs text-muted-foreground">
                                            <Calendar className="mr-1 h-3 w-3" />
                                            {new Date(quote.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h3 className="font-bold">{quote.furnitureType}</h3>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <User className="mr-1 h-3 w-3" />
                                        {quote.customer} 고객님
                                    </div>
                                    <div className="text-sm font-medium text-brand-accent">
                                        AI 예상: {quote.aiPrice}
                                    </div>
                                </div>

                                {/* Arrow */}
                                <div className="ml-2 hidden text-gray-400 sm:block">
                                    <ArrowRight className="h-6 w-6" />
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}

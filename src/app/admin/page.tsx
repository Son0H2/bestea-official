import { DashboardCard } from "@/components/admin/dashboard-card"
import { ReviewManager } from "@/components/admin/review-manager"
import { SalesChart } from "@/components/admin/sales-chart"
import { TopProducts } from "@/components/admin/top-products"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Hammer, ShoppingBag, Truck } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">오늘의 현황</h1>

            {/* Metrics Section */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                    title="오늘의 매출"
                    value="1,250,000원"
                    description="전일 대비 +15%"
                    icon={ShoppingBag}
                />
                <DashboardCard
                    title="신규 리폼 문의"
                    value="3건"
                    description="확인 필요"
                    icon={Hammer}
                />
                <DashboardCard
                    title="신규 주문"
                    value="1건"
                    description="배송 준비 필요"
                    icon={ShoppingBag}
                />
                <DashboardCard
                    title="배송/수거 예정"
                    value="2건"
                    description="오늘 예정"
                    icon={Truck}
                />
            </div>

            {/* Charts & Top Products Section */}
            <div className="grid gap-4 md:grid-cols-7">
                <div className="col-span-4">
                    <SalesChart />
                </div>
                <div className="col-span-3">
                    <TopProducts />
                </div>
            </div>

            {/* Review Manager Section */}
            <div className="grid gap-4">
                <ReviewManager />
            </div>

            {/* To-Do Section */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card className="border-l-4 border-l-red-500">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>신규 리폼 문의</span>
                            <span className="rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
                                3건 대기중
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">
                            고객님이 견적을 기다리고 있습니다.
                            <br />
                            빠르게 확인하고 견적을 보내주세요.
                        </p>
                        <Link href="/admin/quotes">
                            <Button className="w-full" variant="outline">
                                확인하러 가기 <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-blue-500">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            <span>신규 가구 주문</span>
                            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600">
                                1건 대기중
                            </span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="mb-4 text-sm text-muted-foreground">
                            입금이 확인된 주문이 있습니다.
                            <br />
                            배송 준비를 시작해주세요.
                        </p>
                        <Link href="/admin/orders">
                            <Button className="w-full" variant="outline">
                                확인하러 가기 <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity (Placeholder) */}
            <Card>
                <CardHeader>
                    <CardTitle>최근 알림</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2 last:border-0">
                            <div>
                                <p className="font-medium">홍길동님이 리폼 견적을 요청했습니다.</p>
                                <p className="text-xs text-muted-foreground">10분 전</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2 last:border-0">
                            <div>
                                <p className="font-medium">김철수님이 '3인용 소파'를 주문했습니다.</p>
                                <p className="text-xs text-muted-foreground">1시간 전</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { useState } from "react"

// Mock Data
const data = {
    daily: [
        { label: "월", sales: 1250000 },
        { label: "화", sales: 800000 },
        { label: "수", sales: 1500000 },
        { label: "목", sales: 950000 },
        { label: "금", sales: 2100000 },
        { label: "토", sales: 3200000 },
        { label: "일", sales: 2800000 },
    ],
    weekly: [
        { label: "12월 1주", sales: 5000000 },
        { label: "12월 2주", sales: 7500000 },
        { label: "12월 3주", sales: 6200000 },
        { label: "12월 4주", sales: 8900000 },
        { label: "1월 1주", sales: 4500000 },
    ],
    monthly: [
        { label: "8월", sales: 21000000 },
        { label: "9월", sales: 26000000 },
        { label: "10월", sales: 32000000 },
        { label: "11월", sales: 29000000 },
        { label: "12월", sales: 35000000 },
        { label: "1월", sales: 12000000 },
    ],
}

const chartConfig = {
    sales: {
        label: "매출",
        color: "hsl(var(--chart-1))",
    },
}

export function SalesChart() {
    const [activeTab, setActiveTab] = useState("daily")

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>매출 현황</CardTitle>
                        <CardDescription>기간별 매출 추이를 확인하세요.</CardDescription>
                    </div>
                    <Tabs defaultValue="daily" className="w-[200px]" onValueChange={setActiveTab}>
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="daily">일간</TabsTrigger>
                            <TabsTrigger value="weekly">주간</TabsTrigger>
                            <TabsTrigger value="monthly">월간</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <BarChart accessibilityLayer data={data[activeTab as keyof typeof data]}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="label"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="sales" fill="var(--color-brand-accent)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

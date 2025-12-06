"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Star, MessageCircle, ThumbsUp, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ReviewFormDialog } from "@/components/review-form-dialog"
import { QnaFormDialog } from "@/components/qna-form-dialog"

interface ProductTabsProps {
    product: any // Replace with proper type if available
}

export function ProductTabs({ product }: ProductTabsProps) {
    return (
        <div className="mt-16 border-t border-gray-200 pt-16">
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="w-full justify-start border-b border-gray-200 bg-transparent p-0 h-auto">
                    <TabsTrigger
                        value="details"
                        className="rounded-none border-b-2 border-transparent px-8 py-4 text-base font-medium text-gray-500 data-[state=active]:border-black data-[state=active]:text-black bg-transparent shadow-none"
                    >
                        상세정보
                    </TabsTrigger>
                    <TabsTrigger
                        value="reviews"
                        className="rounded-none border-b-2 border-transparent px-8 py-4 text-base font-medium text-gray-500 data-[state=active]:border-black data-[state=active]:text-black bg-transparent shadow-none"
                    >
                        리뷰 (128)
                    </TabsTrigger>
                    <TabsTrigger
                        value="qna"
                        className="rounded-none border-b-2 border-transparent px-8 py-4 text-base font-medium text-gray-500 data-[state=active]:border-black data-[state=active]:text-black bg-transparent shadow-none"
                    >
                        Q&A (5)
                    </TabsTrigger>
                    <TabsTrigger
                        value="delivery"
                        className="rounded-none border-b-2 border-transparent px-8 py-4 text-base font-medium text-gray-500 data-[state=active]:border-black data-[state=active]:text-black bg-transparent shadow-none"
                    >
                        배송/환불
                    </TabsTrigger>
                </TabsList>

                {/* Tab 1: Details */}
                <TabsContent value="details" className="mt-8 space-y-8 animate-in fade-in-50 duration-300">
                    <div className="prose max-w-none text-gray-600">
                        <h3 className="text-xl font-bold text-black mb-4">상품 상세 정보</h3>
                        <p className="mb-8">
                            베스티아의 모든 가구는 30년 경력의 장인들이 직접 제작합니다.
                            최고급 자재만을 사용하여 시간이 지날수록 그 가치가 더해지는 프리미엄 가구를 경험해보세요.
                        </p>
                        <div className="grid gap-4">
                            {product.images.map((img: string, i: number) => (
                                <img key={i} src={img} alt={`Detail ${i}`} className="w-full rounded-lg" />
                            ))}
                        </div>
                    </div>
                </TabsContent>

                {/* Tab 2: Reviews */}
                <TabsContent value="reviews" className="mt-8 animate-in fade-in-50 duration-300">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-bold">구매 고객 리뷰</h3>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex text-yellow-500">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star key={star} className="h-5 w-5 fill-current" />
                                    ))}
                                </div>
                                <span className="font-bold text-lg">4.9</span>
                                <span className="text-gray-500">/ 5.0</span>
                            </div>
                        </div>
                        <ReviewFormDialog />
                    </div>

                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="border-b border-gray-100 pb-6">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarFallback>U{i}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="text-sm font-bold">김*수 고객님</p>
                                            <div className="flex text-yellow-500 h-3 w-3">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <Star key={star} className="h-3 w-3 fill-current" />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">2023.10.2{i}</span>
                                </div>
                                <p className="text-gray-600 text-sm mt-2">
                                    배송도 빠르고 기사님도 너무 친절하셨어요. 가죽 퀄리티가 생각했던 것보다 훨씬 좋네요!
                                    거실 분위기가 확 살았습니다. 강력 추천합니다.
                                </p>
                                <div className="mt-3 flex items-center gap-4">
                                    <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-black">
                                        <ThumbsUp className="h-3 w-3" />
                                        도움이 돼요 (12)
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* Tab 3: Q&A */}
                <TabsContent value="qna" className="mt-8 animate-in fade-in-50 duration-300">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold">상품 Q&A</h3>
                        <QnaFormDialog />
                    </div>
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-black text-white text-[10px] px-1.5 py-0.5 rounded">질문</span>
                                    <span className="text-sm font-medium">배송 날짜 지정 가능한가요?</span>
                                    <span className="text-xs text-gray-400 ml-auto">이*희 | 2023.10.2{i}</span>
                                </div>
                                <div className="pl-2 border-l-2 border-gray-300 ml-1 mt-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-brand-accent font-bold text-sm">BESTEA</span>
                                        <span className="text-xs text-gray-400">답변</span>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        네, 고객님. 주문 결제 후 해피콜을 통해 원하시는 날짜로 배송 일정을 조율해 드립니다.
                                        감사합니다.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {/* Tab 4: Delivery */}
                <TabsContent value="delivery" className="mt-8 animate-in fade-in-50 duration-300">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-4">배송 안내</h3>
                            <ul className="space-y-2 text-sm text-gray-600 list-disc pl-4">
                                <li>서울/경기 지역: 주문 후 3~7일 이내 (무료 배송)</li>
                                <li>그 외 지역: 주문 후 7~14일 이내 (배송비 별도 발생 가능)</li>
                                <li>사다리차 이용 시 비용은 고객님 부담입니다.</li>
                                <li>설치 공간을 미리 확보해 주시기 바랍니다.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-4">교환 및 반품 안내</h3>
                            <ul className="space-y-2 text-sm text-gray-600 list-disc pl-4">
                                <li>제품 하자의 경우 수령 후 7일 이내 무상 교환/반품 가능</li>
                                <li>단순 변심에 의한 반품은 왕복 배송비가 부과됩니다.</li>
                                <li>주문 제작 상품의 경우 제작 착수 후 취소가 불가능합니다.</li>
                            </ul>
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}

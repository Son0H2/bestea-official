"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageUpload } from "@/components/image-upload"
import { ArrowLeft, CheckCircle2, Hammer, Palette, Scissors, Loader2 } from "lucide-react"

export default function ReformPage() {
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        image: null as File | null,
        serviceTypes: [] as string[], // Changed to array for multi-select
        description: "",
        name: "",
        phone: "",
    })

    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [aiResult, setAiResult] = useState<{
        type: string
        damage: string
        minPrice: number
        maxPrice: number
        reasoning: string
    } | null>(null)

    const toggleServiceType = (id: string) => {
        setFormData(prev => {
            const exists = prev.serviceTypes.includes(id)
            if (exists) {
                return { ...prev, serviceTypes: prev.serviceTypes.filter(type => type !== id) }
            } else {
                return { ...prev, serviceTypes: [...prev.serviceTypes, id] }
            }
        })
    }

    const handleAnalyzeAndSubmit = async () => {
        if (!formData.image) return

        setStep(4) // Move to Analysis/Result step
        setIsAnalyzing(true)

        try {
            // Convert file to base64
            const reader = new FileReader()
            reader.readAsDataURL(formData.image)
            reader.onloadend = async () => {
                const base64Image = reader.result

                const response = await fetch("/api/analyze", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        image: base64Image,
                        serviceTypes: formData.serviceTypes,
                        description: formData.description
                    }),
                })

                const data = await response.json()
                if (response.ok) {
                    setAiResult(data)
                } else {
                    alert("AI 분석에 실패했습니다. 관리자에게 문의해주세요.")
                    // Even if AI fails, we can show a generic success message or fallback
                }
                setIsAnalyzing(false)
            }
        } catch (error) {
            console.error(error)
            setIsAnalyzing(false)
            alert("오류가 발생했습니다.")
        }
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans pb-20">
            {/* Header */}
            <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
                <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/" className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <Link href="/" className="font-bold text-xl tracking-tighter">BESTEA</Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-2xl">
                {/* Progress */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold mb-2">리폼 견적 요청</h1>
                    <p className="text-gray-500">
                        소중한 가구, 베스티아의 장인들이 새것처럼 되살려드립니다.
                    </p>
                    <div className="flex gap-2 mt-6">
                        <div className={`h-1 flex-1 rounded-full ${step >= 1 ? "bg-black" : "bg-gray-200"}`} />
                        <div className={`h-1 flex-1 rounded-full ${step >= 2 ? "bg-black" : "bg-gray-200"}`} />
                        <div className={`h-1 flex-1 rounded-full ${step >= 3 ? "bg-black" : "bg-gray-200"}`} />
                    </div>
                </div>

                {/* Step 1: Image Upload */}
                {step === 1 && (
                    <div className="space-y-8 animate-fade-in-up">
                        <section>
                            <h2 className="text-lg font-bold mb-4">1. 가구 사진을 올려주세요</h2>
                            <ImageUpload onChange={(file) => setFormData({ ...formData, image: file })} />
                        </section>
                        <Button
                            className="w-full h-14 text-lg bg-black text-white hover:bg-gray-800"
                            disabled={!formData.image}
                            onClick={() => setStep(2)}
                        >
                            다음 단계로
                        </Button>
                    </div>
                )}

                {/* Step 2: Service & Description */}
                {step === 2 && (
                    <div className="space-y-8 animate-fade-in-up">
                        <section>
                            <h2 className="text-lg font-bold mb-4">2. 원하시는 서비스를 선택해주세요 (중복 가능)</h2>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { id: "repair", label: "수리/복원", icon: Hammer },
                                    { id: "recolor", label: "염색/도장", icon: Palette },
                                    { id: "upholstery", label: "천갈이", icon: Scissors },
                                ].map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => toggleServiceType(type.id)}
                                        className={`flex flex-col items-center justify-center p-6 rounded-lg border-2 transition-all ${formData.serviceTypes.includes(type.id)
                                            ? "border-black bg-black text-white"
                                            : "border-gray-200 hover:border-gray-300"
                                            }`}
                                    >
                                        <type.icon className="h-6 w-6 mb-2" />
                                        <span className="text-sm font-medium">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold mb-4">3. 상세 내용을 알려주세요</h2>
                            <textarea
                                className="w-full h-40 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-black transition-colors"
                                placeholder="어떤 부분이 불편하신가요? 원하시는 색상이나 재질이 있다면 적어주세요."
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </section>

                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                className="flex-1 h-14 text-lg border-gray-200 hover:bg-gray-50"
                                onClick={() => setStep(1)}
                            >
                                이전
                            </Button>
                            <Button
                                className="flex-1 h-14 text-lg bg-black text-white hover:bg-gray-800"
                                disabled={formData.serviceTypes.length === 0}
                                onClick={() => setStep(3)}
                            >
                                다음 단계로
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 3: Contact Info */}
                {step === 3 && (
                    <div className="space-y-8 animate-fade-in-up">
                        <section>
                            <h2 className="text-lg font-bold mb-4">4. 연락처를 입력해주세요</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">이름</label>
                                    <input
                                        type="text"
                                        className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">전화번호</label>
                                    <input
                                        type="tel"
                                        className="w-full h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-black transition-colors"
                                        placeholder="010-0000-0000"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                        </section>

                        <div className="flex gap-4">
                            <Button
                                variant="outline"
                                className="flex-1 h-14 text-lg border-gray-200 hover:bg-gray-50"
                                onClick={() => setStep(2)}
                            >
                                이전
                            </Button>
                            <Button
                                className="flex-1 h-14 text-lg bg-black text-white hover:bg-gray-800"
                                disabled={!formData.name || !formData.phone}
                                onClick={handleAnalyzeAndSubmit}
                            >
                                견적 요청 및 AI 분석하기
                            </Button>
                        </div>
                    </div>
                )}

                {/* Step 4: Analysis & Result */}
                {step === 4 && (
                    <div className="animate-fade-in-up">
                        {isAnalyzing ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <Loader2 className="h-12 w-12 animate-spin text-black mb-6" />
                                <h2 className="text-2xl font-bold mb-2">AI가 가구를 분석하고 있습니다</h2>
                                <p className="text-gray-500">
                                    고객님의 요청사항을 반영하여<br />
                                    최적의 복원 방법을 찾고 있습니다...
                                </p>
                            </div>
                        ) : aiResult ? (
                            <div className="space-y-8">
                                <div className="flex flex-col items-center justify-center text-center mb-8">
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                        <CheckCircle2 className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h2 className="text-2xl font-bold mb-2">견적 요청이 접수되었습니다!</h2>
                                    <p className="text-gray-500">
                                        입력하신 정보가 베스티아 장인에게 전달되었습니다.
                                    </p>
                                </div>

                                {/* AI Analysis Result Card */}
                                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="bg-black text-white text-xs px-2 py-1 rounded">AI 예상 견적</span>
                                        <span className="font-bold text-lg">{aiResult.type}</span>
                                    </div>

                                    <div className="space-y-4 mb-6">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">감지된 손상</span>
                                            <span className="font-medium text-right">{aiResult.damage}</span>
                                        </div>
                                        <div className="flex justify-between items-end border-t border-gray-200 pt-4">
                                            <span className="text-gray-500">예상 비용</span>
                                            <span className="text-2xl font-bold text-black">
                                                {aiResult.minPrice.toLocaleString()} ~ {aiResult.maxPrice.toLocaleString()}원
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-white p-4 rounded border border-gray-200 text-sm text-gray-600 mb-4">
                                        <p className="font-medium mb-1 text-black">💡 AI 분석 의견</p>
                                        {aiResult.reasoning}
                                    </div>

                                    {/* Disclaimer */}
                                    <div className="flex gap-3 items-start bg-yellow-50 p-4 rounded text-xs text-yellow-800">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 flex-shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                                        <p>
                                            <strong>안내:</strong> 위 금액은 AI가 분석한 <strong>단순 예상 견적</strong>입니다.
                                            실제 가구의 상태와 자재 선택에 따라 최종 비용은 달라질 수 있습니다.<br />
                                            베스티아 장인이 <strong>24시간 이내에 정확한 견적</strong>을 문자로 보내드립니다.
                                        </p>
                                    </div>
                                </div>

                                <Link href="/">
                                    <Button className="w-full h-14 text-lg bg-black text-white hover:bg-gray-800">
                                        홈으로 돌아가기
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <p>분석 결과를 불러오지 못했습니다.</p>
                                <Link href="/">
                                    <Button className="mt-4">홈으로 돌아가기</Button>
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    )
}

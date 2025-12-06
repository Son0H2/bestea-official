"use client"

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider"

export function ReformSection() {
    return (
        <section className="w-full bg-white text-black py-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* Slider Side (Desktop: Left, Mobile: Bottom) */}
                    <div className="w-full lg:w-1/2 order-2 lg:order-1">
                        <div className="aspect-[4/3] rounded-lg overflow-hidden shadow-xl border border-gray-100">
                            <ReactCompareSlider
                                itemOne={
                                    <ReactCompareSliderImage
                                        src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=800&auto=format&fit=crop"
                                        srcSet="https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=800&auto=format&fit=crop"
                                        alt="Before Reform"
                                        style={{ filter: "grayscale(100%) contrast(120%)" }} // B&W effect for 'Before'
                                    />
                                }
                                itemTwo={
                                    <ReactCompareSliderImage
                                        src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"
                                        srcSet="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop"
                                        alt="After Reform"
                                    />
                                }
                                style={{ width: "100%", height: "100%" }}
                            />
                        </div>
                        <p className="text-center text-sm text-gray-400 mt-4">
                            <span className="mr-4">◀ Before</span>
                            <span>After ▶</span>
                        </p>
                    </div>

                    {/* Text Side (Desktop: Right, Mobile: Top) */}
                    <div className="w-full lg:w-1/2 order-1 lg:order-2">
                        <div className="max-w-lg">
                            <span className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4 block">
                                The Rebirth
                            </span>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                                가구는 버리는 것이 아닙니다.<br />
                                다시 깨우는 것입니다.
                            </h2>
                            <div className="space-y-6 text-gray-600 leading-relaxed font-sans text-lg">
                                <p>
                                    10년, 20년... 가족의 손때가 묻은 가구를 어떻게 버리나요?
                                    가죽이 해지고 금박이 바래도 괜찮습니다. 뼈대가 명품이니까요.
                                </p>
                                <p>
                                    베스티아는 우리가 만든 가구를 끝까지 책임집니다.
                                    이태리 천연 가죽으로 다시 입히고(천갈이),
                                    벗겨진 금장을 다시 칠하여(도색),
                                    처음 만났던 그날의 감동을 다시 선물합니다.
                                </p>
                                <p className="text-xl font-bold text-black pt-4">
                                    "새것보다 더 귀한 당신의 추억,<br />
                                    베스티아가 지켜드리겠습니다."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const slides = [
    {
        id: 1,
        image: "/images/main/banner_library.jpg",
        title: "30년 이태리 가구의 정수,\n베스티아",
        subtitle: "대한민국 유일의 이태리 가구 전문 공장.\n생산부터 판매, 배송까지. 30년 장인의 자부심으로 직접 책임집니다.",
    },
    {
        id: 2,
        image: "/images/main/banner_bed.jpg",
        title: "당신의 휴식을 위한\n완벽한 공간",
        subtitle: "최고급 자재와 인체공학적 설계로 완성된\n베스티아 침대 컬렉션을 만나보세요.",
    },
    {
        id: 3,
        image: "/images/main/banner_kitchen.jpg",
        title: "품격 있는 다이닝,\n그 이상의 가치",
        subtitle: "가족이 모이는 소중한 시간,\n베스티아 키친이 함께합니다.",
    },
    {
        id: 4,
        image: "/images/main/banner_cabinet.jpg",
        title: "공간의 품격을 높이는\n수납의 미학",
        subtitle: "실용성과 디자인을 모두 갖춘\n프리미엄 수납 솔루션.",
    },
]

export function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [])

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    return (
        <section className="relative w-full h-[600px] bg-gray-900 text-white overflow-hidden group">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Background Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] ease-linear transform scale-105"
                        style={{
                            backgroundImage: `url('${slide.image}')`,
                            transform: index === currentSlide ? "scale(110%)" : "scale(100%)",
                        }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Content */}
                    <div className="relative z-20 container mx-auto px-4 h-full flex flex-col justify-center items-start space-y-6">
                        <span className="inline-block px-3 py-1 border border-white/30 rounded-full text-sm backdrop-blur-sm animate-fade-in-up">
                            Since 1994
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight whitespace-pre-line animate-fade-in-up delay-100">
                            {slide.title}
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed whitespace-pre-line animate-fade-in-up delay-200">
                            {slide.subtitle}
                        </p>
                        <div className="pt-4 animate-fade-in-up delay-300">
                            <Link href="/about">
                                <Button className="bg-white/10 backdrop-blur-md border border-white/50 text-white hover:bg-white hover:text-black px-8 py-6 text-lg rounded-full transition-all duration-300">
                                    브랜드 스토리 보기
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Buttons (Visible on Hover) */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
            >
                <ChevronLeft className="h-8 w-8" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-white/10 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20"
            >
                <ChevronRight className="h-8 w-8" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-white" : "bg-white/50 hover:bg-white/80"
                            }`}
                    />
                ))}
            </div>
        </section>
    )
}

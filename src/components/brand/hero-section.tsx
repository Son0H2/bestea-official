"use client"

import { ChevronDown } from "lucide-react"

export function HeroSection() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Background Image (Placeholder) */}
            <div className="absolute inset-0 bg-gray-900">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-60"
                    style={{ backgroundImage: "url('/images/brand/story_hero.jpg')" }}
                />
                {/* Fallback color if image missing */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 animate-fade-in-up">
                <span className="text-sm md:text-base text-gray-300 tracking-[0.2em] mb-4 uppercase font-sans">
                    Since 1990. The Masterpiece
                </span>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-8 leading-tight">
                    시간이 빚은 예술,<br />
                    베스티아
                </h1>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
                <ChevronDown className="h-8 w-8 text-white/50" />
            </div>
        </section>
    )
}

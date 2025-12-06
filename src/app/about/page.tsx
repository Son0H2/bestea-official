import type { Metadata } from "next"
import { HeroSection } from "@/components/brand/hero-section"
import { FactorySection } from "@/components/brand/factory-section"
import { ArtisanSection } from "@/components/brand/artisan-section"
import { ReformSection } from "@/components/brand/reform-section"
import { TrustSection } from "@/components/brand/trust-section"

export const metadata: Metadata = {
    title: "브랜드 스토리 | 베스티아 (Bestea)",
    description: "40년 장인의 손길로 만드는 이태리 엔틱 가구. 경기도 광주 공장 직영.",
}

export default function BrandStoryPage() {
    return (
        <main className="flex flex-col min-h-screen bg-black">
            <HeroSection />
            <FactorySection />
            <ArtisanSection />
            <ReformSection />
            <TrustSection />
        </main>
    )
}



import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductGallery } from "@/components/product-gallery"
import { RelatedProducts } from "@/components/related-products"
import { ArViewer } from "@/components/ar-viewer"
import { ProductTabs } from "@/components/product-tabs"
import { ProductInfoSection } from "@/components/product-info-section"
import { ChevronRight, Star, Truck, ShieldCheck, ArrowLeft } from "lucide-react"

// Mock Data
const products = [
    {
        id: 1,
        name: "프리미엄 이태리 천연가죽 소파 3인용",
        price: 1299000,
        originalPrice: 1800000,
        discount: 25,
        category: "소파",
        description: "최상급 이태리 면피 가죽을 사용하여 부드러운 촉감과 뛰어난 내구성을 자랑합니다. 30년 장인의 노하우가 담긴 인체공학적 설계로 최상의 편안함을 제공합니다.",
        images: [
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1200&auto=format&fit=crop",
        ],
        details: {
            material: "이태리 천연 면피 가죽 (Top Grain)",
            size: "W 2100 x D 950 x H 900 (mm)",
            color: "Classic Brown, Cream Beige, Navy Blue",
            origin: "Made in Korea (Bestea Factory)",
        },
        // Sample GLB model from Google's model-viewer assets
        modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb"
    },
]

// Mock Options Data (In real app, fetch from DB)
const MOCK_OPTIONS = [
    {
        name: "색상",
        required: true,
        items: [
            { name: "라이트 그레이", price: 0 },
            { name: "차콜", price: 0 },
            { name: "네이비", price: 0 },
            { name: "카멜 (이태리 천연가죽)", price: 300000 },
        ]
    },
    {
        name: "쿠션감",
        required: false,
        items: [
            { name: "소프트", price: 0 },
            { name: "미디엄", price: 0 },
            { name: "하드", price: 50000 },
        ]
    }
]

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = products.find((p) => p.id === Number(id)) || {
        id: Number(id),
        name: `프리미엄 가구 상품 ${id}`,
        price: 890000 + (Number(id) * 10000),
        originalPrice: 1200000,
        discount: 15,
        category: "가구",
        description: "베스티아의 장인정신이 깃든 프리미엄 가구입니다. 주문 제작 방식으로 최고의 품질을 보장합니다.",
        images: [
            "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1505693416388-b0346efee749?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1200&auto=format&fit=crop",
        ],
        details: {
            material: "Premium Wood / Fabric",
            size: "Customizable",
            color: "Various Options",
            origin: "Made in Korea (Bestea Factory)",
        },
        modelUrl: null
    }

    return (
        <div className="min-h-screen bg-white text-black font-sans pb-20">
            {/* Header (Simple) */}
            <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
                <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/store" className="p-2 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <Link href="/" className="font-bold text-xl tracking-tighter">BESTEA</Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/">홈</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/store">스토어</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-black font-medium">{product.category}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left: Gallery & AR */}
                    <div className="space-y-8">
                        <ProductGallery images={product.images} />

                        {/* AR Viewer Section */}
                        {product.modelUrl && (
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        <span className="bg-black text-white text-xs px-2 py-1 rounded">NEW</span>
                                        3D/AR 미리보기
                                    </h3>
                                    <span className="text-xs text-gray-500">마우스로 돌려보세요</span>
                                </div>
                                <ArViewer
                                    src={product.modelUrl}
                                    poster={product.images[0]}
                                    alt={product.name}
                                />
                                <p className="text-xs text-gray-400 mt-3 text-center">
                                    * 모바일에서 'AR로 보기' 버튼을 누르면 실제 공간에 배치해볼 수 있습니다.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info (Client Component) */}
                    <div>
                        <ProductInfoSection product={product} options={MOCK_OPTIONS} />
                    </div>
                </div>

                {/* Product Tabs (Details, Reviews, Q&A) */}
                <ProductTabs product={product} />

                {/* Related Products */}
                <div className="mt-24">
                    <RelatedProducts currentId={product.id} />
                </div>
            </main>
        </div>
    )
}

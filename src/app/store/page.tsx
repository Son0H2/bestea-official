"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, ShoppingBag, User, Menu, ChevronDown, Filter } from "lucide-react"

const categories = ["전체", "소파", "테이블", "침대", "수납장"]

const products = [
    { id: 1, name: "밀라노 천연가죽 4인 소파", category: "소파", price: 1299000, discount: 25, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "로마 원목 6인 식탁 세트", category: "테이블", price: 899000, discount: 15, image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "베니스 호텔형 침대 프레임", category: "침대", price: 1599000, discount: 10, image: "https://images.unsplash.com/photo-1505693416388-b0346efee749?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "나폴리 패브릭 모듈 소파", category: "소파", price: 1199000, discount: 20, image: "https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "토리노 대리석 거실 테이블", category: "테이블", price: 799000, discount: 5, image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=800&auto=format&fit=crop" },
    { id: 6, name: "피렌체 수납 침대", category: "침대", price: 1899000, discount: 30, image: "https://images.unsplash.com/photo-1505693314120-0d4438699d9e?q=80&w=800&auto=format&fit=crop" },
]

export default function StorePage() {
    const [selectedCategory, setSelectedCategory] = useState("전체")

    const filteredProducts = selectedCategory === "전체"
        ? products
        : products.filter(product => product.category === selectedCategory)

    return (
        <div className="flex flex-col min-h-screen bg-white text-black font-sans">
            {/* Header (Simplified for Store) */}
            <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
                <div className="container mx-auto px-4 h-14 flex items-center justify-between">
                    <Link href="/" className="font-bold text-xl tracking-tighter">BESTEA</Link>
                    <div className="flex items-center gap-4">
                        <Search className="h-5 w-5" />
                        <ShoppingBag className="h-5 w-5" />
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-bold">홈퍼니싱</h1>
                </div>

                {/* Category Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`px-4 py-2 text-sm rounded-full whitespace-nowrap transition-colors ${selectedCategory === category
                                ? "bg-black text-white font-bold"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Filter & Sort Bar */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
                    <span>총 <span className="font-bold text-black">{filteredProducts.length}</span>개</span>
                    <div className="flex items-center gap-2 cursor-pointer">
                        <span>추천순</span>
                        <ChevronDown className="h-4 w-4" />
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="group cursor-pointer">
                            <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                />
                                {product.discount > 0 && (
                                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                                        {product.discount}%
                                    </div>
                                )}
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs text-gray-500">베스티아</p>
                                <h3 className="text-sm font-medium line-clamp-2 group-hover:underline">{product.name}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg">{product.price.toLocaleString()}</span>
                                    <span className="text-xs text-gray-400 line-through">{(product.price * 1.2).toLocaleString()}</span>
                                </div>
                                <div className="flex gap-1 mt-1">
                                    <span className="text-[10px] px-1 py-0.5 bg-gray-100 text-gray-600 rounded">무료배송</span>
                                    <span className="text-[10px] px-1 py-0.5 bg-gray-100 text-gray-600 rounded">특가</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}

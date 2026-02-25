"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, ShoppingBag, User, Menu, ChevronDown } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

const categories = ["전체", "소파", "테이블", "침대", "수납장"]

interface Product {
    id: string
    name: string
    price: number
    original_price: number | null
    discount: number | null
    category: string
    description: string | null
    images: string[] | null
    stock: number
}

export default function StorePage() {
    const [selectedCategory, setSelectedCategory] = useState("전체")
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProducts()
    }, [])

    async function fetchProducts() {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('is_active', true)
                .order('created_at', { ascending: false })

            if (error) throw error
            setProducts(data || [])
        } catch (error) {
            console.error('Error fetching products:', error)
        } finally {
            setLoading(false)
        }
    }

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
                        <Link href="/cart">
                            <ShoppingBag className="h-5 w-5" />
                        </Link>
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
                {loading ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500">로딩중...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-500">상품이 없습니다.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                        {filteredProducts.map((product) => (
                            <Link href={`/store/${product.id}`} key={product.id} className="group cursor-pointer">
                                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                                    <img
                                        src={product.images?.[0] || 'https://via.placeholder.com/400'}
                                        alt={product.name}
                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {product.discount && product.discount > 0 && (
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
                                        {product.original_price && (
                                            <span className="text-xs text-gray-400 line-through">{product.original_price.toLocaleString()}</span>
                                        )}
                                    </div>
                                    <div className="flex gap-1 mt-1">
                                        <span className="text-[10px] px-1 py-0.5 bg-gray-100 text-gray-600 rounded">무료배송</span>
                                        {product.discount && product.discount > 0 && (
                                            <span className="text-[10px] px-1 py-0.5 bg-gray-100 text-gray-600 rounded">특가</span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

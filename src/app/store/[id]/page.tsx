"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ChevronLeft, ChevronRight, Heart, Share2 } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { getCurrentUser } from "@/lib/supabase/auth"

interface Product {
    id: string
    name: string
    price: number
    original_price: number | null
    discount: number | null
    category: string
    description: string | null
    images: string[] | null
    details: any | null
    stock: number
    is_active: boolean
}

interface ProductDetails {
    material?: string
    size?: string
    color?: string
    origin?: string
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params)
    const router = useRouter()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [currentImage, setCurrentImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
    const [user, setUser] = useState<any>(null)
    const [addingCart, setAddingCart] = useState(false)

    useEffect(() => {
        fetchProduct()
        fetchUser()
    }, [resolvedParams.id])

    async function fetchProduct() {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', resolvedParams.id)
                .eq('is_active', true)
                .single()

            if (error) throw error
            setProduct(data)
        } catch (error) {
            console.error('Error fetching product:', error)
        } finally {
            setLoading(false)
        }
    }

    async function fetchUser() {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
    }

    async function handleAddToCart() {
        if (!user) {
            alert("로그인이 필요합니다.")
            router.push('/login')
            return
        }

        if (!product) return

        setAddingCart(true)
        try {
            const { error } = await supabase
                .from('cart_items')
                .upsert({
                    user_id: user.id,
                    product_id: product.id,
                    quantity: quantity,
                }, {
                    onConflict: 'user_id,product_id'
                })

            if (error) throw error
            alert("장바구니에 담겼습니다!")
        } catch (error: any) {
            console.error('Error adding to cart:', error)
            alert("장바구니 담기 실패: " + error.message)
        } finally {
            setAddingCart(false)
        }
    }

    function handleBuyNow() {
        if (!user) {
            alert("로그인이 필요합니다.")
            router.push('/login')
            return
        }
        // TODO: 주문 페이지로 이동
        alert("주문 페이지 개발 예정")
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">로딩중...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-500 mb-4">상품을 찾을 수 없습니다.</p>
                    <Link href="/store">
                        <Button>스토어로 돌아가기</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const details: ProductDetails = product.details || {}
    const images = product.images?.length ? product.images : ['https://via.placeholder.com/800']

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="border-b sticky top-0 bg-white z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/" className="font-bold text-2xl tracking-tighter">BESTEA</Link>
                    <div className="flex items-center gap-4">
                        <Link href="/cart" className="relative">
                            <ShoppingBag className="h-6 w-6" />
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:underline">홈</Link>
                    <ChevronRight className="h-4 w-4" />
                    <Link href="/store" className="hover:underline">스토어</Link>
                    <ChevronRight className="h-4 w-4" />
                    <span className="text-black">{product.name}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Left: Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                            <img
                                src={images[currentImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentImage(idx)}
                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                                            currentImage === idx ? 'border-black' : 'border-gray-200'
                                        }`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right: Product Info */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                            <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.name}</h1>
                            
                            <div className="flex items-baseline gap-3">
                                <span className="text-2xl font-bold text-red-600">
                                    {product.price.toLocaleString()}원
                                </span>
                                {product.original_price && (
                                    <span className="text-lg text-gray-400 line-through">
                                        {product.original_price.toLocaleString()}원
                                    </span>
                                )}
                                {product.discount && product.discount > 0 && (
                                    <span className="bg-red-600 text-white text-sm font-bold px-2 py-1 rounded">
                                        {product.discount}%
                                    </span>
                                )}
                            </div>
                        </div>

                        {product.description && (
                            <div className="border-t border-b py-6">
                                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {/* Product Details */}
                        {(details.material || details.size || details.color || details.origin) && (
                            <div className="space-y-3 text-sm">
                                {details.material && (
                                    <div className="flex gap-4">
                                        <span className="text-gray-500 w-20">소재</span>
                                        <span className="text-gray-900">{details.material}</span>
                                    </div>
                                )}
                                {details.size && (
                                    <div className="flex gap-4">
                                        <span className="text-gray-500 w-20">크기</span>
                                        <span className="text-gray-900">{details.size}</span>
                                    </div>
                                )}
                                {details.color && (
                                    <div className="flex gap-4">
                                        <span className="text-gray-500 w-20">색상</span>
                                        <span className="text-gray-900">{details.color}</span>
                                    </div>
                                )}
                                {details.origin && (
                                    <div className="flex gap-4">
                                        <span className="text-gray-500 w-20">원산지</span>
                                        <span className="text-gray-900">{details.origin}</span>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">수량</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <span className="w-12 text-center font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 rounded-full border flex items-center justify-center hover:bg-gray-50"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stock */}
                        <div className="text-sm">
                            {product.stock > 0 ? (
                                <span className="text-green-600">재고 {product.stock}개 있음</span>
                            ) : (
                                <span className="text-red-600">품절</span>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                variant="outline"
                                size="lg"
                                className="flex-1"
                                onClick={handleAddToCart}
                                disabled={addingCart || product.stock === 0}
                            >
                                <ShoppingBag className="h-4 w-4 mr-2" />
                                {addingCart ? "담는 중..." : "장바구니 담기"}
                            </Button>
                            <Button
                                size="lg"
                                className="flex-1 bg-black hover:bg-gray-800"
                                onClick={handleBuyNow}
                                disabled={product.stock === 0}
                            >
                                바로 구매하기
                            </Button>
                        </div>

                        {/* Additional Actions */}
                        <div className="flex gap-3 pt-2">
                            <Button variant="ghost" size="sm" className="flex-1">
                                <Heart className="h-4 w-4 mr-2" />
                                찜하기
                            </Button>
                            <Button variant="ghost" size="sm" className="flex-1">
                                <Share2 className="h-4 w-4 mr-2" />
                                공유하기
                            </Button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t mt-16 py-12 bg-gray-50">
                <div className="container mx-auto px-4 text-center text-sm text-gray-500">
                    <p>© 2026 Bestea Corp. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

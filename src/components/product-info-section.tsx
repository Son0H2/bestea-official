"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Star, Heart, Share2 } from "lucide-react"
import { ProductOptions, SelectedItem } from "@/components/product-options"
import { toast } from "sonner"

interface ProductInfoSectionProps {
    product: any
    options: any[]
}

export function ProductInfoSection({ product, options }: ProductInfoSectionProps) {
    // Parse base price from string "1,200,000원" -> number 1200000
    // Base price is already a number in the mock data
    const basePrice = typeof product.price === 'string'
        ? parseInt(product.price.replace(/[^0-9]/g, ""))
        : product.price
    const [totalPrice, setTotalPrice] = useState(0)
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])

    const handleAddToCart = () => {
        if (selectedItems.length === 0) {
            toast.error("옵션을 선택해주세요.")
            return
        }
        toast.success("장바구니에 담았습니다.")
        // In real app, dispatch to cart store
    }

    const handleBuyNow = () => {
        if (selectedItems.length === 0) {
            toast.error("옵션을 선택해주세요.")
            return
        }
        // Redirect to checkout
        window.location.href = "/checkout"
    }

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-2 mb-2">
                    <span className="bg-black text-white text-xs px-2 py-1 rounded-full">BEST</span>
                    <span className="text-brand-accent text-sm font-bold">무료배송</span>
                </div>
                <div className="flex justify-between items-start">
                    <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Share2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="h-4 w-4 fill-current" />
                        ))}
                    </div>
                    <span className="text-sm text-gray-500">(128 reviews)</span>
                </div>
                <p className="text-2xl font-bold">{product.price}</p>
            </div>

            <div className="h-px bg-gray-200" />

            <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed">
                    {product.description}
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                    <li className="flex items-center gap-2">
                        <span className="w-20 font-medium text-black">소재</span>
                        이태리 천연 가죽, 원목 다리
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-20 font-medium text-black">사이즈</span>
                        W 2800 x D 950 x H 850 (mm)
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-20 font-medium text-black">제조국</span>
                        대한민국 (Bestea Factory)
                    </li>
                </ul>
            </div>

            <div className="h-px bg-gray-200" />

            {/* Options Section */}
            <ProductOptions
                basePrice={basePrice}
                options={options}
                onPriceChange={(price) => setTotalPrice(price)}
                onSelectionChange={(items) => setSelectedItems(items)}
            />

            {/* Total Price */}
            {totalPrice > 0 && (
                <div className="flex justify-between items-end pt-4 border-t border-gray-200">
                    <span className="font-bold text-lg">총 상품 금액</span>
                    <div className="text-right">
                        <span className="text-sm text-gray-500 block mb-1">
                            총 수량 {selectedItems.reduce((sum, item) => sum + item.quantity, 0)}개
                        </span>
                        <span className="text-3xl font-bold text-brand-accent">
                            {totalPrice.toLocaleString()}원
                        </span>
                    </div>
                </div>
            )}

            <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                    <Button
                        onClick={handleAddToCart}
                        className="flex-1 h-12 text-lg bg-white text-black border border-black hover:bg-gray-50"
                    >
                        장바구니 담기
                    </Button>
                    <Button
                        onClick={handleBuyNow}
                        className="flex-1 h-12 text-lg bg-black text-white hover:bg-gray-800"
                    >
                        바로 구매하기
                    </Button>
                </div>
                <Button variant="ghost" className="w-full">
                    <Heart className="h-4 w-4 mr-2" />
                    위시리스트에 담기
                </Button>
            </div>
        </div>
    )
}

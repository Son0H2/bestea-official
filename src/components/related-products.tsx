import Link from "next/link"
import Image from "next/image"

const relatedProducts = [
    { id: 1, name: "밀라노 천연가죽 4인 소파", price: 1299000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop" },
    { id: 2, name: "로마 원목 6인 식탁 세트", price: 899000, image: "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?q=80&w=600&auto=format&fit=crop" },
    { id: 3, name: "베니스 호텔형 침대 프레임", price: 1599000, image: "https://images.unsplash.com/photo-1505693416388-b0346efee749?q=80&w=600&auto=format&fit=crop" },
    { id: 4, name: "나폴리 패브릭 모듈 소파", price: 1199000, image: "https://images.unsplash.com/photo-1550226891-ef816aed4a98?q=80&w=600&auto=format&fit=crop" },
]

export function RelatedProducts() {
    return (
        <section className="py-16 border-t border-gray-200">
            <h2 className="text-2xl font-bold mb-8">함께 보면 좋은 상품</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                {relatedProducts.map((product) => (
                    <Link key={product.id} href={`/store/${product.id}`} className="group">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-gray-500">베스티아</p>
                            <h3 className="text-sm font-medium line-clamp-2 group-hover:underline">{product.name}</h3>
                            <p className="font-bold">{product.price.toLocaleString()}원</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}

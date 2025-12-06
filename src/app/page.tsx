import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, ShoppingBag, User, Menu, ChevronRight, Hammer, Palette, PiggyBank } from "lucide-react"
import { HeroCarousel } from "@/components/hero-carousel"

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen bg-white text-black font-sans">
            {/* Top Banner */}
            <div className="bg-black text-white text-xs text-center py-2">
                대한민국 유일 이태리 가구 전문 공장 직영 | 30년 장인의 자부심
            </div>

            {/* Header */}
            <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo & GNB */}
                    <div className="flex items-center gap-8">
                        <Link href="/" className="font-bold text-2xl tracking-tighter">BESTEA</Link>
                        <nav className="hidden md:flex gap-6 text-sm font-medium">
                            <Link href="/store" className="hover:text-gray-600">홈퍼니싱</Link>
                            <Link href="/reform" className="hover:text-gray-600">리폼 서비스</Link>
                            <Link href="/about" className="hover:text-gray-600">브랜드 스토리</Link>
                        </nav>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
                        <input
                            type="text"
                            placeholder="검색어를 입력해 주세요."
                            className="w-full h-10 px-4 pr-10 bg-gray-50 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-black transition-colors"
                        />
                        <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    </div>

                    {/* Icons */}
                    <div className="flex items-center gap-4">
                        <button className="md:hidden">
                            <Search className="h-6 w-6" />
                        </button>
                        <Link href="#" className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-black">
                            <User className="h-5 w-5" />
                            <span className="hidden md:inline">로그인</span>
                        </Link>
                        <Link href="#" className="flex flex-col items-center gap-1 text-xs text-gray-600 hover:text-black">
                            <ShoppingBag className="h-5 w-5" />
                            <span className="hidden md:inline">장바구니</span>
                        </Link>
                        <button className="md:hidden">
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero Carousel */}
                <HeroCarousel />

                {/* Reform Service Section */}
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold">새것보다 더 가치 있는 리폼</h2>
                            <p className="text-gray-600 text-lg">
                                소중한 추억이 담긴 가구, 베스티아의 기술력으로 다시 태어납니다.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {/* Benefit 1: Cost */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <PiggyBank className="h-7 w-7 text-black" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">합리적인 비용</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    새 가구를 구매하는 것보다 훨씬 경제적입니다.<br />
                                    최고급 자재를 공장 직영 가격으로 만나보세요.
                                </p>
                            </div>

                            {/* Benefit 2: Customization */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <Palette className="h-7 w-7 text-black" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">나만의 커스텀</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    가죽 교체부터 컬러 변경까지.<br />
                                    우리 집 인테리어에 딱 맞는 스타일로 변경 가능합니다.
                                </p>
                            </div>

                            {/* Benefit 3: Craftsmanship */}
                            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                    <Hammer className="h-7 w-7 text-black" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">30년 장인의 기술</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    단순 수리가 아닌 작품을 복원하는 마음으로.<br />
                                    이태리 가구 전문 장인이 직접 작업합니다.
                                </p>
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <Link href="/reform">
                                <Button className="bg-black text-white hover:bg-gray-800 px-10 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                                    AI 간편 견적 받기
                                </Button>
                            </Link>
                            <p className="mt-4 text-sm text-gray-500">
                                사진 한 장이면 1분 만에 예상 견적을 확인하실 수 있습니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Best Products Section */}
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-2xl font-bold">베스트 상품</h2>
                            <Link href="/store" className="text-sm text-gray-500 hover:text-black flex items-center">
                                더보기 <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="group cursor-pointer">
                                    <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                                        <img
                                            src={`https://images.unsplash.com/photo-${i === 1 ? '1555041469-a586c61ea9bc' : i === 2 ? '1530018607912-eff2daa1bac4' : i === 3 ? '1505693416388-b0346efee749' : '1550226891-ef816aed4a98'}?q=80&w=600&auto=format&fit=crop`}
                                            alt="Product"
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                                            {i}위
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500">베스티아</p>
                                        <h3 className="text-sm font-medium line-clamp-2 group-hover:underline">프리미엄 이태리 천연가죽 소파 {i}인용</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="text-red-600 font-bold">25%</span>
                                            <span className="font-bold">1,299,000</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <Star className="h-3 w-3 fill-gray-400 text-gray-400" />
                                            <span>4.8</span>
                                            <span>(1,234)</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <footer className="bg-gray-50 border-t border-gray-200 py-12 text-xs text-gray-500">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h4 className="font-bold text-black mb-4">고객센터</h4>
                            <p className="text-lg font-bold text-black mb-2">1588-0000</p>
                            <p>평일 09:00 - 18:00</p>
                            <p>주말/공휴일 휴무</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-black mb-4">회사소개</h4>
                            <ul className="space-y-2">
                                <li><Link href="#">브랜드 스토리</Link></li>
                                <li><Link href="#">채용정보</Link></li>
                                <li><Link href="#">이용약관</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-200 pt-8">
                        <p>© 2024 Bestea Corp. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

function Star({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
    )
}

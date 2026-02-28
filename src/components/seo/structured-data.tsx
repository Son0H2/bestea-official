/**
 * 🔍 SEO Structured Data (JSON-LD)
 * 
 * Google, Naver 검색엔진이 콘텐츠를 더 잘 이해하도록 도와줍니다.
 * - LocalBusiness: 지역 비즈니스 정보
 * - Product: 상품 정보
 * - BreadcrumbList: 탐색 경로
 * - FAQPage: 자주 묻는 질문
 */

interface ProductData {
    id: string
    name: string
    description: string
    image: string
    price: number
    currency?: string
    brand?: string
    availability?: string
    reviewCount?: number
    ratingValue?: number
}

interface OrganizationData {
    name: string
    url: string
    logo: string
    description: string
    telephone: string
    address: {
        streetAddress: string
        addressLocality: string
        addressRegion: string
        postalCode: string
        addressCountry: string
    }
    openingHours: string
    priceRange: string
}

/**
 * 조직/회사 정보 (LocalBusiness)
 */
export function OrganizationStructuredData() {
    const data: OrganizationData = {
        name: "베스티아 (Bestea)",
        url: "https://bestea-official.com",
        logo: "https://bestea-official.com/logo.png",
        description: "40 년 장인의 기술로 만드는 이태리 프리미엄 가구 전문점",
        telephone: "+82-31-123-4567",
        address: {
            streetAddress: "경기도 광주시 XXXX 로 XXX",
            addressLocality: "광주시",
            addressRegion: "경기도",
            postalCode: "12345",
            addressCountry: "KR"
        },
        openingHours: "Mo-Fr 09:00-18:00",
        priceRange: "$$$"
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FurnitureStore",
                    ...data,
                    sameAs: [
                        "https://www.instagram.com/bestea_official",
                        "https://www.facebook.com/bestea.official",
                        "https://blog.naver.com/bestea_official",
                    ],
                    geo: {
                        "@type": "GeoCoordinates",
                        latitude: 37.4201,
                        longitude: 127.2978,
                    },
                    hasMap: "https://maps.google.com/?q=bestea",
                    acceptsReservations: "True",
                })
            }}
        />
    )
}

/**
 * 상품 정보 (Product)
 */
export function ProductStructuredData({ product }: { product: ProductData }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Product",
                    name: product.name,
                    description: product.description,
                    image: [
                        product.image,
                        `${product.image}?w=800`,
                        `${product.image}?w=400`,
                    ],
                    brand: {
                        "@type": "Brand",
                        name: product.brand || "Bestea",
                    },
                    offers: {
                        "@type": "Offer",
                        url: `https://bestea-official.com/store/${product.id}`,
                        priceCurrency: product.currency || "KRW",
                        price: product.price,
                        availability: product.availability || "https://schema.org/InStock",
                        seller: {
                            "@type": "Organization",
                            name: "Bestea",
                        },
                    },
                    aggregateRating: product.reviewCount && product.ratingValue ? {
                        "@type": "AggregateRating",
                        ratingValue: product.ratingValue,
                        reviewCount: product.reviewCount,
                    } : undefined,
                })
            }}
        />
    )
}

/**
 * 리폼 서비스 정보 (Service)
 */
export function ServiceStructuredData() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Service",
                    serviceType: "가구 리폼",
                    provider: {
                        "@type": "LocalBusiness",
                        name: "Bestea",
                    },
                    areaServed: {
                        "@type": "Country",
                        name: "South Korea",
                    },
                    description: "이태리 가구 전문 리폼 서비스. 소파, 테이블, 침대 등 고급 가구를 새것처럼 복원합니다.",
                    offers: {
                        "@type": "Offer",
                        priceCurrency: "KRW",
                        price: "100000",
                        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
                        availability: "https://schema.org/InStock",
                    },
                    hasOfferCatalog: {
                        "@type": "OfferCatalog",
                        name: "리폼 서비스 종류",
                        itemListElement: [
                            {
                                "@type": "Offer",
                                itemOffered: {
                                    "@type": "Service",
                                    name: "소파 리폼",
                                    description: "천연가죽, 패브릭 소파 전문 리폼",
                                },
                            },
                            {
                                "@type": "Offer",
                                itemOffered: {
                                    "@type": "Service",
                                    name: "테이블 리폼",
                                    description: "우드 테이블 스크래치 제거 및 재도색",
                                },
                            },
                            {
                                "@type": "Offer",
                                itemOffered: {
                                    "@type": "Service",
                                    name: "침대 리폼",
                                    description: "헤드보드 패브릭 교체 및 수선",
                                },
                            },
                        ],
                    },
                })
            }}
        />
    )
}

/**
 * FAQ 페이지 (FAQPage)
 */
export function FAQStructuredData() {
    const faqs = [
        {
            question: "리폼 견적은 어떻게 받나요?",
            answer: "홈페이지에서 사진 한 장만 업로드하시면 AI 가 즉시 예상 견적을 알려드립니다. 정확한 견적은 전문가가 확인 후 연락드립니다."
        },
        {
            question: "리폼 기간은 얼마나 걸리나요?",
            answer: "일반적으로 2-3 주 소요됩니다. 작업 내용에 따라 달라질 수 있으며, 상담 시 정확한 일정을 알려드립니다."
        },
        {
            question: "방문 수거가 가능한가요?",
            answer: "네, 수도권 지역은 방문 수거 및 배송이 가능합니다. 지역별 비용은 상담 시 안내해 드립니다."
        },
        {
            question: "A/S 는 어떻게 받나요?",
            answer: "리폼 완료 후 6 개월 간 무상 A/S 를 제공합니다. 이후에도 유상 A/S 가 가능합니다."
        },
    ]

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: faqs.map(faq => ({
                        "@type": "Question",
                        name: faq.question,
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: faq.answer,
                        },
                    })),
                })
            }}
        />
    )
}

/**
 * BreadcrumbList (탐색 경로)
 */
export function BreadcrumbStructuredData({ items }: { items: { name: string; url: string }[] }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: items.map((item, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        name: item.name,
                        item: item.url,
                    })),
                })
            }}
        />
    )
}

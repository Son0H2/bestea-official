"use client"

import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function TrustSection() {
    return (
        <section className="w-full py-24 bg-white flex flex-col items-center justify-center text-center px-4 border-t border-gray-100">
            {/* Headline */}
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-black mb-12">
                정직하게 만들고,<br />
                투명하게 판매합니다.
            </h2>

            {/* Signature (Placeholder) */}
            <div className="mb-12 opacity-80">
                <div className="w-48 h-20 flex items-center justify-center text-gray-400 italic font-serif text-2xl border-b border-gray-200">
                    Signature
                </div>
                {/* <Image src="/images/brand/signature.png" alt="Signature" width={200} height={80} /> */}
            </div>

            {/* License Card */}
            <div className="relative w-64 h-80 bg-white border border-gray-200 shadow-sm mb-12 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <span className="text-gray-400 text-sm">License Image</span>
                    {/* <Image src="/images/brand/license_masked.jpg" alt="Business License" fill className="object-cover p-2" /> */}
                </div>

                {/* Watermark */}
                <div className="absolute top-4 -right-4 bg-black text-white text-xs font-bold px-3 py-1 rotate-45">
                    OFFICIAL
                </div>
            </div>

            {/* External Link */}
            <Link
                href="https://www.ftc.go.kr/bizCommPop.do?wrkr_no=1234567890"
                target="_blank"
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-black hover:underline transition-colors"
            >
                <span>공정거래위원회 사업자 정보 확인</span>
                <ExternalLink className="h-3 w-3" />
            </Link>
        </section>
    )
}

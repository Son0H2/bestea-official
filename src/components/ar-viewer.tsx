"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2, Box } from "lucide-react"
import Script from "next/script"

declare global {
    namespace JSX {
        interface IntrinsicElements {
            "model-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string
                ios_src?: string
                poster?: string
                alt?: string
                shadow_intensity?: string
                camera_controls?: boolean
                auto_rotate?: boolean
                ar?: boolean
                ar_modes?: string
                loading?: "auto" | "lazy" | "eager"
                reveal?: "auto" | "manual"
            }
        }
    }
}

interface ArViewerProps {
    src: string
    iosSrc?: string
    poster?: string
    alt?: string
}

export function ArViewer({ src, iosSrc, poster, alt = "3D Model" }: ArViewerProps) {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
            <div className="text-center p-6">
                <div className="mb-4 flex justify-center">
                    <Box className="h-12 w-12 text-gray-300" />
                </div>
                <p className="text-gray-500 font-medium">3D/AR 뷰어 준비 중</p>
                <p className="text-sm text-gray-400 mt-2">현재 시스템 점검으로 인해 3D 모델을 불러올 수 없습니다.<br />잠시 후 다시 시도해주세요.</p>
            </div>
        </div>
    )
}

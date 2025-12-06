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
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        import("@google/model-viewer").catch(console.error)
    }, [])

    if (!isMounted) {
        return (
            <div className="relative w-full h-[400px] md:h-[500px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
        )
    }

    return (
        <div className="relative w-full h-[400px] md:h-[500px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
            <model-viewer
                src={src}
                ios-src={iosSrc}
                poster={poster}
                alt={alt}
                shadow-intensity="1"
                camera-controls
                auto-rotate
                ar
                ar-modes="webxr scene-viewer quick-look"
                style={{ width: "100%", height: "100%" }}
            >
                <div slot="poster" className="flex w-full h-full items-center justify-center bg-gray-50">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                </div>
            </model-viewer>
        </div>
    )
}

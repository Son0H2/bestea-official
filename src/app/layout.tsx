import type { Metadata } from "next";
import { Cormorant_Garamond, Nanum_Myeongjo } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const cormorantGaramond = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
    variable: "--font-cormorant-garamond",
    display: "swap",
});

const nanumMyeongjo = Nanum_Myeongjo({
    subsets: ["latin"],
    weight: ["400", "700", "800"],
    variable: "--font-nanum-myeongjo",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://bestea-official.com"),
    title: {
        default: "베스티아 (Bestea) - 이태리 프리미엄 가구 전문 | 공장 직영",
        template: "%s | 베스티아"
    },
    description: "40 년 장인의 기술로 만드는 이태리 프리미엄 가구. 소파, 테이블, 침대 등 고급 가구를 공장 직영 가격으로. 리폼 서비스도 가능합니다.",
    keywords: [
        "이태리가구", "프리미엄가구", "고급가구", "소파", "테이블", "침대",
        "가구리폼", "소파리폼", "가구수선", "공장직영", "베스티아",
        "이태리소파", "천연가죽소파", "명품가구", "인테리어가구", "가구쇼핑"
    ],
    authors: [{ name: "Bestea Corp" }],
    creator: "Bestea Corp",
    publisher: "Bestea Corp",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        type: "website",
        locale: "ko_KR",
        alternateLocale: ["en_US"],
        url: "https://bestea-official.com",
        siteName: "Bestea",
        title: "베스티아 (Bestea) - 이태리 프리미엄 가구 전문",
        description: "40 년 장인의 기술로 만드는 이태리 프리미엄 가구. 공장 직영 가격으로 만나보세요.",
        images: [
            {
                url: "/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Bestea - 이태리 프리미엄 가구",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "베스티아 (Bestea) - 이태리 프리미엄 가구 전문",
        description: "40 년 장인의 기술로 만드는 이태리 프리미엄 가구",
        images: ["/og-image.jpg"],
        creator: "@bestea_official",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko" className={`${cormorantGaramond.variable} ${nanumMyeongjo.variable}`}>
            <head>
                <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
            </head>
            <body className="antialiased font-sans">
                {children}
                <Toaster />
            </body>
        </html>
    );
}

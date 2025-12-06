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
    title: "Bestea - Modern Living",
    description: "Premium furniture for your modern lifestyle.",
    openGraph: {
        title: "Bestea - Modern Living",
        description: "Premium furniture for your modern lifestyle.",
        url: "https://bestea-official.com",
        siteName: "Bestea",
        locale: "ko_KR",
        type: "website",
    },
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

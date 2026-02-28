import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    const baseUrl = "https://bestea-official.com";
    
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin/",
                    "/api/",
                    "/_next/",
                    "/static/",
                    "/*.json$",
                ],
            },
            {
                userAgent: "Googlebot",
                allow: "/",
                disallow: ["/admin/", "/api/"],
            },
            {
                userAgent: "NaverBot",
                allow: "/",
                disallow: ["/admin/", "/api/"],
            },
        ],
        sitemap: [
            `${baseUrl}/sitemap.xml`,
        ],
        host: baseUrl,
    };
}

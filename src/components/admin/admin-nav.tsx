"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Hammer, ShoppingBag, Package, Users, MessageSquare, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
    {
        title: "대시보드",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "리폼관리",
        href: "/admin/quotes",
        icon: Hammer,
    },
    {
        title: "주문관리",
        href: "/admin/orders",
        icon: ShoppingBag,
    },
    {
        title: "상품관리",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "고객관리",
        href: "/admin/customers",
        icon: Users,
    },
    {
        title: "리뷰관리",
        href: "/admin/reviews",
        icon: MessageSquare,
    },
    {
        title: "배송관리",
        href: "/admin/delivery",
        icon: Truck,
    },
]

export function AdminNav() {
    const pathname = usePathname()

    return (
        <>
            {/* Mobile Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-white md:hidden">
                <div className="flex h-16 items-center justify-around">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center space-y-1 text-xs font-medium transition-colors",
                                    isActive ? "text-brand-accent" : "text-gray-500 hover:text-gray-900"
                                )}
                            >
                                <item.icon className="h-6 w-6" />
                                <span>{item.title}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* Desktop Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-white md:flex">
                <div className="flex h-16 items-center border-b px-6">
                    <span className="text-lg font-bold">Bestea Partners</span>
                </div>
                <div className="flex-1 overflow-y-auto py-4">
                    <nav className="space-y-1 px-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center space-x-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-brand-gray text-brand-accent"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.title}</span>
                                </Link>
                            )
                        })}
                    </nav>
                </div>
            </aside>
        </>
    )
}

"use client"

import { AdminNav } from "@/components/admin/admin-nav"
import { AccessibilityProvider } from '@/lib/accessibility'
import AccessibilityToggle from '@/components/accessibility-toggle'
import "@/styles/accessibility.css"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AccessibilityProvider>
            <div className="flex h-screen bg-gray-50">
                <AdminNav />
                <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                    <div className="container mx-auto p-4 md:p-8">
                        <div className="flex justify-end mb-4">
                            <AccessibilityToggle />
                        </div>
                        {children}
                    </div>
                </main>
            </div>
        </AccessibilityProvider>
    )
}

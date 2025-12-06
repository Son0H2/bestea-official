import { AdminNav } from "@/components/admin/admin-nav"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-50">
            <AdminNav />
            <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                <div className="container mx-auto p-4 md:p-8">{children}</div>
            </main>
        </div>
    )
}

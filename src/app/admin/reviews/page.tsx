import { ReviewManager } from "@/components/admin/review-manager"

export default function ReviewsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">리뷰 관리</h1>
            <ReviewManager />
        </div>
    )
}

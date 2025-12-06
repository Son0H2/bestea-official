"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, Image as ImageIcon, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function ReviewFormDialog() {
    const [open, setOpen] = useState(false)
    const [rating, setRating] = useState(5)
    const [images, setImages] = useState<string[]>([])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock submission
        toast.success("리뷰가 등록되었습니다.")
        setOpen(false)
        setImages([])
        setRating(5)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0])
            setImages([...images, url])
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>리뷰 작성하기</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>리뷰 작성</DialogTitle>
                        <DialogDescription>
                            상품에 대한 솔직한 리뷰를 남겨주세요.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="flex flex-col items-center gap-2">
                            <Label>별점 평가</Label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            className={`h-8 w-8 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            <span className="text-sm font-bold text-yellow-500">{rating}점</span>
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="content">리뷰 내용</Label>
                            <Textarea
                                id="content"
                                placeholder="상품의 품질, 배송, 만족도 등을 적어주세요. (최소 10자 이상)"
                                className="min-h-[100px]"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <Label>사진 첨부</Label>
                            <div className="flex gap-2 overflow-x-auto pb-2">
                                <div className="flex-shrink-0 h-20 w-20 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleImageUpload}
                                    />
                                    <ImageIcon className="h-5 w-5 text-gray-400" />
                                    <span className="text-[10px] text-gray-500 mt-1">추가</span>
                                </div>
                                {images.map((img, i) => (
                                    <div key={i} className="flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden relative border border-gray-200 group">
                                        <img src={img} alt="Review" className="h-full w-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                                            className="absolute top-0.5 right-0.5 bg-black/50 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="w-full bg-black text-white hover:bg-gray-800">
                            등록하기
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}

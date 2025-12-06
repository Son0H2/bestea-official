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
import { Checkbox } from "@/components/ui/checkbox" // Assuming Checkbox component exists or will use native input
import { useState } from "react"
import { toast } from "sonner"
import { Lock } from "lucide-react"

export function QnaFormDialog() {
    const [open, setOpen] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Mock submission
        toast.success("문의가 등록되었습니다.")
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">문의하기</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>상품 Q&A 작성</DialogTitle>
                        <DialogDescription>
                            상품에 대해 궁금한 점을 남겨주세요.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">제목</Label>
                            <Input id="title" placeholder="제목을 입력해주세요" required />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="qna-content">내용</Label>
                            <Textarea
                                id="qna-content"
                                placeholder="문의하실 내용을 입력해주세요."
                                className="min-h-[150px]"
                                required
                            />
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="secret" className="h-4 w-4 rounded border-gray-300" />
                            <Label htmlFor="secret" className="flex items-center gap-1 cursor-pointer">
                                <Lock className="h-3 w-3" />
                                비밀글로 문의하기
                            </Label>
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

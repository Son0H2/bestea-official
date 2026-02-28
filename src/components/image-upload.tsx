"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Upload, X, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
    onChange: (file: File | null) => void
}

// 🔒 허용된 MIME 타입
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export function ImageUpload({ onChange }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [error, setError] = useState<string | null>(null)

    const validateFile = (file: File): boolean => {
        // MIME 타입 확인
        if (!ALLOWED_MIME_TYPES.includes(file.type)) {
            setError('이미지 파일만 업로드 가능합니다 (JPG, PNG, GIF, WEBP)')
            return false
        }

        // 파일 사이즈 확인
        if (file.size > MAX_FILE_SIZE) {
            setError('파일 크기는 10MB 를 초과할 수 없습니다')
            return false
        }

        setError(null)
        return true
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file && validateFile(file)) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
            onChange(file)
        }
    }

    const handleRemove = () => {
        setPreview(null)
        setError(null)
        onChange(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        const file = e.dataTransfer.files?.[0]
        if (file && validateFile(file)) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
            onChange(file)
        }
    }

    return (
        <div className="w-full">
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />

            {error && (
                <div className="mb-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </div>
            )}

            {preview ? (
                <div className="relative w-full aspect-video bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <Image
                        src={preview}
                        alt="Upload preview"
                        fill
                        className="object-contain"
                    />
                    <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1 h-8 w-8"
                        onClick={handleRemove}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            ) : (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="w-full aspect-video bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors group"
                >
                    <div className="p-4 rounded-full bg-white mb-4 group-hover:scale-110 transition-transform shadow-sm">
                        <Upload className="h-6 w-6 text-gray-400 group-hover:text-black" />
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                        클릭하거나 이미지를 드래그해주세요
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        JPG, PNG, GIF, WEBP (최대 10MB)
                    </p>
                </div>
            )}
        </div>
    )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, Plus, Box, Image as ImageIcon } from "lucide-react"

export function ProductForm() {
    const [images, setImages] = useState<string[]>([])
    const [modelUrl, setModelUrl] = useState("")
    const [optionGroups, setOptionGroups] = useState<{
        name: string
        required: boolean
        items: { name: string; price: number }[]
    }[]>([])

    const addOptionGroup = () => {
        setOptionGroups([...optionGroups, { name: "", required: true, items: [{ name: "", price: 0 }] }])
    }

    const removeOptionGroup = (index: number) => {
        setOptionGroups(optionGroups.filter((_, i) => i !== index))
    }

    const updateOptionGroup = (index: number, field: string, value: string | boolean) => {
        const newGroups = [...optionGroups]
        newGroups[index] = { ...newGroups[index], [field]: value }
        setOptionGroups(newGroups)
    }

    const addOptionItem = (groupIndex: number) => {
        const newGroups = [...optionGroups]
        newGroups[groupIndex].items.push({ name: "", price: 0 })
        setOptionGroups(newGroups)
    }

    const removeOptionItem = (groupIndex: number, itemIndex: number) => {
        const newGroups = [...optionGroups]
        newGroups[groupIndex].items = newGroups[groupIndex].items.filter((_, i) => i !== itemIndex)
        setOptionGroups(newGroups)
    }

    const updateOptionItem = (groupIndex: number, itemIndex: number, field: string, value: string | number) => {
        const newGroups = [...optionGroups]
        newGroups[groupIndex].items[itemIndex] = { ...newGroups[groupIndex].items[itemIndex], [field]: value }
        setOptionGroups(newGroups)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Mock upload - in real app, upload to storage and get URL
        if (e.target.files && e.target.files[0]) {
            const url = URL.createObjectURL(e.target.files[0])
            setImages([...images, url])
        }
    }

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-20">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">상품 등록</h2>
                    <p className="text-gray-500">새로운 상품 정보를 입력해주세요.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">취소</Button>
                    <Button className="bg-black text-white hover:bg-gray-800">저장하기</Button>
                </div>
            </div>

            <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
                <div className="space-y-8">
                    {/* 1. Basic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>기본 정보</CardTitle>
                            <CardDescription>상품의 가장 기본적인 정보를 입력합니다.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="category">카테고리</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="카테고리 선택" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sofa">소파</SelectItem>
                                        <SelectItem value="chair">의자</SelectItem>
                                        <SelectItem value="table">테이블</SelectItem>
                                        <SelectItem value="storage">수납장</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="name">상품명</Label>
                                <Input id="name" placeholder="예: 프리미엄 이태리 천연가죽 소파" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="price">판매가</Label>
                                    <div className="relative">
                                        <Input id="price" type="number" placeholder="0" className="pl-8" />
                                        <span className="absolute left-3 top-2.5 text-gray-500 text-sm">₩</span>
                                    </div>
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="discount">할인율 (%)</Label>
                                    <Input id="discount" type="number" placeholder="0" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Images */}
                    <Card>
                        <CardHeader>
                            <CardTitle>상품 이미지</CardTitle>
                            <CardDescription>대표 이미지와 추가 이미지를 등록합니다.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-4 gap-4">
                                {/* Upload Button */}
                                <div className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={handleImageUpload}
                                    />
                                    <Plus className="h-6 w-6 text-gray-400 mb-2" />
                                    <span className="text-xs text-gray-500">이미지 추가</span>
                                </div>

                                {/* Image Previews */}
                                {images.map((img, i) => (
                                    <div key={i} className="aspect-square rounded-lg overflow-hidden relative group border border-gray-200">
                                        <img src={img} alt={`Preview ${i}`} className="w-full h-full object-cover" />
                                        <button
                                            onClick={() => removeImage(i)}
                                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="h-3 w-3" />
                                        </button>
                                        {i === 0 && (
                                            <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-[10px] text-center py-1">
                                                대표 이미지
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-gray-400">
                                * 권장 사이즈: 1000 x 1000px (1:1 비율)
                            </p>
                        </CardContent>
                    </Card>

                    {/* 3. Detail Description */}
                    <Card>
                        <CardHeader>
                            <CardTitle>상세 설명</CardTitle>
                            <CardDescription>상품에 대한 자세한 설명을 입력합니다.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                className="min-h-[300px]"
                                placeholder="상품 상세 내용을 입력하세요. (이미지 URL이나 텍스트)"
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    {/* 4. Product Specs */}
                    <Card>
                        <CardHeader>
                            <CardTitle>상품 정보 고시</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="material">소재</Label>
                                <Input id="material" placeholder="예: 천연 가죽, 원목" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="size">사이즈</Label>
                                <Input id="size" placeholder="예: W 2000 x D 900 x H 850" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="color">색상</Label>
                                <Input id="color" placeholder="예: 브라운, 베이지" />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="origin">제조국</Label>
                                <Input id="origin" defaultValue="대한민국 (Bestea Factory)" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 5. Option Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>옵션 설정</CardTitle>
                            <CardDescription>상품의 옵션(색상, 사이즈 등)과 추가 금액을 설정합니다.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {optionGroups.map((group, groupIndex) => (
                                <div key={groupIndex} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                    <div className="flex items-center justify-between">
                                        <div className="grid gap-2 flex-1 mr-4">
                                            <div className="flex items-center justify-between">
                                                <Label>옵션 그룹명</Label>
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        id={`required-${groupIndex}`}
                                                        checked={group.required}
                                                        onCheckedChange={(checked) => updateOptionGroup(groupIndex, "required", checked as boolean)}
                                                    />
                                                    <Label htmlFor={`required-${groupIndex}`} className="text-sm font-normal cursor-pointer">
                                                        필수 선택
                                                    </Label>
                                                </div>
                                            </div>
                                            <Input
                                                value={group.name}
                                                onChange={(e) => updateOptionGroup(groupIndex, "name", e.target.value)}
                                                placeholder="예: 색상, 사이즈"
                                                className="bg-white"
                                            />
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => removeOptionGroup(groupIndex)}
                                            className="text-red-500 hover:text-red-700 hover:bg-red-50 mt-6"
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>옵션값 목록</Label>
                                        {group.items.map((item, itemIndex) => (
                                            <div key={itemIndex} className="flex gap-2">
                                                <Input
                                                    value={item.name}
                                                    onChange={(e) => updateOptionItem(groupIndex, itemIndex, "name", e.target.value)}
                                                    placeholder="옵션명 (예: 레드)"
                                                    className="bg-white flex-1"
                                                />
                                                <div className="relative w-32">
                                                    <Input
                                                        type="number"
                                                        value={item.price}
                                                        onChange={(e) => updateOptionItem(groupIndex, itemIndex, "price", parseInt(e.target.value) || 0)}
                                                        placeholder="0"
                                                        className="bg-white pl-8"
                                                    />
                                                    <span className="absolute left-3 top-2.5 text-gray-500 text-sm">₩</span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeOptionItem(groupIndex, itemIndex)}
                                                    className="h-10 w-10"
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => addOptionItem(groupIndex)}
                                            className="w-full border-dashed"
                                        >
                                            <Plus className="h-3 w-3 mr-1" /> 옵션값 추가
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            <Button
                                variant="outline"
                                onClick={addOptionGroup}
                                className="w-full py-6 border-dashed text-gray-500 hover:text-black hover:border-black hover:bg-gray-50"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                새 옵션 그룹 추가
                            </Button>
                        </CardContent>
                    </Card>

                    {/* 6. 3D/AR Settings */}
                    <Card className="border-blue-100 bg-blue-50/30">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-blue-700">
                                <Box className="h-5 w-5" />
                                3D/AR 설정
                            </CardTitle>
                            <CardDescription>AR 뷰어에 사용할 3D 모델 파일을 연결합니다.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label htmlFor="modelUrl">GLB 파일 URL</Label>
                                <Input
                                    id="modelUrl"
                                    placeholder="https://.../model.glb"
                                    value={modelUrl}
                                    onChange={(e) => setModelUrl(e.target.value)}
                                />
                            </div>
                            <div className="bg-white p-4 rounded-lg border border-gray-200 flex items-center justify-center h-[150px] text-gray-400 text-sm">
                                {modelUrl ? (
                                    <span className="text-blue-600">모델 파일 연결됨</span>
                                ) : (
                                    "URL을 입력하면 미리보기가 활성화됩니다."
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* 6. Status */}
                    <Card>
                        <CardHeader>
                            <CardTitle>판매 설정</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="status">판매 상태</Label>
                                <Switch id="status" defaultChecked />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="display">진열 상태</Label>
                                <Switch id="display" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

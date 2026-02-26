"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, X, Upload } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { getCurrentUser } from "@/lib/supabase/auth"

export default function AdminProductNewPage() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [uploadingImages, setUploadingImages] = useState(false)

    // Form state
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [originalPrice, setOriginalPrice] = useState("")
    const [discount, setDiscount] = useState("")
    const [category, setCategory] = useState("소파")
    const [description, setDescription] = useState("")
    const [material, setMaterial] = useState("")
    const [size, setSize] = useState("")
    const [color, setColor] = useState("")
    const [origin, setOrigin] = useState("")
    const [stock, setStock] = useState("10")
    const [images, setImages] = useState<string[]>([])
    const [imageUrls, setImageUrls] = useState<string[]>([])

    useEffect(() => {
        checkAdmin()
    }, [])

    async function checkAdmin() {
        const currentUser = await getCurrentUser()
        if (!currentUser) {
            router.push('/login')
            return
        }
        setUser(currentUser)

        const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', currentUser.id)
            .single()

        if ((data as any)?.role !== 'admin') {
            alert("관리자만 접근할 수 있습니다.")
            router.push('/')
            return
        }

        setIsAdmin(true)
    }

    async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files
        if (!files || files.length === 0) return

        setUploadingImages(true)
        try {
            const newImageUrls: string[] = []
            
            for (let i = 0; i < files.length; i++) {
                const file = files[i]
                const fileExt = file.name.split('.').pop()
                const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
                const filePath = `products/${fileName}`

                // Upload to Supabase Storage
                const { error: uploadError } = await supabase.storage
                    .from('product-images')
                    .upload(filePath, file)

                if (uploadError) throw uploadError

                // Get public URL
                const { data: urlData } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(filePath)

                if (urlData.publicUrl) {
                    newImageUrls.push(urlData.publicUrl)
                }
            }

            setImageUrls([...imageUrls, ...newImageUrls])
            alert("이미지가 업로드되었습니다.")
        } catch (error: any) {
            console.error('Image upload error:', error)
            alert("이미지 업로드 실패: " + error.message)
        } finally {
            setUploadingImages(false)
        }
    }

    function removeImage(index: number) {
        setImageUrls(imageUrls.filter((_, i) => i !== index))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        
        if (!name || !price || !category) {
            alert("필수 항목을 입력해주세요.")
            return
        }

        setLoading(true)
        try {
            const details: any = {}
            if (material) details.material = material
            if (size) details.size = size
            if (color) details.color = color
            if (origin) details.origin = origin

            const { error } = await supabase
                .from('products')
                .insert({
                    name,
                    price: parseInt(price),
                    original_price: originalPrice ? parseInt(originalPrice) : null,
                    discount: discount ? parseInt(discount) : null,
                    category,
                    description: description || null,
                    images: imageUrls.length > 0 ? imageUrls : null,
                    details: Object.keys(details).length > 0 ? details : null,
                    stock: parseInt(stock)
                } as any)

            if (error) throw error

            alert("상품이 등록되었습니다!")
            router.push('/admin/products')
        } catch (error: any) {
            console.error('Product creation error:', error)
            alert("상품 등록 실패: " + error.message)
        } finally {
            setLoading(false)
        }
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">확인중...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="border-b bg-white">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <Link href="/admin" className="font-bold text-2xl tracking-tighter">BESTEA Partners</Link>
                    <Link href="/admin/products">
                        <Button variant="outline" size="sm">목록으로</Button>
                    </Link>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">상품 등록</h1>
                    <p className="text-gray-500 mt-2">새로운 상품을 등록하세요.</p>
                </div>

                <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
                    {/* Basic Info */}
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <h2 className="text-lg font-bold">기본 정보</h2>
                            
                            <div>
                                <Label htmlFor="name">상품명 *</Label>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="밀라노 천연가죽 4 인 소파"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <Label htmlFor="price">판매가 *</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="1299000"
                                        required
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="originalPrice">원가</Label>
                                    <Input
                                        id="originalPrice"
                                        type="number"
                                        value={originalPrice}
                                        onChange={(e) => setOriginalPrice(e.target.value)}
                                        placeholder="1732000"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="discount">할인율 (%)</Label>
                                    <Input
                                        id="discount"
                                        type="number"
                                        value={discount}
                                        onChange={(e) => setDiscount(e.target.value)}
                                        placeholder="25"
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="category">카테고리 *</Label>
                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full h-10 px-3 border rounded-md"
                                    required
                                >
                                    <option value="소파">소파</option>
                                    <option value="테이블">테이블</option>
                                    <option value="침대">침대</option>
                                    <option value="수납장">수납장</option>
                                    <option value="의자">의자</option>
                                </select>
                            </div>

                            <div>
                                <Label htmlFor="stock">재고 *</Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    placeholder="10"
                                    required
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Description */}
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <h2 className="text-lg font-bold">상품 설명</h2>
                            
                            <div>
                                <Label htmlFor="description">설명</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="상품에 대한 설명을 입력하세요."
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Details */}
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <h2 className="text-lg font-bold">상세 스펙</h2>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="material">소재</Label>
                                    <Input
                                        id="material"
                                        value={material}
                                        onChange={(e) => setMaterial(e.target.value)}
                                        placeholder="이태리 천연 면피 가죽"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="size">크기</Label>
                                    <Input
                                        id="size"
                                        value={size}
                                        onChange={(e) => setSize(e.target.value)}
                                        placeholder="W 2800 x D 1000 x H 900 (mm)"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="color">색상</Label>
                                    <Input
                                        id="color"
                                        value={color}
                                        onChange={(e) => setColor(e.target.value)}
                                        placeholder="Camel, Dark Brown, Ivory"
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="origin">원산지</Label>
                                    <Input
                                        id="origin"
                                        value={origin}
                                        onChange={(e) => setOrigin(e.target.value)}
                                        placeholder="Made in Korea (Bestea Factory)"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Images */}
                    <Card>
                        <CardContent className="pt-6 space-y-4">
                            <h2 className="text-lg font-bold">상품 이미지</h2>
                            
                            <div>
                                <Label>이미지 업로드</Label>
                                <div className="mt-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageUpload}
                                        disabled={uploadingImages}
                                        className="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-black file:text-white
                                            hover:file:bg-gray-800"
                                    />
                                </div>
                                {uploadingImages && (
                                    <p className="text-sm text-gray-500 mt-2">업로드중...</p>
                                )}
                            </div>

                            {imageUrls.length > 0 && (
                                <div className="grid grid-cols-4 gap-4">
                                    {imageUrls.map((url, idx) => (
                                        <div key={idx} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                                            <img src={url} alt="" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Submit */}
                    <div className="flex gap-4 pt-4">
                        <Button
                            type="submit"
                            className="flex-1 bg-black hover:bg-gray-800 text-white py-6 text-lg"
                            disabled={loading}
                        >
                            {loading ? "등록중..." : "상품 등록하기"}
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            className="flex-1 py-6 text-lg"
                            onClick={() => router.push('/admin/products')}
                        >
                            취소
                        </Button>
                    </div>
                </form>
            </main>
        </div>
    )
}

// Add Link import
import Link from "next/link"

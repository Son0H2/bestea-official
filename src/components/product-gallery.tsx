"use client"

import { useState } from "react"
import Image from "next/image"

interface ProductGalleryProps {
    images: string[]
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedImage, setSelectedImage] = useState(images[0])

    return (
        <div className="flex flex-col gap-4">
            {/* Main Image */}
            <div className="aspect-square relative bg-gray-100 rounded-lg overflow-hidden">
                <Image
                    src={selectedImage}
                    alt="Product Image"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={`aspect-square relative bg-gray-100 rounded-md overflow-hidden border-2 transition-all ${selectedImage === image ? "border-black" : "border-transparent hover:border-gray-300"
                            }`}
                    >
                        <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    )
}

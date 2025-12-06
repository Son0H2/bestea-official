"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Minus, Plus, X } from "lucide-react"
import Link from "next/link"

interface CartItemProps {
    item: {
        id: number
        name: string
        option?: string
        price: number
        originalPrice?: number
        image: string
        quantity: number
        selected: boolean
    }
    onToggle: (id: number) => void
    onQuantityChange: (id: number, delta: number) => void
    onRemove: (id: number) => void
}

export function CartItem({ item, onToggle, onQuantityChange, onRemove }: CartItemProps) {
    return (
        <div className="flex gap-4 py-6 border-b border-gray-100 last:border-0">
            {/* Checkbox */}
            <div className="flex items-start pt-2">
                <Checkbox
                    checked={item.selected}
                    onCheckedChange={() => onToggle(item.id)}
                    className="mt-1"
                />
            </div>

            {/* Image */}
            <Link href={`/store/${item.id}`} className="block shrink-0">
                <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            </Link>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <Link href={`/store/${item.id}`} className="hover:underline">
                            <h3 className="font-medium text-sm sm:text-base truncate pr-4">
                                {item.name}
                            </h3>
                        </Link>
                        {item.option && (
                            <p className="text-sm text-gray-500 mt-1">{item.option}</p>
                        )}
                    </div>
                    <button
                        onClick={() => onRemove(item.id)}
                        className="text-gray-400 hover:text-black transition-colors"
                    >
                        <X className="h-4 w-4" />
                        <span className="sr-only">삭제</span>
                    </button>
                </div>

                <div className="flex items-end justify-between mt-4">
                    {/* Quantity Control */}
                    <div className="flex items-center border border-gray-200 rounded-md">
                        <button
                            onClick={() => onQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                            className="p-1 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent"
                        >
                            <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                        </span>
                        <button
                            onClick={() => onQuantityChange(item.id, 1)}
                            className="p-1 hover:bg-gray-50"
                        >
                            <Plus className="h-3 w-3" />
                        </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                        {item.originalPrice && (
                            <span className="block text-sm text-gray-400 line-through mb-0.5">
                                {(item.originalPrice * item.quantity).toLocaleString()}원
                            </span>
                        )}
                        <span className="font-bold text-lg">
                            {(item.price * item.quantity).toLocaleString()}원
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

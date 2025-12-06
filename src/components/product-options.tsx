"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, Minus, Plus } from "lucide-react"
import { toast } from "sonner"

interface OptionGroup {
    name: string
    required: boolean
    items: { name: string; price: number }[]
}

interface ProductOptionsProps {
    basePrice: number
    options: OptionGroup[]
    onPriceChange: (price: number) => void
    onSelectionChange: (items: SelectedItem[]) => void
}

export interface SelectedItem {
    id: string
    options: { groupName: string; optionName: string; price: number }[]
    quantity: number
    totalPrice: number
}

export function ProductOptions({ basePrice, options, onPriceChange, onSelectionChange }: ProductOptionsProps) {
    const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: { name: string; price: number } | null }>({})
    const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([])

    // Initialize selection state
    useEffect(() => {
        const initial: any = {}
        options.forEach(group => {
            // For optional groups, initialize with "선택 안함" if not required, otherwise null
            initial[group.name] = group.required ? null : { name: "선택 안함", price: 0 }
        })
        setSelectedOptions(initial)
    }, [options])

    // Calculate total price whenever selected items change
    useEffect(() => {
        const itemsTotal = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0)
        onSelectionChange(selectedItems)
        onPriceChange(itemsTotal)
    }, [selectedItems, onSelectionChange, onPriceChange])

    const handleOptionSelect = (groupName: string, value: string) => {
        const group = options.find(g => g.name === groupName)
        if (!group) return

        let selectedItem: { name: string; price: number } | null = null

        if (value === "선택 안함") {
            selectedItem = { name: "선택 안함", price: 0 }
        } else {
            selectedItem = group.items.find(i => i.name === value) || null
        }

        const newSelection = { ...selectedOptions, [groupName]: selectedItem }
        setSelectedOptions(newSelection)

        // Check if all groups have a selection (either a real item or "선택 안함")
        const allGroupsSelected = options.every(g => newSelection[g.name] !== null)

        if (allGroupsSelected) {
            // Create a new item combination
            const combinationOptions = options.map(g => ({
                groupName: g.name,
                optionName: newSelection[g.name]!.name,
                price: newSelection[g.name]!.price
            })).filter(o => o.optionName !== "선택 안함") // Filter out "None"

            const optionPriceSum = combinationOptions.reduce((sum, opt) => sum + opt.price, 0)
            const singleItemPrice = basePrice + optionPriceSum

            // Check if this combination already exists
            const combinationId = combinationOptions.length > 0
                ? combinationOptions.map(o => o.optionName).join("/")
                : "기본 상품" // If all options were "None" or no options were selected

            const existingItemIndex = selectedItems.findIndex(i => i.id === combinationId)

            if (existingItemIndex >= 0) {
                // Increment quantity
                const newItems = [...selectedItems]
                newItems[existingItemIndex].quantity += 1
                newItems[existingItemIndex].totalPrice = newItems[existingItemIndex].quantity * singleItemPrice
                setSelectedItems(newItems)
                toast.info("이미 선택된 옵션입니다. 수량이 추가되었습니다.")
            } else {
                // Add new item
                const newItem: SelectedItem = {
                    id: combinationId,
                    options: combinationOptions,
                    quantity: 1,
                    totalPrice: singleItemPrice
                }
                setSelectedItems([...selectedItems, newItem])
            }

            // Reset selection
            const reset: any = {}
            options.forEach(g => reset[g.name] = null)
            setSelectedOptions(reset)
        }
    }

    const updateQuantity = (index: number, delta: number) => {
        const newItems = [...selectedItems]
        const item = newItems[index]
        const singlePrice = item.totalPrice / item.quantity

        const newQuantity = item.quantity + delta
        if (newQuantity < 1) return

        item.quantity = newQuantity
        item.totalPrice = newQuantity * singlePrice
        setSelectedItems(newItems)
    }

    const removeItem = (index: number) => {
        setSelectedItems(selectedItems.filter((_, i) => i !== index))
    }

    if (!options || options.length === 0) return null

    return (
        <div className="space-y-4">
            <div className="space-y-3">
                {options.map((group) => (
                    <div key={group.name} className="space-y-1.5">
                        <label className="text-sm font-medium text-gray-700">
                            {group.name}
                            {!group.required && <span className="text-gray-400 font-normal ml-1">(선택)</span>}
                        </label>
                        <Select
                            value={selectedOptions[group.name]?.name || ""}
                            onValueChange={(val) => handleOptionSelect(group.name, val)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder={`${group.name} 선택`} />
                            </SelectTrigger>
                            <SelectContent>
                                {!group.required && (
                                    <SelectItem value="선택 안함">
                                        선택 안함
                                    </SelectItem>
                                )}
                                {group.items.map((item) => (
                                    <SelectItem key={item.name} value={item.name}>
                                        {item.name} {item.price > 0 && `(+${item.price.toLocaleString()}원)`}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ))}
            </div>

            {/* Selected Items List */}
            {selectedItems.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-3 mt-4">
                    {selectedItems.map((item, index) => (
                        <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded border border-gray-200">
                            <div className="space-y-1">
                                <div className="text-sm font-medium">
                                    {item.options.map(o => o.optionName).join(" / ")}
                                </div>
                                <div className="flex items-center border border-gray-200 rounded w-fit">
                                    <button
                                        onClick={() => updateQuantity(index, -1)}
                                        className="px-2 py-1 hover:bg-gray-50 text-gray-500"
                                    >
                                        <Minus className="h-3 w-3" />
                                    </button>
                                    <span className="px-2 text-sm font-medium min-w-[1.5rem] text-center">
                                        {item.quantity}
                                    </span>
                                    <button
                                        onClick={() => updateQuantity(index, 1)}
                                        className="px-2 py-1 hover:bg-gray-50 text-gray-500"
                                    >
                                        <Plus className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold">{item.totalPrice.toLocaleString()}원</div>
                                <button
                                    onClick={() => removeItem(index)}
                                    className="text-xs text-gray-400 hover:text-red-500 mt-1"
                                >
                                    <X className="h-3 w-3 inline mr-0.5" /> 삭제
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

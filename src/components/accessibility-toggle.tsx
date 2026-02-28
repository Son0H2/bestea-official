"use client"

import { useAccessibility } from '@/lib/accessibility'
import { Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function AccessibilityToggle() {
    const { isLargeText, toggleLargeText } = useAccessibility()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Type className="h-5 w-5" />
                    <span className="sr-only">글씨 크기 설정</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <div className="px-2 py-1.5 text-sm font-semibold border-b">
                    글씨 크기 설정
                </div>
                
                <DropdownMenuItem onClick={toggleLargeText}>
                    <Type className="h-4 w-4 mr-2" />
                    <span>큰 글씨 {isLargeText ? '끄기' : '켜기'}</span>
                    {isLargeText && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>

                <div className="px-2 py-2 text-xs text-gray-500 border-t mt-2">
                    <p>기본 모드: 일반 크기</p>
                    <p>큰 글씨: 모든 텍스트 확대</p>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

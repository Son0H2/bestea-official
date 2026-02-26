"use client"

import { useAccessibility } from '@/lib/accessibility'
import { Maximize2, Contrast, Type } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function AccessibilityToggle() {
    const { mode, setMode, isLargeText, toggleLargeText } = useAccessibility()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="relative">
                    <Maximize2 className="h-5 w-5" />
                    <span className="sr-only">접근성 설정</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm font-semibold border-b">
                    접근성 모드
                </div>
                
                <DropdownMenuItem
                    onClick={() => setMode('normal')}
                    className={mode === 'normal' ? 'bg-gray-100' : ''}
                >
                    <Type className="h-4 w-4 mr-2" />
                    <span>일반 모드</span>
                    {mode === 'normal' && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => setMode('magnifier')}
                    className={mode === 'magnifier' ? 'bg-gray-100' : ''}
                >
                    <Maximize2 className="h-4 w-4 mr-2" />
                    <span>돋보기 모드 (1.5 배)</span>
                    {mode === 'magnifier' && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>

                <DropdownMenuItem
                    onClick={() => setMode('high-contrast')}
                    className={mode === 'high-contrast' ? 'bg-gray-100' : ''}
                >
                    <Contrast className="h-4 w-4 mr-2" />
                    <span>고대비 모드</span>
                    {mode === 'high-contrast' && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>

                <div className="border-t my-1" />

                <DropdownMenuItem onClick={toggleLargeText}>
                    <Type className="h-4 w-4 mr-2" />
                    <span>큰 글씨 {isLargeText ? '끄기' : '켜기'}</span>
                    {isLargeText && <span className="ml-auto">✓</span>}
                </DropdownMenuItem>

                <div className="px-2 py-2 text-xs text-gray-500 border-t mt-1">
                    <p>돋보기 모드: 모든 텍스트 1.5 배</p>
                    <p>고대비: 검은 배경, 흰색/노란색</p>
                    <p>터치 영역 자동 확대</p>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

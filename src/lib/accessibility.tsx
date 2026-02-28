"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AccessibilityContextType {
    isLargeText: boolean
    toggleLargeText: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
    const [isLargeText, setIsLargeText] = useState(false)

    useEffect(() => {
        // 큰 글씨 클래스만 관리 (고대비/돋보기 모드 제거)
        if (isLargeText) {
            document.documentElement.classList.add('large-text')
        } else {
            document.documentElement.classList.remove('large-text')
        }
        
        // Save to localStorage
        localStorage.setItem('accessibility-large-text', String(isLargeText))
    }, [isLargeText])

    function toggleLargeText() {
        setIsLargeText(!isLargeText)
    }

    return (
        <AccessibilityContext.Provider value={{ isLargeText, toggleLargeText }}>
            {children}
        </AccessibilityContext.Provider>
    )
}

export function useAccessibility() {
    const context = useContext(AccessibilityContext)
    if (context === undefined) {
        throw new Error('useAccessibility must be used within AccessibilityProvider')
    }
    return context
}

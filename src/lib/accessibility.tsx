"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type AccessibilityMode = 'normal' | 'magnifier' | 'high-contrast'

interface AccessibilityContextType {
    mode: AccessibilityMode
    setMode: (mode: AccessibilityMode) => void
    isLargeText: boolean
    toggleLargeText: () => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<AccessibilityMode>('normal')
    const [isLargeText, setIsLargeText] = useState(false)

    useEffect(() => {
        // Apply accessibility classes to document
        document.documentElement.classList.remove('accessibility-normal', 'accessibility-magnifier', 'accessibility-contrast')
        document.documentElement.classList.add(`accessibility-${mode}`)
        
        // Save to localStorage
        localStorage.setItem('accessibility-mode', mode)
    }, [mode])

    function toggleLargeText() {
        setIsLargeText(!isLargeText)
        if (!isLargeText) {
            document.documentElement.classList.add('large-text')
        } else {
            document.documentElement.classList.remove('large-text')
        }
    }

    return (
        <AccessibilityContext.Provider value={{ mode, setMode, isLargeText, toggleLargeText }}>
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

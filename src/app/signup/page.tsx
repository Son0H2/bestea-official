"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Check, X } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

// 비밀번호 유효성 검사 규칙
const PASSWORD_RULES = [
    { id: 'length', label: '12~15 자', test: (pwd: string) => pwd.length >= 12 && pwd.length <= 15 },
    { id: 'letter', label: '영문 포함', test: (pwd: string) => /[a-zA-Z]/.test(pwd) },
    { id: 'special', label: '특수문자 포함', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'`~]/.test(pwd) },
]

export default function SignupPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    // 비밀번호 유효성 검사
    const passwordValidation = {
        length: password.length >= 12 && password.length <= 15,
        letter: /[a-zA-Z]/.test(password),
        special: /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\;'`~]/.test(password),
    }

    const isPasswordValid = Object.values(passwordValidation).every(Boolean)

    // 전화번호 포맷팅 (3-4-4)
    function formatPhone(value: string) {
        const digits = value.replace(/[^0-9]/g, '')
        
        if (digits.length <= 3) return digits
        if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`
        return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`
    }

    function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
        const formatted = formatPhone(e.target.value)
        setPhone(formatted)
    }

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")

        // 비밀번호 유효성 검사
        if (!isPasswordValid) {
            setError("비밀번호 규칙을 모두 만족해주세요.")
            setLoading(false)
            return
        }

        // 비밀번호 확인
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.")
            setLoading(false)
            return
        }

        // 전화번호 validation
        const phoneDigits = phone.replace(/[^0-9]/g, '')
        if (phoneDigits.length < 10 || phoneDigits.length > 11) {
            setError("휴대전화 번호를 올바르게 입력해주세요.")
            setLoading(false)
            return
        }

        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        phone: phone,
                    },
                },
            })

            if (error) throw error

            // 회원가입 성공 - 이메일 인증 안내
            alert("회원가입이 완료되었습니다!\n이메일 인증을 완료해주세요.")
            router.push("/login")
        } catch (err: any) {
            setError(err.message || "회원가입 중 오류가 발생했습니다.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="absolute top-8 left-8">
                <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-black transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    메인으로 돌아가기
                </Link>
            </div>

            <div className="w-full max-w-md space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter">BESTEA</h1>
                    <p className="text-gray-500">프리미엄 가구의 시작, 베스티아</p>
                </div>

                <Card className="border-none shadow-lg">
                    <CardHeader className="space-y-1">
                        <CardTitle className="text-2xl">회원가입</CardTitle>
                        <CardDescription>
                            새로운 계정을 만들어주세요.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <form onSubmit={handleSignup} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">이름</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="홍길동"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">이메일</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="12~15 자, 영문 + 특수문자"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    className={password && !isPasswordValid ? 'border-red-500' : ''}
                                />
                                
                                {/* 비밀번호 규칙 표시 */}
                                <div className="space-y-1 mt-2">
                                    <p className="text-xs text-gray-500 font-medium">비밀번호 규칙:</p>
                                    {PASSWORD_RULES.map((rule) => (
                                        <div key={rule.id} className="flex items-center gap-2 text-xs">
                                            {passwordValidation[rule.id as keyof typeof passwordValidation] ? (
                                                <Check className="h-3 w-3 text-green-600" />
                                            ) : (
                                                <X className="h-3 w-3 text-gray-400" />
                                            )}
                                            <span className={passwordValidation[rule.id as keyof typeof passwordValidation] ? 'text-green-600' : 'text-gray-500'}>
                                                {rule.label}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">비밀번호 확인</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                    placeholder="비밀번호 재입력"
                                />
                                {confirmPassword && password === confirmPassword && (
                                    <div className="flex items-center gap-1 text-xs text-green-600">
                                        <Check className="h-3 w-3" />
                                        비밀번호가 일치합니다
                                    </div>
                                )}
                                {confirmPassword && password !== confirmPassword && (
                                    <div className="flex items-center gap-1 text-xs text-red-600">
                                        <X className="h-3 w-3" />
                                        비밀번호가 일치하지 않습니다
                                    </div>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="phone">휴대전화</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="010-1234-5678"
                                    value={phone}
                                    onChange={handlePhoneChange}
                                    maxLength={13}
                                    disabled={loading}
                                />
                                <p className="text-xs text-gray-500">
                                    '-' 를 자동으로 입력합니다 (010-1234-5678)
                                </p>
                            </div>
                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                                    {error}
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-black hover:bg-gray-800 text-white"
                                disabled={loading || !isPasswordValid}
                            >
                                {loading ? "처리 중..." : "회원가입"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <div className="text-sm text-center text-gray-500">
                            이미 계정이 있으신가요?{" "}
                            <Link href="/login" className="hover:underline font-semibold text-black">
                                로그인
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

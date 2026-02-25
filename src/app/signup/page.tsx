"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

export default function SignupPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSignup(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")

        // 비밀번호 확인
        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.")
            setLoading(false)
            return
        }

        // 비밀번호 길이 확인
        if (password.length < 6) {
            setError("비밀번호는 6 자 이상이어야 합니다.")
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
                                <Label htmlFor="phone">휴대전화</Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="010-0000-0000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">비밀번호</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="6 자 이상"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
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
                                />
                            </div>
                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                                    {error}
                                </div>
                            )}
                            <Button
                                type="submit"
                                className="w-full bg-black hover:bg-gray-800 text-white"
                                disabled={loading}
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

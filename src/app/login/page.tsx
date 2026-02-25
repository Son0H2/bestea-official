"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase/client"

export default function LoginPage() {
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [keepLogin, setKeepLogin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) throw error

            // 로그인 성공 - 홈으로 리다이렉트
            router.push("/")
            router.refresh()
        } catch (err: any) {
            setError(err.message || "로그인 중 오류가 발생했습니다.")
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
                        <CardTitle className="text-2xl">로그인</CardTitle>
                        <CardDescription>
                            이메일과 비밀번호를 입력해 주세요.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <form onSubmit={handleLogin} className="grid gap-4">
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            {error && (
                                <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                                    {error}
                                </div>
                            )}
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="keep-login"
                                    checked={keepLogin}
                                    onCheckedChange={(checked) => setKeepLogin(checked as boolean)}
                                />
                                <label
                                    htmlFor="keep-login"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    로그인 상태 유지
                                </label>
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-black hover:bg-gray-800 text-white"
                                disabled={loading}
                            >
                                {loading ? "로그인 중..." : "로그인"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <div className="text-sm text-center text-gray-500 w-full flex justify-between px-4">
                            <Link href="/find-account" className="hover:underline">아이디/비밀번호 찾기</Link>
                            <Link href="/signup" className="hover:underline font-semibold text-black">회원가입</Link>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

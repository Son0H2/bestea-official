"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

export default function LoginPage() {
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
                        <div className="grid gap-2">
                            <Label htmlFor="email">이메일</Label>
                            <Input id="email" type="email" placeholder="name@example.com" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">비밀번호</Label>
                            <Input id="password" type="password" />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Checkbox id="keep-login" />
                            <label
                                htmlFor="keep-login"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                로그인 상태 유지
                            </label>
                        </div>
                        <Button className="w-full bg-black hover:bg-gray-800 text-white">
                            로그인
                        </Button>


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

"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Search } from "lucide-react"
import { toast } from "sonner"

export default function SignupPage() {
    const [phoneVerified, setPhoneVerified] = useState(false)
    const [verificationCode, setVerificationCode] = useState("")
    const [showVerificationInput, setShowVerificationInput] = useState(false)

    const handleRequestVerification = () => {
        setShowVerificationInput(true)
        toast.success("인증번호가 발송되었습니다. (123456)")
    }

    const handleVerifyCode = () => {
        if (verificationCode === "123456") {
            setPhoneVerified(true)
            toast.success("인증이 완료되었습니다.")
        } else {
            toast.error("인증번호가 올바르지 않습니다.")
        }
    }

    const handleAddressSearch = () => {
        toast.info("주소 검색 기능은 추후 연동됩니다.")
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-12">
            <div className="absolute top-8 left-8">
                <Link href="/login" className="flex items-center text-sm text-gray-500 hover:text-black transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    로그인으로 돌아가기
                </Link>
            </div>

            <div className="w-full max-w-lg space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter">회원가입</h1>
                    <p className="text-gray-500">베스티아의 회원이 되어 다양한 혜택을 누려보세요.</p>
                </div>

                <Card className="border-none shadow-lg">
                    <CardHeader>
                        <CardTitle>기본 정보 입력</CardTitle>
                        <CardDescription>
                            필수 정보를 정확히 입력해 주세요.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Email */}
                        <div className="grid gap-2">
                            <Label htmlFor="email">이메일 (아이디)</Label>
                            <div className="flex gap-2">
                                <Input id="email" type="email" placeholder="name@example.com" />
                                <Button variant="outline">중복확인</Button>
                            </div>
                        </div>

                        {/* Password */}
                        <div className="grid gap-2">
                            <Label htmlFor="password">비밀번호</Label>
                            <Input id="password" type="password" placeholder="영문, 숫자, 특수문자 포함 8자 이상" />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password-confirm">비밀번호 확인</Label>
                            <Input id="password-confirm" type="password" />
                        </div>

                        {/* Name */}
                        <div className="grid gap-2">
                            <Label htmlFor="name">이름</Label>
                            <Input id="name" placeholder="실명 입력" />
                        </div>

                        {/* Phone Auth */}
                        <div className="grid gap-2">
                            <Label htmlFor="phone">휴대폰 번호</Label>
                            <div className="flex gap-2">
                                <Input id="phone" placeholder="010-0000-0000" disabled={phoneVerified} />
                                <Button
                                    variant="outline"
                                    onClick={handleRequestVerification}
                                    disabled={phoneVerified}
                                >
                                    {phoneVerified ? "인증완료" : "인증요청"}
                                </Button>
                            </div>
                            {showVerificationInput && !phoneVerified && (
                                <div className="flex gap-2 mt-2">
                                    <Input
                                        placeholder="인증번호 6자리"
                                        value={verificationCode}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                    />
                                    <Button onClick={handleVerifyCode}>확인</Button>
                                </div>
                            )}
                        </div>

                        {/* Address */}
                        <div className="grid gap-2">
                            <Label>주소</Label>
                            <div className="flex gap-2">
                                <Input placeholder="우편번호" readOnly className="w-24" />
                                <Button variant="outline" onClick={handleAddressSearch}>
                                    <Search className="h-4 w-4 mr-2" />
                                    주소 검색
                                </Button>
                            </div>
                            <Input placeholder="기본 주소" readOnly />
                            <Input placeholder="상세 주소 입력" />
                        </div>

                        {/* Terms */}
                        <div className="space-y-4 pt-4 border-t">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="terms-all" />
                                <label htmlFor="terms-all" className="text-sm font-bold">
                                    전체 동의
                                </label>
                            </div>
                            <div className="space-y-2 pl-6">
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms-service" />
                                    <label htmlFor="terms-service" className="text-sm text-gray-500">
                                        [필수] 이용약관 동의
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms-privacy" />
                                    <label htmlFor="terms-privacy" className="text-sm text-gray-500">
                                        [필수] 개인정보 수집 및 이용 동의
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="terms-marketing" />
                                    <label htmlFor="terms-marketing" className="text-sm text-gray-500">
                                        [선택] 마케팅 정보 수신 동의
                                    </label>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-black hover:bg-gray-800 text-white h-12 text-lg">
                            가입하기
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

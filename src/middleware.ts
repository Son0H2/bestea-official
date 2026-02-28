import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          response.cookies.set({ name, value: '', ...options })
        },
      },
    }
  )

  // 인증된 사용자 정보 확인
  const { data: { user } } = await supabase.auth.getUser()

  // 관리자 페이지는 인증 필요
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      // 로그인 페이지로 리다이렉트 (현재 페이지로 돌아올 수 있도록)
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(loginUrl)
    }

    // 관리자 권한 확인: profiles 테이블의 role 필드 확인
    // - 정책(RLS) 상, 사용자는 본인 프로필(select)만 가능해야 함
    // - role 이 'admin' 이 아니면 403 반환
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    // 프로필 조회 실패(정책 미적용/데이터 없음 등)도 접근 차단(보수적)
    if (profileError || profile?.role !== 'admin') {
      return new NextResponse('Forbidden', { status: 403 })
    }
  }

  // 인증된 사용자가 로그인/회원가입 페이지 접근 시 홈으로
  if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

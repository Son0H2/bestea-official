import { supabase } from './client'

export interface UserProfile {
    id: string
    email: string
    full_name: string | null
    phone: string | null
    role: 'customer' | 'admin'
}

/**
 * 현재 로그인한 사용자 정보 조회
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) return null

    const { data: profile } = await (supabase as any)
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    if (!profile) return null

    return {
        id: user.id,
        email: user.email || '',
        full_name: (profile as any).full_name,
        phone: (profile as any).phone,
        role: (profile as any).role as 'customer' | 'admin'
    }
}

/**
 * 관리자인지 확인
 */
export async function isAdmin(): Promise<boolean> {
    const user = await getCurrentUser()
    return user?.role === 'admin'
}

/**
 * 관리자 페이지 접근 체크 (사용 예시)
 * 
 * export default async function AdminPage() {
 *   const admin = await isAdmin()
 *   if (!admin) {
 *     redirect('/login')
 *   }
 *   // ... 관리자 페이지 내용
 * }
 */

# 🛡️ 관리자 (사장님) 계정 설정 가이드

## 📋 개요

Bestea 에서는 **2 가지 역할**이 있습니다:

| 역할 | 권한 | 기본값 |
|------|------|--------|
| **customer** (고객) | 상품 조회, 장바구니, 주문 | 회원가입 시 자동 |
| **admin** (사장님) | 상품 관리, 주문 관리, 통계 | 수동 설정 필요 |

---

## 🎯 첫 관리자 계정 만들기

### 방법 1: Supabase 에서 직접 설정 (추천)

1. **일반 회원가입**
   - http://localhost:3000/signup
   - 이메일/비밀번호로 가입

2. **Supabase 대시보드 접속**
   - https://app.supabase.com/project/stvdzqmlvapnmoodxowt/auth/users

3. **방금 만든 사용자 찾기**
   - 이메일로 검색

4. **SQL Editor 에서 역할 변경**
   ```sql
   -- 이메일을 실제 관리자 이메일로 변경
   UPDATE public.profiles 
   SET role = 'admin' 
   WHERE email = 'admin@example.com';
   ```

5. **확인**
   ```sql
   SELECT email, role FROM public.profiles;
   ```

---

### 방법 2: SQL 로 직접 사용자 생성

```sql
-- 1. auth.users 에 사용자 추가 (Supabase 가 자동 처리)
-- 2. profiles 테이블에 admin 으로 추가
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- 실제 UUID 로 변경
  'admin@bestea.com',
  '사장님',
  'admin'
);
```

---

## 🔐 관리자 페이지 접근 제어

### 예시: `/admin/page.tsx`

```tsx
import { isAdmin } from '@/lib/supabase/auth'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  const admin = await isAdmin()
  
  if (!admin) {
    redirect('/login')
  }

  return (
    <div>
      <h1>관리자 페이지</h1>
      {/* 관리자 전용 기능 */}
    </div>
  )
}
```

---

## ✅ 체크리스트

- [ ] 일반 회원가입 테스트
- [ ] Supabase 에서 admin 역할 부여
- [ ] 로그인 후 역할 확인
- [ ] 관리자 페이지 접근 제한

---

## 🔗 관련 파일

- `src/lib/supabase/auth.ts` - 역할 확인 유틸리티
- `src/app/login/page.tsx` - 로그인 페이지
- `src/app/signup/page.tsx` - 회원가입 페이지

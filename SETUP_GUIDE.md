# 🚀 Bestea - Supabase + Vercel 설정 가이드

## 📋 개요

이 문서는 **Supabase 데이터베이스 설정**과 **Vercel 배포 연동**을 위한 단계별 가이드입니다.

---

## 1️⃣ Supabase 프로젝트 생성

### 단계

1. **[supabase.com](https://supabase.com)** 접속
2. **Sign In** → **GitHub** 선택 (Son0H2 계정)
3. **New Project** 클릭
4. 프로젝트 설정:
   - **Name:** `bestea`
   - **Region:** `Singapore (ap-southeast-1)` ← 한국에서 가장 빠름
   - **Database Password:** 자동 생성됨 (꼭 저장!)
5. **Create Project** 클릭 (2-3 분 소요)

### 완료 후 확인

프로젝트 대시보드에서 다음 2 개 복사:

```
Project URL: https://[project-id].supabase.co
anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 2️⃣ 데이터베이스 스키마 적용

### SQL 실행

1. Supabase 대시보드 → **SQL Editor** (좌측 메뉴)
2. **New Query** 클릭
3. 아래 파일 내용 전체 복사/붙여넣기:
   ```
   /supabase/001-initial-schema.sql
   ```
4. **Run** 클릭

### 확인

- `products` 테이블에 상품 3 개 추가됨
- `profiles`, `cart_items`, `orders`, `quote_requests` 테이블 생성됨
- RLS (Row Level Security) 정책 적용됨

---

## 3️⃣ 로컬 개발 환경 설정

### .env.local 파일 생성

프로젝트 루트에서:

```bash
cp .env.local.example .env.local
```

### 값 채우기

`.env.local` 파일 편집:

```env
NEXT_PUBLIC_SUPABASE_URL=https://[your-project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... [전체 붙여넣기]
OPENAI_API_KEY=sk-... [선택사항]
```

### 로컬 실행 테스트

```bash
npm install
npm run dev
```

http://localhost:3000 접속

---

## 4️⃣ Vercel 배포 설정

### Vercel 연결

1. **[vercel.com](https://vercel.com)** 접속 (GitHub 로그인)
2. **Add New Project**
3. GitHub 저장소 선택: `Son0H2/bestea-official`
4. **Import** 클릭

### 환경변수 설정

Vercel 프로젝트 설정 → **Environment Variables**:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon 키 |
| `OPENAI_API_KEY` | OpenAI 키 (선택) |

### 도메인 연결

Vercel 프로젝트 설정 → **Domains**:

- 기존 도메인 추가 (이미 구매 완료)
- DNS 설정 확인 (A 레코드/CNAME)

### 배포

```bash
# 로컬에서 Vercel CLI 사용 시
vercel --prod
```

또는 GitHub push 시 자동 배포

---

## 5️⃣ 관리자 계정 생성

### 첫 관리자 수동 등록

Supabase 대시보드 → **Authentication** → **Users** → **Add User**:

- **Email:** 관리자 이메일
- **Password:** 임시 비밀번호
- **Email Confirm:** 체크

### 관리자 권한 부여

SQL Editor 에서 실행:

```sql
-- 이메일을 실제 관리자 이메일로 변경
UPDATE public.profiles 
SET role = 'admin' 
WHERE email = 'admin@example.com';
```

---

## ✅ 체크리스트

- [ ] Supabase 프로젝트 생성
- [ ] SQL 스키마 적용 완료
- [ ] .env.local 파일 생성 및 값 입력
- [ ] 로컬에서 `npm run dev` 성공
- [ ] Vercel 에 환경변수 설정
- [ ] 도메인 연결 확인
- [ ] 관리자 계정 생성

---

## 🔗 참고 링크

- [Supabase Docs](https://supabase.com/docs)
- [Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)

---

## 🆘 문제 발생 시

1. **401 에러:** Supabase 키 확인
2. **403 에러:** RLS 정책 확인
3. **연결 안 됨:** `.env.local` 파일 존재 여부 확인
4. **Vercel 배포 실패:** 환경변수 재설정

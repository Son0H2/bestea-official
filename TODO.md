# Bestea 프로젝트 TODO

**작성일:** 2026-02-25  
**기준:** PROJECT_SUMMARY.md (형님 제공 스펙)

---

## ✅ 완료 (Completed)

### 인프라/공통
- [x] Next.js 16 + React 19 + TypeScript 세팅
- [x] Shadcn/ui 환경 구성
- [x] Vercel 배포 + Custom Domain 연결
- [x] Sitemap/robots.txt 설정
- [x] Supabase 프로젝트 생성
- [x] DB 스키마 생성 (profiles, products, cart, orders, quotes)
- [x] 환경변수 설정 (.env.local)

### 인증 (Auth)
- [x] 로그인 페이지 Supabase Auth 연동
- [x] 회원가입 페이지 (이메일 인증)
- [x] 역할 관리 (customer/admin)
- [x] Daum 우편번호 연동 (UI)
- [x] 생년월일 DatePicker (UI)

### 스토어 (Storefront)
- [x] 홈 페이지 (Hero 배너, 리폼 섹션)
- [x] 상품 목록 페이지 (Supabase 연동 완료)
- [x] 상품 상세 페이지 (UI + AR Viewer)
- [x] 장바구니/결제 폼 UI
- [x] 리뷰/QnA 다이얼로그 UI

### 관리자 (Admin Partners)
- [x] 관리자 레이아웃 (모바일/PC 대응)
- [x] 대시보드 (Key Metrics, To-Do, Chart)
- [x] 견적 관리 (리스트/상세, AI 분석, 카톡전송)
- [x] 상품 관리 (그리드/등록)
- [x] 고객 관리 (한글검색)
- [x] 주문 관리 (기간검색, DatePicker)
- [x] 배송 관리 (달력 뷰)
- [x] AI 마케팅/자동답장 UI

---

## 🚀 현재 진행 중 (In Progress)

### Phase 1: 핵심 플로우 완성 (이번 주)

| 우선순위 | 기능 | 상태 | 비고 |
|---------|------|------|------|
| P0 | 상품 상세 Supabase 연동 | ⏳ | 데이터 연동만 |
| P0 | 장바구니 (담기/조회/삭제) | ⏳ | Supabase 연동 |
| P0 | 주문생성 (주문/결제) | ⏳ | Supabase 연동 |
| P1 | 주문내역 (마이페이지) | ⏳ | Supabase 연동 |
| P1 | 관리자 상품등록 | ⏳ | Supabase 연동 |

---

## 📋 다음 단계 (Pending)

### Phase 2: 결제/본인인증 (다음 주)

| 우선순위 | 기능 | 상태 | 비고 |
|---------|------|------|------|
| P0 | 휴대폰 본인인증 (2FA SMS) | ❌ | Provider 선정필요 |
| P0 | 토스페이먼츠 연동 | ❌ | PG 사 연동 |
| P1 | 주문상세 보기 | ❌ | |

### Phase 3: 마이페이지 완성

| 우선순위 | 기능 | 상태 | 비고 |
|---------|------|------|------|
| P0 | 주문내역 상세 | ❌ | |
| P0 | 클레임 (취소/교환/반품) | ❌ | |
| P1 | 위시리스트 | ❌ | |
| P1 | 내 리뷰/QnA | ❌ | |

### Phase 4: AI 기능 (고도화)

| 우선순위 | 기능 | 상태 | 비고 |
|---------|------|------|------|
| P0 | AI 견적 (OpenAI Vision) | ❌ | |
| P0 | AI 블로그 포스팅 | ❌ | 마케팅 |
| P1 | AI 자동답장 (리뷰/QnA) | ❌ | 소통 |

### Phase 5: 관리자 고도화

| 우선순위 | 기능 | 상태 | 비고 |
|---------|------|------|------|
| P0 | 실수익 정산 | ❌ | 매출 - 비용 |
| P0 | 달력 기반 일정관리 | ❌ | 수거/배송 |
| P1 | 고객 관리 (단골) | ❌ | |

---

## 📊 진행률

```
전체: ████████░░░░░░░░ 40%
Phase 1: ████████████░░ 60%
Phase 2-5: ████░░░░░░░░ 20%
```

---

## 🔥 이번 주 목표 (Phase 1)

```
✅ 로그인/회원가입 (완료)
✅ 상품 목록 Supabase 연동 (완료)
⏳ 상품 상세 Supabase 연동
⏳ 장바구니 Supabase 연동
⏳ 주문/결제 Supabase 연동
⏳ 주문내역 Supabase 연동

총 예상: 12 시간
```

---

_Last updated: 2026-02-25_

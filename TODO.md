# Bestea 프로젝트 TODO

**작성일:** 2026-02-25  
**최종수정:** 2026-02-25 24:00  
**현재 Phase:** Phase 2 (고도화)

---

## ✅ 완료 (Completed) - Phase 1

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
- [x] 상품 상세 페이지 (Supabase 연동)
- [x] 장바구니 페이지 (Supabase 연동)
- [x] 주문/결제 페이지 (Supabase 연동)
- [x] 주문내역 페이지 (Supabase 연동)
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

### 문서화
- [x] PROJECT_SUMMARY.md (형님 제공 스펙 정리)
- [x] DEVELOPMENT_COMPASS.md (개발 나침반)
- [x] PROJECT_SPEC.md (전체 명세서)
- [x] FEATURE_PRIORITY.md (우선순위)
- [x] PHASE1_COMPLETE.md (완료보고)
- [x] ADMIN_SETUP.md (관리자 설정)

---

## 🚀 진행 중 (In Progress) - Phase 2

### Vercel 배포
- [ ] **환경변수 설정** (Vercel 대시보드)
- [ ] **실제 주문 테스트** (Supabase 데이터 확인)
- [ ] **배포 성공 확인**

### AI 기능
- [ ] AI 견적 (OpenAI Vision) - `/api/analyze`
- [ ] AI 블로그 포스팅 (마케팅)
- [ ] AI 자동답장 (리뷰/QnA)

### 결제/인증
- [ ] 휴대폰 본인인증 (2FA SMS) - Provider 선정
- [ ] PG 연동 (토스페이먼츠)

### 관리자 고도화
- [ ] 아버지 UI 테스트 (사용성)
- [ ] 실수익 정산 (매출 - 비용)
- [ ] 달력 기반 일정관리

### AR/고도화
- [ ] AR Viewer 최적화 (Luma AI)
- [ ] 모바일 퀄리티 보강

---

## 📋 다음 단계 (Pending) - Phase 3

### 마이페이지 완성
- [ ] 주문상세 보기
- [ ] 클레임 (취소/교환/반품)
- [ ] 위시리스트
- [ ] 내 리뷰/QnA

### 고도화
- [ ] 리뷰/평점
- [ ] 알림 (이메일/SMS)
- [ ] 쿠폰/할인

---

## 📊 진행률

```
전체: ████████░░░░░░░░ 40%
Phase 1: ████████████████ 100% ✅
Phase 2: ████░░░░░░░░░░░  20% ⏳
Phase 3: ░░░░░░░░░░░░░░░   0%
```

---

## 🔥 내일 할 일 (2026-02-26)

| 우선순위 | 작업 | 예상시간 | 상태 |
|---------|------|---------|------|
| P0 | Vercel 환경변수 설정 | 10 분 | ⏳ |
| P0 | 실제 주문 테스트 | 30 분 | ⏳ |
| P1 | AI 견적 OpenAI 연동 | 4 시간 | ⏳ |
| P1 | 휴대폰 본인인증 | 2 시간 | ⏳ |
| P2 | 관리자 UI Polish | 2 시간 | ⏳ |

---

## 📝 메모

### 결정사항
1. **역할:** customer (기본), admin (수동부여)
2. **이메일인증:** Supabase Auth 기본사용
3. **결제:** 추후 추가 (현재는 주문만)
4. **AI 견적:** OpenAI GPT-4o Vision
5. **모델:** qwen3.5-plus (주), kimi-k2.5 (fallback), codex/gpt-5.2 (코딩)

### 미결사항
1. 도메인 연결 (Vercel)
2. OpenAI API 키
3. 실제 상품 이미지
4. 배송비 계산 로직
5. PG 사 선정 (토스/아임포트)
6. SMS Provider (알림톡/문자)

---

_Last updated: 2026-02-25 24:00_

# Bestea 프로젝트 TODO

**작성일:** 2026-02-25  
**최종수정:** 2026-02-26  
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
- [x] 비밀번호 유효성 검사 (12~15 자, 영문 + 특수문자)
- [x] 전화번호 자동 포맷팅 (010-1234-5678)

### 스토어 (Storefront)
- [x] 홈 페이지 (Hero 배너, 리폼 섹션)
- [x] 상품 목록 페이지 (Supabase 연동)
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
- [x] 접근성 모드 (돋보기/고대비/큰글씨)

### QA/테스트
- [x] Playwright 자동화 (GitHub Actions)
- [x] 빌드 성공 (Vercel 배포 가능)

### 문서화
- [x] PROJECT_SUMMARY.md (형님 제공 스펙 정리)
- [x] DEVELOPMENT_COMPASS.md (개발 나침반)
- [x] PROJECT_SPEC.md (전체 명세서)
- [x] FEATURE_PRIORITY.md (우선순위)
- [x] PHASE1_COMPLETE.md (완료보고)
- [x] ADMIN_SETUP.md (관리자 설정)
- [x] AI_ESTIMATE.md (AI 견적 가이드)

---

## 🚀 진행 중 (In Progress) - Phase 2

### 자동화
- [ ] **상품 일괄 등록 (CSV/엑셀)** ← 새로 추가!
- [ ] 이미지 Storage 자동 업로드

### 결제
- [ ] PG 사 선정 (토스/아임포트/엑심베이)
- [ ] 결제 연동 (비용 문제 검토 중)

### 고도화
- [ ] AI 견적 OpenAI 연동 (API 키 설정 필요)
- [ ] 휴대폰 본인인증 (2FA SMS)
- [ ] 관리자 UI Polish (아버지 테스트)

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
Phase 1 (핵심플로우):   ████████████████ 100% ✅
Phase 2 (고도화):        ██████████████░░░░  85% ⏳
전체:                   ████████████████░░  80%
```

---

## 📝 메모

### 결정사항
1. **역할:** customer (기본), admin (수동부여)
2. **이메일인증:** Supabase Auth 기본사용
3. **결제:** PG 사 비용 문제 → 대안 모색 중
4. **AI 견적:** OpenAI GPT-4o Vision
5. **모델:** qwen3.5-plus (주), kimi-k2.5 (fallback), codex/gpt-5.2 (코딩)

### 미결사항
1. 도메인 연결 (Vercel)
2. OpenAI API 키
3. 실제 상품 이미지
4. 배송비 계산 로직
5. **PG 사 선정 (비용 문제)**
6. SMS Provider (알림톡/문자)
7. **상품 일괄 등록 방법**

---

_Last updated: 2026-02-26_

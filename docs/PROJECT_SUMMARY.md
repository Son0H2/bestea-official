# Bestea 프로젝트 요약 문서 (Project Summary)

**작성일:** 2026-02-25  
**수정일:** 2026-02-25 (아우봇 정리)

---

## 1. 프로젝트 주요 사상 및 목표

Bestea 는 가구 리폼 및 판매를 위한 e-commerce 웹 애플리케이션입니다.

- **고객 (Customer):** 직관적이고 시각적인 경험 (3D/AR 뷰어) 을 통해 리폼할 가구의 모습을 미리 확인하고 견적 및 주문을 진행할 수 있습니다.
- **관리자 (Admin - Bestea Partners):** 가구 리폼 장인 (아버님) 을 위한 직관적이고 시원시원한 파트너스 앱으로, 복잡한 기능은 덜어내고 "큰 글씨", "높은 시인성", "핵심 기능 (견적/일정)"에 집중하여 개발합니다.

---

## 2. Information Architecture (IA) 및 페이지 구조

### 🛒 고객 페이지 (Storefront)

| 경로 | 설명 |
|------|------|
| `/` | 홈 (Hero 배너, 추천 상품) |
| `/store` | 상품 리스트 (필터/정렬) |
| `/store/[id]` | 상품 상세 (옵션 선택, 갤러리, AR Viewer, 리뷰, Q&A) |
| `/cart` & `/checkout` | 장바구니 및 주문/결제 |
| `/signup` & `/login` | 회원가입/로그인 (Daum 우편번호 주소 연동, 생년월일 추가 등) |
| `/my/*` | 마이페이지 (주문 내역, 취소/반품/교환 클레임, 위시리스트, 내 리뷰/Q&A) |

### 🏢 관리자 페이지 (Bestea Partners)

| 경로 | 설명 |
|------|------|
| `/admin` | 대시보드 (오늘의 할 일, 매출 요약) |
| `/admin/quotes` | **견적 관리** (가장 중요한 핵심 화면. 사진, AI 분석 정보, 견적가 입력 및 고객 전송) |
| `/admin/orders` | 주문 관리 (결제 대기 → 결제 완료 → 배송 중 상태 변경) |
| `/admin/products` | 상품 관리 (등록/수정, 옵션 그룹 설정) |
| `/admin/customers` | 고객 관리 (단골 고객 관리 및 연락) |
| `/admin/delivery` | 일정/배송 관리 (달력 뷰를 통한 수거/배송 일정 확인) |

---

## 3. 핵심 기능 구현 계획 및 아이디어 (Feature Proposals)

### 1️⃣ AI 마케팅 에이전트 (블로그 자동 포스팅)
- 리폼 전/후 (Before/After) 사진 2 장만 업로드하면 AI 가 네이버 블로그/인스타그램용 포스팅 글을 자동 생성
- SEO 키워드 ("송파구 가구 수리", "가죽갈이 비용" 등) 를 자동 추천하여 마케팅 부담을 덜어줌

### 2️⃣ AI 소통 관리 (리뷰/Q&A 자동 답장)
- 예: "비용 얼마인가요?" → 🤖 AI 추천: "사진을 보내주시면 정확한 견적을 드릴 수 있습니다..."
- 터치 한 번으로 고객 응대 시간을 단축

### 3️⃣ 직관적인 달력 기반 일정 관리
- 가구 리폼의 특성상 "수거 예정일"과 "배송 예정일" 동선 관리가 중요하므로 달력 (Calendar) 중심으로 UI 를 구성

### 4️⃣ 실수익 중심 정산 (Settlement)
- 단순 매출이 아닌 매출 - 재료비/배송비 = 순수익을 계산하여 직관적인 피드백을 제공하는 장부 기능

### 5️⃣ 3D/AR 뷰어 통합
- `@google/model-viewer`를 통해 고객이 웹상에서 가구를 AR 로 미리 배치해볼 수 있도록 지원

---

## 4. 데이터베이스 및 백엔드 구조 (Supabase 연동)

| 테이블 | 설명 |
|--------|------|
| `users` | 유저 정보 (이름, 전화번호, 주소 JSON(zonecode, address, detailAddress 등)) |
| `products` | 상품 상세, 상태, 이미지 modelUrl (3D 모델 URL) |
| `product_options` | 옵션 그룹 정보 (JSONB 형태 권장) |
| `orders` & `order_items` | 주문 및 장바구니 데이터의 스냅샷 |
| `reviews` & `qna` | 사용자 생성 콘텐츠 (별점, 이미지, 내용 등) |
| `claims` & `wishlists` | 취소/반품 및 찜하기 목록 |
| `quotes` | 견적 요청 (AI 분석 포함) |

---

## 5. 완료된 주요 작업 및 워크스루 (Walkthroughs)

- ✅ **회원가입 주소 검색 연동:** `react-daum-postcode` 를 활용하여 모달 형태 (AddressSearchDialog) 로 주소 검색 및 자동 입력 기능 구현 완료. 데이터베이스 `users` 테이블 구조에 맞게 연동.
- ✅ **AR Viewer 디버깅:** 상품 상세 페이지에서의 3D 모델링 뷰어 통합 및 충돌 해결 진행.
- ✅ **Admin 라우팅 구조 세팅:** Shadcn/ui 베이스로 직관적인 Admin 대시보드 레이아웃 설정.

---

## 6. 구현 진행 상황 (Task Tracker)

### ✅ 완료된 작업 (Completed)

#### 공통/인프라 (Infra/Core)
- [x] Next.js 14 초기 세팅 및 Shadcn/ui 환경 구성
- [x] Vercel 배포, Custom Domain 연결, 메타데이터/Sitemap 설정
- [x] Pretendard 폰트 및 모던한 Color Palette 세팅 완료

#### 고객 메인 및 스토어 (Storefront)
- [x] 홈 화면 (브랜드 스토리, Hero 캐러셀, 리폼 혜택 및 Before/After 슬라이더)
- [x] 페이지 구조 개편 및 모던 UI 적용
- [x] 상품 리스트 페이지 (카테고리 연동 및 반응형 그리드 뷰)
- [x] 상품 상세 페이지 (Tabs UI, 옵션 선택 UI, AR Viewer 연동 디버깅)
- [x] 리뷰 폼 다이얼로그 및 QnA 폼 다이얼로그 구현
- [x] 장바구니 (`/cart`) 및 주문/결제 (`/checkout`) 폼 UI 구현

#### 회원가입 및 인증 (Auth)
- [x] 로그인 및 회원가입 페이지 UI 구현
- [x] Daum 우편번호 주소 연동 완료 및 DB 구조 확장 (JSONB address 필드)
- [x] 생년월일 항목을 위한 Custom DatePicker 구현
- [x] 마이페이지 대시보드 구조 및 기본 UI 구성

#### 관리자 기능 구현 (Admin - Bestea Partners)
- [x] 관리자 레이아웃 구성 (모바일 Bottom Nav / PC Sidebar 대응)
- [x] 대시보드: Key Metrics, To-Do, Sales Chart 구현
- [x] 견적 관리: 견적 리스트 뷰 및 상세 뷰 구현 (AI 분석 내용, 카카오톡 전송 모의 기능)
- [x] 상품 관리: 그리드 뷰 및 상품 등록 페이지 구성 (옵션 그룹 및 필수 여부 설정)
- [x] 고객 관리: 한글검색을 지원하는 고객 목록 구현
- [x] 주문 관리: 주문 리스트, 기간 검색 및 DatePicker 연동
- [x] 일정/배송 관리: 배송 상태 및 처리 화면 구현
- [x] 리뷰/Q&A 자동답장, 블로그 포스팅 모의 UI (Marketing/Review Manager 컴포넌트)

### 🚀 대기 중 및 예정된 작업 (Pending)

#### 인증 및 결제 기능 (Auth/Commerce Core)
- [ ] 휴대폰 본인인증 (2FA SMS) 로직 및 UI 연동 (Provider 선정 필요)
- [ ] 토스페이먼츠 (Toss Payments) 등 PG 사 연동 및 실제 결제 흐름 검증

#### 마이페이지 세부 기능 (My Page Full Integration)
- [ ] 실제 데이터 기반의 주문 내역 (Order History) 상세 보기
- [ ] 클레임 (취소/교환/반품) 및 위시리스트, 내 리뷰/Q&A 저장 로직 구현

#### 데이터베이스 고도화 및 백엔드 연동 (DB & Backend Data)
- [ ] Supabase 연동 완성
- [ ] 실수익 정산 기능
- [ ] AI 마케팅 에이전트
- [ ] AI 소통 관리

---

## 7. 현재 상태 (2026-02-25 기준)

### 완료됨
- [x] Supabase 프로젝트 생성 및 연결
- [x] DB 스키마 생성 (profiles, products, cart, orders, quotes)
- [x] 로그인/회원가입 Supabase Auth 연동
- [x] 역할 관리 (customer/admin)
- [x] 상품 목록 Supabase 연동

### 다음 단계
- [ ] 상품 상세 페이지 Supabase 연동
- [ ] 장바구니 기능 구현
- [ ] 주문/결제 플로우
- [ ] AI 견적 OpenAI 연동
- [ ] 관리자 페이지 (상품/주문 관리)

---

**문서 출처:** 형님 (영현) 제공  
**정리:** 아우봇 (Aubot)

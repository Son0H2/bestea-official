# 🔍 SEO 가이드 - 베스티아 (Bestea)

이 문서는 베스티아 웹사이트의 검색엔진 최적화 (SEO) 설정 및 관리 가이드입니다.

---

## ✅ 완료된 항목

### 1. 메타태그 최적화
- ✅ `layout.tsx` - 전체 사이트 공통 메타태그
- ✅ 페이지별 개별 메타태그
- ✅ 한국어 키워드 최적화
- ✅ Open Graph 태그 (소셜 미디어 공유)
- ✅ Twitter Card 태그

### 2. Structured Data (JSON-LD)
- ✅ `OrganizationStructuredData` - 회사 정보
- ✅ `ProductStructuredData` - 상품 정보
- ✅ `ServiceStructuredData` - 리폼 서비스
- ✅ `FAQStructuredData` - 자주 묻는 질문
- ✅ `BreadcrumbStructuredData` - 탐색 경로

### 3. 사이트맵
- ✅ 동적 사이트맵 생성 (`sitemap.ts`)
- ✅ 정적 페이지 + 상품 상세페이지 자동 포함
- ✅ robots.txt 에 사이트맵 등록

### 4. Robots.txt
- ✅ 검색엔진 크롤러 규칙 설정
- ✅ 관리자 페이지 크롤링 차단
- ✅ Googlebot, NaverBot 별도 규칙

### 5. 성능 최적화
- ✅ Next.js 16.1.6 (최신 버전)
- ✅ 이미지 최적화 (`next/image`)
- ✅ 폰트 `display: swap` 적용

---

## 📋 남은 작업 (체크리스트)

### 1. 검색엔진 등록
- [ ] **Google Search Console** 등록
  - https://search.google.com/search-console
  - `public/verification.html` 의 검증 코드 복사
  - `layout.tsx` 의 `verification.google` 에 붙여넣기

- [ ] **Naver Search Advisor** 등록
  - https://searchadvisor.naver.com/
  - 사이트 소유권 검증
  - `layout.tsx` 의 `verification.naver` 에 검증 코드 입력

- [ ] **Bing Webmaster Tools** 등록
  - https://www.bing.com/webmasters
  - Microsoft 계정으로 로그인
  - 사이트 추가 및 검증

### 2. OG 이미지 생성
- [ ] `public/og-image.jpg` 생성 (1200x630px)
  - 베스티아 로고 + 대표 상품 이미지
  - 소셜 미디어 공유 시 노출될 이미지

### 3. PWA 아이콘 생성
- [ ] `public/icon-192x192.png` (192x192px)
- [ ] `public/icon-512x512.png` (512x512px)
- [ ] `public/favicon.ico`
- [ ] `public/favicon-16x16.png`
- [ ] `public/apple-touch-icon.png`

### 4. Google Analytics 설정
- [ ] Google Analytics 4 계정 생성
- [ ] 측정 ID 발급 (G-XXXXXXXXXX)
- [ ] `layout.tsx` 에 GA 스크립트 추가:

```tsx
// layout.tsx head 에 추가
<script
  async
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
/>
<script
  dangerouslySetInnerHTML={{
    __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
    `,
  }}
/>
```

### 5. 로컬 SEO (네이버 지도, Google My Business)
- [ ] **네이버 비즈니스 플레이스** 등록
  - https://m.place.naver.com/
  - 상호명: 베스티아
  - 주소: 경기도 광주시 XXXX
  - 전화번호: 1588-0000
  - 영업시간: 평일 09:00-18:00

- [ ] **Google My Business** 등록
  - https://www.google.com/business/
  - 동일한 정보로 등록

### 6. 콘텐츠 최적화
- [ ] **블로그 운영** (네이버 블로그, 브런치)
  - 주 2-3 회 가구 관리 팁, 리폼 사례 포스팅
  - 웹사이트 링크 포함

- [ ] **상품 설명 강화**
  - 각 상품별 300 자 이상 상세 설명
  - 키워드 자연스럽게 포함 (이태리가구, 프리미엄소파 등)

- [ ] **FAQ 페이지 제작**
  - `FAQStructuredData` 활용
  - 고객 문의 많은 질문 정리

---

## 🔧 기술적 SEO 체크리스트

### 매월 점검
- [ ] 사이트맵 정상 제출 확인
- [ ] 크롤링 에러 확인 (Search Console)
- [ ] 페이지 속도 측정 (PageSpeed Insights)
- [ ] 모바일 사용성 확인
- [ ] 데드 링크 확인

### 분기별 점검
- [ ] 키워드 순위 확인
- [ ] 백링크 분석
- [ ] 경쟁사 분석
- [ ] 콘텐츠 업데이트

---

## 📊 주요 지표

### 목표 (3 개월 후)
- Google 검색 노출: 1 페이지 (상위 10 위) 5 개 키워드
- Naver 검색 노출: 1 페이지 3 개 키워드
- 유기적 트래픽: 월 1,000 방문
- 전환율: 3% 이상

### 모니터링 도구
- **Google Analytics 4**: 트래픽, 전환
- **Google Search Console**: 검색 노출, 클릭
- **Naver Search Advisor**: Naver 검색 통계
- **PageSpeed Insights**: 페이지 속도
- **Hotjar**: 사용자 행동 분석

---

## 🚀 빠른 시작

1. **검색엔진 등록** (우선순위: 상)
```bash
# 1. Google Search Console 접속
# 2. 사이트맵 제출: https://bestea-official.com/sitemap.xml
# 3. Naver Search Advisor 도 동일하게
```

2. **OG 이미지 생성** (우선순위: 상)
```bash
# Canva 등 도구 사용
# 크기: 1200x630px
# 저장: public/og-image.jpg
```

3. **Google Analytics 설정**
```bash
# .env.local 에 추가
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

---

## 📞 문의

SEO 관련 문의사항은 개발팀으로 연락주세요.

---

**마지막 업데이트:** 2026-02-28  
**작성자:** Aubot 🐾

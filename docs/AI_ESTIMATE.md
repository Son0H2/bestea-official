# AI 견적 기능 가이드 (AI Estimate)

**작성일:** 2026-02-26  
**API:** `/api/analyze`  
**모델:** OpenAI GPT-4o Vision

---

## 📋 개요

가구 리폼 서비스의 **AI 간편 견적** 기능입니다.

- **입력:** 가구 사진 + 서비스 유형 + 설명
- **출력:** AI 분석 견적서 (JSON)
- **사용 모델:** OpenAI GPT-4o Vision

---

## 🔑 환경변수 설정

### 로컬 개발

`.env.local` 파일에 추가:

```env
OPENAI_API_KEY=sk-...
```

### Vercel 배포

Vercel 대시보드 → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `OPENAI_API_KEY` | `sk-...` |

**OpenAI API 키 발급:** https://platform.openai.com/api-keys

---

## 📡 API 스펙

### POST `/api/analyze`

**요청:**
```json
{
  "image": "data:image/jpeg;base64,/9j/4AAQ...",
  "serviceTypes": ["repair", "recolor"],
  "description": "가죽 소파인데 찢어졌어요"
}
```

**응답 (성공):**
```json
{
  "type": "3 인용 가죽 소파",
  "damage": "가죽 표면 찢어짐 및 마모",
  "minPrice": 300000,
  "maxPrice": 600000,
  "reasoning": "3 인용 가죽 소파의 찢어짐과 마모가 확인됩니다. 천갈이 작업이 필요하며..."
}
```

**응답 (에러):**
```json
{
  "error": "Image is required"
}
```

---

## 🔧 프론트엔드 연동 예시

```typescript
async function getAIEstimate(imageBase64: string, services: string[], description: string) {
    const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            image: imageBase64,
            serviceTypes: services,
            description
        })
    })
    
    if (!response.ok) {
        throw new Error('AI 견적 실패')
    }
    
    return await response.json()
}
```

---

## 🎯 서비스 유형

| ID | 한국어 설명 |
|----|-----------|
| `repair` | 수리/복원 |
| `recolor` | 염색/도장 |
| `upholstery` | 천갈이 |

---

## 💰 가격 가이드 (KRW)

| 작업 | 가격 범위 |
|------|---------|
| 의자 천갈이 | 100,000 - 300,000 |
| 소파 천갈이 (1 인용당) | 150,000 - 300,000 |
| 테이블 리페어링 | 200,000 - 500,000 |
| 간단한 수리 | 50,000 - 150,000 |

---

## ⚠️ 에러 핸들링

### OpenAI API 키 없음
- Mock 데이터 반환 (개발용)
- 콘솔에 경고 로그

### 이미지 없음
- `400 Bad Request`
- `{ error: "Image is required" }`

### AI 분석 실패
- `500 Internal Server Error`
- `{ error: "Failed to analyze image" }`

---

## 🧪 테스트

### cURL
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQ...",
    "serviceTypes": ["repair"],
    "description": "테스트"
  }'
```

### JavaScript
```typescript
const result = await getAIEstimate(
    'data:image/jpeg;base64,...',
    ['repair'],
    '테스트 설명'
)
console.log(result)
```

---

## 📝 메모

- **Mock 모드:** API 키 없으면 Mock 데이터 반환 (개발용)
- **실제 사용:** OpenAI API 키 설정 필수
- **비용:** GPT-4o Vision 은 유료 (토큰당 과금)
- **응답시간:** 보통 2-5 초

---

**끝**

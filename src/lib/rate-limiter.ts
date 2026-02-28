/**
 * 🔒 Rate Limiter 설정
 * 
 * API 남용 방지를 위한 요청 제한
 * - 일반 사용자: 분당 100 요청
 * - AI 분석 API: 분당 10 요청 (비용 보호)
 */

import { RateLimiterMemory, RateLimiterRes } from 'rate-limiter-flexible'
import { logger } from './logger'

// 일반 API 용 Rate Limiter (분당 100 요청)
export const apiLimiter = new RateLimiterMemory({
  points: 100,
  duration: 60, // 1 분
  blockDuration: 60, // 1 분 차단
})

// AI 분석 API 용 Rate Limiter (분당 10 요청 - 비용 보호)
export const aiAnalysisLimiter = new RateLimiterMemory({
  points: 10,
  duration: 60, // 1 분
  blockDuration: 300, // 5 분 차단
})

// Rate Limit 미들웨어 (Next.js API 라우트용)
export async function checkRateLimit(
  identifier: string,
  limiter: RateLimiterMemory,
  apiName: string
): Promise<{ success: boolean; error?: string; retryAfter?: number }> {
  try {
    await limiter.consume(identifier)
    return { success: true }
  } catch (rejRes) {
    if (rejRes instanceof RateLimiterRes) {
      const retryAfter = Math.ceil(rejRes.msBeforeNext / 1000)
      
      logger.warn('Rate limit exceeded', {
        identifier: identifier.substring(0, 8) + '...',
        api: apiName,
        retryAfter,
        remainingPoints: rejRes.remainingPoints
      })

      return {
        success: false,
        error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
        retryAfter
      }
    }
    return { success: false, error: '알 수 없는 오류가 발생했습니다.' }
  }
}

// IP 주소 추출 (프록시 환경 고려)
export function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  if (realIP) {
    return realIP
  }
  
  // fallback: 사용자 IP (Next.js 에서는 직접 추출 어려움)
  return 'unknown'
}

/**
 * 🔒 보안 로깅 유틸리티
 * 
 * 프로덕션 환경에서는 민감 정보 (스택 트레이스, API 키 등) 를 숨깁니다.
 * 개발 환경에서는 전체 정보를 출력하여 디버깅을 지원합니다.
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error'

interface LogContext {
  [key: string]: unknown
}

class Logger {
  private isProduction: boolean

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production'
  }

  /**
   * 민감 정보 필터링
   * - 스택 트레이스
   * - API 키, 토큰
   * - 비밀번호
   */
  private sanitizeError(error: unknown): string {
    if (error instanceof Error) {
      if (this.isProduction) {
        // 프로덕션: 메시지 만 출력
        return error.message
      }
      // 개발: 전체 정보 출력
      return error.stack || error.message
    }
    return String(error)
  }

  /**
   * 민감 데이터 필터링 (객체)
   */
  private sanitizeContext(context: LogContext): LogContext {
    if (this.isProduction) {
      const sensitiveKeys = [
        'password', 'passwd', 'pwd',
        'token', 'accessToken', 'refreshToken',
        'apiKey', 'api_key', 'secret',
        'authorization', 'auth',
        'cookie', 'session'
      ]

      const sanitized: LogContext = {}
      for (const [key, value] of Object.entries(context)) {
        const lowerKey = key.toLowerCase()
        if (sensitiveKeys.some(sk => lowerKey.includes(sk))) {
          sanitized[key] = '[REDACTED]'
        } else {
          sanitized[key] = value
        }
      }
      return sanitized
    }
    return context
  }

  private log(level: LogLevel, message: string, context?: LogContext, error?: unknown) {
    const timestamp = new Date().toISOString()
    const sanitizedContext = context ? this.sanitizeContext(context) : {}
    const sanitizedError = error ? this.sanitizeError(error) : null

    const logData = {
      timestamp,
      level,
      message,
      ...sanitizedContext,
      ...(sanitizedError && { error: sanitizedError })
    }

    switch (level) {
      case 'debug':
        console.debug(JSON.stringify(logData))
        break
      case 'info':
        console.info(JSON.stringify(logData))
        break
      case 'warn':
        console.warn(JSON.stringify(logData))
        break
      case 'error':
        console.error(JSON.stringify(logData))
        break
    }
  }

  debug(message: string, context?: LogContext) {
    if (!this.isProduction) {
      this.log('debug', message, context)
    }
  }

  info(message: string, context?: LogContext) {
    this.log('info', message, context)
  }

  warn(message: string, context?: LogContext, error?: unknown) {
    this.log('warn', message, context, error)
  }

  error(message: string, error?: unknown, context?: LogContext) {
    this.log('error', message, context, error)
  }
}

// 싱글톤 인스턴스
export const logger = new Logger()

// 기본 export
export default logger

import { test, expect } from '@playwright/test'

async function login(page: any, email: string, password: string) {
  await page.goto('/login')
  await page.getByLabel('이메일').fill(email)
  await page.getByLabel('비밀번호').fill(password)
  await page.getByRole('button', { name: '로그인' }).click()
  await page.waitForURL('**/')
}

test.describe('Admin 접근 제어 (middleware + profiles.role)', () => {
  test('비로그인 사용자 → /admin 접근 시 로그인 페이지로 리다이렉트', async ({ page }) => {
    const response = await page.goto('/admin')
    // redirect 는 최종 응답이 /login 이 되므로 URL로 검증
    await expect(page).toHaveURL(/\/login(\?|$)/)
    expect(response).not.toBeNull()
  })

  test('일반 사용자 → /admin 접근 시 403', async ({ page }) => {
    const email = process.env.TEST_USER_EMAIL
    const password = process.env.TEST_USER_PASSWORD

    test.skip(!email || !password, 'TEST_USER_EMAIL/TEST_USER_PASSWORD 환경변수가 없어 테스트를 건너뜁니다.')

    await login(page, email!, password!)

    const res = await page.goto('/admin')
    expect(res?.status()).toBe(403)
    await expect(page.locator('body')).toContainText('Forbidden')
  })

  test('관리자 → /admin 접근 허용', async ({ page }) => {
    const email = process.env.TEST_ADMIN_EMAIL
    const password = process.env.TEST_ADMIN_PASSWORD

    test.skip(!email || !password, 'TEST_ADMIN_EMAIL/TEST_ADMIN_PASSWORD 환경변수가 없어 테스트를 건너뜁니다.')

    await login(page, email!, password!)

    const res = await page.goto('/admin')
    expect(res?.ok()).toBeTruthy()
    await expect(page.getByRole('heading', { name: '오늘의 현황' })).toBeVisible()
  })
})

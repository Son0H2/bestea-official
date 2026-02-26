import { test, expect } from '@playwright/test';

test.describe('Bestea - 홈페이지', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
    });

    test('홈페이지 로딩', async ({ page }) => {
        await expect(page).toHaveTitle(/BESTEA/, { timeout: 10000 });
        await expect(page.locator('text=베스티아')).toBeVisible({ timeout: 10000 });
    });

    test('네비게이션 확인', async ({ page }) => {
        await expect(page.locator('text=홈퍼니싱')).toBeVisible({ timeout: 10000 });
        await expect(page.locator('text=리폼 서비스')).toBeVisible({ timeout: 10000 });
        await expect(page.locator('text=브랜드 스토리')).toBeVisible({ timeout: 10000 });
    });

    test('스토어 링크 이동', async ({ page }) => {
        await page.click('text=홈퍼니싱', { timeout: 10000 });
        await expect(page).toHaveURL(/\/store/, { timeout: 10000 });
    });
});

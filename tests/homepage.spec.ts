import { test, expect } from '@playwright/test';

test.describe('Bestea - 홈페이지', () => {
    test('홈페이지 로딩', async ({ page }) => {
        await page.goto('/', { waitUntil: 'networkidle', timeout: 30000 });
        // 타이틀에 BESTEA 가 있는지 확인
        const title = await page.title();
        expect(title).toContain('BESTEA');
    });

    test('네비게이션 존재', async ({ page }) => {
        await page.goto('/store', { waitUntil: 'networkidle', timeout: 30000 });
        // 최소한 페이지가 로드되는지 확인
        await expect(page.locator('body')).toBeVisible();
    });
});

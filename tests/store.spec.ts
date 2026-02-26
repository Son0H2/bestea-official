import { test, expect } from '@playwright/test';

test.describe('Bestea - 스토어', () => {
    test('스토어 페이지 로딩', async ({ page }) => {
        await page.goto('/store', { waitUntil: 'networkidle', timeout: 30000 });
        // 페이지가 로드되는지 확인
        await expect(page.locator('body')).toBeVisible();
    });

    test('상품 이미지 존재', async ({ page }) => {
        await page.goto('/store', { waitUntil: 'networkidle', timeout: 30000 });
        // 이미지가 1 개 이상 있는지 확인
        const images = await page.locator('img').all();
        expect(images.length).toBeGreaterThan(0);
    });
});

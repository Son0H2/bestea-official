import { test, expect } from '@playwright/test';

test.describe('Bestea - 스토어', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/store');
    });

    test('상품 목록 로딩', async ({ page }) => {
        await expect(page.locator('text=홈퍼니싱')).toBeVisible();
        // 상품이 1 개 이상 있는지 확인
        await expect(page.locator('img[alt*="상품"]')).toBeVisible();
    });

    test('카테고리 필터', async ({ page }) => {
        await expect(page.locator('text=전체')).toBeVisible();
        await expect(page.locator('text=소파')).toBeVisible();
        await expect(page.locator('text=테이블')).toBeVisible();
    });

    test('상품 상세 페이지 이동', async ({ page }) => {
        const firstProduct = page.locator('a[href^="/store/"]').first();
        await firstProduct.click();
        await expect(page).toHaveURL(/\/store\/[a-f0-9-]+/);
    });
});

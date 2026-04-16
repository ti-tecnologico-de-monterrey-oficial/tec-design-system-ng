import { test, expect } from '@playwright/test';

test.describe('App Shell', () => {
  test('should load the home route', async ({ page }) => {
    await page.goto('/home');
    await expect(page).toHaveTitle(/Home/);
  });

  test('should redirect unknown routes gracefully', async ({ page }) => {
    const response = await page.goto('/non-existent-route');
    // La app Angular debe responder con 200 incluso en rutas no existentes
    expect(response?.status()).toBe(200);
  });
});

test.describe('Navigation', () => {
  test('should navigate to input page', async ({ page }) => {
    await page.goto('/input');
    await expect(page).toHaveTitle(/Input/);
    await expect(page.locator('app-root')).toBeVisible();
  });

  test('should navigate to dropdown page', async ({ page }) => {
    await page.goto('/dropdown');
    await expect(page).toHaveTitle(/Dropdown/);
    await expect(page.locator('app-root')).toBeVisible();
  });

  test('should navigate to alerts page', async ({ page }) => {
    await page.goto('/alerts');
    await expect(page).toHaveTitle(/Alerts/);
    await expect(page.locator('app-root')).toBeVisible();
  });
});

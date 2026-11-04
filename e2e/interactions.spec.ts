import { expect, test } from '@playwright/test';

const DRAWER_CHUNK = /\/assets\/MargotsPicksDrawer-[\w-]+\.js$/;

test.describe('fun facts with motion on', () => {
  // The config defaults to reduced motion; this runs the full slide
  test.use({ reducedMotion: 'no-preference' });

  test('plays the old card out, then brings the next fact in', async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');

    const firstQuestion = page.getByRole('button', { name: /Question:/ });
    const firstText = await firstQuestion.textContent();
    await firstQuestion.click();

    const next = page.getByRole('button', { name: 'Next fact' });
    await expect(next).toBeFocused();
    await next.click();

    const secondQuestion = page.getByRole('button', { name: /Question:/ });
    await expect(secondQuestion).toBeFocused();
    await expect(secondQuestion).not.toHaveText(firstText ?? '');
    await expect(page.getByRole('status')).toHaveText('1 of 6 revealed');
    expect(errors).toEqual([]);
  });
});

test.describe("Margot's Picks code", () => {
  test('is not downloaded until wanted, then opens the drawer', async ({
    page,
  }) => {
    const drawerRequests: string[] = [];
    page.on('request', (request) => {
      if (DRAWER_CHUNK.test(request.url())) {
        drawerRequests.push(request.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(drawerRequests).toEqual([]);

    const trigger = page.getByRole('button', { name: /Margot's Picks/ });
    await trigger.hover();
    await expect.poll(() => drawerRequests.length).toBe(1);

    await trigger.click();
    await expect(page.getByRole('dialog')).toBeVisible();
  });
});

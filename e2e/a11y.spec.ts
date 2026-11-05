import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

import { findLowContrastText } from './contrast';
import { expect, test } from './fixtures';
import { findWeakFocusIndicators } from './focus';

// jsdom has no layout or colours, so contrast and focus are checked here

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

const SUBPAGES = [
  '/projects/fit-my-space/',
  '/how-this-site-was-built/',
  '/a-page-that-does-not-exist/',
];

function scan(page: Page): AxeBuilder {
  return new AxeBuilder({ page }).withTags(WCAG_TAGS);
}

for (const theme of ['light', 'dark'] as const) {
  test.describe(`${theme} theme`, () => {
    test.use({ colorScheme: theme });

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('html')).toHaveClass(
        theme === 'dark' ? /\bdark\b/ : /^(?!.*\bdark\b)/,
      );
    });

    test('home page has no WCAG violations', async ({ page }) => {
      const { violations } = await scan(page).analyze();
      expect(violations).toEqual([]);
    });

    test('revealed fun fact has no WCAG violations', async ({ page }) => {
      await page.getByRole('button', { name: /Question:/ }).click();
      await expect(
        page.getByRole('button', { name: /Next fact|Play again/ }),
      ).toBeFocused();

      const { violations } = await scan(page).analyze();
      expect(violations).toEqual([]);
    });

    test("Margot's Picks drawer has no WCAG violations", async ({ page }) => {
      await page.goto('/#shelf');
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();

      const { violations } = await scan(page)
        .include('[role="dialog"]')
        .analyze();
      expect(violations).toEqual([]);
    });

    test('all visible text meets contrast on the rendered page', async ({
      page,
    }) => {
      expect(await findLowContrastText(page)).toEqual([]);
    });

    test("all visible text meets contrast in Margot's Picks", async ({
      page,
    }) => {
      await page.goto('/#shelf');
      await expect(page.getByRole('dialog')).toBeVisible();

      // The drawer scrolls inside itself, so only what is on screen is painted
      expect(
        await findLowContrastText(page, {
          scope: '[role="dialog"]',
          scrollPage: false,
        }),
      ).toEqual([]);
    });

    test('every Tab stop shows a focus indicator with 3:1 contrast', async ({
      page,
    }) => {
      expect(await findWeakFocusIndicators(page)).toEqual([]);
    });

    for (const path of SUBPAGES) {
      test.describe(path, () => {
        test.beforeEach(async ({ page }) => {
          await page.goto(path);
        });

        test('has no WCAG violations', async ({ page }) => {
          const { violations } = await scan(page).analyze();
          expect(violations).toEqual([]);
        });

        test('all visible text meets contrast', async ({ page }) => {
          expect(await findLowContrastText(page)).toEqual([]);
        });

        test('every Tab stop shows a focus indicator', async ({ page }) => {
          expect(await findWeakFocusIndicators(page)).toEqual([]);
        });
      });
    }
  });
}

import { expect, type Page, test } from '@playwright/test';

/**
 * What a crawler, a link preview or a visitor on a slow connection gets:
 * prerendered content before any JavaScript, the right theme on the first
 * paint, a clean hydration, and the metadata that previews are built from.
 */

/** The app bundle; blocking it shows the page exactly as first painted */
const APP_SCRIPT = /\/assets\/.*\.js$/;

function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  page.on('pageerror', (error) => errors.push(error.message));
  return errors;
}

test.describe('before JavaScript runs', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(APP_SCRIPT, (route) => route.abort());
  });

  test('the content is already in the HTML', async ({ page }) => {
    await page.goto('/');

    await expect(
      page.getByRole('heading', { level: 1, name: 'Mariana Martins Menezes' }),
    ).toBeVisible();
    await expect(page.getByText('Frontend Engineer').first()).toBeVisible();
    await expect(
      page.getByRole('link', { name: /Fit My Space/ }),
    ).toBeVisible();
  });

  test.describe('for a dark-mode visitor', () => {
    test.use({ colorScheme: 'dark' });

    test('the first paint is already dark', async ({ page }) => {
      await page.goto('/');

      // Set by the inline script in <head>, not by React
      await expect(page.locator('html')).toHaveClass(/\bdark\b/);
    });
  });
});

for (const theme of ['light', 'dark'] as const) {
  test.describe(`hydration, ${theme} theme`, () => {
    test.use({ colorScheme: theme });

    test('hydrates without errors and takes over the page', async ({
      page,
    }) => {
      const errors = collectConsoleErrors(page);
      await page.goto('/');

      // Interactive only once React has hydrated the prerendered markup
      const toggle = page.getByRole('button', { name: 'Dark mode' });
      await expect(toggle).toHaveAttribute(
        'aria-pressed',
        String(theme === 'dark'),
      );
      await toggle.click();
      await expect(toggle).toHaveAttribute(
        'aria-pressed',
        String(theme !== 'dark'),
      );

      expect(errors).toEqual([]);
    });

    test('a #shelf link opens the drawer after hydration', async ({ page }) => {
      const errors = collectConsoleErrors(page);
      await page.goto('/#shelf');

      await expect(page.getByRole('dialog')).toBeVisible();
      expect(errors).toEqual([]);
    });
  });
}

test.describe('metadata', () => {
  test('describes the page for search engines and link previews', async ({
    page,
  }) => {
    await page.goto('/');
    const head = page.locator('head');

    await expect(page).toHaveTitle(
      'Mariana Martins Menezes | Frontend Engineer',
    );
    await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://mariana-martins.github.io/',
    );
    for (const property of [
      'og:title',
      'og:description',
      'og:image',
      'og:url',
    ]) {
      await expect(
        head.locator(`meta[property="${property}"]`),
      ).toHaveAttribute('content', /\S/);
    }

    const structuredData = await head
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(JSON.parse(structuredData ?? '')).toMatchObject({
      '@type': 'Person',
      name: 'Mariana Martins Menezes',
      jobTitle: 'Frontend Engineer',
    });
  });

  test('every file the metadata points to is served', async ({
    page,
    request,
  }) => {
    await page.goto('/');
    const productionUrls = await page.evaluate(() =>
      [
        ...document.querySelectorAll<HTMLMetaElement>(
          'meta[property="og:image"]',
        ),
      ].map((meta) => meta.content),
    );

    // Absolute production URLs; check the same paths on this build
    const paths = [
      ...productionUrls.map((url) => new URL(url).pathname),
      '/apple-touch-icon.png',
      '/favicon.svg',
      '/robots.txt',
      '/sitemap.xml',
    ];
    for (const path of paths) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
    }
  });
});

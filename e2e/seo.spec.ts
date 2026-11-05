import type { Page } from '@playwright/test';

import { ANALYTICS_HOST, expect, test } from './fixtures';

const APP_SCRIPT = /\/assets\/.*\.js$/;

function collectConsoleErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (message) => {
    // The blocked analytics request is expected (see fixtures.ts)
    if (
      message.type() === 'error' &&
      !message.location().url.includes(ANALYTICS_HOST)
    ) {
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
    await expect(
      page.getByText('Frontend & Design Engineer').first(),
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: /^Fit My Space/ }),
    ).toBeVisible();
  });

  test.describe('for a dark-mode visitor', () => {
    test.use({ colorScheme: 'dark' });

    test('the first paint is already dark', async ({ page }) => {
      await page.goto('/');

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
      'Mariana Martins Menezes | Frontend & Design Engineer',
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
      jobTitle: 'Frontend & Design Engineer',
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
      '/Mariana-Martins-Menezes-CV.pdf',
    ];
    for (const path of paths) {
      const response = await request.get(path);
      expect(response.status(), path).toBe(200);
    }
  });
});

test.describe('each page', () => {
  const pages = [
    {
      path: '/',
      title: 'Mariana Martins Menezes | Frontend & Design Engineer',
    },
    {
      path: '/projects/fit-my-space/',
      title: 'Fit My Space case study | Mariana Martins Menezes',
    },
    {
      path: '/how-this-site-was-built/',
      title: 'How this site was built | Mariana Martins Menezes',
    },
  ];

  for (const { path, title } of pages) {
    test(`${path} is prerendered with its own title and URL`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      await page.route(/\/assets\/.*\.js$/, (route) => route.abort());
      await page.goto(path);

      await expect(page).toHaveTitle(title);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      const head = page.locator('head');
      const url = `https://mariana-martins.github.io${path}`;
      await expect(head.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        url,
      );
      await expect(head.locator('meta[property="og:url"]')).toHaveAttribute(
        'content',
        url,
      );
      await expect(head.locator('meta[property="og:title"]')).toHaveAttribute(
        'content',
        title,
      );
    });
  }
});

test.describe('an unknown address', () => {
  test('gets the not-found page, kept out of search, and hydrates cleanly', async ({
    page,
  }) => {
    const problems = collectConsoleErrors(page);

    const response = await page.goto('/projects/fit-my-spcae/');

    expect(response?.status()).toBe(404);
    await expect(page).toHaveTitle('Page not found | Mariana Martins Menezes');
    await expect(
      page.getByRole('heading', { level: 1, name: 'Page not found' }),
    ).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      'content',
      'noindex',
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    // Hydrated: the theme toggle responds
    const toggle = page.getByRole('button', { name: /dark mode/i });
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    // The 404 response itself is logged as a console error
    expect(problems.filter((text) => !/404/.test(text))).toEqual([]);
  });
});

test('every page loads the analytics script, pinned by its hash', async ({
  page,
}) => {
  for (const path of ['/', '/projects/fit-my-space/', '/404.html']) {
    await page.goto(path);
    const script = page.locator('script[data-goatcounter]');
    await expect(script, path).toHaveAttribute(
      'src',
      'https://gc.zgo.at/count.v5.js',
    );
    await expect(script, path).toHaveAttribute('integrity', /^sha384-/);
    await expect(script, path).toHaveAttribute('async', '');
  }
});

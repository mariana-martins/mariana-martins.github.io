import { expect, test } from '@playwright/test';

const PAGES = [
  '/',
  '/projects/fit-my-space/',
  '/how-this-site-was-built/',
  '/a-page-that-does-not-exist/',
];
const WIDTHS = [320, 375, 768, 1024, 1440];

for (const path of PAGES) {
  for (const width of WIDTHS) {
    test(`${path} fits ${width}px without horizontal scrolling`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);

      const overflowing = await page.evaluate(() =>
        [...document.querySelectorAll('body *')]
          .filter((element) => {
            const box = element.getBoundingClientRect();
            // Scrollable code blocks may be wider than the page, by design
            return (
              box.right > document.documentElement.clientWidth + 1 &&
              !element.closest('pre')
            );
          })
          .map((element) =>
            `${element.tagName.toLowerCase()}.${element.className}`.slice(
              0,
              80,
            ),
          ),
      );

      expect(overflowing).toEqual([]);
    });
  }
}

for (const path of PAGES) {
  test(`${path} keeps the layout centred, theme toggle on the panel's edge`, async ({
    page,
  }) => {
    for (const width of WIDTHS) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(path);

      const edges = await page.evaluate(() => {
        const viewport = document.documentElement.clientWidth;
        const box = (selector: string): DOMRect => {
          const element = document.querySelector(selector);
          if (!element) {
            throw new Error(`${selector} not found`);
          }
          return element.getBoundingClientRect();
        };
        const main = box('main');
        const toggle = box('button[aria-pressed]');
        return {
          left: Math.round(main.left),
          right: Math.round(viewport - main.right),
          toggleRight: Math.round(viewport - toggle.right),
        };
      });

      expect(edges.left, `${width}px`).toBe(edges.right);
      expect(edges.toggleRight, `${width}px`).toBe(edges.right);
    }
  });
}

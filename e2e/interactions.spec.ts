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

test.describe('featured project card', () => {
  test('opens the case study from anywhere on the card, the arrow included', async ({
    page,
  }) => {
    await page.goto('/');
    const title = page.locator('#project-fit-my-space-title');
    const card = title.locator(
      'xpath=ancestor::div[contains(@class,"rounded-xl")][1]',
    );
    await card.scrollIntoViewIfNeeded();
    const box = await card.boundingBox();
    if (!box) {
      throw new Error('Featured card is not on screen');
    }

    // Bottom-right corner, where the arrow sits beside "Code on GitHub"
    await page.mouse.click(box.x + box.width - 30, box.y + box.height - 30);
    await expect(page).toHaveURL(/\/projects\/fit-my-space\/$/);
  });

  test('still opens GitHub from its own link', async ({ page }) => {
    await page.goto('/');
    const popup = page.waitForEvent('popup');
    await page
      .getByRole('link', { name: /Code on GitHub for Fit My Space/ })
      .click();
    expect((await popup).url()).toContain(
      'github.com/mariana-martins/FitMySpace',
    );
  });
});

test.describe('stat cards', () => {
  test('select number and label together, as one phrase', async ({ page }) => {
    await page.goto('/how-this-site-was-built/');
    const card = page
      .getByText('focus ring contrast (was 2.1:1)')
      .locator('xpath=ancestor::li[1]');
    await card.scrollIntoViewIfNeeded();
    const number = card.locator('[aria-hidden="true"] + span');
    const label = card.getByText('focus ring contrast (was 2.1:1)');
    const start = await number.boundingBox();
    const end = await label.boundingBox();
    if (!start || !end) {
      throw new Error('Stat card is not on screen');
    }

    // Drag from before the number to the end of the label
    await page.mouse.move(start.x + 1, start.y + start.height / 2);
    await page.mouse.down();
    await page.mouse.move(end.x + end.width - 1, end.y + end.height - 4, {
      steps: 8,
    });
    await page.mouse.up();

    const selected = await page.evaluate(() =>
      window.getSelection()?.toString().replace(/\s+/g, ' ').trim(),
    );
    expect(selected).toBe('5.5:1 focus ring contrast (was 2.1:1)');
  });

  test.describe('with motion on', () => {
    test.use({ reducedMotion: 'no-preference' });

    test('count up to their value only once they are on screen', async ({
      page,
    }) => {
      await page.goto('/projects/fit-my-space/');
      // The visible number sits beside the hidden copy that holds its width
      const number = page
        .getByText('test suites', { exact: true })
        .locator('xpath=ancestor::li[1]')
        .locator('[aria-hidden="true"] + span');

      // Far below the fold: still waiting at zero
      await expect(number).toHaveText('0');

      await number.scrollIntoViewIfNeeded();
      await expect(number).toHaveText('41');
    });
  });
});

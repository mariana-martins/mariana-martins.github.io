import type { Page } from '@playwright/test';

/**
 * Focus indicator check, measured on pixels.
 *
 * Walks the page with Tab and, at every stop, screenshots the viewport with
 * the element focused and again with it blurred. The indicator is whatever
 * changed between the two; it counts only where the change reaches 3:1,
 * which is how WCAG 2.4.13 (Focus Appearance) defines a visible indicator.
 * A ring that merely exists - a pale pink one on a pale background - does
 * not pass.
 */

export interface WeakFocusIndicator {
  element: string;
  /** Pixels whose colour changed by at least 3:1 on focus */
  changedPixels: number;
  /** A 1px outline of the element's box */
  requiredPixels: number;
}

const FOCUS_CHANGE_RATIO = 3;
/** Safety stop for the walk; the page has well under this many stops */
const MAX_TAB_STOPS = 80;

/** Rings are drawn instantly, so a screenshot never catches one mid-fade */
const NO_TRANSITIONS_CSS = `
  *, *::before, *::after { transition: none !important; }
`;

export async function findWeakFocusIndicators(
  page: Page,
): Promise<WeakFocusIndicator[]> {
  const noTransitions = await page.addStyleTag({ content: NO_TRANSITIONS_CSS });
  const weak: WeakFocusIndicator[] = [];

  for (let stop = 0; stop < MAX_TAB_STOPS; stop++) {
    await page.keyboard.press('Tab');

    const target = await page.evaluate(() => {
      const active = document.activeElement;
      if (!active || active === document.body) {
        return null;
      }
      const box = active.getBoundingClientRect();
      const name =
        active.getAttribute('aria-label') ??
        active.textContent?.trim().replace(/\s+/g, ' ').slice(0, 40) ??
        '';
      return {
        element: `${active.tagName.toLowerCase()}: ${name}`,
        requiredPixels: Math.round(2 * (box.width + box.height)),
      };
    });

    // Focus left the document: the walk is complete
    if (target === null) {
      break;
    }

    const focused = await page.screenshot({
      scale: 'css',
      animations: 'disabled',
    });
    const active = await page.evaluateHandle(() => document.activeElement);
    await active.evaluate((element) => (element as HTMLElement).blur());
    const blurred = await page.screenshot({
      scale: 'css',
      animations: 'disabled',
    });
    // Put focus back so the next Tab continues from here
    await active.evaluate((element) => (element as HTMLElement).focus());
    await active.dispose();

    const changedPixels = await page.evaluate(countChangedPixels, {
      focused: focused.toString('base64'),
      blurred: blurred.toString('base64'),
      ratio: FOCUS_CHANGE_RATIO,
    });

    if (changedPixels < target.requiredPixels) {
      weak.push({ ...target, changedPixels });
    }
  }

  await noTransitions.evaluate((element) => (element as Element).remove());
  return weak;
}

// Runs inside the browser: no imports, nothing from module scope.
async function countChangedPixels({
  focused,
  blurred,
  ratio,
}: {
  focused: string;
  blurred: string;
  ratio: number;
}): Promise<number> {
  const read = async (png: string): Promise<Uint8ClampedArray> => {
    const image = new window.Image();
    image.src = `data:image/png;base64,${png}`;
    await image.decode();
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    if (!context) {
      return new Uint8ClampedArray();
    }
    context.drawImage(image, 0, 0);
    return context.getImageData(0, 0, image.width, image.height).data;
  };

  const [before, after] = await Promise.all([read(blurred), read(focused)]);

  const channel = (value: number): number => {
    const normalised = value / 255;
    return normalised <= 0.03928
      ? normalised / 12.92
      : ((normalised + 0.055) / 1.055) ** 2.4;
  };
  const luminance = (data: Uint8ClampedArray, index: number): number =>
    0.2126 * channel(data[index]) +
    0.7152 * channel(data[index + 1]) +
    0.0722 * channel(data[index + 2]);

  let changed = 0;
  for (let index = 0; index < after.length; index += 4) {
    const first = luminance(before, index);
    const second = luminance(after, index);
    const contrast =
      (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
    if (contrast >= ratio) {
      changed++;
    }
  }
  return changed;
}

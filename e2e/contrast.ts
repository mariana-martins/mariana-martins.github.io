import type { Page } from '@playwright/test';

/**
 * Text contrast measured on pixels: axe gives up on gradients, blur and
 * pseudo-elements. Records each text run, hides all text, screenshots, and
 * blends the text colour over the background pixels under it.
 *
 * Walks one viewport at a time: a full-page screenshot resizes the viewport
 * and reflows the layout, so the recorded boxes no longer line up.
 */

export interface ContrastFailure {
  text: string;
  ratio: number;
  required: number;
}

interface TextRun {
  text: string;
  key: string;
  x: number;
  y: number;
  width: number;
  height: number;
  /** Alpha includes ancestor opacity */
  rgba: [number, number, number, number];
  required: number;
}

const NORMAL_TEXT_RATIO = 4.5;
const LARGE_TEXT_RATIO = 3;
/** "Large" is 18pt (24px), or 14pt (18.66px) when bold */
const LARGE_TEXT_PX = 24;
const LARGE_BOLD_TEXT_PX = 18.66;
const BOLD_WEIGHT = 700;

/** Low percentile: a stray pixel can't fail a run, a weak patch still does */
const PERCENTILE = 0.05;
const MAX_SAMPLES_PER_RUN = 600;

const VIEWPORT_OVERLAP_PX = 120;

// Held for the whole walk, or restoring the text starts colour transitions
const NO_TRANSITIONS_CSS = `
  *, *::before, *::after { transition: none !important; }
`;

const HIDE_TEXT_CSS = `
  *, *::before, *::after {
    color: transparent !important;
    -webkit-text-fill-color: transparent !important;
    text-shadow: none !important;
  }
`;

export async function findLowContrastText(
  page: Page,
  {
    scope = 'body',
    scrollPage = true,
  }: {
    scope?: string;
    /** Off for content that scrolls on its own */
    scrollPage?: boolean;
  } = {},
): Promise<ContrastFailure[]> {
  const { pageHeight, viewportHeight } = await page.evaluate(() => ({
    pageHeight: document.documentElement.scrollHeight,
    viewportHeight: window.innerHeight,
  }));
  const step = Math.max(1, viewportHeight - VIEWPORT_OVERLAP_PX);
  const offsets: Array<number | null> = [];
  if (scrollPage) {
    for (let offset = 0; offset < pageHeight; offset += step) {
      offsets.push(offset);
    }
  } else {
    offsets.push(null);
  }

  const failures = new Map<string, ContrastFailure>();
  const noTransitions = await page.addStyleTag({ content: NO_TRANSITIONS_CSS });

  for (const offset of offsets) {
    if (offset !== null) {
      await page.evaluate((top) => window.scrollTo(0, top), offset);
    }

    const runs = await page.evaluate(collectTextRuns, {
      scope,
      thresholds: {
        normal: NORMAL_TEXT_RATIO,
        large: LARGE_TEXT_RATIO,
        largePx: LARGE_TEXT_PX,
        largeBoldPx: LARGE_BOLD_TEXT_PX,
        boldWeight: BOLD_WEIGHT,
      },
    });

    const style = await page.addStyleTag({ content: HIDE_TEXT_CSS });
    const screenshot = await page.screenshot({
      scale: 'css',
      animations: 'disabled',
    });
    await style.evaluate((element) => (element as Element).remove());

    const measured = await page.evaluate(measureRuns, {
      png: screenshot.toString('base64'),
      runs,
      percentile: PERCENTILE,
      maxSamples: MAX_SAMPLES_PER_RUN,
    });
    for (const { key, ...failure } of measured) {
      failures.set(key, failure);
    }
  }

  await noTransitions.evaluate((element) => (element as Element).remove());
  return [...failures.values()];
}

// Runs inside the browser: no imports or module scope below

function collectTextRuns({
  scope,
  thresholds,
}: {
  scope: string;
  thresholds: {
    normal: number;
    large: number;
    largePx: number;
    largeBoldPx: number;
    boldWeight: number;
  };
}): TextRun[] {
  const root = document.querySelector(scope);
  if (!root) {
    return [];
  }

  const swatch = document.createElement('canvas').getContext('2d', {
    willReadFrequently: true,
  });
  if (!swatch) {
    return [];
  }
  const toRgba = (color: string): [number, number, number, number] => {
    swatch.clearRect(0, 0, 1, 1);
    swatch.fillStyle = color;
    swatch.fillRect(0, 0, 1, 1);
    const [r, g, b, a] = swatch.getImageData(0, 0, 1, 1).data;
    return [r, g, b, a / 255];
  };

  const opacityChain = (element: Element): number => {
    let opacity = 1;
    for (let node: Element | null = element; node; node = node.parentElement) {
      opacity *= parseFloat(window.getComputedStyle(node).opacity);
    }
    return opacity;
  };

  // sr-only text lays out full size; an ancestor clips it
  // Also skips text cut off by a scrolling container, like the end of a long
  // line in a code block: it is not on screen, whatever its box says
  const isClippedAway = (element: Element, run: DOMRect): boolean => {
    for (let node: Element | null = element; node; node = node.parentElement) {
      const box = node.getBoundingClientRect();
      const style = window.getComputedStyle(node);
      const clipsOverflow = style.overflow !== 'visible';
      if (clipsOverflow && (box.width <= 1 || box.height <= 1)) {
        return true;
      }
      const outside =
        run.left < box.left - 1 ||
        run.right > box.right + 1 ||
        run.top < box.top - 1 ||
        run.bottom > box.bottom + 1;
      if (clipsOverflow && outside) {
        return true;
      }
      if (style.clipPath === 'inset(50%)') {
        return true;
      }
    }
    return false;
  };

  const runs: TextRun[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);

  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.textContent?.trim() ?? '';
    const element = node.parentElement;
    if (!text || !element) {
      continue;
    }
    if (element.closest('[inert]')) {
      continue;
    }

    const style = window.getComputedStyle(element);
    if (style.visibility !== 'visible') {
      continue;
    }

    const range = document.createRange();
    range.selectNodeContents(node);
    const rect = range.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2 || isClippedAway(element, rect)) {
      continue;
    }
    const inViewport =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth;
    if (!inViewport) {
      continue;
    }

    const [r, g, b, alpha] = toRgba(style.color);
    const fontSize = parseFloat(style.fontSize);
    const isBold = parseInt(style.fontWeight, 10) >= thresholds.boldWeight;
    const isLarge =
      fontSize >= thresholds.largePx ||
      (isBold && fontSize >= thresholds.largeBoldPx);

    runs.push({
      text: text.slice(0, 50),
      key: `${Math.round(rect.left + window.scrollX)},${Math.round(rect.top + window.scrollY)}:${text}`,
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      rgba: [r, g, b, alpha * opacityChain(element)],
      required: isLarge ? thresholds.large : thresholds.normal,
    });
  }

  return runs;
}

async function measureRuns({
  png,
  runs,
  percentile,
  maxSamples,
}: {
  png: string;
  runs: TextRun[];
  percentile: number;
  maxSamples: number;
}): Promise<Array<ContrastFailure & { key: string }>> {
  const image = new window.Image();
  image.src = `data:image/png;base64,${png}`;
  await image.decode();

  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) {
    return [];
  }
  context.drawImage(image, 0, 0);

  const luminance = (rgb: number[]): number => {
    const [r, g, b] = rgb.map((channel) => {
      const value = channel / 255;
      return value <= 0.03928
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contrast = (first: number[], second: number[]): number => {
    const [light, dark] = [luminance(first), luminance(second)].sort(
      (a, b) => b - a,
    );
    return (light + 0.05) / (dark + 0.05);
  };

  const failures: Array<ContrastFailure & { key: string }> = [];

  for (const run of runs) {
    const left = Math.max(0, Math.floor(run.x));
    const top = Math.max(0, Math.floor(run.y));
    const width = Math.min(canvas.width - left, Math.ceil(run.width));
    const height = Math.min(canvas.height - top, Math.ceil(run.height));
    if (width <= 0 || height <= 0) {
      continue;
    }

    const pixels = context.getImageData(left, top, width, height).data;
    const pixelCount = width * height;
    const step = Math.max(1, Math.floor(pixelCount / maxSamples));
    const [textR, textG, textB, textAlpha] = run.rgba;
    const ratios: number[] = [];

    for (let index = 0; index < pixelCount; index += step) {
      const background = [
        pixels[index * 4],
        pixels[index * 4 + 1],
        pixels[index * 4 + 2],
      ];
      const painted = [textR, textG, textB].map(
        (channel, i) => channel * textAlpha + background[i] * (1 - textAlpha),
      );
      ratios.push(contrast(painted, background));
    }

    ratios.sort((a, b) => a - b);
    const ratio = ratios[Math.floor(ratios.length * percentile)];
    if (ratio < run.required) {
      failures.push({
        key: run.key,
        text: run.text,
        ratio: Math.round(ratio * 100) / 100,
        required: run.required,
      });
    }
  }

  return failures;
}

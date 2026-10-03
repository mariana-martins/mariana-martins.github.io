import React from 'react';

import { cn } from '@/lib/cn';

const VIEWBOX_WIDTH = 148;
const VIEWBOX_HEIGHT = 105;

// Stroke widths in viewBox units; the paw and sparkles are thinner so they
// still read as details once the icon is 24px tall
const LETTER_STROKE_WIDTH = 4;
const PAW_STROKE_WIDTH = 3;
const SPARKLE_STROKE_WIDTH = 1.5;

/** Height in px when the caller does not ask for one */
const DEFAULT_SIZE = 24;

// Mari's "M" with Margot's paw over the left leg
const LETTER_PATH =
  'M39 92.1655L64 33.1655L85 71.1655L108 33.1655L128 92.1655H147L108 1.16551L85 44.1655L64 1.16551L22 92.1655H39Z';
const PAW_PATH =
  'M25.7975 77.3244C27.1573 76.6903 28.9469 76.4993 30.9458 76.6865C32.938 76.8731 35.0986 77.4318 37.1693 78.2551C39.2396 79.0782 41.2054 80.1594 42.8116 81.3801C44.4236 82.6052 45.6423 83.9475 46.264 85.2807C46.8067 86.4444 46.7842 87.5451 46.2788 88.5311C45.764 89.5351 44.7189 90.475 43.1186 91.2213C41.4052 92.0201 39.7644 92.2473 38.1383 92.4413C36.5316 92.633 34.8977 92.7941 33.3481 93.5167C31.8106 94.2337 30.6444 95.3787 29.4664 96.4851C28.2741 97.605 27.039 98.7193 25.3093 99.5259C23.7092 100.272 22.318 100.468 21.2181 100.217C20.1378 99.9705 19.2794 99.2806 18.7367 98.1169C18.115 96.7836 17.871 94.987 17.9687 92.9646C18.0661 90.9494 18.5013 88.7486 19.2016 86.6336C19.9019 84.5183 20.8621 82.5042 21.9996 80.8582C23.1409 79.2067 24.4377 77.9585 25.7975 77.3244ZM36.5513 70.7808C36.1516 68.0336 37.6634 65.5818 39.7243 65.1604C41.749 64.7463 43.8401 66.4101 44.2398 69.1502C44.6395 71.8975 43.1272 74.3506 41.0664 74.772C39.0416 75.1858 36.9508 73.5211 36.5513 70.7808ZM7.5269 80.1731C9.17458 78.8656 12.0253 79.2832 13.872 81.3553C15.7145 83.4229 15.6451 86.0949 14.0263 87.3799C12.3787 88.6877 9.52797 88.2698 7.68123 86.1978C5.83864 84.1302 5.90809 81.4581 7.5269 80.1731ZM11.5164 66.7812C12.3648 66.0759 13.5771 65.8853 14.9052 66.2289C16.2314 66.5721 17.6273 67.4417 18.7559 68.7747C19.8847 70.1079 20.5055 71.6205 20.616 72.9716C20.7197 74.239 20.3762 75.3255 19.6349 76.0367L19.4813 76.1741C18.6335 76.8794 17.4216 77.0696 16.0934 76.7259C14.7669 76.3827 13.3704 75.5137 12.2418 74.1806C11.113 72.8474 10.4922 71.3348 10.3817 69.9837C10.2711 68.6319 10.6693 67.4855 11.5164 66.7812ZM24.3002 61.848C24.8906 60.6098 25.8151 59.8037 26.9006 59.6074C27.985 59.4115 29.1192 59.8439 30.0837 60.7976C31.0475 61.7506 31.8078 63.1974 32.1035 64.9189C32.3993 66.6404 32.1672 68.2689 31.5776 69.5055C30.9871 70.7437 30.0619 71.55 28.9763 71.7465C27.8923 71.9425 26.7589 71.5103 25.7945 70.5568C24.8306 69.6037 24.07 68.1563 23.7742 66.4346C23.4786 64.7131 23.7106 63.0846 24.3002 61.848Z';

// One four-point sparkle centred on the origin; each instance is translated
// into place around the letter
const SPARKLE_PATH =
  'M0 -10L1.5891 -4.098C1.783 -3.3778 1.88 -3.0177 2.0713 -2.7233C2.2407 -2.4628 2.4628 -2.2407 2.7233 -2.0713C3.0177 -1.88 3.3778 -1.783 4.098 -1.5891L10 0L4.098 1.5891C3.3778 1.783 3.0177 1.88 2.7233 2.0713C2.4628 2.2407 2.2407 2.4628 2.0713 2.7233C1.88 3.0177 1.783 3.3778 1.5891 4.098L0 10L-1.5891 4.098C-1.783 3.3778 -1.88 3.0177 -2.0713 2.7233C-2.2407 2.4628 -2.4628 2.2407 -2.7233 2.0713C-3.0177 1.88 -3.3778 1.783 -4.098 1.5891L-10 0L-4.098 -1.5891C-3.3778 -1.783 -3.0177 -1.88 -2.7233 -2.0713C-2.4628 -2.2407 -2.2407 -2.4628 -2.0713 -2.7233C-1.88 -3.0177 -1.783 -3.3778 -1.5891 -4.098L0 -10Z';

interface Sparkle {
  /** Where it sits relative to the letter; doubles as the React key */
  name: 'top-left' | 'top-right' | 'right' | 'bottom';
  /** Tailwind `text-*` class; fill and stroke both use currentColor */
  className: string;
  /** Centre in viewBox units; partly outside the box on purpose, they orbit the letter */
  x: number;
  y: number;
}

// Four spread-out hues (amber, green, violet, red) so they read as a rainbow
// rather than shades of one colour
const SPARKLES: Sparkle[] = [
  {
    name: 'top-left',
    className: 'text-warm-500 dark:text-highlight-yellow',
    x: 74,
    y: -23.83,
  },
  {
    name: 'top-right',

    className: 'text-green-300 dark:text-highlight-green',
    x: 121,
    y: -13.83,
  },
  {
    name: 'right',
    className: 'text-highlight-violet',
    x: 153,
    y: 44.17,
  },
  {
    name: 'bottom',
    className: 'text-highlight-red',
    x: 84,
    y: 95.17,
  },
];

export interface MargotIconProps {
  /** Solid letter (a point earned) vs outline (a point missed) */
  filled: boolean;
  /** Rendered height in px; width follows the viewBox ratio */
  size?: number;
  /** Surround the letter with coloured sparkles (a perfect score) */
  sparkles?: boolean;
  className?: string;
}

/**
 * Mari's "M" with Margot's paw, used as the rating unit.
 *
 * Decorative only: the rating text lives in MargotRating's sr-only span.
 * Filled and empty differ by shape (solid vs outline), not just colour.
 * With `sparkles`, four coloured stars hang outside the box; the box itself
 * never changes size so a row of icons stays aligned.
 */
export function MargotIcon({
  filled,
  size = DEFAULT_SIZE,
  sparkles = false,
  className,
}: MargotIconProps): React.JSX.Element {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
      height={size}
      width={Math.round((size * VIEWBOX_WIDTH) / VIEWBOX_HEIGHT)}
      data-filled={filled}
      data-sparkles={sparkles || undefined}
      // Same box as every other Margot; only the sparkles hang outside it
      className={cn('shrink-0', sparkles && 'overflow-visible', className)}
    >
      <path
        d={LETTER_PATH}
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={LETTER_STROKE_WIDTH}
        strokeLinejoin="round"
      />
      <path
        d={PAW_PATH}
        className="fill-warm-100 dark:fill-indigo-50"
        stroke="currentColor"
        strokeWidth={PAW_STROKE_WIDTH}
        strokeLinejoin="round"
      />
      {sparkles &&
        SPARKLES.map((sparkle) => (
          <path
            key={sparkle.name}
            d={SPARKLE_PATH}
            transform={`translate(${sparkle.x} ${sparkle.y})`}
            className={sparkle.className}
            fill="currentColor"
            stroke="currentColor"
            strokeWidth={SPARKLE_STROKE_WIDTH}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
    </svg>
  );
}

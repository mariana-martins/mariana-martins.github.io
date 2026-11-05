import React, { useEffect, useRef } from 'react';

import { prefersReducedMotion } from '@/lib/reducedMotion';

import { formatCountValue, parseCountValue } from './countValue';

const DURATION_MS = 1600;
/** Starts once the whole number is on screen, above the bottom 15% */
const OBSERVER_OPTIONS: IntersectionObserverInit = {
  threshold: 1,
  rootMargin: '0px 0px -15% 0px',
};

// Slow start, so the first steps read as counting rather than a flicker
const easeInOutSine = (progress: number): number =>
  -(Math.cos(Math.PI * progress) - 1) / 2;

/**
 * Counts up to `value` the first time it scrolls into view. The rendered and
 * prerendered text is always the final value; frames are written straight
 * to the DOM, so React does not re-render during the count.
 */
export function CountUp({ value }: { value: string }): React.JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    const parsed = parseCountValue(value);
    if (
      !element ||
      !parsed ||
      prefersReducedMotion() ||
      typeof IntersectionObserver === 'undefined'
    ) {
      return;
    }

    let frame = 0;
    element.textContent = formatCountValue(parsed, 0);

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) {
        return;
      }
      observer.disconnect();
      const start = window.performance.now();
      const tick = (now: number): void => {
        const progress = Math.min(1, (now - start) / DURATION_MS);
        element.textContent = formatCountValue(
          parsed,
          parsed.target * easeInOutSine(progress),
        );
        if (progress < 1) {
          frame = window.requestAnimationFrame(tick);
        }
      };
      frame = window.requestAnimationFrame(tick);
    }, OBSERVER_OPTIONS);
    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      element.textContent = value;
    };
  }, [value]);

  return (
    <span className="inline-grid">
      <span aria-hidden="true" className="invisible col-start-1 row-start-1">
        {value}
      </span>
      <span ref={ref} className="col-start-1 row-start-1">
        {value}
      </span>
    </span>
  );
}

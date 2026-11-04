import { describe, expect, it, jest } from '@jest/globals';

import { prefersReducedMotion } from './reducedMotion';

const QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Replaces window.matchMedia with a controllable stub and returns a trigger
 * that flips the preference and notifies subscribers, like the browser does.
 */
function stubMatchMedia(initialMatches: boolean): {
  setMatches: (matches: boolean) => void;
  restore: () => void;
} {
  const original = window.matchMedia;
  const listeners = new Set<() => void>();
  let matches = initialMatches;

  window.matchMedia = ((query: string) => ({
    get matches() {
      return query === QUERY && matches;
    },
    media: query,
    onchange: null,
    addEventListener: (_type: string, listener: () => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: string, listener: () => void) => {
      listeners.delete(listener);
    },
    dispatchEvent: jest.fn(),
  })) as unknown as typeof window.matchMedia;

  return {
    setMatches: (next: boolean) => {
      matches = next;
      listeners.forEach((listener) => listener());
    },
    restore: () => {
      window.matchMedia = original;
    },
  };
}

describe('prefersReducedMotion', () => {
  it('reports the preference at call time', () => {
    const media = stubMatchMedia(true);

    try {
      expect(prefersReducedMotion()).toBe(true);

      // Read again after the preference changes - no subscription involved
      media.setMatches(false);
      expect(prefersReducedMotion()).toBe(false);
    } finally {
      media.restore();
    }
  });
});

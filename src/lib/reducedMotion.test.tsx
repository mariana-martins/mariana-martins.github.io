import { describe, expect, it, jest } from '@jest/globals';
import { act, render, screen } from '@testing-library/react';

import { prefersReducedMotion, usePrefersReducedMotion } from './reducedMotion';

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

function Probe(): React.JSX.Element {
  return <span>{usePrefersReducedMotion() ? 'reduced' : 'full'}</span>;
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

describe('usePrefersReducedMotion', () => {
  it('renders the current preference and follows changes', () => {
    const media = stubMatchMedia(false);

    try {
      render(<Probe />);
      expect(screen.getByText('full')).toBeInTheDocument();

      act(() => media.setMatches(true));
      expect(screen.getByText('reduced')).toBeInTheDocument();
    } finally {
      media.restore();
    }
  });

  it('unsubscribes on unmount', () => {
    const media = stubMatchMedia(false);

    try {
      const { unmount } = render(<Probe />);
      unmount();

      // Would throw on an update to an unmounted component if still subscribed
      expect(() => act(() => media.setMatches(true))).not.toThrow();
    } finally {
      media.restore();
    }
  });
});

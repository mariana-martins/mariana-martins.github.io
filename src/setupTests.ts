import "@testing-library/jest-dom";
import { toHaveNoViolations } from "jest-axe";

// Extend Jest matchers with jest-axe
expect.extend(toHaveNoViolations);

// ============================================================================
// Browser API Mocks
// ============================================================================

/**
 * Mock IntersectionObserver API
 * Required for components that use intersection-based features (e.g., lazy loading)
 */
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = "";
  readonly thresholds: readonly number[] = [];

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _callback?: IntersectionObserverCallback,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _options?: IntersectionObserverInit,
  ) {
    // Mock implementation - empty constructor required for IntersectionObserver mock
  }

  observe(): void {
    // Mock implementation
  }

  disconnect(): void {
    // Mock implementation
  }

  unobserve(): void {
    // Mock implementation
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
} as typeof IntersectionObserver;

/**
 * Mock ResizeObserver API
 * Required for components that observe element size changes
 */
global.ResizeObserver = class ResizeObserver {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _callback?: ResizeObserverCallback,
  ) {
    // Mock implementation - empty constructor required for ResizeObserver mock
  }

  observe(): void {
    // Mock implementation
  }

  disconnect(): void {
    // Mock implementation
  }

  unobserve(): void {
    // Mock implementation
  }
} as typeof ResizeObserver;

/**
 * Mock window.matchMedia API
 * Required for media query-based features (e.g., responsive design, dark mode)
 * Uses modern EventTarget-based API (addEventListener/removeEventListener)
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation((query: string): MediaQueryList => {
    const listeners = new Map<string, (event: MediaQueryListEvent) => void>();

    const mediaQueryList = {
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(
        (
          type: string,
          listener: (event: MediaQueryListEvent) => void,
        ): void => {
          listeners.set(type, listener);
        },
      ),
      removeEventListener: jest.fn(
        (
          type: string,
          listener: (event: MediaQueryListEvent) => void,
        ): void => {
          const storedListener = listeners.get(type);
          if (storedListener === listener) {
            listeners.delete(type);
          }
        },
      ),
      dispatchEvent: jest.fn((event: Event): boolean => {
        const listener = listeners.get(event.type);
        if (listener && event instanceof MediaQueryListEvent) {
          listener(event);
        }
        return true;
      }),
    } as unknown as MediaQueryList;

    return mediaQueryList;
  }),
});

/**
 * Mock window.scrollTo API
 * Required for components that programmatically scroll
 */
Object.defineProperty(window, "scrollTo", {
  writable: true,
  configurable: true,
  value: jest.fn(),
});

import '@testing-library/jest-dom/jest-globals';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

// jsdom lacks IntersectionObserver
globalThis.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = '';
  readonly thresholds: readonly number[] = [];

  observe(): void {
    // no-op
  }

  disconnect(): void {
    // no-op
  }

  unobserve(): void {
    // no-op
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
} as unknown as typeof IntersectionObserver;

// jsdom lacks ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
  observe(): void {
    // no-op
  }

  disconnect(): void {
    // no-op
  }

  unobserve(): void {
    // no-op
  }
};

// jsdom lacks matchMedia
Object.defineProperty(window, 'matchMedia', {
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

// jsdom does not implement scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  configurable: true,
  value: jest.fn(),
});

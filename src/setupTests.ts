import "@testing-library/jest-dom";

// Mock IntersectionObserver
// eslint-disable-next-line no-undef
global.IntersectionObserver = class IntersectionObserver {
  root = null;
  rootMargin = "";
  thresholds = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
  takeRecords() {
    return [];
  }
};

// Mock ResizeObserver
// eslint-disable-next-line no-undef
global.ResizeObserver = class ResizeObserver {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  // eslint-disable-next-line no-undef
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    // eslint-disable-next-line no-undef
    addListener: jest.fn(), // deprecated
    // eslint-disable-next-line no-undef
    removeListener: jest.fn(), // deprecated
    // eslint-disable-next-line no-undef
    addEventListener: jest.fn(),
    // eslint-disable-next-line no-undef
    removeEventListener: jest.fn(),
    // eslint-disable-next-line no-undef
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollTo
Object.defineProperty(window, "scrollTo", {
  writable: true,
  // eslint-disable-next-line no-undef
  value: jest.fn(),
});

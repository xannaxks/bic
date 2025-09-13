import "@testing-library/jest-dom";
import { beforeAll } from "vitest";

beforeAll(() => {
  // Mock IntersectionObserver
  global.IntersectionObserver = class IntersectionObserver {
    root = null;
    rootMargin = "";
    thresholds = [];
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords() {
      return [];
    }
  } as unknown as typeof IntersectionObserver;

  // Mock ResizeObserver
  global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
  } as unknown as typeof ResizeObserver;

  // Mock matchMedia
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  });

  // Mock scrollTo
  Object.defineProperty(window, "scrollTo", {
    value: () => {},
    writable: true,
  });
});

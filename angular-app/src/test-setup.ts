import { setupZonelessTestEnv } from 'jest-preset-angular/setup-env/zoneless';

// jsdom has no layout engine; provide the browser APIs used by responsive
// components and calendar scrolling. Tests can override matches when needed.
if (!window.matchMedia) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: jest.fn((query: string): MediaQueryList => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(() => true),
    })),
  });
}

if (!Element.prototype.scrollIntoView) {
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    writable: true,
    value: jest.fn(),
  });
}

// Reflect the native image loading property, absent from this jsdom version.
if (!('loading' in HTMLImageElement.prototype)) {
  Object.defineProperty(HTMLImageElement.prototype, 'loading', {
    configurable: true,
    get(this: HTMLImageElement) {
      return this.getAttribute('loading') ?? 'eager';
    },
    set(this: HTMLImageElement, value: string) {
      this.setAttribute('loading', value);
    },
  });
}

// jsdom doesn't implement ResizeObserver, which ui-angular components
// such as BmbTabsComponent use in ngAfterViewInit.
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  class ResizeObserverMock {
    observe = jest.fn();
    unobserve = jest.fn();
    disconnect = jest.fn();
  }
  (window as any).ResizeObserver = ResizeObserverMock;
  (globalThis as any).ResizeObserver = ResizeObserverMock;
}

// jsdom doesn't expose `spellcheck` as a known HTMLElement property, which
// fails Angular's strict property checks when rendering ui-angular inputs.
if (
  typeof window !== 'undefined' &&
  window.HTMLElement &&
  !('spellcheck' in window.HTMLElement.prototype)
) {
  Object.defineProperty(window.HTMLElement.prototype, 'spellcheck', {
    configurable: true,
    get(this: HTMLElement) {
      return this.hasAttribute('spellcheck');
    },
    set(this: HTMLElement, value: boolean) {
      if (value) {
        this.setAttribute('spellcheck', 'true');
      } else {
        this.removeAttribute('spellcheck');
      }
    },
  });
}

setupZonelessTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

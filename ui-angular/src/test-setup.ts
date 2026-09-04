import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var spyOn: <T = any>(obj: T, method: string) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var spyOnProperty: <T = any>(obj: T, property: string, accessType: string) => any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var jasmine: any;
}

/* ------------------------------------------------------------------ *
 *  Browser API polyfills missing in jsdom
 * ------------------------------------------------------------------ */

const mockWindowMethods = () => {
  if (typeof window === 'undefined') return;

  if (!window.matchMedia) {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  }

  if (!window.ResizeObserver) {
    class ResizeObserverMock {
      observe = jest.fn();
      unobserve = jest.fn();
      disconnect = jest.fn();
    }
    (window as any).ResizeObserver = ResizeObserverMock;
    (globalThis as any).ResizeObserver = ResizeObserverMock;
  }

  if (!window.DataTransfer) {
    class DataTransferMock {
      dropEffect = 'none';
      effectAllowed = 'all';
      files: any[] = [];
      items: any[] = [];
      types: string[] = [];
      private data: Record<string, string> = {};
      setData(type: string, value: string) {
        this.data[type] = value;
        if (!this.types.includes(type)) this.types.push(type);
      }
      getData(type: string) {
        return this.data[type] ?? '';
      }
      clearData(type?: string) {
        if (type) {
          delete this.data[type];
        } else {
          this.data = {};
        }
      }
      setDragImage() {}
    }
    (window as any).DataTransfer = DataTransferMock;
    (globalThis as any).DataTransfer = DataTransferMock;
  }

  if (!window.DragEvent) {
    class DragEventMock extends MouseEvent {
      dataTransfer: any;
      constructor(type: string, params: any = {}) {
        super(type, params);
        this.dataTransfer = params.dataTransfer ?? null;
      }
    }
    (window as any).DragEvent = DragEventMock;
    (globalThis as any).DragEvent = DragEventMock;
  }

  if (!window.ClipboardEvent) {
    class ClipboardEventMock extends Event {
      clipboardData: any;
      constructor(type: string, params: any = {}) {
        super(type, params);
        this.clipboardData = params.clipboardData ?? null;
      }
    }
    (window as any).ClipboardEvent = ClipboardEventMock;
    (globalThis as any).ClipboardEvent = ClipboardEventMock;
  }

  if (window.HTMLElement && !window.HTMLElement.prototype.scrollIntoView) {
    window.HTMLElement.prototype.scrollIntoView = jest.fn();
  }

  if (typeof document !== 'undefined' && !document.execCommand) {
    (document as any).execCommand = () => false;
  }
};

const mockDomProperties = () => {
  if (typeof window === 'undefined') return;

  if (window.HTMLElement && !('spellcheck' in window.HTMLElement.prototype)) {
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

  ['HTMLImageElement', 'HTMLIFrameElement'].forEach((tag) => {
    const proto = (window as any)[tag]?.prototype;
    if (proto && !('loading' in proto)) {
      Object.defineProperty(proto, 'loading', {
        configurable: true,
        get(this: HTMLElement) {
          return this.getAttribute('loading') ?? 'auto';
        },
        set(this: HTMLElement, value: string) {
          if (value) {
            this.setAttribute('loading', value);
          } else {
            this.removeAttribute('loading');
          }
        },
      });
    }
  });
};

/* ------------------------------------------------------------------ *
 *  Jasmine compatibility layer (Karma tests migrated to Jest)
 * ------------------------------------------------------------------ */

type JasmineSpy = ReturnType<typeof jest.fn>;

const withJasmineApi = (fn: JasmineSpy): JasmineSpy => {
  if (!fn || (fn as any).__jasmineCompat) {
    return fn;
  }

  Object.defineProperty(fn, '__jasmineCompat', { value: true });

  (fn as any).and = {
    callThrough: () => fn,
    returnValue: (value: any) => {
      fn.mockReturnValue(value);
      return fn;
    },
    returnValues: (...values: any[]) => {
      values.forEach((value) => fn.mockReturnValueOnce(value));
      return fn;
    },
    callFake: (implementation: (...args: any[]) => any) => {
      fn.mockImplementation(implementation);
      return fn;
    },
    throwError: (error: any) => {
      fn.mockImplementation(() => {
        throw error;
      });
      return fn;
    },
    resolveTo: (value: any) => {
      fn.mockResolvedValue(value);
      return fn;
    },
    rejectWith: (error: any) => {
      fn.mockRejectedValue(error);
      return fn;
    },
    stub: () => fn,
  };

  const callInfo = (index: number) => ({
    object: fn.mock.contexts[index],
    args: fn.mock.calls[index],
    returnValue: fn.mock.results[index]?.value,
  });

  (fn as any).calls = {
    count: () => fn.mock.calls.length,
    any: () => fn.mock.calls.length > 0,
    first: () => callInfo(0),
    mostRecent: () => callInfo(fn.mock.calls.length - 1),
    all: () => fn.mock.calls.map((_, index) => callInfo(index)),
    allArgs: () => fn.mock.calls,
    argsFor: (index: number) => fn.mock.calls[index],
    reset: () => fn.mockClear(),
  };

  return fn;
};

const installJasmineCompat = () => {
  if ((globalThis as any).jasmine) return;

  (globalThis as any).jasmine = {
    createSpy: (name?: string) => withJasmineApi(jest.fn() as JasmineSpy),
    createSpyObj: (
      baseName: string,
      methodNames: string[] | Record<string, (...args: any[]) => any>,
    ) => {
      const obj: Record<string, JasmineSpy> = {};
      if (Array.isArray(methodNames)) {
        methodNames.forEach(
          (method) => (obj[method] = withJasmineApi(jest.fn() as JasmineSpy)),
        );
      } else {
        Object.keys(methodNames).forEach(
          (method) =>
            (obj[method] = withJasmineApi(
              jest.fn(methodNames[method]) as JasmineSpy,
            )),
        );
      }
      return obj;
    },
    any: (clazz: any) => expect.any(clazz),
    objectContaining: (sample: Record<string, any>) =>
      expect.objectContaining(sample),
    arrayContaining: (sample: any[]) => expect.arrayContaining(sample),
    stringMatching: (pattern: string | RegExp) =>
      expect.stringMatching(pattern),
    anything: () => expect.anything(),
  };

  (globalThis as any).spyOn = (obj: any, method: string) =>
    withJasmineApi(jest.spyOn(obj, method) as JasmineSpy);

  (globalThis as any).spyOnProperty = (
    obj: any,
    property: string,
    accessType: string,
  ) => withJasmineApi(jest.spyOn(obj, property, accessType as any) as JasmineSpy);
};

/* ------------------------------------------------------------------ *
 *  Jasmine-only matchers
 * ------------------------------------------------------------------ */

const installMatchers = () => {
  expect.extend({
    toBeTrue(received: unknown) {
      const pass = received === true;
      return {
        pass,
        message: () => `expected ${received} to be true`,
      };
    },
    toBeFalse(received: unknown) {
      const pass = received === false;
      return {
        pass,
        message: () => `expected ${received} to be false`,
      };
    },
    toHaveSize(received: unknown, expected: number) {
      let size = 0;
      if (received && typeof received === 'object') {
        if ('size' in (received as any)) {
          size = (received as any).size;
        } else if ('length' in (received as any)) {
          size = (received as any).length;
        }
      }
      const pass = size === expected;
      return {
        pass,
        message: () => `expected ${received} to have size ${expected}`,
      };
    },
  });
};

mockWindowMethods();
mockDomProperties();
installJasmineCompat();
installMatchers();

setupZoneTestEnv({
  errorOnUnknownElements: true,
  errorOnUnknownProperties: true,
});

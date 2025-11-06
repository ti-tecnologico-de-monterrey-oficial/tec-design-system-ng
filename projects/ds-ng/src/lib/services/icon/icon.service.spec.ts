import { TestBed } from '@angular/core/testing';
import { BmbIconService } from './icon.service';

describe('BmbIconService', () => {
  let service: BmbIconService;
  let mockFetch: jasmine.Spy;
  let originalFetch: any;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BmbIconService);

    originalFetch = (window as any).fetch;
    mockFetch = jasmine.createSpy('fetch');
    (window as any).fetch = mockFetch;

    service.clearCache();
  });

  afterEach(() => {
    (window as any).fetch = originalFetch;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load icon successfully with filled variant', async () => {
    mockFetch.and.returnValue(Promise.resolve({
      ok: true,
      text: () => Promise.resolve('<svg>home icon</svg>')
    }));

    const result = await service.loadIconSvg('home', true);
    expect(result).toBe('<svg>home icon</svg>');
    expect(mockFetch).toHaveBeenCalled();
  });

  it('should load icon successfully with non-filled variant', async () => {
    mockFetch.and.returnValue(Promise.resolve({
      ok: true,
      text: () => Promise.resolve('<svg>home icon</svg>')
    }));

    const result = await service.loadIconSvg('home', false);
    expect(result).toBe('<svg>home icon</svg>');
    expect(mockFetch).toHaveBeenCalled();
  });

  it('should return null when icon is not found', async () => {
    mockFetch.and.returnValue(Promise.resolve({
      ok: false,
      status: 404
    }));

    const result = await service.loadIconSvg('nonexistent', true);
    expect(result).toBeNull();
  });

  it('should handle network errors gracefully', async () => {
    mockFetch.and.returnValue(Promise.reject(new Error('Network error')));

    const result = await service.loadIconSvg('home', true);
    expect(result).toBeNull();
  });

  it('should handle empty icon name', async () => {
    const result = await service.loadIconSvg('', true);
    expect(result).toBeNull();
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it('should cache loaded icons', async () => {
    mockFetch.and.returnValue(Promise.resolve({
      ok: true,
      text: () => Promise.resolve('<svg>cached icon</svg>')
    }));

    const result1 = await service.loadIconSvg('home', true);
    expect(result1).toBe('<svg>cached icon</svg>');
    expect(mockFetch).toHaveBeenCalledTimes(1);

    const result2 = await service.loadIconSvg('home', true);
    expect(result2).toBe('<svg>cached icon</svg>');
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should return correct cache size', async () => {
    expect(service.getCacheSize()).toBe(0);

    mockFetch.and.returnValue(Promise.resolve({
      ok: true,
      text: () => Promise.resolve('<svg>icon</svg>')
    }));

    await service.loadIconSvg('home', true);
    expect(service.getCacheSize()).toBe(1);
  });

  it('should clear cache correctly', async () => {
    mockFetch.and.returnValue(Promise.resolve({
      ok: true,
      text: () => Promise.resolve('<svg>icon</svg>')
    }));

    await service.loadIconSvg('home', true);
    expect(service.getCacheSize()).toBe(1);

    service.clearCache();
    expect(service.getCacheSize()).toBe(0);
  });
});

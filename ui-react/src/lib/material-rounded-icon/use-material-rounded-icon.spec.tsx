import { renderHook, waitFor, render, screen } from '@testing-library/react';
import {
  clearMaterialRoundedIconCache,
  getMaterialRoundedIconCacheSize,
  loadMaterialRoundedIconSvg,
  useMaterialRoundedIcon,
} from './use-material-rounded-icon';
import { MaterialRoundedIcon } from './material-rounded-icon';

describe('material rounded icon utilities', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    clearMaterialRoundedIconCache();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('loads and caches outlined icon', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: async () => '<svg>outlined</svg>',
    });

    const first = await loadMaterialRoundedIconSvg('home', false);
    const second = await loadMaterialRoundedIconSvg('home', false);

    expect(first).toBe('<svg>outlined</svg>');
    expect(second).toBe('<svg>outlined</svg>');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(getMaterialRoundedIconCacheSize()).toBe(1);
  });

  it('uses different cache keys for filled and outlined variants', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        text: async () => '<svg>outlined</svg>',
      })
      .mockResolvedValueOnce({
        ok: true,
        text: async () => '<svg>filled</svg>',
      });

    const outlined = await loadMaterialRoundedIconSvg('home', false);
    const filled = await loadMaterialRoundedIconSvg('home', true);

    expect(outlined).toBe('<svg>outlined</svg>');
    expect(filled).toBe('<svg>filled</svg>');
    expect(global.fetch).toHaveBeenCalledTimes(2);
    expect(getMaterialRoundedIconCacheSize()).toBe(2);
  });

  it('deduplicates concurrent requests for the same icon variant', async () => {
    let resolver: (value: { ok: boolean; text: () => Promise<string> }) => void;
    const pending = new Promise<{ ok: boolean; text: () => Promise<string> }>(
      (resolve) => {
        resolver = resolve;
      },
    );

    (global.fetch as jest.Mock).mockReturnValue(pending);

    const promiseA = loadMaterialRoundedIconSvg('alarm', false);
    const promiseB = loadMaterialRoundedIconSvg('alarm', false);

    resolver!({
      ok: true,
      text: async () => '<svg>alarm</svg>',
    });

    const [resultA, resultB] = await Promise.all([promiseA, promiseB]);

    expect(resultA).toBe('<svg>alarm</svg>');
    expect(resultB).toBe('<svg>alarm</svg>');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('returns null for empty icon name', async () => {
    const result = await loadMaterialRoundedIconSvg('', false);
    expect(result).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });
});

describe('useMaterialRoundedIcon hook', () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    clearMaterialRoundedIconCache();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('loads icon svg and exposes it in state', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: async () => '<svg>home</svg>',
    });

    const { result } = renderHook(() =>
      useMaterialRoundedIcon({ iconName: 'home', isFilled: true }),
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.svg).toBe('<svg>home</svg>');
    expect(result.current.error).toBeNull();
  });

  it('renders icon component with loaded svg', async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: async () => '<svg data-testid="inner-svg"></svg>',
    });

    render(
      <MaterialRoundedIcon
        iconName="home"
        isFilled={false}
        title="Home icon"
        className="my-icon"
      />,
    );

    await waitFor(() => {
      const icon = document.querySelector('.my-icon');
      expect(icon).not.toBeNull();
      expect(icon?.innerHTML).toContain('data-testid="inner-svg"');
    });

    expect(screen.getByTitle('Home icon')).toBeTruthy();
  });
});

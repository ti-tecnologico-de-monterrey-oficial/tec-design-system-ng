import { useCallback, useEffect, useMemo, useState } from 'react';

export const DEFAULT_MATERIAL_ROUNDED_ICON_BASE_PATH =
  '/assets/icons/material-rounded';

const iconCache = new Map<string, string | null>();
const inFlightRequests = new Map<string, Promise<string | null>>();

const normalizeIconName = (iconName: string): string =>
  iconName.trim().replace(/\s+/g, '_').toLowerCase();

const getIconCacheKey = (iconName: string, isFilled: boolean): string => {
  const normalizedName = normalizeIconName(iconName);
  return `${normalizedName}::${isFilled ? 'fill' : 'outline'}`;
};

const getIconUrl = (
  iconName: string,
  isFilled: boolean,
  basePath: string,
): string => {
  const normalizedName = normalizeIconName(iconName);
  return `${basePath}/${normalizedName}${isFilled ? '-fill' : ''}.svg`;
};

export async function loadMaterialRoundedIconSvg(
  iconName: string,
  isFilled: boolean,
  basePath: string = DEFAULT_MATERIAL_ROUNDED_ICON_BASE_PATH,
): Promise<string | null> {
  if (!iconName || iconName.trim() === '') {
    return null;
  }

  const cacheKey = getIconCacheKey(iconName, isFilled);

  if (iconCache.has(cacheKey)) {
    return iconCache.get(cacheKey) ?? null;
  }

  if (inFlightRequests.has(cacheKey)) {
    return inFlightRequests.get(cacheKey) ?? null;
  }

  const request = fetch(getIconUrl(iconName, isFilled, basePath))
    .then(async (response) => {
      if (!response.ok) {
        return null;
      }

      return response.text();
    })
    .catch(() => null)
    .then((svgContent) => {
      iconCache.set(cacheKey, svgContent);
      inFlightRequests.delete(cacheKey);
      return svgContent;
    });

  inFlightRequests.set(cacheKey, request);

  return request;
}

export function clearMaterialRoundedIconCache(): void {
  iconCache.clear();
  inFlightRequests.clear();
}

export function getMaterialRoundedIconCacheSize(): number {
  return iconCache.size;
}

export interface UseMaterialRoundedIconOptions {
  iconName: string;
  isFilled?: boolean;
  basePath?: string;
}

export interface UseMaterialRoundedIconResult {
  svg: string | null;
  loading: boolean;
  error: Error | null;
  reload: () => Promise<void>;
}

export function useMaterialRoundedIcon({
  iconName,
  isFilled = false,
  basePath = DEFAULT_MATERIAL_ROUNDED_ICON_BASE_PATH,
}: UseMaterialRoundedIconOptions): UseMaterialRoundedIconResult {
  const [svg, setSvg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const cacheKey = useMemo(
    () => getIconCacheKey(iconName, isFilled),
    [iconName, isFilled],
  );

  const load = useCallback(async () => {
    if (!iconName || iconName.trim() === '') {
      setSvg(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const svgContent = await loadMaterialRoundedIconSvg(
        iconName,
        isFilled,
        basePath,
      );
      setSvg(svgContent);
    } catch (caughtError) {
      setSvg(null);
      setError(
        caughtError instanceof Error ? caughtError : new Error('Unknown error'),
      );
    } finally {
      setLoading(false);
    }
  }, [basePath, iconName, isFilled]);

  useEffect(() => {
    let active = true;

    const run = async () => {
      if (!iconName || iconName.trim() === '') {
        if (active) {
          setSvg(null);
          setLoading(false);
          setError(null);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const svgContent = await loadMaterialRoundedIconSvg(
          iconName,
          isFilled,
          basePath,
        );

        if (active) {
          setSvg(svgContent);
        }
      } catch (caughtError) {
        if (active) {
          setSvg(null);
          setError(
            caughtError instanceof Error
              ? caughtError
              : new Error('Unknown error'),
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void run();

    return () => {
      active = false;
    };
  }, [basePath, cacheKey, iconName, isFilled]);

  return {
    svg,
    loading,
    error,
    reload: load,
  };
}

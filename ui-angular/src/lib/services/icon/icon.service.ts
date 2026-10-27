import {
  normalizeIconName,
  getIconUrl,
} from '../../_shared/logic/services/icon';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BmbIconService {
  private iconCache = new Map<string, string>();
  private readonly storybookPath = '/assets/icons/material-rounded';
  private readonly angularAppPath = '/assets/icons/material-rounded';

  async loadIconSvg(
    iconName: string,
    isFilled: boolean,
  ): Promise<string | null> {
    if (!iconName || iconName.trim() === '') {
      return null;
    }

    const cleanName = normalizeIconName(iconName);
    if (this.iconCache.has(cleanName)) {
      return this.iconCache.get(cleanName) || null;
    }

    const isStorybook =
      window.location.href.includes('chromatic') ||
      window.location.port === '6006' ||
      document.querySelector('#storybook-preview-wrapper') !== null;

    const url: string = isStorybook
      ? getIconUrl(this.storybookPath, cleanName, isFilled)
      : getIconUrl(this.angularAppPath, cleanName, isFilled);

    try {
      const response = await fetch(url);

      if (response.ok) {
        const svgContent = await response.text();
        this.iconCache.set(cleanName, svgContent);
        return svgContent;
      } else {
        console.warn(
          `Icon not found: ${iconName} at ${url} (HTTP ${response.status})`,
        );
      }
    } catch (error) {
      console.error(`Failed to fetch icon from ${url}:`, error);
    }

    return null;
  }

  clearCache(): void {
    this.iconCache.clear();
  }

  getCacheSize(): number {
    return this.iconCache.size;
  }
}

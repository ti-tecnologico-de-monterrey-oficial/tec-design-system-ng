import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BmbIconService {
  private iconCache = new Map<string, string>();
  private readonly storybookPath = '/assets/icons/material-rounded';
  private readonly angularAppPath =
    '/node_modules/@material-symbols/svg-400/rounded';

  async loadIconSvg(
    iconName: string,
    isFilled: boolean,
  ): Promise<string | null> {
    if (!iconName || iconName.trim() === '') {
      return null;
    }

    const cleanName = iconName.trim().replace(/\s+/g, '_').toLowerCase();
    if (this.iconCache.has(cleanName)) {
      return this.iconCache.get(cleanName) || null;
    }

    const isStorybook =
      window.location.href.includes('chromatic') ||
      window.location.port === '6006' ||
      document.querySelector('#storybook-preview-wrapper') !== null;

    const url: string = isStorybook
      ? `${this.storybookPath}/${cleanName}${isFilled ? '-fill' : ''}.svg`
      : `${this.angularAppPath}/${cleanName}${isFilled ? '-fill' : ''}.svg`;

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

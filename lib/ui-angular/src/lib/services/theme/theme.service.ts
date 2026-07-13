import { inject, Injectable, signal } from '@angular/core';
import { BMB_DEFAULT_THEME } from './theme-config';
import { getInitialTheme_core, getLocalTheme, setLocalTheme } from '../../_core/index';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private defaultTheme =
    inject(BMB_DEFAULT_THEME, { optional: true }) || 'light';

  readonly theme = signal<string>(getInitialTheme_core(this.defaultTheme));

  getInitialTheme(): string {
    return getInitialTheme_core(this.defaultTheme);
  }

  setInitialTheme(newInitialTheme?: string): void {
    const savedTheme = getLocalTheme();
    if (newInitialTheme && !savedTheme) {
      this.theme.set(newInitialTheme);
    } else if (savedTheme) {
      this.theme.set(savedTheme);
    } else {
      this.theme.set(this.defaultTheme);
    }

    setLocalTheme(this.theme());
  }

  setThemeAndSaveInLocal(theme: string): void {
    this.theme.set(theme);
    setLocalTheme(theme);
  }

  getTheme(): string {
    return this.theme();
  }

  getDefaultTheme(): string {
    return this.defaultTheme;
  }
}

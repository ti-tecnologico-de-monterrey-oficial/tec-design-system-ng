import {
  resolveInitialTheme,
  resolveRequestedTheme,
} from '../../_shared/logic/services/theme';
import { inject, Injectable, signal } from '@angular/core';
import { BMB_DEFAULT_THEME } from './theme-config';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private defaultTheme =
    inject(BMB_DEFAULT_THEME, { optional: true }) || 'light';

  readonly theme = signal<string>(this.getInitialTheme());

  getInitialTheme(): string {
    return resolveInitialTheme(
      localStorage.getItem('theme'),
      this.defaultTheme,
    );
  }

  setInitialTheme(newInitialTheme?: string): void {
    const savedTheme = localStorage.getItem('theme');
    this.theme.set(
      resolveRequestedTheme(savedTheme, newInitialTheme, this.defaultTheme),
    );
    document.documentElement.setAttribute('data-theme', this.theme());
  }

  setThemeAndSaveInLocal(theme: string): void {
    this.theme.set(theme);
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', this.theme());
  }

  getTheme(): string {
    return this.theme();
  }

  getDefaultTheme(): string {
    return this.defaultTheme;
  }
}

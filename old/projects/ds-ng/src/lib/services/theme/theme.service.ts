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
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return this.defaultTheme;
  }

  setInitialTheme(newInitialTheme?: string): void {
    console.log('setInitialTheme');

    const savedTheme = localStorage.getItem('theme');
    if (newInitialTheme && !savedTheme) {
      this.theme.set(newInitialTheme);
    } else if (savedTheme) {
      this.theme.set(savedTheme);
    } else {
      this.theme.set(this.defaultTheme);
    }

    document.documentElement.setAttribute('data-theme', this.theme());
  }

  setThemeAndSaveInLocal(theme: string): void {
    console.log('setThemeAndSaveInLocal');

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

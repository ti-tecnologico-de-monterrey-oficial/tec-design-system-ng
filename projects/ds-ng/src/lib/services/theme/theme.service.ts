import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  constructor(
    @Optional() @Inject('defaultTheme') private defaultTheme: string,
  ) {}

  private themeSubject = new BehaviorSubject<string>(
    localStorage.getItem('theme') || this.defaultTheme || 'light',
  );
  theme$ = this.themeSubject.asObservable();

  getDefaultTheme(): string {
    return this.defaultTheme || 'light';
  }

  setTheme(theme: string): void {
    this.themeSubject.next(theme);
  }
}

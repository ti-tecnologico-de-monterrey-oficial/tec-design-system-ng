import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>(
    localStorage.getItem('theme') || 'light',
  );
  theme$ = this.themeSubject.asObservable();

  getDefaultTheme(): string {
    return 'light';
  }

  setTheme(theme: string): void {
    this.themeSubject.next(theme);
  }
}

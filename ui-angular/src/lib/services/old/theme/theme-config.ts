import { InjectionToken } from '@angular/core';

export const BMB_DEFAULT_THEME = new InjectionToken<string>(
  'BMB_DEFAULT_THEME',
  {
    providedIn: 'root',
    factory: () => 'light',
  },
);

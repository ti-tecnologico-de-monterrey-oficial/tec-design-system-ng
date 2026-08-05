import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BmbNotificationService,
  BmbCalendarService,
  BmbLoginOnboardingService,
  BmbAlertCenterService,
  BmbNativeModalService,
  BmbProjectionContentService,
  BmbTranslationsService,
  ThemeService,
} from '../../projects/ds-ng/src/public-api';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { BMB_DEFAULT_THEME } from '../../projects/ds-ng/src/lib/services/theme/theme-config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(),
    importProvidersFrom([BrowserAnimationsModule]),
    importProvidersFrom([
      BrowserAnimationsModule,
      BmbNotificationService,
      BmbCalendarService,
      BmbLoginOnboardingService,
      BmbAlertCenterService,
      BmbNativeModalService,
      BmbProjectionContentService,
      BmbTranslationsService,
      ThemeService,
    ]),
    { provide: BMB_DEFAULT_THEME, useValue: 'light' },
  ],
};

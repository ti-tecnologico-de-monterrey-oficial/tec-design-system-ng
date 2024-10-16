import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BmbNotificationService,
  BmbCalendarService,
  BmbLoginOnboardingService,
} from '../../projects/ds-ng/src/public-api';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule]),
    importProvidersFrom([
      BrowserAnimationsModule,
      BmbNotificationService,
      BmbCalendarService,
      BmbLoginOnboardingService,
    ]),
  ],
};

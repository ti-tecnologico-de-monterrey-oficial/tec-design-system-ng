import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  BmbNotificationService,
  BmbCalendarService,
  BmbLoginOnboardingService,
  BmbAlertCenterService,
} from '../../projects/ds-ng/src/public-api';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom([BrowserAnimationsModule]),
    importProvidersFrom([
      BrowserAnimationsModule,
      BmbNotificationService,
      BmbCalendarService,
      BmbLoginOnboardingService,
      BmbAlertCenterService,
    ]),
  ],
};

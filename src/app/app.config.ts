import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbLoginOnboardingService } from '../../projects/ds-ng/src/public-api';
import {
  BmbNotificationService,
  BmbCalendarService,
} from '../../projects/ds-ng/src/public-api';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom([BrowserAnimationsModule]),
    BmbLoginOnboardingService,
    importProvidersFrom([
      BrowserAnimationsModule,
      BmbNotificationService,
      BmbCalendarService,
    ]),
  ],
};

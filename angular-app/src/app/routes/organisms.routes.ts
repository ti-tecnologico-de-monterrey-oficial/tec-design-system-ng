import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'access-to-external-link',
    title: 'Access to external link',
    loadComponent: () =>
      import(
        '../pages/migration/external-link-test/external-link-test.component'
      ).then((m) => m.ExternalLinkTestComponent),
  },
  {
    path: 'timestream-card-full',
    title: 'Timestream card (full)',
    loadComponent: () =>
      import(
        '../pages/migration/timestream-card-test/timestream-card-test.component'
      ).then((m) => m.TimestreamCardTestComponent),
  },
  {
    path: 'login-onboarding-mobile',
    title: 'Login onboarding mobile',
    loadComponent: () =>
      import(
        '../pages/migration/login-onboarding-test/login-onboarding-test.component'
      ).then((m) => m.LoginOnboardingTestComponent),
  },
  {
    path: 'account-statement',
    title: 'Account statement',
    loadComponent: () =>
      import(
        '../pages/migration/account-statement-test/account-statement-test.component'
      ).then((m) => m.AccountStatementTestComponent),
  },
  {
    path: 'notification-center',
    title: 'Notification center',
    loadComponent: () =>
      import(
        '../pages/migration/alert-center-test/alert-center-test.component'
      ).then((m) => m.AlertCenterTestComponent),
  },
  {
    path: 'grades',
    title: 'Grades',
    loadComponent: () =>
      import('../pages/migration/grades-test/grades-test.component').then(
        (m) => m.GradesTestComponent,
      ),
  },
  {
    path: 'calendar-standard',
    title: 'Calendar standard',
    loadComponent: () =>
      import('../pages/calendar/calendar.component').then(
        (m) => m.CalendarComponent,
      ),
  },
];

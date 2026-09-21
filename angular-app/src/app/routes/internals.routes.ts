import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'header-mitec',
    title: 'Header mitec',
    loadComponent: () =>
      import(
        '../pages/migration/header-mitec-test/header-mitec-test.component'
      ).then((m) => m.HeaderMitecTestComponent),
  },
  {
    path: 'login-content',
    title: 'Login content',
    loadComponent: () =>
      import('../pages/migration/login-test/login-test.component').then(
        (m) => m.LoginTestComponent,
      ),
  },
  {
    path: 'web-templates',
    title: 'Web templates',
    loadComponent: () =>
      import(
        '../pages/migration/web-templates-test/web-templates-test.component'
      ).then((m) => m.WebTemplatesTestComponent),
  },
  {
    path: 'title-content-template',
    title: 'Title content template',
    loadComponent: () =>
      import(
        '../pages/migration/title-content-test/title-content-test.component'
      ).then((m) => m.TitleContentTestComponent),
  },
  {
    path: 'timestream',
    title: 'Timestream',
    loadComponent: () =>
      import(
        '../pages/migration/timestream-test/timestream-test.component'
      ).then((m) => m.TimestreamTestComponent),
  },
];

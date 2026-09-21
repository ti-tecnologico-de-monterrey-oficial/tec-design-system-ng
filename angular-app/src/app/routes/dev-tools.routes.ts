import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'box-icon',
    title: 'Box icon',
    loadComponent: () =>
      import('../pages/box-icon-page/box-icon-page').then((m) => m.BoxIconPage),
  },
  {
    path: 'portal',
    title: 'Portal',
    loadComponent: () =>
      import('../pages/migration/portal-test/portal-test.component').then(
        (m) => m.PortalTestComponent,
      ),
  },
];

import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'mobile',
    title: 'Mobile',
    loadComponent: () =>
      import(
        '../pages/migration/mobile-templates-test/mobile-templates-test.component'
      ).then((m) => m.MobileTemplatesTestComponent),
  },
];

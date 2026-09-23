import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'digital-id',
    title: 'Digital ID',
    loadComponent: () =>
      import(
        '../pages/migration/digital-id-test/digital-id-test.component'
      ).then((m) => m.DigitalIdTestComponent),
  },
];

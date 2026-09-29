import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'notice-card',
    title: 'Notice card',
    loadComponent: () =>
      import(
        '../pages/migration/notice-card-test/notice-card-test.component'
      ).then((m) => m.NoticeCardTestComponent),
  },
];

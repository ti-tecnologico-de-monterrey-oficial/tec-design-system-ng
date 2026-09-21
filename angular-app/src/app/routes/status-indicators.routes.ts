import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'status-icon',
    title: 'Status icon',
    loadComponent: () =>
      import('../pages/icon-status-page/icon-status-page').then(
        (m) => m.IconStatusPage,
      ),
  },
  {
    path: 'paginator',
    title: 'Paginator',
    loadComponent: () =>
      import('../pages/paginator-page/paginator-page').then(
        (m) => m.PaginatorPage,
      ),
  },
  {
    path: 'multi-dot-paginator',
    title: 'Multi dot paginator',
    loadComponent: () =>
      import('../pages/dot-paginator/dot-paginator.component').then(
        (m) => m.DotPaginatorComponent,
      ),
  },
  {
    path: 'progress-bar',
    title: 'Progress bar',
    loadComponent: () =>
      import(
        '../pages/migration/progress-bar-test/progress-bar-test.component'
      ).then((m) => m.ProgressBarTestComponent),
  },
];

import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'sidebar',
    title: 'Sidebar',
    loadComponent: () =>
      import('../pages/migration/sidebar-test/sidebar-test.component').then(
        (m) => m.SidebarTestComponent,
      ),
  },
];

import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'bottom-navigation-bar',
    title: 'Bottom navigation bar',
    loadComponent: () =>
      import(
        '../pages/migration/bottom-navigation-bar-test/bottom-navigation-bar-test.component'
      ).then((m) => m.BottomNavigationBarTestComponent),
  },
  {
    path: 'action-menu',
    title: 'Action menu',
    loadComponent: () =>
      import(
        '../pages/migration/action-menu-test/action-menu-test.component'
      ).then((m) => m.ActionMenuTestComponent),
  },
  {
    path: 'chevron-title-selector',
    title: 'Chevron title selector',
    loadComponent: () =>
      import(
        '../pages/migration/chevron-title-selector-test/chevron-title-selector-test.component'
      ).then((m) => m.ChevronTitleSelectorTestComponent),
  },
  {
    path: 'fab-overlay-drawer',
    title: 'FAB Overlay drawer',
    loadComponent: () =>
      import(
        '../pages/migration/drawer-overlay-test/drawer-overlay-test.component'
      ).then((m) => m.DrawerOverlayTestComponent),
  },
  {
    path: 'inner-header',
    title: 'Inner header',
    loadComponent: () =>
      import(
        '../pages/migration/inner-header-test/inner-header-test.component'
      ).then((m) => m.InnerHeaderTestComponent),
  },
  {
    path: 'top-bar',
    title: 'Top bar',
    loadComponent: () =>
      import('../pages/migration/top-bar-test/top-bar-test.component').then(
        (m) => m.TopBarTestComponent,
      ),
  },
];

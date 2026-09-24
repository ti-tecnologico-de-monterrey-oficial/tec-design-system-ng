import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'button-icon',
    title: 'Button icon',
    loadComponent: () =>
      import('../pages/button-icon-page/button-icon-page').then(
        (m) => m.ButtonIconPage,
      ),
  },
  {
    path: 'action-icon',
    title: 'Action icon',
    loadComponent: () =>
      import(
        '../pages/migration/action-icon-test/action-icon-test.component'
      ).then((m) => m.ActionIconTestComponent),
  },
  {
    path: 'interactive-icon',
    title: 'Interactive icon',
    loadComponent: () =>
      import(
        '../pages/migration/interactive-icon-test/interactive-icon-test.component'
      ).then((m) => m.InteractiveIconTestComponent),
  },
  {
    path: 'card-button',
    title: 'Card button',
    loadComponent: () =>
      import('../pages/card-button/card-button.component').then(
        (m) => m.CardButton,
      ),
  },
  {
    path: 'container-button-default',
    title: 'Container button (Default)',
    loadComponent: () =>
      import(
        '../pages/migration/container-button-test/container-button-test.component'
      ).then((m) => m.ContainerButtonTestComponent),
  },
];

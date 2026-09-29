import type { Routes } from '@angular/router';

export const componentTestRoutes: Routes = [
  {
    path: 'pages/dev-tools',
    loadChildren: () => import('./dev-tools.routes').then((m) => m.routes),
  },
  {
    path: 'pages/buttons',
    loadChildren: () => import('./buttons.routes').then((m) => m.routes),
  },
  {
    path: 'pages/inputs',
    loadChildren: () => import('./inputs.routes').then((m) => m.routes),
  },
  {
    path: 'pages/status-indicators',
    loadChildren: () =>
      import('./status-indicators.routes').then((m) => m.routes),
  },
  {
    path: 'pages/visual-labels',
    loadChildren: () => import('./visual-labels.routes').then((m) => m.routes),
  },
  {
    path: 'pages/menus',
    loadChildren: () => import('./menus.routes').then((m) => m.routes),
  },
  {
    path: 'pages/internals',
    loadChildren: () => import('./internals.routes').then((m) => m.routes),
  },
  {
    path: 'pages/containers',
    loadChildren: () => import('./containers.routes').then((m) => m.routes),
  },
  {
    path: 'pages/mitec-app',
    loadChildren: () => import('./mitec-app.routes').then((m) => m.routes),
  },
  {
    path: 'pages/mitec-card',
    loadChildren: () => import('./mitec-card.routes').then((m) => m.routes),
  },
  {
    path: 'pages/organisms',
    loadChildren: () => import('./organisms.routes').then((m) => m.routes),
  },
  {
    path: 'pages/components',
    loadChildren: () => import('./components.routes').then((m) => m.routes),
  },
  {
    path: 'pages/deprecated',
    loadChildren: () => import('./deprecated.routes').then((m) => m.routes),
  },
  {
    path: 'pages/templates',
    loadChildren: () => import('./templates.routes').then((m) => m.routes),
  },
];

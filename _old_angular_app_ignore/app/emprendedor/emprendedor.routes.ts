import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./emprendedor.component'),
    children: [
      {
        path: 'inicio',
        loadComponent: () => import('./pages/home/home.component'),
      },
      {
        path: 'vivencia',
        loadComponent: () => import('./pages/story/story.component'),
      },
    ],
  },
];

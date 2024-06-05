import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'emprendedor',
    loadChildren: () =>
      import('./emprendedor/emprendedor.routes').then((r) => r.routes),
  },
  {
    path: 'my-page',
    loadComponent: () =>
      import('./my-page/my-page.component').then((m) => m.MyPageComponent),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

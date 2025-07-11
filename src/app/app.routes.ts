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
  {
    path: 'component-test',
    loadComponent: () =>
      import('./component-test/component-test.component').then(
        (c) => c.AppComponent,
      ),
  },
  {
    path: 'form-validator-test',
    loadComponent: () =>
      import('./form-validator-test/form-validator-test.component').then(
        (f) => f.FormValidatorTestComponent,
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

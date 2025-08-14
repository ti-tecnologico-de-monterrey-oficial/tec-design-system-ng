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
      import('./pages/my-page/my-page.component').then(
        (m) => m.MyPageComponent,
      ),
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'component-test',
    loadComponent: () =>
      import('./pages/component-test/component-test.component').then(
        (c) => c.AppComponent,
      ),
  },
  {
    path: 'form-validator',
    loadComponent: () =>
      import('./pages/form-validator-test/form-validator-test.component').then(
        (f) => f.FormValidatorTestComponent,
      ),
  },
  {
    path: 'dropdown',
    loadComponent: () =>
      import('./pages/dropdown/dropdown.component').then(
        (d) => d.DropdownPageComponent,
      ),
  },
  {
    path: 'alerts',
    loadComponent: () =>
      import('./pages/alerts/alerts.component').then(
        (a) => a.AlertsPageComponent,
      ),
  },
  {
    path: 'flex',
    loadComponent: () =>
      import('./pages/flex/flex.component').then((f) => f.FlexComponent),
  },
  {
    path: 'homeCardTransition',
    loadComponent: () =>
      import('./pages/homeCardTransition/homeCardTransition.component').then(
        (h) => h.HomeCardComponent,
      ),
  },
  {
    path: 'tables',
    loadComponent: () =>
      import('./pages/new-tables/new-tables.component').then(
        (n) => n.NewTablesComponent,
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

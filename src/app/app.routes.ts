import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'emprendedor',
    loadChildren: () =>
      import('./emprendedor/emprendedor.routes').then((r) => r.routes),
    title: 'Emprendedor',
  },
  {
    path: 'my-page',
    title: 'My Page',
    loadComponent: () =>
      import('./pages/my-page/my-page.component').then(
        (m) => m.MyPageComponent,
      ),
  },
  {
    path: 'home',
    title: 'Home',
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
    title: 'Form Validator Test',
    loadComponent: () =>
      import('./pages/form-validator-test/form-validator-test.component').then(
        (f) => f.FormValidatorTestComponent,
      ),
  },
  {
    path: 'dropdown',
    title: 'Dropdown Test',
    loadComponent: () =>
      import('./pages/dropdown/dropdown.component').then(
        (d) => d.DropdownPageComponent,
      ),
  },
  {
    path: 'dropzone',
    title: 'Dropzone Test',
    loadComponent: () =>
      import('./pages/dropzone/dropzone.component').then(
        (d) => d.DropzonePageComponent,
      ),
  },
  {
    path: 'alerts',
    title: 'Alerts Test',
    loadComponent: () =>
      import('./pages/alerts/alerts.component').then(
        (a) => a.AlertsPageComponent,
      ),
  },
  {
    path: 'flex',
    title: 'Flex Test',
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
    path: 'calendar',
    title: 'Calendar Test',
    loadComponent: () =>
      import('./pages/calendar/calendar.component').then(
        (c) => c.CalendarComponent,
      ),
  },
  {
    path: 'ia',
    title: 'Inteligencia Artificial',
    loadComponent: () =>
      import('./pages/ia/ia.component').then((c) => c.IaComponent),
  },
  {
    path: 'table-lite',
    title: 'Table Lite',
    loadComponent: () =>
      import('./pages/table-lite/table-lite.component').then(
        (t) => t.TableLiteComponent,
      ),
  },
  {
    path: 'table-lts',
    title: 'Table LTS',
    loadComponent: () =>
      import('./pages/table-lts/table-lts.component').then(
        (t) => t.TableLtsComponent,
      ),
  },
  {
    path: 'table-html',
    title: 'Table HTML',
    loadComponent: () =>
      import('./pages/table-html/table-html.component').then(
        (t) => t.TableHtmlComponent,
      ),
  },
  {
    path: 'multi-dot-paginator',
    title: 'Multi Dot Paginator',
    loadComponent: () =>
      import('./pages/dot-paginator/dot-paginator.component').then(
        (m) => m.DotPaginatorComponent,
      ),
  },
  {
    path: 'step-progress-bar',
    title: 'Step progress bar',
    loadComponent: () =>
      import('./pages/step-progress-bar/step-progress-car.component').then(
        (n) => n.BmbStepProgressBarPageComponent,
      ),
  },
  {
    path: 'dashboard-indicators',
    title: 'Dashboard Indicators',
    loadComponent: () =>
      import(
        './pages/dashboard-indicators/dashboard-indicators.component'
      ).then((d) => d.DashboardIndicatorsComponent),
  },
  {
    path: 'identity',
    title: 'Identity',
    loadComponent: () =>
      import('./pages/identity/identity.component').then(
        (i) => i.IdentityComponent,
      ),
  },
  {
    path: 'colors',
    title: 'Colors',
    loadComponent: () =>
      import('./pages/colors/colors.component').then((j) => j.ColorsComponent),
  },
  {
    path: 'col-sys',
    title: 'Column sys',
    loadComponent: () =>
      import('./pages/layout-columns/layout-columns.component').then(
        (j) => j.LayoutColumnsComponent,
      ),
  },
  {
    path: 'modals',
    title: 'Modals',
    loadComponent: () =>
      import('./pages/modals-templates/modals-templates.component').then(
        (m) => m.ModalsTemplatesComponent,
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

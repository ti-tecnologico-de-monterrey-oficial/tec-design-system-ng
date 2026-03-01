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
        (b) => b.AppComponent,
      ),
  },
  {
    path: 'form-validator',
    title: 'Form Validator Test',
    loadComponent: () =>
      import('./pages/form-validator-test/form-validator-test.component').then(
        (c) => c.FormValidatorTestComponent,
      ),
  },
  {
    path: 'input',
    title: 'Input Test',
    loadComponent: () =>
      import('./pages/input/input.component').then((d) => d.InputPageComponent),
  },
  {
    path: 'dropdown',
    title: 'Dropdown Test',
    loadComponent: () =>
      import('./pages/dropdown/dropdown.component').then(
        (e) => e.DropdownPageComponent,
      ),
  },
  {
    path: 'dropzone',
    title: 'Dropzone Test',
    loadComponent: () =>
      import('./pages/dropzone/dropzone.component').then(
        (f) => f.DropzonePageComponent,
      ),
  },
  {
    path: 'alerts',
    title: 'Alerts Test',
    loadComponent: () =>
      import('./pages/alerts/alerts.component').then(
        (g) => g.AlertsPageComponent,
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
        (i) => i.CalendarComponent,
      ),
  },
  {
    path: 'ia',
    title: 'Inteligencia Artificial',
    loadComponent: () =>
      import('./pages/ia/ia.component').then((i) => i.IaComponent),
  },
  {
    path: 'table-lite',
    title: 'Table Lite',
    loadComponent: () =>
      import('./pages/table-lite/table-lite.component').then(
        (j) => j.TableLiteComponent,
      ),
  },
  {
    path: 'table-lts',
    title: 'Table LTS',
    loadComponent: () =>
      import('./pages/table-lts/table-lts.component').then(
        (k) => k.TableLtsComponent,
      ),
  },
  {
    path: 'table-html',
    title: 'Table HTML',
    loadComponent: () =>
      import('./pages/table-html/table-html.component').then(
        (l) => l.TableHtmlComponent,
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
      ).then((o) => o.DashboardIndicatorsComponent),
  },
  {
    path: 'identity',
    title: 'Identity',
    loadComponent: () =>
      import('./pages/identity/identity.component').then(
        (p) => p.IdentityComponent,
      ),
  },
  {
    path: 'colors',
    title: 'Colors',
    loadComponent: () =>
      import('./pages/colors/colors.component').then((q) => q.ColorsComponent),
  },
  {
    path: 'col-sys',
    title: 'Column sys',
    loadComponent: () =>
      import('./pages/layout-columns/layout-columns.component').then(
        (r) => r.LayoutColumnsComponent,
      ),
  },
  {
    path: 'modals',
    title: 'Modals',
    loadComponent: () =>
      import('./pages/modals-templates/modals-templates.component').then(
        (s) => s.ModalsTemplatesComponent,
      ),
  },
  {
    path: 'menu',
    title: 'Menu',
    loadComponent: () =>
      import('./pages/menu/menu.component').then((t) => t.MenuPageComponent),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
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
    path: 'test-card-button',
    title: 'Card Button Test',
    loadComponent: () =>
      import('./pages/templates/generic-card.component').then(
        (component) => component.GenericCard,
      ),
  },
  {
    path: 'templates',
    title: 'Generic Card Templates',
    loadComponent: () =>
      import('./pages/templates/generic-card.component').then(
        (component) => component.GenericCard,
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
  // {
  //   path: 'table-html',
  //   title: 'Table HTML',
  //   loadComponent: () =>
  //     import('./pages/table-html/table-html.component').then(
  //       (l) => l.TableHtmlComponent,
  //     ),
  // },
  {
    path: 'table-main',
    title: 'Table TEST',
    loadComponent: () =>
      import('./pages/table-main/table-main.component').then(
        (ll) => ll.TableMainComponent,
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
  {
    path: 'avatar',
    title: 'Avatar List',
    loadComponent: () =>
      import('./pages/avatars/avatars.component').then(
        (t) => t.AvatarsComponent,
      ),
  },
  { path: 'components', pathMatch: 'full', redirectTo: 'components/carousel' },
  {
    path: 'components/carousel',
    title: 'BmbCarousel | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/carousel-page/carousel-page').then(
        ({ CarouselPage }) => CarouselPage,
      ),
  },
  {
    path: 'components/container',
    title: 'BmbContainer | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/container-page/container-page').then(
        ({ ContainerPage }) => ContainerPage,
      ),
  },
  {
    path: 'components/divider',
    title: 'BmbDivider | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/divider-page/divider-page').then(
        ({ DividerPage }) => DividerPage,
      ),
  },
  {
    path: 'components/mitec-logo-animation',
    title: 'BmbMitecLogoAnimation | Bamboo migration dashboard',
    loadComponent: () =>
      import(
        './components/mitec-logo-animation-page/mitec-logo-animation-page'
      ).then(({ MitecLogoAnimationPage }) => MitecLogoAnimationPage),
  },
  {
    path: 'components/notification-counter',
    title: 'BmbNotificationCounter | Bamboo migration dashboard',
    loadComponent: () =>
      import(
        './components/notification-counter-page/notification-counter-page'
      ).then(({ NotificationCounterPage }) => NotificationCounterPage),
  },
  {
    path: 'components/iframe',
    title: 'BmbIframe | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/iframe-page/iframe-page').then(
        ({ IframePage }) => IframePage,
      ),
  },
  {
    path: 'components/grade-value',
    title: 'BmbGradeValue | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/grade-value-page/grade-value-page').then(
        ({ GradeValuePage }) => GradeValuePage,
      ),
  },
  {
    path: 'components/card',
    title: 'BmbCard | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/card-page/card-page').then(
        ({ CardPage }) => CardPage,
      ),
  },
  {
    path: 'components/overlay',
    title: 'BmbOverlay | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/overlay-page/overlay-page').then(
        ({ OverlayPage }) => OverlayPage,
      ),
  },
  {
    path: 'components/check-external-link-button',
    title: 'BmbCheckExternalLinkButton | Bamboo migration dashboard',
    loadComponent: () =>
      import(
        './components/check-external-link-button-page/check-external-link-button-page'
      ).then(({ CheckExternalLinkButtonPage }) => CheckExternalLinkButtonPage),
  },
  {
    path: 'components/pull-wedge',
    title: 'BmbPullWedge | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/pull-wedge/pull-wedge').then(
        ({ PullWedgePage }) => PullWedgePage,
      ),
  },
  {
    path: 'components/server-table',
    title: 'BmbServerTable | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/server-table/server-table').then(
        ({ ServerTablePage }) => ServerTablePage,
      ),
  },
  {
    path: 'components/ai-chat-bubble',
    title: 'BmbAiChatBubble | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/ai-chat-bubble-page/ai-chat-bubble-page').then(
        ({ AiChatBubblePage }) => AiChatBubblePage,
      ),
  },
  {
    path: 'components/dropzone',
    title: 'BmbDropzone | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/dropzone-page/dropzone-page').then(
        ({ DropzonePage }) => DropzonePage,
      ),
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

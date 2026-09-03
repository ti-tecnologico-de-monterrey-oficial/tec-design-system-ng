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
    path: 'card-button',
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
  { path: 'components', pathMatch: 'full', redirectTo: 'pages/carousel' },
  {
    path: 'pages/carousel',
    title: 'BmbCarousel | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/carousel-page/carousel-page').then(
        ({ CarouselPage }) => CarouselPage,
      ),
  },
  {
    path: 'pages/container',
    title: 'BmbContainer | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/container-page/container-page').then(
        ({ ContainerPage }) => ContainerPage,
      ),
  },
  {
    path: 'pages/divider',
    title: 'BmbDivider | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/divider-page/divider-page').then(
        ({ DividerPage }) => DividerPage,
      ),
  },
  {
    path: 'pages/mitec-logo-animation',
    title: 'BmbMitecLogoAnimation | Bamboo migration dashboard',
    loadComponent: () =>
      import(
        './pages/mitec-logo-animation-page/mitec-logo-animation-page'
      ).then(({ MitecLogoAnimationPage }) => MitecLogoAnimationPage),
  },
  {
    path: 'pages/notification-counter',
    title: 'BmbNotificationCounter | Bamboo migration dashboard',
    loadComponent: () =>
      import(
        './pages/notification-counter-page/notification-counter-page'
      ).then(({ NotificationCounterPage }) => NotificationCounterPage),
  },
  {
    path: 'pages/iframe',
    title: 'BmbIframe | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/iframe-page/iframe-page').then(
        ({ IframePage }) => IframePage,
      ),
  },
  {
    path: 'pages/grade-value',
    title: 'BmbGradeValue | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/grade-value-page/grade-value-page').then(
        ({ GradeValuePage }) => GradeValuePage,
      ),
  },
  {
    path: 'pages/card',
    title: 'Generic card | BmbCard | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/card-page/card-page').then(({ CardPage }) => CardPage),
  },
  {
    path: 'pages/overlay',
    title: 'BmbOverlay | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/overlay-page/overlay-page').then(
        ({ OverlayPage }) => OverlayPage,
      ),
  },
  {
    path: 'pages/modal',
    title: 'BmbModal | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/modal-page/modal-page').then(
        ({ ModalPage }) => ModalPage,
      ),
  },
  {
    path: 'pages/check-external-link-button',
    title: 'BmbCheckExternalLinkButton | Bamboo migration dashboard',
    loadComponent: () =>
      import(
        './pages/check-external-link-button-page/check-external-link-button-page'
      ).then(({ CheckExternalLinkButtonPage }) => CheckExternalLinkButtonPage),
  },
  {
    path: 'pages/logo',
    title: 'BmbLogo | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/logo-page/logo-page').then(({ LogoPage }) => LogoPage),
  },
  {
    path: 'pages/user-image',
    title: 'BmbUserImage | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/user-image-page/user-image-page').then(
        ({ UserImagePage }) => UserImagePage,
      ),
  },
  {
    path: 'pages/pull-wedge',
    title: 'BmbPullWedge | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/pull-wedge/pull-wedge').then(
        ({ PullWedgePage }) => PullWedgePage,
      ),
  },
  {
    path: 'pages/server-table',
    title: 'BmbServerTable | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/server-table/server-table').then(
        ({ ServerTablePage }) => ServerTablePage,
      ),
  },
  {
    path: 'pages/skeleton',
    title: 'BmbSkeleton | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/skeleton-page/skeleton-page').then(
        ({ SkeletonPage }) => SkeletonPage,
      ),
  },
  {
    path: 'pages/value-counter',
    title: 'BmbValueCounter | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/value-counter-page/value-counter-page').then(
        ({ ValueCounterPage }) => ValueCounterPage,
      ),
  },
  {
    path: 'pages/bookmark',
    title: 'BmbBookmark | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/bookmark-page/bookmark-page').then(
        ({ BookmarkPage }) => BookmarkPage,
      ),
  },
  {
    path: 'pages/breadcrumb',
    title: 'BmbBreadcrumb | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/breadcrumb-page/breadcrumb-page').then(
        ({ BreadcrumbPage }) => BreadcrumbPage,
      ),
  },
  {
    path: 'pages/icon-status',
    title: 'BmbIconStatus | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/icon-status-page/icon-status-page').then(
        ({ IconStatusPage }) => IconStatusPage,
      ),
  },
  {
    path: 'pages/paginator',
    title: 'BmbPaginator | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/paginator-page/paginator-page').then(
        ({ PaginatorPage }) => PaginatorPage,
      ),
  },
  {
    path: 'pages/hito-list',
    title: 'BmbHitoList | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/hito-list-page/hito-list-page').then(
        ({ HitoListPage }) => HitoListPage,
      ),
  },
  {
    path: 'pages/icon-item',
    title: 'BmbIconItem | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/icon-item-page/icon-item-page').then(
        ({ IconItemPage }) => IconItemPage,
      ),
  },
  {
    path: 'pages/dot-paginator',
    title: 'BmbDotPaginator | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/dot-paginator-page/dot-paginator-page').then(
        ({ DotPaginatorPage }) => DotPaginatorPage,
      ),
  },
  {
    path: 'pages/fab',
    title: 'BmbFab | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/fab-page/fab-page').then(({ FabPage }) => FabPage),
  },
  {
    path: 'pages/ai-chat-bubble',
    title: 'BmbAiChatBubble | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/ai-chat-bubble-page/ai-chat-bubble-page').then(
        ({ AiChatBubblePage }) => AiChatBubblePage,
      ),
  },
  {
    path: 'pages/dropzone',
    title: 'BmbDropzone | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/dropzone-page/dropzone-page').then(
        ({ DropzonePage }) => DropzonePage,
      ),
  },
  {
    path: 'pages/bot-icon',
    title: 'BmbBotIcon | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/bot-icon-page/bot-icon-page').then(
        ({ BotIconPage }) => BotIconPage,
      ),
  },
  {
    path: 'pages/ai-chat-card',
    title: 'BmbAiChatCard | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/ai-chat-card-page/ai-chat-card-page').then(
        ({ AiChatCardPage }) => AiChatCardPage,
      ),
  },
  {
    path: 'pages/navigation-bar',
    title: 'BmbNavigationBar | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/navigation-bar-page/navigation-bar-page').then(
        ({ NavigationBarPage }) => NavigationBarPage,
      ),
  },
  {
    path: 'pages/box-icon',
    title: 'BmbBoxIcon | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/box-icon-page/box-icon-page').then(
        ({ BoxIconPage }) => BoxIconPage,
      ),
  },
  {
    path: 'pages/alert-center-detail',
    title: 'BmbAlertCenterDetail | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/alert-center-detail-page/alert-center-detail-page').then(
        ({ AlertCenterDetailPage }) => AlertCenterDetailPage,
      ),
  },
  {
    path: 'pages/top-bar-item',
    title: 'BmbTopBarItem | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/top-bar-item-page/top-bar-item-page').then(
        ({ TopBarItemPage }) => TopBarItemPage,
      ),
  },
  {
    path: 'pages/interactive-item-text-button',
    title: 'BmbInteractiveItemTextButton | Bamboo migration dashboard',
    loadComponent: () =>
      import(
        './pages/interactive-item-text-button-page/interactive-item-text-button-page'
      ).then(
        ({ InteractiveItemTextButtonPage }) => InteractiveItemTextButtonPage,
      ),
  },
  {
    path: 'pages/button-icon',
    title: 'BmbButtonIcon | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/button-icon-page/button-icon-page').then(
        ({ ButtonIconPage }) => ButtonIconPage,
      ),
  },
  {
    path: 'pages/date-range',
    title: 'BmbDateRange | Bamboo migration dashboard',
    loadComponent: () =>
      import('./pages/date-range-page/date-range-page').then(
        ({ DateRangePage }) => DateRangePage,
      ),
  },
  {
    path: 'components/loader',
    title: 'BmbLoader | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/loader-page/loader-page').then(
        ({ LoaderPage }) => LoaderPage,
      ),
  },
    {
      path: 'components/home-card',
      title: 'BmbHomeCard | Bamboo migration dashboard',
      loadComponent: () =>
        import('./components/home-card-page/home-card-page').then(
          ({ HomeCardPage }) => HomeCardPage,
        ),
    },
  {
    path: 'components/focus-element',
    title: 'BmbFocusElement | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/focus-element-page/focus-element-page').then(
        ({ FocusElementPage }) => FocusElementPage,
      ),
  },
  {
    path: 'components/frequent-apps-selector',
    title: 'BmbFrequentAppsSelector | Bamboo migration dashboard',
    loadComponent: () =>
      import(
        './components/frequent-apps-selector-page/frequent-apps-selector-page'
      ).then(({ FrequentAppsSelectorPage }) => FrequentAppsSelectorPage),
  },
   { path: '**', redirectTo: 'pages/home' },
];

import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'components/carousel' },
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
    path: 'components/logo',
    title: 'BmbLogo | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/logo-page/logo-page').then(
        ({ LogoPage }) => LogoPage,
      ),
  },
  {
    path: 'components/user-image',
    title: 'BmbUserImage | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/user-image-page/user-image-page').then(
        ({ UserImagePage }) => UserImagePage,
      ),
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
  { path: '**', redirectTo: 'components/carousel' },
];

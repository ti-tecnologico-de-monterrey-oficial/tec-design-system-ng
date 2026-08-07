import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'components/carousel' },
  {
    path: 'components/carousel',
    title: 'BmbCarousel | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/carousel-page').then(
        ({ CarouselPage }) => CarouselPage,
      ),
  },
  {
    path: 'components/container',
    title: 'BmbContainer | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/container-page').then(
        ({ ContainerPage }) => ContainerPage,
      ),
  },
  {
    path: 'components/divider',
    title: 'BmbDivider | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/divider-page').then(
        ({ DividerPage }) => DividerPage,
      ),
  },
  {
    path: 'components/iframe',
    title: 'BmbIframe | Bamboo migration dashboard',
    loadComponent: () =>
      import('./components/iframe-page').then(({ IframePage }) => IframePage),
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

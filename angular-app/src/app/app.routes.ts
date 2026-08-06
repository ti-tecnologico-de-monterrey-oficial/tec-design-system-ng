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
  { path: '**', redirectTo: 'components/carousel' },
];

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
  { path: '**', redirectTo: 'components/carousel' },
];

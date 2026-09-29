import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home-card-chat',
    title: 'Home card chat',
    loadComponent: () =>
      import(
        '../pages/migration/home-card-chat-test/home-card-chat-test.component'
      ).then((m) => m.HomeCardChatTestComponent),
  },
];

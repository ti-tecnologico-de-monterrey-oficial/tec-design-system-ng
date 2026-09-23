import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home-section',
    title: 'Home section',
    loadComponent: () =>
      import(
        '../pages/migration/home-section-test/home-section-test.component'
      ).then((m) => m.HomeSectionTestComponent),
  },
  {
    path: 'advertisement-card',
    title: 'Advertisement card',
    loadComponent: () =>
      import(
        '../pages/migration/advertisement-card-test/advertisement-card-test.component'
      ).then((m) => m.AdvertisementCardTestComponent),
  },
  {
    path: 'hito-card',
    title: 'Hito card',
    loadComponent: () =>
      import('../pages/migration/hito-card-test/hito-card-test.component').then(
        (m) => m.HitoCardTestComponent,
      ),
  },
  {
    path: 'totp-prompt',
    title: 'ToTP prompt',
    loadComponent: () =>
      import('../pages/migration/totp-test/totp-test.component').then(
        (m) => m.TotpTestComponent,
      ),
  },
  {
    path: 'ai-chat-card',
    title: 'AI Chat card',
    loadComponent: () =>
      import('../pages/ai-chat-card-page/ai-chat-card-page').then(
        (m) => m.AiChatCardPage,
      ),
  },
  {
    path: 'header-mobile',
    title: 'Header mobile',
    loadComponent: () =>
      import(
        '../pages/migration/header-mobile-test/header-mobile-test.component'
      ).then((m) => m.HeaderMobileTestComponent),
  },
  {
    path: 'header-section',
    title: 'Header section',
    loadComponent: () =>
      import(
        '../pages/migration/header-section-test/header-section-test.component'
      ).then((m) => m.HeaderSectionTestComponent),
  },
  {
    path: 'modal',
    title: 'Modal',
    loadComponent: () =>
      import('../pages/modal-page/modal-page').then((m) => m.ModalPage),
  },
  {
    path: 'table-lite',
    title: 'Table lite',
    loadComponent: () =>
      import('../pages/table-lite/table-lite.component').then(
        (m) => m.TableLiteComponent,
      ),
  },
  {
    path: 'tables',
    title: 'Tables',
    loadComponent: () =>
      import('../pages/migration/tables-test/tables-test.component').then(
        (m) => m.TablesTestComponent,
      ),
  },
  {
    path: 'ai-chat-bubble',
    title: 'AI Chat Bubble',
    loadComponent: () =>
      import('../pages/ai-chat-bubble-page/ai-chat-bubble-page').then(
        (m) => m.AiChatBubblePage,
      ),
  },
  {
    path: 'filter-card',
    title: 'Filter card',
    loadComponent: () =>
      import(
        '../pages/migration/filter-card-test/filter-card-test.component'
      ).then((m) => m.FilterCardTestComponent),
  },
  {
    path: 'search-card',
    title: 'Search card',
    loadComponent: () =>
      import(
        '../pages/migration/search-card-test/search-card-test.component'
      ).then((m) => m.SearchCardTestComponent),
  },
  {
    path: 'evaluation-rubric',
    title: 'Evaluation rubric',
    loadComponent: () =>
      import(
        '../pages/migration/evaluation-rubric-test/evaluation-rubric-test.component'
      ).then((m) => m.EvaluationRubricTestComponent),
  },
  {
    path: 'profile-card',
    title: 'Profile card',
    loadComponent: () =>
      import('../pages/migration/profile-test/profile-test.component').then(
        (m) => m.ProfileTestComponent,
      ),
  },
];

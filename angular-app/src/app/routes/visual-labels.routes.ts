import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'academic-progress',
    title: 'Academic progress',
    loadComponent: () =>
      import(
        '../pages/migration/academic-progress-test/academic-progress-test.component'
      ).then((m) => m.AcademicProgressTestComponent),
  },
];

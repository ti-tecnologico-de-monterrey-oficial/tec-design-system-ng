import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'date-picker-range',
    title: 'Date picker range',
    loadComponent: () =>
      import('../pages/date-range-page/date-range-page').then(
        (m) => m.DateRangePage,
      ),
  },
  {
    path: 'phone-number',
    title: 'Phone number',
    loadComponent: () =>
      import(
        '../pages/migration/input-phone-number-test/input-phone-number-test.component'
      ).then((m) => m.InputPhoneNumberTestComponent),
  },
  {
    path: 'text-input-with-tags',
    title: 'Text input with tags',
    loadComponent: () =>
      import(
        '../pages/migration/input-tags-test/input-tags-test.component'
      ).then((m) => m.InputTagsTestComponent),
  },
  {
    path: 'date-picker',
    title: 'Date picker',
    loadComponent: () =>
      import(
        '../pages/migration/datepicker-test/datepicker-test.component'
      ).then((m) => m.DatepickerTestComponent),
  },
  {
    path: 'dropdown',
    title: 'Dropdown',
    loadComponent: () =>
      import('../pages/dropdown/dropdown.component').then(
        (m) => m.DropdownPageComponent,
      ),
  },
  {
    path: 'dropzone',
    title: 'Dropzone',
    loadComponent: () =>
      import('../pages/dropzone-page/dropzone-page').then(
        (m) => m.DropzonePage,
      ),
  },
  {
    path: 'ai-chat-bar',
    title: 'AI Chat bar',
    loadComponent: () =>
      import('../pages/chat-bar-page/chat-bar-page').then((m) => m.ChatBarPage),
  },
  {
    path: 'text-editor',
    title: 'Text editor',
    loadComponent: () =>
      import(
        '../pages/migration/text-editor-test/text-editor-test.component'
      ).then((m) => m.TextEditorTestComponent),
  },
  {
    path: 'form-validator',
    title: 'Form validator',
    loadComponent: () =>
      import('../pages/form-validator-test/form-validator-test.component').then(
        (m) => m.FormValidatorTestComponent,
      ),
  },
];

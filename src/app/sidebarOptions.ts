import { SidebarElement } from '../../projects/ds-ng/src/public-api';

export const sidebarOptions: SidebarElement[][] = [
  [
    {
      id: 1,
      icon: 'home',
      title: 'Home',
      link: '/home',
    },
    {
      id: 8,
      icon: 'table_chart',
      title: 'Tables',
      link: '',
      children: [
        {
          id: 1,
          icon: 'table',
          title: 'Table Lite',
          link: '/table-lite',
        },
        {
          id: 2,
          icon: 'table',
          title: 'Table LTS',
          link: '/table-lts',
        },
        {
          id: 3,
          icon: 'table',
          title: 'Table HTML',
          link: '/table-html',
        },
      ],
    },
    {
      id: 4,
      icon: 'reorder',
      title: 'Inputs',
      link: '',
      children: [
        {
          id: 1,
          icon: 'list_alt_check',
          title: 'Forms',
          link: '/form-validator',
        },
        {
          id: 2,
          icon: 'input',
          title: 'Input',
          link: '/input',
        },
        {
          id: 3,
          icon: 'dropdown',
          title: 'Dropdown',
          link: '/dropdown',
        },
        {
          id: 4,
          icon: 'upload_file',
          title: 'Dropzone',
          link: '/dropzone',
        },
      ],
    },
  ],
  [
    {
      id: 5,
      icon: 'responsive_layout',
      title: 'Layouts',
      link: '',
      children: [
        {
          id: 5,
          icon: 'align_flex_center',
          title: 'Flex',
          link: '/flex',
        },
        {
          id: 6,
          icon: 'calendar_view_month',
          title: 'Column sys',
          link: '/col-sys',
        },
        {
          id: 7,
          icon: 'layers',
          title: 'Modals',
          link: '/modals',
        },
      ],
    },
    {
      id: 6,
      icon: 'step',
      title: 'Indicators',
      link: '',
      children: [
        {
          id: 2,
          icon: 'page_control',
          title: 'Multi Dot Paginator',
          link: '/multi-dot-paginator',
        },
        {
          id: 2,
          icon: 'steppers',
          title: 'Step progress bar',
          link: '/step-progress-bar',
        },
        {
          id: 3,
          icon: 'sound_detection_loud_sound',
          title: 'TEC sound',
          link: '/tec-sound',
        },
        {
          id: 4,
          icon: 'signal_wifi_4_bar',
          title: 'Signal strength',
          link: '/signal-strength',
        },
        { id: 8, icon: 'app_registration', title: 'Colors', link: '/colors' },
      ],
    },
    {
      id: 7,
      icon: 'account_circle',
      title: 'Profile',
      link: '/profile',
      children: [
        {
          id: 1,
          icon: 'person',
          title: 'Identity',
          link: '/identity',
        },
        {
          id: 2,
          icon: 'notifications',
          title: 'Alerts',
          link: '/alerts',
        },
        {
          id: 3,
          icon: 'dashboard_2',
          title: 'Dashboard activity',
          link: '/dashboard-indicators',
        },
      ],
    },
    {
      id: 9,
      icon: 'account_circle',
      title: 'Menu',
      link: '',
      children: [
        {
          id: 1,
          icon: 'menu',
          title: 'Menu',
          link: '/menu',
        },
        {
          id: 2,
          icon: 'calendar_today',
          title: 'Calendar',
          link: '/calendar',
        },
        {
          id: 3,
          icon: 'blanket',
          title: 'Custom event',
          event: (event) => {
            console.log('Custom event triggered', event);
          },
        },
      ],
    },
  ],
];

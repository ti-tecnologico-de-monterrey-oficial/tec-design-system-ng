export interface ComponentTestCategory {
  label: string;
  items: { label: string; url: string; icon: string }[];
}

export const componentTestNavigation: ComponentTestCategory[] = [
  {
    label: 'Dev tools',
    items: [
      {
        label: 'Box icon',
        url: '/pages/dev-tools/box-icon',
        icon: 'widgets',
      },
      {
        label: 'Portal (*old)',
        url: '/pages/dev-tools/portal',
        icon: 'widgets',
      },
    ],
  },
  {
    label: 'Buttons',
    items: [
      {
        label: 'Button icon',
        url: '/pages/buttons/button-icon',
        icon: 'widgets',
      },
      {
        label: 'Action icon (*old)',
        url: '/pages/buttons/action-icon',
        icon: 'widgets',
      },
      {
        label: 'Interactive icon (*old)',
        url: '/pages/buttons/interactive-icon',
        icon: 'widgets',
      },
      {
        label: 'Card button',
        url: '/pages/buttons/card-button',
        icon: 'widgets',
      },
      {
        label: 'Container button (Default) (*old)',
        url: '/pages/buttons/container-button-default',
        icon: 'widgets',
      },
      {
        label: 'Bookmark test',
        url: '/pages/bookmark',
        icon: 'bookmark',
      },
      {
        label: 'Generic card templates',
        url: '/card-button',
        icon: 'smart_button',
      },
      {
        label: 'Fab test',
        url: '/pages/fab',
        icon: 'mode_standby',
      },
    ],
  },
  {
    label: 'Inputs',
    items: [
      {
        label: 'Date picker range',
        url: '/pages/inputs/date-picker-range',
        icon: 'widgets',
      },
      {
        label: 'Phone number (*old)',
        url: '/pages/inputs/phone-number',
        icon: 'widgets',
      },
      {
        label: 'Text input with tags (*old)',
        url: '/pages/inputs/text-input-with-tags',
        icon: 'widgets',
      },
      {
        label: 'Date picker (*old)',
        url: '/pages/inputs/date-picker',
        icon: 'widgets',
      },
      {
        label: 'Dropdown',
        url: '/pages/inputs/dropdown',
        icon: 'widgets',
      },
      {
        label: 'Dropzone',
        url: '/pages/inputs/dropzone',
        icon: 'widgets',
      },
      {
        label: 'AI Chat bar',
        url: '/pages/inputs/ai-chat-bar',
        icon: 'widgets',
      },
      {
        label: 'Text editor (*old)',
        url: '/pages/inputs/text-editor',
        icon: 'widgets',
      },
      {
        label: 'Form validator',
        url: '/pages/inputs/form-validator',
        icon: 'widgets',
      },
      {
        label: 'Input',
        url: '/pages/input',
        icon: 'edit_note',
      },
      {
        label: 'Switch',
        url: '/pages/switch',
        icon: 'toggle_on',
      },
      {
        label: 'Search input',
        url: '/pages/search-input',
        icon: 'search',
      },
    ],
  },
  {
    label: 'Status indicators',
    items: [
      {
        label: 'Status icon',
        url: '/pages/status-indicators/status-icon',
        icon: 'widgets',
      },
      {
        label: 'Paginator',
        url: '/pages/status-indicators/paginator',
        icon: 'widgets',
      },
      {
        label: 'Multi dot paginator',
        url: '/pages/status-indicators/multi-dot-paginator',
        icon: 'widgets',
      },
      {
        label: 'Progress bar (*old)',
        url: '/pages/status-indicators/progress-bar',
        icon: 'widgets',
      },
      {
        label: 'Focus element',
        url: '/pages/focus-element',
        icon: 'center_focus_strong',
      },
      {
        label: 'Loading screen',
        url: '/pages/loader',
        icon: 'hourglass_empty',
      },
      {
        label: 'Progress circle',
        url: '/pages/progress-circle',
        icon: 'donut_large',
      },
      {
        label: 'Toast',
        url: '/pages/toast',
        icon: 'info',
      },
      {
        label: 'Balance overview',
        url: '/pages/balance-overview',
        icon: 'account_balance_wallet',
      },
    ],
  },
  {
    label: 'Visual labels',
    items: [
      {
        label: 'Academic progress (*old)',
        url: '/pages/visual-labels/academic-progress',
        icon: 'widgets',
      },
      {
        label: 'Step progress bar',
        url: '/pages/step-progress-bar',
        icon: 'steppers',
      },
      {
        label: 'Text link',
        url: '/pages/text-link',
        icon: 'arrow_forward',
      },
      {
        label: 'Tooltip',
        url: '/pages/tooltip',
        icon: 'help',
      },
      {
        label: 'Tabs',
        url: '/pages/tabs',
        icon: 'tab',
      },
    ],
  },
  {
    label: 'Menus',
    items: [
      {
        label: 'Bottom navigation bar (*old)',
        url: '/pages/menus/bottom-navigation-bar',
        icon: 'widgets',
      },
      {
        label: 'Action menu (*old)',
        url: '/pages/menus/action-menu',
        icon: 'widgets',
      },
      {
        label: 'Chevron title selector (*old)',
        url: '/pages/menus/chevron-title-selector',
        icon: 'widgets',
      },
      {
        label: 'FAB Overlay drawer (*old)',
        url: '/pages/menus/fab-overlay-drawer',
        icon: 'widgets',
      },
      {
        label: 'Inner header (*old)',
        url: '/pages/menus/inner-header',
        icon: 'widgets',
      },
      {
        label: 'Top bar (*old)',
        url: '/pages/menus/top-bar',
        icon: 'widgets',
      },
    ],
  },
  {
    label: 'Internals',
    items: [
      {
        label: 'Header mitec (*old)',
        url: '/pages/internals/header-mitec',
        icon: 'widgets',
      },
      {
        label: 'Login content (*old)',
        url: '/pages/internals/login-content',
        icon: 'widgets',
      },
      {
        label: 'Web templates (*old)',
        url: '/pages/internals/web-templates',
        icon: 'widgets',
      },
      {
        label: 'Title content template (*old)',
        url: '/pages/internals/title-content-template',
        icon: 'widgets',
      },
      {
        label: 'Timestream (*old)',
        url: '/pages/internals/timestream',
        icon: 'widgets',
      },
    ],
  },
  {
    label: 'Containers',
    items: [
      {
        label: 'Home section (*old)',
        url: '/pages/containers/home-section',
        icon: 'widgets',
      },
      {
        label: 'Advertisement card (*old)',
        url: '/pages/containers/advertisement-card',
        icon: 'widgets',
      },
      {
        label: 'Hito card (*old)',
        url: '/pages/containers/hito-card',
        icon: 'widgets',
      },
      {
        label: 'ToTP prompt (*old)',
        url: '/pages/containers/totp-prompt',
        icon: 'widgets',
      },
      {
        label: 'AI Chat card',
        url: '/pages/containers/ai-chat-card',
        icon: 'widgets',
      },
      {
        label: 'Header mobile (*old)',
        url: '/pages/containers/header-mobile',
        icon: 'widgets',
      },
      {
        label: 'Header section (*old)',
        url: '/pages/containers/header-section',
        icon: 'widgets',
      },
      {
        label: 'Modal',
        url: '/pages/containers/modal',
        icon: 'widgets',
      },
      {
        label: 'Table lite',
        url: '/pages/containers/table-lite',
        icon: 'widgets',
      },
      {
        label: 'Tables (*old)',
        url: '/pages/containers/tables',
        icon: 'widgets',
      },
      {
        label: 'AI Chat Bubble',
        url: '/pages/containers/ai-chat-bubble',
        icon: 'widgets',
      },
      {
        label: 'Filter card (*old)',
        url: '/pages/containers/filter-card',
        icon: 'widgets',
      },
      {
        label: 'Search card (*old)',
        url: '/pages/containers/search-card',
        icon: 'widgets',
      },
      {
        label: 'Evaluation rubric (*old)',
        url: '/pages/containers/evaluation-rubric',
        icon: 'widgets',
      },
      {
        label: 'Profile card (*old)',
        url: '/pages/containers/profile-card',
        icon: 'widgets',
      },
      {
        label: 'Item default',
        url: '/pages/item-default',
        icon: 'person',
      },
      {
        label: 'Item chevron',
        url: '/pages/item-chevron',
        icon: 'chevron_right',
      },
      {
        label: 'Generic card',
        url: '/pages/card',
        icon: 'badge',
      },
      {
        label: 'Home card',
        url: '/pages/home-card',
        icon: 'dashboard',
      },
      {
        label: 'Media card',
        url: '/pages/media-card',
        icon: 'image',
      },
      {
        label: 'Notification card',
        url: '/pages/notification-card',
        icon: 'notifications',
      },
      {
        label: 'Simple header',
        url: '/pages/simple-header',
        icon: 'title',
      },
      {
        label: 'Push notification',
        url: '/pages/push-notification',
        icon: 'notification_important',
      },
      {
        label: 'Drag y Drop',
        url: '/page/drag-drop',
        icon: 'swap_vert',
      },
      {
        label: 'Student activity card',
        url: '/pages/student-activity-card',
        icon: 'school',
      },
      {
        label: '# Dropdown menu',
        url: '/page/dropdown-menu',
        icon: 'more_vert',
      },
      {
        label: 'Timestamp detail',
        url: '/pages/timestamp-detail',
        icon: 'timeline',
      },
      {
        label: 'List items',
        url: '/pages/list-items',
        icon: 'list',
      },
    ],
  },
  {
    label: 'Mitec app',
    items: [
      {
        label: 'Digital ID (*old)',
        url: '/pages/mitec-app/digital-id',
        icon: 'widgets',
      },
    ],
  },
  {
    label: 'Mitec card',
    items: [
      {
        label: 'Notice card (*old)',
        url: '/pages/mitec-card/notice-card',
        icon: 'widgets',
      },
    ],
  },
  {
    label: 'Organisms',
    items: [
      {
        label: 'Access to external link (*old)',
        url: '/pages/organisms/access-to-external-link',
        icon: 'widgets',
      },
      {
        label: 'Timestream card (full) (*old)',
        url: '/pages/organisms/timestream-card-full',
        icon: 'widgets',
      },
      {
        label: 'Login onboarding mobile (*old)',
        url: '/pages/organisms/login-onboarding-mobile',
        icon: 'widgets',
      },
      {
        label: 'Account statement (*old)',
        url: '/pages/organisms/account-statement',
        icon: 'widgets',
      },
      {
        label: 'Notification center (*old)',
        url: '/pages/organisms/notification-center',
        icon: 'widgets',
      },
      {
        label: 'Grades (*old)',
        url: '/pages/organisms/grades',
        icon: 'widgets',
      },
      {
        label: 'Calendar standard',
        url: '/pages/organisms/calendar-standard',
        icon: 'widgets',
      },
    ],
  },
  {
    label: 'Components',
    items: [
      {
        label: 'Sidebar (*old)',
        url: '/pages/components/sidebar',
        icon: 'widgets',
      },
    ],
  },
  {
    label: 'Deprecated',
    items: [
      {
        label: 'Home card chat (*old)',
        url: '/pages/deprecated/home-card-chat',
        icon: 'widgets',
      },
    ],
  },
  {
    label: 'Templates',
    items: [
      {
        label: 'Mobile (*old)',
        url: '/pages/templates/mobile',
        icon: 'widgets',
      },
    ],
  },
  {
    label: 'Images',
    items: [],
  },
];

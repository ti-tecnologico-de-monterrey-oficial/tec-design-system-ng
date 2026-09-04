import {
  BMB_CREATIVE_COLOR_LIST,
  BMB_SEMANTIC_COLOR_LIST,
} from '../../types/foundations/colors/color-type';

export const isValidPushNotificationFullVariant = (type = ''): boolean =>
  BMB_SEMANTIC_COLOR_LIST.includes(type) ||
  BMB_CREATIVE_COLOR_LIST.includes(type) ||
  type === 'black-primary' ||
  type === 'blue-tec';

export const isValidPushNotificationRegularVariant = (type = ''): boolean =>
  !BMB_SEMANTIC_COLOR_LIST.includes(type) ||
  type === 'black-primary' ||
  type === 'neon-primary';

export const getPushNotificationClasses = ({
  type = '',
  isFullColor,
  isExpanded,
}: {
  type?: string;
  isFullColor: boolean;
  isExpanded: boolean;
}): string[] => {
  const classes = [
    'bmb_push-notification-item',
    `bmb_push-notification-item-type-${type}`,
  ];

  if (isFullColor && isValidPushNotificationFullVariant(type)) {
    classes.push('bmb_push-notification-item-full-color');
  } else if (!isFullColor && isValidPushNotificationRegularVariant(type)) {
    classes.push('bmb_push-notification-item-regular-tmp');
  }

  if (!isExpanded) classes.push('bmb_push-notification-item-contracted');
  return classes;
};

export const getPushNotificationIconClasses = (type = ''): string[] => [
  'bmb_push-notification-item-icon',
  `bmb_push-notification-item-icon-${type}`,
];

export const getPushNotificationAppIcon = (appIcon?: string): string =>
  appIcon ?? 'assets/images/tec-logo-mob.svg';

export const getPushNotificationAppName = (appName?: string): string =>
  appName ?? 'itesm.com';

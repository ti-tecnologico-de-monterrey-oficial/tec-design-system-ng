import COLOR_GROUP_NAMES from './objects/color-group-names.json';
export type IBmbInstitutionalColors = 'blue-tec' | 'white-primary';

export type IBmbBaseColors =
  | 'neon-primary'
  | 'neon-tint'
  | 'neon-light'
  | 'blue-primary'
  | 'blue-light'
  | 'blue-tint'
  | 'teal-primary'
  | 'teal-light'
  | 'teal-tint'
  | 'red-primary'
  | 'red-light'
  | 'red-tint'
  | 'green-primary'
  | 'green-light'
  | 'green-tint'
  | 'purple-primary'
  | 'purple-light'
  | 'purple-tint'
  | 'yellow-primary'
  | 'yellow-light'
  | 'yellow-tint'
  | 'black-primary';

export type IBmbmitecBaseColors =
  | 'mitec-blue-primary'
  | 'mitec-blue-light'
  | 'mitec-blue-tint'
  | 'mitec-red-primary'
  | 'mitec-red-light'
  | 'mitec-red-tint'
  | 'mitec-green-primary'
  | 'mitec-green-light'
  | 'mitec-green-tint'
  | 'mitec-orange-primary'
  | 'mitec-orange-light'
  | 'mitec-orange-tint'
  | 'mitec-purple-primary'
  | 'mitec-purple-light'
  | 'mitec-purple-tint';

export type IBmbCreativeBaseColors =
  | 'violet-primary'
  | 'violet-light'
  | 'violet-tint'
  | 'indigo-primary'
  | 'indigo-light'
  | 'indigo-tint'
  | 'emerald-primary'
  | 'emerald-light'
  | 'emerald-tint'
  | 'licorice-primary'
  | 'licorice-light'
  | 'licorice-tint'
  | 'dark-teal-primary'
  | 'dark-teal-light'
  | 'dark-teal-tint'
  | 'peach-primary'
  | 'peach-light'
  | 'peach-tint'
  | 'sepia-primary'
  | 'sepia-light'
  | 'sepia-tint'
  | 'soft-red-primary'
  | 'soft-red-light'
  | 'soft-red-tint'
  | 'wattle-primary'
  | 'wattle-primary-alternative'
  | 'wattle-light'
  | 'wattle-tint'
  | 'ship-cove-primary'
  | 'ship-cove-light'
  | 'ship-cove-tint'
  | 'plantation-primary'
  | 'plantation-light'
  | 'plantation-tint'
  | 'rum-primary'
  | 'rum-light'
  | 'rum-tint'
  | 'ripe-lemon-primary'
  | 'ripe-lemon-primary-alternative'
  | 'ripe-lemon-light'
  | 'ripe-lemon-tint'
  | 'hibiscus-primary'
  | 'hibiscus-light'
  | 'hibiscus-tint';

export type IBmbSemanticBaseColors =
  | 'success-primary'
  | 'success-light'
  | 'success-thin'
  | 'success-primary-alternative'
  | 'success-tint-alternative'
  | 'warning-primary'
  | 'warning-light'
  | 'warning-tint'
  | 'warning-primary-alternative'
  | 'error-primary'
  | 'error-light'
  | 'error-tint'
  | 'info-primary'
  | 'info-light'
  | 'info-tint'
  | 'branding-primary'
  | 'branding-tint'
  | 'branding-tint'
  | 'alert-primary'
  | 'alert-light'
  | 'alert-tint';

export const BMB_SEMANTIC_COLOR_LIST: string[] = [
  ...Object.keys(COLOR_GROUP_NAMES['semantic_colors']),
] as const;

export type IBmbSemanticColors = (typeof BMB_SEMANTIC_COLOR_LIST)[number];

export const BMB_MITEC_COLOR_LIST: string[] = [
  ...Object.keys(COLOR_GROUP_NAMES['mitec_institutional_colors']),
] as const;

export type IBmbMitecInstitutionalColors =
  (typeof BMB_MITEC_COLOR_LIST)[number];

export const BMB_CREATIVE_COLOR_LIST: string[] = [
  ...Object.keys(COLOR_GROUP_NAMES['creative_use_colors']),
] as const;

export type IBmbCreativeUseColors = (typeof BMB_CREATIVE_COLOR_LIST)[number];

export type IBmbAlertColors =
  | 'alert-successful'
  | 'alert-event'
  | 'alert-neutral'
  | 'alert-primary-alert-primary'
  | 'alert-warning'
  | 'alert-error';

export const BMB_PUSH_NOTIFICATION_COLOR_LIST: string[] = [
  ...Object.keys(COLOR_GROUP_NAMES['bmb_push_notification_type']),
] as const;

export type IBmbPushNotificationColors =
  (typeof BMB_PUSH_NOTIFICATION_COLOR_LIST)[number];

import COLOR_GROUP_NAMES from './object/color-group-names.json';
export type IBmbInstitutionalColors = 'blue-tec' | 'white-primary';

export const BMB_BASE_COLOR_LIST: string[] = Object.keys(COLOR_GROUP_NAMES['base_colors'] as const);

export type IBmbBaseColors = (typeof BMB_BASE_COLOR_LIST)[number];

export const BMB_MITEC_BASE_COLOR_LIST: string[] = Object.keys(COLOR_GROUP_NAMES['mitec_base_colors'] as const);

export type IBmbmitecBaseColors = (typeof BMB_MITEC_BASE_COLOR_LIST)[number];

export const BMB_CREATIVE_BASE_COLOR_LIST: string[] = Object.keys(COLOR_GROUP_NAMES['creative_base_colors'] as const);

export type IBmbCreativeBaseColors =
  (typeof BMB_CREATIVE_BASE_COLOR_LIST)[number];

export const BMB_SEMANTIC_BASE_COLOR_LIST: string[] = Object.keys(COLOR_GROUP_NAMES['semantic_base_colors'] as const);

export type IBmbSemanticBaseColors = (typeof BMB_SEMANTIC_COLOR_LIST)[number];

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

export const BMB_ALERT_COLOR_LIST: string[] = [
  ...Object.keys(COLOR_GROUP_NAMES['alert_colors']),
] as const;

export type IBmbAlertColors = (typeof BMB_ALERT_COLOR_LIST)[number];

export const BMB_PUSH_NOTIFICATION_COLOR_LIST: string[] = [
  ...Object.keys(COLOR_GROUP_NAMES['bmb_push_notification_type']),
] as const;

export type IBmbPushNotificationColors =
  (typeof BMB_PUSH_NOTIFICATION_COLOR_LIST)[number];

export const BMB_BADGE_COLOR_LIST: string[] = [
  ...Object.keys(COLOR_GROUP_NAMES['bmb_badge_type']),
] as const;

export type IBmbBadgeColors = (typeof BMB_BADGE_COLOR_LIST)[number];

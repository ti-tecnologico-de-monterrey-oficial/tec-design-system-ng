export const BMB_DIVIDER_LIST: string[] = [
  'simple',
  'dashed',
  'dotted',
] as const;

export type BmbDividerType = (typeof BMB_DIVIDER_LIST)[number];

export const BMB_DIVIDER_ORIENTATION_LIST: string[] = [
  'horizontal',
  'vertical',
] as const;

export type BmbDividerOrientationType =
  (typeof BMB_DIVIDER_ORIENTATION_LIST)[number];

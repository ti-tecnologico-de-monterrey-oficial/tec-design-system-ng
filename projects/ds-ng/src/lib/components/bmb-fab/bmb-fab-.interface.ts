export const FAB_SIZE = {
  small: 'small',
  large: 'large',
} as const;

export type FabSize = (typeof FAB_SIZE)[keyof typeof FAB_SIZE];

export const FAB_TYPE = {
  normal: 'normal',
  extended: 'extended',
} as const;

export type FabType = (typeof FAB_TYPE)[keyof typeof FAB_TYPE];

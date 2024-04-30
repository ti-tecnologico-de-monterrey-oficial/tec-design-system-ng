export const INPUT_TYPE = {
  normal: 'normal',
  simple: 'simple',
} as const;

export type InputType = (typeof INPUT_TYPE)[keyof typeof INPUT_TYPE];

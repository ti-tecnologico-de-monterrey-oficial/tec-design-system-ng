export type IBmbSimpleTextElementType =
  | 'p'
  | 'span'
  | 'div'
  | 'section'
  | 'small';

export type IBmbSimpleTextSize =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12;

export const BmbSimpleTextSizes: Record<IBmbSimpleTextSize, string> = {
  1: '0.625rem',
  2: '0.6875rem',
  3: '0.75rem',
  4: '0.875rem',
  5: '1rem',
  6: '1.125rem',
  7: '1.25rem',
  8: '1.375rem',
  9: '1.5rem',
  10: '1.625rem',
  11: '2.25rem',
  12: '3rem',
};

export type IBmbSimpleTextWeight = 'light' | 'regular' | 'bold';

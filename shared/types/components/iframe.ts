export type BmbIframeLoading = 'eager' | 'lazy';
export type BmbIframeImportance = 'auto' | 'high' | 'low';
export type BmbIframeScrolling = 'auto' | 'yes' | 'no';
export type BmbIframeAlign = 'top' | 'middle' | 'bottom' | 'left' | 'right';

export type BmbIframeReferrerPolicy =
  | 'no-referrer'
  | 'no-referrer-when-downgrade'
  | 'origin'
  | 'origin-when-cross-origin'
  | 'same-origin'
  | 'strict-origin'
  | 'strict-origin-when-cross-origin'
  | 'unsafe-url';

export type BmbIframeAttributes = Readonly<
  Record<string, string | number | boolean | null | undefined>
>;

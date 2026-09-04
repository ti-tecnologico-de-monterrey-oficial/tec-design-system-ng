export const getSimpleHeaderTitle = (
  componentTitle?: string,
  deprecatedTitle?: string,
): string => componentTitle || deprecatedTitle || '';

export const getSimpleHeaderIconColor = (
  iconAlternativeColor: boolean,
): string =>
  iconAlternativeColor ? 'var(--buttons-primary-normal)' : 'currentColor';

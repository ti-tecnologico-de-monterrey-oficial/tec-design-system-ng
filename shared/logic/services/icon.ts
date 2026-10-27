export function normalizeIconName(iconName: string): string {
  return iconName.trim().replace(/\s+/g, '_').toLowerCase();
}

export function getIconUrl(
  basePath: string,
  cleanName: string,
  isFilled: boolean,
): string {
  return `${basePath}/${cleanName}${isFilled ? '-fill' : ''}.svg`;
}

import { getRGBColorKeyValue, isImage } from '../utils';

export function getHeaderSectionStyles(
  icon: string,
  bgIconAppearance?: string,
): Record<string, string> {
  if (isImage(icon)) {
    return { 'background-color': 'transparent' };
  }
  if (bgIconAppearance) {
    return getRGBColorKeyValue(bgIconAppearance);
  }
  return {};
}

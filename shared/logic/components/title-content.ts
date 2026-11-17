import type { IBmbColor } from '../../types/colors';
import { getRGBColorKeyValue, isImage } from '../utils';

export function getTitleContentStyles(
  icon: string,
  transparentBgC: boolean,
  forceSquareApp: boolean,
  bgIconAppearance: IBmbColor | undefined,
): object {
  if (isImage(icon) && transparentBgC && !forceSquareApp) {
    return { 'background-color': 'transparent' };
  }
  if (bgIconAppearance) {
    return getRGBColorKeyValue(bgIconAppearance as string);
  }
  return {};
}

export function getTitleContentClassNames(
  mainName: string,
  size: string,
  fontWeight: string,
  isCenterContent: boolean,
): string[] {
  const classes = [`${mainName}-${size}`, `${mainName}-${fontWeight}`];

  if (isCenterContent) classes.push(`${mainName}-centered`);

  return classes;
}

export function hasTitleContentBreadcrumbs(
  dataLocalNav: readonly unknown[],
): boolean {
  return !!dataLocalNav.length;
}

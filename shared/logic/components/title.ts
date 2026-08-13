import type { IBmbFontWeightContent } from '../../types/components/title';

export function getClassNames(
  mainName: string,
  size = '',
  fontWeight: IBmbFontWeightContent | string = '',
  isCenterContent = false,
): string[] {
  const classes: string[] = [];

  if (size) classes.push(`${mainName}-${size}`);

  if (fontWeight) classes.push(`${mainName}-${fontWeight}`);

  if (isCenterContent) classes.push(`${mainName}-centered`);

  return classes;
}

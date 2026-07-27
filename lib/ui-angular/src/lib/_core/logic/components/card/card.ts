import { SizeNames } from '../../../types/index.js';

export type IBmbCardType =
  | 'primary'
  | 'secondary'
  | 'succes'
  | 'info'
  | 'warning'
  | 'error'
  | 'normal'
  | 'transparent';

export type IBmbBgColor =
  | 'contrasts-100'
  | 'contrasts-75'
  | 'contrasts-50'
  | 'contrasts-25'
  | 'contrasts-20'
  | 'contrasts-15'
  | 'contrasts-5';

export type IBmbBoxShadowStyle =
  | 'box-shadow-1'
  | 'box-shadow-2'
  | 'box-shadow-3'
  | 'box-shadow-4'
  | 'box-shadow-5'
  | 'box-shadow-6';

export const calculateSize = (pixels: string[]): string => {
  return pixels.map((size) => `var(--bmb-radius-${size})`).join(' ');
};

export const getCardClasses = ({
  borderRadius,
  margin,
  type,
  boxShadowStyle,
}: {
  borderRadius: SizeNames | SizeNames[];
  margin: SizeNames | SizeNames[];
  type: IBmbCardType;
  boxShadowStyle: IBmbBoxShadowStyle | 'none';
}): string[] => {
  const classNames: string[] = [];

  if (typeof borderRadius === 'string') {
    classNames.push(`bmb_radius-${borderRadius}`);
  }

  if (typeof margin === 'string') {
    classNames.push(`bmb_margin-${margin}`);
  }

  classNames.push(`bmb_card-type-${type}`);

  if (boxShadowStyle !== 'none') {
    classNames.push(`bmb_card-${boxShadowStyle}`);
  }

  return classNames;
};

export const getCardStyles = ({
  borderRadius,
  margin,
  borderColor,
}: {
  borderRadius: SizeNames | SizeNames[];
  margin: SizeNames | SizeNames[];
  borderColor: IBmbBgColor | 'default';
}): Record<string, string> => {
  const styles: Record<string, string> = {};

  if (typeof borderRadius !== 'string') {
    styles['border-radius'] = calculateSize(borderRadius as SizeNames[]);
  }

  if (typeof margin !== 'string') {
    styles['margin'] = calculateSize(margin as SizeNames[]);
  }

  if (borderColor !== 'default') {
    styles['borderColor'] = `var(--general_${borderColor})`;
  }

  return styles;
};
export const getPaddingClasses = (
  padding: SizeNames | SizeNames[],
): string[] => {
  const classNames: string[] = [];

  if (typeof padding === 'string') {
    classNames.push(`bmb_padding-${padding}`);
  }

  return classNames;
};
export const getPaddingStyles = ({
  padding,
  colorBackground,
}: {
  padding: SizeNames | SizeNames[];
  colorBackground: IBmbBgColor | null;
}): Record<string, string> => {
  const styles: Record<string, string> = {};

  if (typeof padding !== 'string') {
    styles['padding'] = calculateSize(padding as SizeNames[]);
  }

  if (colorBackground !== null) {
    styles['background-color'] = `var(--general_${colorBackground})`;
  }

  return styles;
};


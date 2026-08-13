import { SizeNames } from '../../types';
import {
  IBmbBgColor,
  IBmbBoxShadowStyle,
  IBmbCardType,
} from '../../types/components/card';

type SizeValue = SizeNames | SizeNames[];

const getSizeVars = (value: SizeValue): string => {
  const values = Array.isArray(value) ? value : [value];

  return values
    .map((item) => {
      if (item === 'none' || item === 'auto') {
        return item;
      }

      return `var(--bmb-radius-${item})`;
    })
    .join(' ');
};

const getSizeClasses = (prefix: string, value: SizeValue): string[] => {
  if (Array.isArray(value)) {
    return [];
  }

  return [`bmb_${prefix}-${value}`];
};

const getColorVar = (value: IBmbBgColor): string => `var(--general-${value})`;

export function getCardClasses({
  borderRadius,
  margin,
  type,
  boxShadowStyle,
}: {
  borderRadius: SizeValue;
  margin: SizeValue;
  type: IBmbCardType;
  boxShadowStyle: IBmbBoxShadowStyle | 'none';
}): string[] {
  const classes = [
    ...getSizeClasses('radius', borderRadius),
    ...getSizeClasses('margin', margin),
    `bmb_card-type-${type}`,
  ];

  if (boxShadowStyle !== 'none') {
    classes.push(`bmb_card-${boxShadowStyle}`);
  }

  return classes;
}

export function getCardStyles({
  borderRadius,
  margin,
  borderColor,
}: {
  borderRadius: SizeValue;
  margin: SizeValue;
  borderColor: IBmbBgColor | 'default';
}): Record<string, string> {
  const styles: Record<string, string> = {
    'border-radius': getSizeVars(borderRadius),
    margin: getSizeVars(margin),
  };

  if (borderColor !== 'default') {
    styles['border-color'] = getColorVar(borderColor);
  }

  return styles;
}

export function getPaddingClasses(padding: SizeValue): string[] {
  return getSizeClasses('padding', padding);
}

export function getPaddingStyles({
  padding,
  colorBackground,
}: {
  padding: SizeValue;
  colorBackground: IBmbBgColor | null;
}): Record<string, string> {
  const styles: Record<string, string> = {
    padding: getSizeVars(padding),
  };

  if (colorBackground) {
    styles['background-color'] = getColorVar(colorBackground);
  }

  return styles;
}

import type {
  BmbDividerOrientationType,
  BmbDividerType,
} from '../../types/components/divider';

export const getDividerClasses = ({
  type = 'simple',
  orientation = 'horizontal',
  removeMargin = false,
}: {
  type?: BmbDividerType;
  orientation?: BmbDividerOrientationType;
  removeMargin?: boolean;
}): string[] => {
  const classes = [
    'bmb_divider',
    `bmb_divider-${type}`,
    `bmb_divider-${orientation}`,
  ];

  if (removeMargin) classes.push('bmb_divider-no-margin');

  return classes;
};

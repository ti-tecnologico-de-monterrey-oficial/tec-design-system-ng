import type { IBmbBoxIconShape, IBmbBoxIconSize } from '../../types/components/box-icon';

export const getBoxIconClasses = (
  size: IBmbBoxIconSize,
  shape: IBmbBoxIconShape,
  colorName: string,
): string[] => {
  const classes = ['bmb_box-icon', size, shape];

  if (colorName) {
    classes.push(colorName);
  }

  return classes;
};

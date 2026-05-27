import { IBmbBadgeColors } from '../types/foundations/colors/color-type.js';
import { IBbmBgAppearance } from '../../ui-angular/src/lib/components/bmb-advertisement-card/types.js';

export type IBmbBadgeAppearanceColors = IBmbBadgeColors | IBbmBgAppearance;

export const getBadgeClasses = ({
  container,
  appearance,
}: {
  container: boolean;
  appearance: IBmbBadgeAppearanceColors;
}) => {
  const baseClassName: string = 'bmb_badge';
  const classes: string[] = [baseClassName];

  if (container) {
    classes.push(`${baseClassName}-container`);

    if (!!appearance) {
      classes.push(`${baseClassName}-${appearance}`);
    }
  } else if (appearance === 'disabled') {
    classes.push(`${baseClassName}-${appearance}`);
  }

  return classes;
}

export const getBadgeBulletColor = (appearance: IBmbBadgeAppearanceColors): string => {
  if (appearance === 'disabled') return '';

  return `bmb_badge-${appearance}`;
};

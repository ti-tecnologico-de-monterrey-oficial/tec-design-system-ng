import { IBmbBadgeColors } from '../../../types/foundations/colors/color-type.js';

export type IBbmBgAppearance =
  | 'normal'
  | 'strong'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'brand'
  | 'alert'
  | 'background'
  | 'disabled'
  | 'mitec_blue'
  | 'mitec_red'
  | 'mitec_green'
  | 'mitec_orange'
  | 'mitec_light_green'
  | 'mitec_purple'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon'
  | 'creative_use_strong';

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

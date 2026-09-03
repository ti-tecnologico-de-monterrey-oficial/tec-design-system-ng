import { IBmbBadgeAppearance } from '../../types/components/badge';

const BMB_BADGE_BASE_CLASS = 'bmb_badge';

/**
 * Pure logic shared by the Angular and React bmb-badge implementations,
 * so both frameworks render the exact same class names from the same rules.
 */
export function getBadgeClasses(
  appearance: IBmbBadgeAppearance,
  container: boolean,
): string[] {
  const classes: string[] = [BMB_BADGE_BASE_CLASS];

  if (container) {
    classes.push(`${BMB_BADGE_BASE_CLASS}-container`);

    if (appearance) {
      classes.push(`${BMB_BADGE_BASE_CLASS}-${appearance}`);
    }
  } else if (appearance === 'disabled') {
    classes.push(`${BMB_BADGE_BASE_CLASS}-${appearance}`);
  }

  return classes;
}

export function getBadgeBulletClass(appearance: IBmbBadgeAppearance): string {
  if (appearance === 'disabled') return '';

  return `${BMB_BADGE_BASE_CLASS}-${appearance}`;
}

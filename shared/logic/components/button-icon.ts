import { IBmbContrast } from '../../types/colors';

/**
 * Pure logic shared by the Angular and React bmb-button-icon implementations,
 * so both frameworks render the exact same class names from the same rules.
 */
export function getButtonIconClasses({
  active,
  showContainer,
  isOutline,
  disabled,
  appearanceContrast,
}: {
  active: boolean;
  showContainer: boolean;
  isOutline: boolean;
  disabled: boolean;
  appearanceContrast: IBmbContrast;
}): string[] {
  const className = 'bmb_button_icon';
  const classes: string[] = [className];

  if (active) classes.push(`${className}-active`);
  if (showContainer) {
    classes.push(`${className}-container`);
    if (isOutline) classes.push(`${className}-container-outline`);
  }
  if (disabled) classes.push(`${className}-disabled`);
  if (appearanceContrast === 'primary' || appearanceContrast === 'alternative' || appearanceContrast === 'solid') {
    classes.push(`${className}-container-${appearanceContrast}`);
  }

  return classes;
}

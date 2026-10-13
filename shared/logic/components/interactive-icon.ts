import { IBmbInteractiveIconType } from '../../types/components/interactive-icon';
import { IBmbContrast } from '../../types/colors';

export function getInteractiveIconClasses(
  layout: IBmbInteractiveIconType,
  appearanceContrast: IBmbContrast,
  horizontal: boolean,
): string[] {
  const principalClassName = 'bmb_interactive_icon';
  const classes: string[] = [principalClassName, `${principalClassName}-${layout}`];

  if (appearanceContrast === 'primary') {
    classes.push('bmb_interactive_icon-primary');
  }

  if (appearanceContrast === 'alternative') {
    classes.push('bmb_interactive_icon-alternative');
  }

  if (horizontal) classes.push(`${principalClassName}-horizontal`);

  return classes;
}

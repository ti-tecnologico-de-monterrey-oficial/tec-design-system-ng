import { IBmbContrast } from '../../../../components/types/colors';
import { IBmbInteractiveIconType } from '../../../../components/bmb-interactive-icon/bmb-interactive-icon.component';

export interface InteractiveIconClassesParams {
  appearanceContrast: IBmbContrast;
  layout: IBmbInteractiveIconType;
  horizontal: boolean;
}

export const getInteractiveIconClasses = ({
  appearanceContrast,
  layout,
  horizontal,
}: InteractiveIconClassesParams): string[] => {
  const principalClassName = 'bmb_interactive_icon';

  const classes: string[] = [
    principalClassName,
    `${principalClassName}-${layout}`,
  ];

  if (appearanceContrast === 'primary') {
    classes.push('bmb_interactive_icon-primary');
  }

  if (appearanceContrast === 'alternative') {
    classes.push('bmb_interactive_icon-alternative');
  }

  if (horizontal) {
    classes.push(`${principalClassName}-horizontal`);
  }

  return classes;
};
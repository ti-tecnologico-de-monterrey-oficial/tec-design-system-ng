import { IBmbContrast } from '../../../types/colors.js';

export interface IBmbButtonIconClassesProps {
  active: boolean;
  showContainer: boolean;
  disabled: boolean;
  isOutline: boolean;
  appearanceContrast: IBmbContrast;
}

export const getButtonIconClasses = ({
  active,
  showContainer,
  disabled,
  isOutline,
  appearanceContrast,
}: IBmbButtonIconClassesProps): Record<string, boolean> => ({
  'bmb_button_icon-active': active,
  'bmb_button_icon-container': showContainer,
  'bmb_button_icon-container-outline':
    showContainer && isOutline,
  'bmb_button_icon-disabled': disabled,
  'bmb_button_icon-container-primary':
    appearanceContrast === 'primary',
  'bmb_button_icon-container-alternative':
    appearanceContrast === 'alternative',
  'bmb_button_icon-container-solid':
    appearanceContrast === 'solid',
});

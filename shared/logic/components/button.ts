import { IButtonAppearance } from '../../types';

export function getButtonClasses({
  appearance,
  isCase,
  enableButtonToggle,
  isToggleActive,
  isMobile,
}: {
  appearance: IButtonAppearance;
  isCase: boolean;
  enableButtonToggle: boolean;
  isToggleActive: boolean;
  isMobile: boolean;
}): string[] {
  const classList = ['bmb_btn', `bmb_btn-${appearance}`];
  classList.push('bmb_btn-rounded');

  if (isCase) classList.push('bmb_btn-case');

  if (enableButtonToggle && isToggleActive)
    classList.push('bmb_btn-toggle-active');

  if (isMobile) classList.push('bmb_btn-mobile');

  return classList;
}

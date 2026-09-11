export function computeSwitchIcon({
  rightIcon,
  leftIcon,
  rightText,
  leftText,
  isChecked,
}: {
  rightIcon: string;
  leftIcon: string;
  rightText: string;
  leftText: string;
  isChecked: boolean;
}): string {
  if (!!rightIcon && !!leftIcon && !!!rightText && !!!leftText) {
    if (isChecked) return rightIcon;
    return leftIcon;
  }

  return '';
}

export function shouldShowSwitchLabel({
  position,
  rightIcon,
  leftIcon,
  rightText,
  leftText,
}: {
  position: string;
  rightIcon: string;
  leftIcon: string;
  rightText: string;
  leftText: string;
}): boolean {
  if (!!rightIcon || !!!rightText || !!leftIcon || !!!leftText) {
    if (position === 'left') return !!leftText;
    if (position === 'right') return !!rightText;
  }

  return false;
}

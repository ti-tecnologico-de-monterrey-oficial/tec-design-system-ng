export type IBmbAppearanceType =
  | 'primary-container'
  | 'primary-home'
  | 'primary-header'
  | 'secondary-container'
  | 'contrast-box-container'
  | 'button-container';

export const getContainerClasses = ({
  appearance,
  isHidden,
}: {
  appearance: IBmbAppearanceType;
  isHidden: boolean;
}): string[] => {
  const className = 'bmb_container';

  if (isHidden) {
    return [`${className}-hidden`];
  }

  const classes: string[] = [className];

  if (appearance) {
    classes.push(`${className}-${appearance}`);
  }

  return classes;
};
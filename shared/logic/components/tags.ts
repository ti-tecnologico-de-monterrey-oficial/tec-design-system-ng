import { IBmbActivityTags } from '../../types/components/tags';
import { IBmbTagColors } from '../../types/foundations/colors/color-type';

export function getTagClasses({
  appearance,
  dismissible,
  enableClick,
  isActive,
  isDisabled,
}: {
  appearance: IBmbActivityTags | IBmbTagColors;
  dismissible: boolean;
  enableClick: boolean;
  isActive: boolean;
  isDisabled: boolean;
}): string[] {
  const classes = [
    'bmb_tag',
    'bmb_tag-rounded',
    `bmb_tag-${appearance}`,
  ];

  if (dismissible || enableClick) {
    if (isActive) {
      classes.push('bmb_tag-active');
    }

    if (isDisabled) {
      classes.push('bmb_tag-disabled');
    }
  } else {
    classes.push('bmb_tag-activity');
  }

  return classes;
}
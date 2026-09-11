import type {
  BmbStudentActivityBadgeAppearance,
  BmbStudentActivityType,
} from '../../types/components/student-activity-card';

export const getStudentActivityCardClasses = ({
  isListItem,
  disableImage,
  type,
}: {
  isListItem: boolean;
  disableImage: boolean;
  type: BmbStudentActivityType;
}): string[] => {
  const classes = ['bmb_student-activity-card'];

  if (isListItem) classes.push('bmb_student-activity-card-list-item');

  if (isListItem && disableImage) {
    classes.push('bmb_student-activity-card-list-item-no-image');
  } else {
    classes.push(`bmb_student-activity-card-${type}`);
  }

  return classes;
};

const BADGE_APPEARANCES: Record<
  BmbStudentActivityType,
  BmbStudentActivityBadgeAppearance
> = {
  academic: 'creative-use-strong',
  life: 'mitec_green',
  events: 'mitec_purple',
  save_the_date: 'mitec_orange',
};

export const getStudentActivityBadgeAppearance = (
  type: BmbStudentActivityType,
): BmbStudentActivityBadgeAppearance => BADGE_APPEARANCES[type];

export const getStudentActivityBulletStyles = (
  color: string,
): Record<'background-color', string> => ({
  'background-color': `rgb(var(--${color}))`,
});

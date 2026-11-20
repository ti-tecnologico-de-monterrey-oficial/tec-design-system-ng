import './badge.scss';
import {
  getBadgeBulletClass,
  getBadgeClasses,
} from '../../_shared/logic/components/badge';
import { IBmbBadgeAppearance } from '../../_shared/types';
import './styles.scss';

export interface BmbBadgeProps {
  appearance?: IBmbBadgeAppearance;
  text?: string;
  container?: boolean;
}

export const BmbBadge = ({
  appearance = 'normal',
  text = '',
  container = true,
}: BmbBadgeProps) => {
  const classes = getBadgeClasses(appearance, container).join(' ');
  const bulletAppearance = container ? '' : getBadgeBulletClass(appearance);
  const bulletClasses = `bmb_badge-bullet ${bulletAppearance}`.trim();

  return (
    <section className={classes}>
      <span className={bulletClasses}></span>
      <span className="bmb_badge-content"> { text } </span>
    </section>
  )
}

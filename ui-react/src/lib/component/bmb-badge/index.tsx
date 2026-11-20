import './badge.scss';
import {
  getBadgeBulletClass,
  getBadgeClasses,
} from '../../_shared/logic/components/badge';
import { IBmbBadgeAppearance } from '../../_shared/types';

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
  const getClasses = (): string => {
    return getBadgeClasses(appearance, container).join(' ');
  }

  const getBulletColor = (): string => {
    return container ? '' : getBadgeBulletClass(appearance);
  }

  return (
    <section className={getClasses()} >
      <span
        className={`bmb_badge-bullet ${getBulletColor()}`.trim()}
      ></span>
      <span className="bmb_badge-content"> { text } </span>
    </section>
  )
}

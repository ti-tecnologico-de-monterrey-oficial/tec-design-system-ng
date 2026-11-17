import {
  getBadgeBulletClass,
  getBadgeClasses,
} from '../../_shared/logic/components/badge';
import { IBmbBadgeAppearance } from '../../_shared/types';
import './styles.scss';

export interface BmbBadgeProps {
  appearance?: IBmbBadgeAppearance;
  text: string;
  container: boolean;
}

export const BmbBadge = ({
  appearance = 'normal',
  text = '',
  container = true,
}) => {
  const getClasses = (): string => {
    return getBadgeClasses(appearance, container).join(' ');
  }

  const getBulletColor = (): string => {
    const color = getBadgeBulletClass(appearance);
    console.log('Badge bullet color:', color);
    return color;
  }

  return (
    <section className={getClasses()} >
      <span
        className={['bmb_badge-bullet', !container ? getBulletColor() : ''].join(' ')}
      ></span>
      <span className="bmb_badge-content"> { text } </span>
    </section>
  )
}

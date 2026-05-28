import {
  getBadgeClasses,
  getBadgeBulletColor,
  type IBmbBadgeAppearanceColors,
} from '@ti-tecnologico-de-monterrey-oficial/core/component/badge';
import './bmb-badge.scss';

export interface BmbBadgeProps {
  appearance?: IBmbBadgeAppearanceColors;
  text?: string;
  container?: boolean;
  className?: string;
}

export function BmbBadge({
  appearance = 'normal',
  text = '',
  container = true,
  className = '',
}: BmbBadgeProps) {
  const sectionClasses = [
    ...getBadgeClasses({
      container,
      appearance,
    }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const bulletClasses = ['bmb_badge-bullet', !container ? getBadgeBulletColor(appearance) : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={sectionClasses}>
      <span className={bulletClasses} />
      <span className="bmb_badge-content">{text}</span>
    </section>
  );
}

export default BmbBadge;

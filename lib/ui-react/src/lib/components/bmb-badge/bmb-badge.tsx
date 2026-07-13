import {
  getBadgeClasses,
  getBadgeBulletColor,
  type IBmbBadgeAppearanceColors,
} from '../../_core/logic/components/badge/badge';
import { type ReactNode } from 'react';
import './bmb-badge.scss';

export interface BmbBadgeProps {
  appearance?: IBmbBadgeAppearanceColors;
  text?: string;
  container?: boolean;
  className?: string;
  children?: ReactNode;
}

export function BmbBadge({
  appearance = 'normal',
  text = '',
  container = true,
  className = '',
  children,
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

  const content = children ?? text;

  return (
    <section className={sectionClasses}>
      <span className={bulletClasses} />
      <span className="bmb_badge-content">{content}</span>
    </section>
  );
}

export default BmbBadge;

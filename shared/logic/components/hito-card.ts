import { IBbmBgAppearance } from '../../types/components/advertisement-card';
import {
  IBmbTimelineCustomEvent,
  ITimelineEventType,
} from '../../types/components/timestream';

export function truncateHitoCardText(text?: string, maxLength = 90): string {
  if (!text) return '';
  return text.length > maxLength
    ? text.slice(0, maxLength).trimEnd() + '…'
    : text;
}

export function getHitoCardClassList(
  enableBullet: boolean,
  isActive: boolean,
  isCompact: boolean,
): string[] {
  const classList = ['bmb_hito-card'];
  if (enableBullet) classList.push('bmb_hito-card-bullet');
  if (isActive) classList.push('bmb_hito-card-active');
  if (isCompact) classList.push('bmb_hito-card-compact');

  return classList;
}

export function formatHitoCardBadgeText(
  legend: string | IBmbTimelineCustomEvent,
): string {
  if (typeof legend === 'string') return legend.replace(/_/g, ' ');
  return legend.text.replace(/_/g, ' ');
}

export function getHitoCardIconClass(
  type: ITimelineEventType | IBmbTimelineCustomEvent,
): string {
  if (typeof type === 'string') return type;
  return type.type || 'custom';
}

export function getHitoCardAppearanceBadge(
  type: ITimelineEventType | IBmbTimelineCustomEvent,
): IBbmBgAppearance {
  if (typeof type === 'string') {
    switch (type) {
      case 'active':
        return 'strong';
      case 'done':
        return 'success';
      case 'pending':
        return 'normal';
      case 'under_review':
        return 'warning';
      case 'canceled':
        return 'error';
      default:
        return 'strong';
    }
  }
  return type.type || 'normal';
}

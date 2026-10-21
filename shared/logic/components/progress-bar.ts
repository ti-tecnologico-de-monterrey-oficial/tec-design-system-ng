import { IBmbProgressBarStatusColor } from '../../types/components/progress-bar';

export function getProgressBarValue(counter: number, totalCount: number): string {
  if (totalCount === 0) return '0';
  const numberProgress = (counter / totalCount) * 100;
  let newProgress = numberProgress.toFixed(2);
  if (numberProgress < 0) newProgress = '0';
  if (numberProgress > 100) newProgress = '100';

  return newProgress;
}

export function getProgressBarColorClass(
  statusColor: IBmbProgressBarStatusColor,
): string {
  return `bmb_progress-bar-active-${statusColor}`;
}

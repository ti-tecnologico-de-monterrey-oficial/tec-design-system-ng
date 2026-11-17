import { DateTime } from 'luxon';

export function alertCenterGetTextFromDate(date: DateTime): string {
  return date.toFormat('EEEE dd LLLL yyyy', { locale: 'es' });
}

export function alertCenterGetTimeVariant(
  pDate: DateTime,
): 'today' | 'yesterday' | 'date' {
  if (!pDate?.isValid) return 'date';

  const now = DateTime.now().startOf('day');
  const target = pDate.startOf('day');
  const diffDays = now.diff(target, 'days').days;

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';

  return 'date';
}

export function alertCenterGetFormattedTime(
  time: string,
  pDate: DateTime,
): string {
  if (!pDate?.isValid) return '';

  const parts = time.split(':');
  if (parts.length !== 2) return '';

  const [hour, minute] = parts.map(Number);
  if (isNaN(hour) || isNaN(minute)) return '';

  const now = DateTime.now().startOf('day');
  const target = pDate.startOf('day');
  const diffDays = now.diff(target, 'days').days;

  const dateTime = pDate.set({ hour, minute });

  if (diffDays < 0) return dateTime.toFormat('h:mm a').toLowerCase();
  if (diffDays === 0) return dateTime.toFormat('h:mm a');
  if (diffDays === 1) {
    return (
      dateTime.setLocale('es').toRelativeCalendar() ??
      dateTime.toFormat('dd/MM/yyyy')
    );
  }

  return pDate.toFormat('dd/MM/yyyy');
}

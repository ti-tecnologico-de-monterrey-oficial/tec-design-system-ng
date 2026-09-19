import { DateTime } from 'luxon';
import {
  IBmbListItemsElement,
  IBmbListItemsElementGroupedByDate,
} from '../../types/components/list-items';

export function groupListItemsByDate(
  items: IBmbListItemsElement[],
  dateFormat: string,
): IBmbListItemsElementGroupedByDate {
  const orderedDates = [...items].sort((a, b) => {
    const dateA = DateTime.fromFormat(a.date, dateFormat);
    const dateB = DateTime.fromFormat(b.date, dateFormat);
    return dateA < dateB ? 1 : -1;
  });

  return orderedDates.reduce(
    (acc: IBmbListItemsElementGroupedByDate, event: IBmbListItemsElement) => {
      const date = DateTime.fromFormat(event.date, dateFormat);
      const now = DateTime.now();
      const diff = now.diff(date, 'days').days;
      if (diff < 2) {
        acc.recent.push({ ...event, formattedDate: date });
      } else if (diff < 7) {
        acc.lastWeek.push({ ...event, formattedDate: date });
      } else if (diff < 30) {
        acc.lastMonth.push({ ...event, formattedDate: date });
      } else {
        acc.rest.push({ ...event, formattedDate: date });
      }
      return acc;
    },
    {
      recent: [],
      lastWeek: [],
      lastMonth: [],
      rest: [],
    },
  );
}

export function getListItemRelativeDate(date: DateTime): string {
  const now = DateTime.now();
  const diff = now.diff(date, 'days').days;

  if (diff < 1) {
    return 'Hoy';
  } else if (diff < 2) {
    return 'Ayer';
  } else {
    return date.toFormat('dd/MM');
  }
}

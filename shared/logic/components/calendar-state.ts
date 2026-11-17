import { DateTime, Interval } from 'luxon';
import type { IBmbColorSemantics } from '../../types/colors';
import type {
  IBmbCalendarEvent,
  IBmbParsedDates,
} from '../../types/components/calendar';

export function filterCalendarEvents({
  orderedEvents,
  filters,
}: {
  orderedEvents: IBmbParsedDates;
  filters: Record<string, boolean>;
}): IBmbParsedDates {
  const newEvents = {} as IBmbParsedDates;
  for (const week in orderedEvents) {
    if (week !== 'calendars') {
      newEvents[week] = {};
      for (const date in orderedEvents[week]) {
        newEvents[week][date] = orderedEvents[week][date].map((event) => ({
          ...event,
          isVisible:
            Object.keys(filters).length === 0 ||
            filters[event.calendar || 'Default'] !== false,
        }));
      }
    }
  }

  newEvents.calendars = orderedEvents.calendars;

  return newEvents;
}

export function orderCalendarEvents(
  events: IBmbCalendarEvent[],
  dateFormat: string,
): IBmbParsedDates {
  const weeks = events.reduce(
    (acc: IBmbParsedDates, event) => {
      const startDate = parseCalendarDate(event.start, dateFormat);
      const endDate = parseCalendarDate(event.end, dateFormat);
      const interval = Interval.fromDateTimes(startDate, endDate);
      const week = startDate.weekNumber;
      const stringDate = startDate.toFormat('yyyy-MM-dd');
      const bulletColor: IBmbColorSemantics =
        event.bulletColor || 'success-primary';

      if (!acc[week]) acc[week] = {};
      if (!acc[week][stringDate]) acc[week][stringDate] = [];
      acc[week][stringDate].push({
        ...event,
        startDate,
        endDate,
        interval,
        bulletColor,
      });

      if (event.calendar && !acc.calendars?.includes(event.calendar)) {
        acc.calendars?.push(event.calendar);
      }

      return acc;
    },
    { calendars: [] } as IBmbParsedDates,
  );

  const orderedDates = {} as IBmbParsedDates;

  for (const week in weeks) {
    if (week === 'calendars') {
      orderedDates[week] = weeks[week];
    } else {
      orderedDates[week] = {};

      for (const date in weeks[week]) {
        orderedDates[week][date] = weeks[week][date].sort((a, b) => {
          const aDate = a.startDate ?? DateTime.invalid('Invalid Date');
          const bDate = b.startDate ?? DateTime.invalid('Invalid Date');
          return aDate <= bDate ? -1 : 1;
        });
      }
    }
  }

  return orderedDates;
}

export const parseCalendarDate = (
  dateString: string,
  format: string,
): DateTime =>
  format.toLowerCase() === 'iso'
    ? DateTime.fromISO(dateString)
    : DateTime.fromFormat(dateString, format);

import { DateTime, Info, StringUnitLength } from 'luxon';
import { IBmbCalendarEvent, IBmbCalendarRenderEvents } from './types';

export const DEFAULT_DATE_FORMAT = 'iso';
export const HOUR_HEIGHT = 120;

export const getWeekDays = (date: DateTime): DateTime[] => {
  const currentWeek = DateTime.fromObject({
    weekYear: date.weekYear,
    weekNumber: date.weekNumber,
  });
  const firstWeekDay = currentWeek.startOf('week');

  let weekDays = [];

  for (let day = -1; day <= 5; day++) {
    weekDays.push(firstWeekDay.plus({ days: day }));
  }

  return weekDays;
};

export const getMonthDays = (date: DateTime): DateTime[] => {
  const currentWeek = DateTime.fromObject({
    weekYear: date.year,
    weekNumber: date.weekNumber,
  });
  const firstWeekDay = currentWeek.startOf('week');

  const weekDays = [];

  for (let day = -1; day <= 33; day++) {
    weekDays.push(firstWeekDay.plus({ days: day }));
  }

  return weekDays;
};

export const getTimeRange = (event: IBmbCalendarEvent): string => {
  const start = DateTime.fromISO(event.start);
  const end = DateTime.fromISO(event.end);

  return `${start.toFormat('hh:mm')} - ${end.toFormat('hh:mm')}`;
};

// remove this
export const eventsInDate = ({
  date,
  events,
}: IBmbCalendarRenderEvents): any[] => {
  const todayEvents = events.filter((event: IBmbCalendarEvent) =>
    date.hasSame(DateTime.fromISO(event.start), 'day'),
  );

  return todayEvents;
};

export const dayName = (
  date: DateTime,
  lang: string,
  format: StringUnitLength = 'short',
): string => {
  const defaultDayOrder = Info.weekdays(format, { locale: lang });
  return defaultDayOrder[date.weekday - 1];
};

export const weeksAndDays = (date: DateTime): DateTime[] => {
  const calculateFirstDay = getWeekDays(date);

  let weekDays = [];

  for (let day = 0; day <= 41; day++) {
    weekDays.push(calculateFirstDay[0].plus({ days: day }));
  }

  return weekDays;
};

export const getWeeksInMonth = (date: DateTime): number[] => {
  const startOfMonth = date.startOf('month').weekNumber;
  const endOfMonth = date.endOf('month').weekNumber;

  return [startOfMonth, endOfMonth];
};

export const layoutEvents = (events: IBmbCalendarEvent[]) => {
  let processed: IBmbCalendarEvent[] = [];
  let groups: IBmbCalendarEvent[][] = [];

  // Group events by collisions
  events.forEach((event) => {
    let added = false;
    for (let g of groups) {
      if (
        g.some(
          (ev) =>
            ev?.interval &&
            event?.interval &&
            ev.interval.overlaps(event.interval),
        )
      ) {
        g.push(event);
        added = true;
        break;
      }
    }
    if (!added) groups.push([event]);
  });

  // For each group, assign columns
  groups.forEach((group) => {
    const cols: IBmbCalendarEvent[][] = [];
    group.forEach((e) => {
      let placed = false;
      for (let i = 0; i < cols.length; i++) {
        if (
          !cols[i].some(
            (ev) =>
              ev.interval && e.interval && ev.interval.overlaps(e.interval),
          )
        ) {
          cols[i].push(e);
          e.column = i;
          placed = true;
          break;
        }
      }
      if (!placed) {
        cols.push([e]);
        e.column = cols.length - 1;
      }
    });
    group.forEach((e) => (e.columnCount = cols.length));
    processed = processed.concat(group);
  });

  return processed;
};

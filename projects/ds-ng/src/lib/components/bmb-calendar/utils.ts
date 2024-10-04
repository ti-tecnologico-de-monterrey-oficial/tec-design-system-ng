import { DateTime, Info, StringUnitLength } from 'luxon';
import { IBmbCalendarEvent, IBmbCalendarRenderEvents } from './types';

export const getWeekDays = (date: DateTime): DateTime[] => {
  const currentWeek = DateTime.fromObject({
    weekYear: date.year,
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

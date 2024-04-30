import { DateTime } from 'luxon';
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

  let weekDays = [];

  for (let day = -1; day <= 38; day++) {
    weekDays.push(firstWeekDay.plus({ days: day }));
  }

  return weekDays;
};

export const orderDayNames = (
  days: (string | undefined)[],
): (string | undefined)[] => {
  const lastElement: string | undefined = days.pop();
  days.unshift(lastElement);
  return days;
};

export const getTimeRange = (event: IBmbCalendarEvent): string => {
  const start = DateTime.fromISO(event.start);
  const end = DateTime.fromISO(event.end);

  return `${start.toFormat('hh:mm')} - ${end.toFormat('hh:mm')}`;
};

export const eventsInDate = ({ date, events }: IBmbCalendarRenderEvents): any[] => {
  const todayEvents = events.filter((event: IBmbCalendarEvent) =>
    date.hasSame(DateTime.fromISO(event.start), 'day'),
  );

  return todayEvents;
};

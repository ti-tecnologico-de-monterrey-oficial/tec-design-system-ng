import type { IBmbHitoListEvents, ISelectedDate } from '../../types/components/hito-list';

export const getHitoMonthTitle = (
  events: IBmbHitoListEvents,
  month: string,
): string => `${events[month].name} ${events[month].year}`;

export const getHitoSelectedDate = (
  events: IBmbHitoListEvents,
  month: string,
  day: string,
): ISelectedDate => ({
  month,
  day,
  date: events[month].events[day].date,
});

export const formatHitoEventDate = (
  events: IBmbHitoListEvents,
  month: string,
  day: string,
  lang: string,
  format: string,
): string => events[month].events[day].date.setLocale(lang).toFormat(format);

export const getHitoEventTypeClass = (type: unknown): string =>
  `bmb_hito_list-content-item-circle-${String(type)}`;

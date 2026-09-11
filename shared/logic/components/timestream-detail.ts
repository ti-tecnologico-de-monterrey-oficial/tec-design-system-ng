import { DateTime } from 'luxon';
import type {
  ITimelineEvent,
  ITimelineEventParsed,
} from '../../types/components/timestream';

export const isTimestreamCurrentMonth = (
  date: string,
  selectedDate: DateTime,
): boolean => {
  const parsedDate = DateTime.fromFormat(date, 'yyyy/MM');

  return (
    parsedDate.month === selectedDate.month &&
    parsedDate.year === selectedDate.year
  );
};

export const getTimestreamMonthTitle = (date: DateTime, lang: string): string =>
  date.setLocale(lang).toFormat('cccc dd LLLL yyyy');

export const getTimestreamDurationString = (
  event: ITimelineEvent,
  lang: string,
): string => {
  const startDay = event.originalStart?.day ?? '';
  const endDate =
    event.endEvent?.setLocale(lang).toFormat('dd LLLL yyyy') ?? '';
  const duration = (event.diff ?? 0) + 1;

  return `Duración: ${startDay} - ${endDate} (${duration} Días)`;
};

export const isTimestreamTodayEvent = (
  event: ITimelineEventParsed,
  now: DateTime,
): boolean => event.date.hasSame(now, 'day');

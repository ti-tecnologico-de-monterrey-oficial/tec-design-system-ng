import { DateTime } from 'luxon';

export interface ITimelineEvent {
  start: string;
  end: string;
  title: string;
  image: string;
  short_description: string;
  description: string;
  type: string;
  instance: string;
  action: string;
  startEvent?: DateTime;
  endEvent?: DateTime;
  originalStart?: DateTime;
  diff?: number;
}

export interface ISelectedDate {
  day: string;
  month: string;
  date: DateTime;
}

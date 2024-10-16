import { DateTime } from 'luxon';

export interface ISelectedDate {
  day: string;
  month: string;
  date: DateTime;
}

export interface ITimelineDayEvent {
  date: DateTime;
  events: ITimelineEvent[];
  selected: boolean;
  stringDate: string;
}

export interface ITimelineEvent {
  id: number | string;
  start: string;
  end: string;
  description: string;
  short_description: string;
  type: ITimelineEventType;
  related_to?: string[];
  decision?: string;
  title: string;
  image: string;
  picture_profile?: string;
  diff?: number;
  startEvent?: DateTime;
  endEvent?: DateTime;
  originalStart?: DateTime;
  user_first_name?: string;
  user_last_name?: string;
  user_email?: string;
  tags?: string[];
  icon?: string;
}

export type ITimelineEventType = 'pending' | 'done' | 'active' | 'under_review';

export interface ITimelineEventParsed extends ITimelineEvent {
  startEvent: DateTime;
  endEvent: DateTime;
  selected: boolean;
  diff: number;
  originalStart: DateTime;
  date: DateTime;
  events: ITimelineEvent[];
}

export interface IBmbTimestreamFilters {
  instances?: string;
  text?: string;
  type?:  string[];
}

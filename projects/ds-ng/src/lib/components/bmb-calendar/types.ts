import { DateTime } from "luxon";

export type Event = {
  title: string,
  detail: string,
  start: string,
  end: string,
  id: string,
}

export type View = 'week' | 'month' | 'day';

export type HourFormat = '12' | '24';

export interface EventClick {
  event: Event,
  position: any,
}

export interface IRenderEvents {
  date: DateTime,
  events: Event[],
}

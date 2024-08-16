import { DateTime } from 'luxon';

export type IBmbCalendarEvent = {
  title: string;
  detail: string;
  start: string;
  end: string;
  modalTitle: string;
  status: string;
  type?: IBmbEventType;
  id?: string;
};

export type IBmbCalendarView = 'week' | 'month' | 'day';

export type IBmbCalendarHourFormat = '12' | '24';

export type IBmbEventType = 'academic' | 'life' | 'events';

export interface IBmbCalendarEventClick {
  event: IBmbCalendarEvent;
  position: any;
}

export interface IBmbCalendarRenderEvents {
  date: DateTime;
  events: IBmbCalendarEvent[];
}

import { DateTime } from 'luxon';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

export type IBmbCalendarEvent = {
  title: string;
  subtitle?: string;
  detail: string;
  start: string;
  end: string;
  modalTitle: string;
  status?: IBmbEventStatus;
  type?: IBmbEventType;
  id?: string;
  tags?: {
    appearance: IBbmBgAppearance;
    text: string;
  }[];
  place?: string;
};

export type IBmbCalendarView = 'week' | 'month' | 'day';

export type IBmbCalendarHourFormat = '12' | '24';

export type IBmbEventType = 'academic' | 'life' | 'events';

export type IBmbEventStatus = 'disabled' | 'active';

export interface IBmbCalendarEventClick {
  event: IBmbCalendarEvent;
  position: any;
}

export interface IBmbCalendarRenderEvents {
  date: DateTime;
  events: IBmbCalendarEvent[];
}

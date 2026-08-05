import { DateTime, Interval } from 'luxon';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import { IBmbColorSemantics } from '../../types/colors';

export type IBmbCalendarMicroProgram = {
  title: string;
  code: string;
  module: string;
  tags?: {
    appearance: IBbmBgAppearance;
    text: string;
  }[];
  startDate: string;
  endDate: string;
  location?: string;
  daysRepetition?: string[];
  campus?: string;
  group?: string;
};

export type IBmbCalendarEvent = {
  title: string;
  subtitle?: string;
  detail: string;
  start: string;
  end: string;
  modalTitle?: string;
  status?: IBmbEventStatus;
  type?: IBmbEventType;
  id?: string;
  tags?: {
    appearance: IBbmBgAppearance;
    text: string;
  }[];
  place?: string;
  calendar?: string;
  isVisible?: boolean;
  startDate?: DateTime;
  endDate?: DateTime;
  column?: number;
  columnCount?: number;
  interval?: Interval;
  bulletColor?: IBmbColorSemantics;
  daysRepetition?: string;
  campus?: string;
  microProgram?: IBmbCalendarMicroProgram[];
};

export type IBmbCalendarView = 'week' | 'month' | 'day';

export type IBmbCalendarHourFormat = '12' | '24';

export type IBmbEventType = 'academic' | 'life' | 'events' | 'save_the_date';

export type IBmbEventStatus = 'disabled' | 'active';

export interface IBmbCalendarEventClick {
  event: IBmbCalendarEvent;
  position: any;
}

export interface IBmbCalendarRenderEvents {
  date: DateTime;
  events: IBmbCalendarEvent[];
}

export interface IBmbParsedDates {
  calendars?: string[];
  [week: number]: { [date: string]: IBmbCalendarEvent[] };
}

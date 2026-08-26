import type { DateTime } from 'luxon';

export interface ISelectedDate {
  day: string;
  month: string;
  date: DateTime;
}

export interface IBmbHitoListEventIndicator {
  type: unknown;
}

export interface IBmbHitoListDay {
  date: DateTime;
  selected: boolean;
  events: IBmbHitoListEventIndicator[];
  stringDate?: string;
}

export interface IBmbHitoListMonth {
  name: string;
  year: number | string;
  selected: boolean;
  orderedEvents: string[];
  events: Record<string, IBmbHitoListDay>;
}

export type IBmbHitoListEvents = Record<string, IBmbHitoListMonth>;

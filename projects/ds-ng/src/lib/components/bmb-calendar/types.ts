export type Event = {
  title: string,
  detail: string,
  start: Date,
  end: Date,
  id: string,
}

export type View = 'week' | 'month' | 'day';

export type HourFormat = '12' | '24';

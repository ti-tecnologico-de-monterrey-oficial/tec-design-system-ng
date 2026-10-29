import { DateTime } from 'luxon';
import type {
  IBmbCalendarEvent,
  IBmbCalendarMicroProgram,
  IBmbCalendarView,
  IBmbParsedDates,
} from '../../types/components/calendar';
import { HOUR_HEIGHT, dayName, getMonthDays, getWeekDays } from './calendar';
import { parseCalendarDate } from './calendar-state';

export function getCalendarHeight(height: string | number): string {
  if (typeof height === 'number') return `${height}px`;

  return height;
}

export function getCalendarHeaderTitle(
  view: IBmbCalendarView,
  weekDays: DateTime[],
  locale: string,
  currentDate: DateTime,
): string {
  if (view === 'week') {
    return `${weekDays[0].setLocale(locale).toFormat('LLL dd')} -
        ${weekDays[6].setLocale(locale).toFormat('LLL dd')}`;
  }

  if (view === 'day') {
    return currentDate.setLocale(locale).toLocaleString({
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  return currentDate.setLocale(locale).toLocaleString({ month: 'long' });
}

export function headerGetBulletClass(name: string): string[] {
  return ['bmb_calendar-event-bullet', `bmb_calendar-event-bullet-${name}`];
}

export function headerGetCalendarName(name: string): string {
  switch (name) {
    case 'academic':
      return 'Horario de clases';
    case 'life':
      return 'Vida';
    case 'events':
      return 'Eventos';
    case 'save_the_date':
      return 'Save the date';
    default:
      return name;
  }
}

export function hourViewCreateHoursRows() {
  const placeholderArray = new Array(24).fill(0);
  let hour = 0;
  return placeholderArray.map((_, index) => {
    if (hour === 12) {
      hour = 0;
    }
    if (!index) return '12 am';
    if (!index) return 0;

    hour++;

    return `${hour} ${index < 12 ? 'am' : 'pm'}`;
  });
}

export function templateMonthIsNow(date: DateTime): boolean {
  const diff = date.diffNow('day').days;
  return diff < 0 && diff > -1;
}

export function templateWeekIsNow(date: DateTime): boolean {
  const diff = date?.diffNow('day')?.days;
  return diff < 0 && diff > -1;
}

export function templateWeekIsToday(date: DateTime): boolean {
  const today = DateTime.now();
  return date.hasSame(today, 'day');
}

export function timeIndicatorGetPosition(currentTime: DateTime): string {
  const startMin = currentTime.hour * HOUR_HEIGHT + currentTime.minute * 2;

  return `top: ${startMin + 52}px`;
}

export function timeIndicatorGetFormattedTime(currentTime: DateTime): string {
  return currentTime.toFormat('hh:mm a');
}

export function mobileIsSelectedDay(date: DateTime, now: DateTime): boolean {
  return date.hasSame(now, 'day');
}

export function mobileFindEventsForToday(
  date: DateTime,
  events: IBmbParsedDates,
) {
  const weekNumber = date.weekNumber;
  const stringDate = date.toFormat('yyyy-MM-dd');
  return !!events?.[weekNumber]?.[stringDate]?.some((event) => event.isVisible);
}

export function mobileGetBulletClass(name: string): string[] {
  return ['bmb_calendar-event-bullet', `bmb_calendar-event-bullet-${name}`];
}

export function mobileGetCalendarName(name: string): string {
  switch (name) {
    case 'academic':
      return 'Horario de clases';
    case 'life':
      return 'Vida';
    case 'events':
      return 'Eventos';
    case 'save_the_date':
      return 'Save the date';
    default:
      return name;
  }
}

export function getCalendarDayName(now: DateTime, locale: string): string {
  return now.toFormat('cccc', { locale: locale });
}

export function getCalendarShortDayName(date: DateTime, locale: string) {
  return dayName(date, locale);
}

export function scheduleGetPosition(
  isPositionAbsolute: boolean,
  event: IBmbCalendarEvent,
): object {
  if (!isPositionAbsolute) return {};

  const startMin =
    (event?.startDate?.hour ?? 0) * HOUR_HEIGHT +
    (event?.startDate?.minute ?? 0) * 2;
  const endMin =
    (event?.endDate?.hour ?? 0) * HOUR_HEIGHT +
    (event?.endDate?.minute ?? 0) * 2 -
    startMin;
  const column = event?.column ?? 0;
  const columnSize = event?.columnCount ?? 1;
  const left = column ? (100 / columnSize) * column + 1 : 0;
  const width = columnSize ? 100 / columnSize : 100;

  return {
    top: `${startMin}px`,
    height: `${endMin}px`,
    left: `calc(${left}% + ${8 / (columnSize + 1)}px)`,
    width: `calc(${width}% - ${8 / (columnSize + 1)}px)`,
  };
}

export function scheduleGetClassNames(
  event: IBmbCalendarEvent,
  isPositionAbsolute: boolean,
  now: DateTime,
): string[] {
  const newClasses = [`bmb_calendar-event-type-${event.type}`];
  if (isPositionAbsolute) newClasses.push('bmb_calendar-event-absolute');
  else newClasses.push('bmb_calendar-event-micro');
  if (event.status === 'disabled')
    newClasses.push('bmb_calendar-event-disabled');
  if ((event?.microProgram?.length ?? 0) > 0)
    newClasses.push('bmb_calendar-event-microprogram');
  const diff = (event?.endDate ?? DateTime.now()).diff(
    event?.startDate ?? DateTime.now(),
    ['minutes'],
  );

  // 30 represents minutes
  if (diff.minutes < 45) {
    newClasses.push('bmb_calendar-event-grid-reduced');
  } else {
    newClasses.push('bmb_calendar-event-grid-full');
  }

  if (
    now >= (event?.startDate ?? 0) &&
    now <= (event?.endDate ?? 0) &&
    event.status !== 'disabled'
  ) {
    newClasses.push('bmb_calendar-event-active');
  }

  return newClasses;
}

export function scheduleGetBulletStyle(event: IBmbCalendarEvent) {
  return {
    'background-color': event.bulletColor
      ? `rgb(var(--${event.bulletColor}))`
      : 'var(--bmb-color-success-primary)',
  };
}

export function scheduleGetDuration(
  isMicroEvent = false,
  event: IBmbCalendarEvent,
  selectedMicroProgram: IBmbCalendarMicroProgram | null,
  dateFormat: string,
): string {
  if (!event) return '';
  const microProgram = selectedMicroProgram;
  if (isMicroEvent && microProgram !== null) {
    const start = parseCalendarDate(microProgram.startDate ?? '', dateFormat);
    const end = parseCalendarDate(microProgram.endDate ?? '', dateFormat);
    return `${start.toFormat('hh:mm a')} - ${end.toFormat('hh:mm a')}`;
  }
  return `${parseCalendarDate(event.start, dateFormat).toFormat('hh:mm a')} - ${parseCalendarDate(event.end, dateFormat).toFormat('hh:mm a')}`;
}

export function scheduleGetMicroPosition(
  microEvent: IBmbCalendarMicroProgram,
  event: IBmbCalendarEvent,
  dateFormat: string,
): object {
  const startMin =
    (event?.startDate?.hour ?? 0) * HOUR_HEIGHT +
    (event?.startDate?.minute ?? 0) * 2;
  const microEventStartDate = parseCalendarDate(
    microEvent.startDate,
    dateFormat,
  );
  const microEventEndDate = parseCalendarDate(microEvent.endDate, dateFormat);

  const microStartMin =
    (microEventStartDate.hour ?? 0) * HOUR_HEIGHT +
    (microEventStartDate.minute ?? 0) * 2;
  const top = microStartMin - startMin;
  const height =
    (microEventEndDate.diff(microEventStartDate, 'minutes').toObject()
      .minutes ?? 0) * 2;

  return {
    top: `${top}px`,
    height: `${height}px`,
  };
}

export function getCalendarDateChange(range: IBmbCalendarView, now: DateTime) {
  let visibleDates: (string | null)[] = [];

  switch (range) {
    case 'day':
      visibleDates = getMonthDays(now).map((date) => date.toISO());
      break;

    case 'week':
      visibleDates = getWeekDays(now).map((date) => date.toISO());
      break;

    case 'month':
      visibleDates = getMonthDays(now).map((date) => date.toISO());
      break;

    default:
      break;
  }

  return {
    range,
    now: now.toISO(),
    visibleDates,
  };
}

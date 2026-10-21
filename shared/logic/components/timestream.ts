import { DateTime } from 'luxon';
import type { IBbmBgAppearance } from '../../types/components/advertisement-card';
import type {
  IBmbTimelineCustomEvent,
  IPlaceholderObject,
  ITimelineEvent,
} from '../../types/components/timestream';

export function orderTimestreamDates(events: any, format: string): string[] {
  const monthsList = Object.keys(events);
  const monthsOrdered = monthsList.sort((dateA: string, dateB: string) => {
    const parsedDateA = DateTime.fromFormat(dateA, format);
    const parsedDateB = DateTime.fromFormat(dateB, format);
    return parsedDateA.toMillis() - parsedDateB.toMillis();
  });

  return monthsOrdered;
}

export function getTimestreamMonthTitle(date: DateTime, lang: string) {
  return date.setLocale(lang).toFormat('cccc dd LLLL yyyy');
}

export function getTimestreamInstances(event: any, lang: string): string[] {
  const instances = [];
  for (let index = 0; index < (event.diff || 0) + 1; index++) {
    const date = event.originalStart.plus({ days: index });
    instances.push(getTimestreamMonthTitle(date, lang));
  }
  return instances;
}

export function getTimestreamDuration(
  event: ITimelineEvent,
  lang: string,
): string {
  return `Duración: ${event.originalStart?.day} - ${event.endEvent?.setLocale(lang).toFormat('dd LLLL yyyy')} (${(event.diff || 0) + 1} Días)`;
}

export function timestreamGetDiffString(diff = 0): string {
  return diff + 1 > 1 ? `${diff + 1} Días` : `${diff + 1} Día`;
}

export function timestreamAppearanceBadge(
  eventType: string | IBmbTimelineCustomEvent,
): IBbmBgAppearance {
  if (typeof eventType === 'string') {
    switch (eventType) {
      case 'active':
        return 'mitec_blue';
      case 'done':
        return 'success';
      case 'pending':
        return 'normal';
      case 'under_review':
        return 'warning';
      default:
        return 'mitec_blue';
    }
  }
  return eventType.type || 'normal';
}

export function timestreamGetBadgeText(
  eventType: string | IBmbTimelineCustomEvent,
): string {
  if (typeof eventType === 'string') return eventType;
  return eventType.text || '';
}

export function selectTimestreamDate(
  orderedMonths: string[],
  parsedEvents: any,
  now: DateTime,
): { month: string; day: string; date: DateTime } {
  if (!orderedMonths)
    return {
      month: now.month + '',
      day: now.day + '',
      date: now,
    };

  const month =
    orderedMonths.find((date) => {
      if (date === 'orderedEvents') return false;
      const parsedDate = parsedEvents[date].date;

      return now.year <= parsedDate.year && now.month <= parsedDate.month;
    }) ||
    orderedMonths.at(-1) ||
    '';
  const orderedEvents = parsedEvents?.[month]?.orderedEvents;

  const day =
    orderedEvents?.find((date: string) => {
      const parsedDate = parsedEvents[month].events[date].date;
      return (
        now.year <= parsedDate.year &&
        now.month <= parsedDate.month &&
        now.day <= parsedDate.day
      );
    }) ||
    orderedEvents?.at(-1) ||
    '';

  if (parsedEvents[month] && month !== 'orderedEvents') {
    parsedEvents[month].selected = true;
    parsedEvents[month].events[day].selected = true;
  }
  return {
    month,
    day,
    date: parsedEvents?.[month]?.events?.[day]?.date,
  };
}

export function prepareTimestreamEvents(
  events: ITimelineEvent[] | undefined,
  dateFormat: string,
  monthsNames: string[],
) {
  if (!events?.length) {
    return {};
  }

  const objectEvent: IPlaceholderObject = {};
  events.forEach((event) => {
    const startDate = DateTime.fromFormat(event.start, dateFormat);
    const endDate = DateTime.fromFormat(event.end, dateFormat);
    const diff = endDate.diff(startDate, 'days').days + 1;

    for (let index = 0; index < diff; index++) {
      const currentDate = startDate.plus({ days: index });
      const stringDate = currentDate.toFormat('yyyy/MM/dd');
      const month = currentDate.toFormat('yyyy/MM');

      objectEvent[month] ??= {
        events: {},
        name: monthsNames[currentDate.month - 1],
        stringDate: month,
        year: currentDate.year,
        date: currentDate,
      };

      objectEvent[month].events[stringDate] ??= {
        events: [],
        date: currentDate,
        stringDate,
        selected: false,
      };

      objectEvent[month].events[stringDate].events.push({
        ...event,
        start: stringDate,
        startEvent: currentDate,
        endEvent: endDate,
        selected: false,
        diff: diff - 1,
        originalStart: startDate,
      });
    }
  });

  const orderedEvents = orderTimestreamDates(objectEvent, 'yyyy/MM');

  if (orderedEvents.length) {
    objectEvent['orderedEvents'] = orderedEvents;

    objectEvent['orderedEvents'].forEach((date: string) => {
      objectEvent[date]['orderedEvents'] = orderTimestreamDates(
        objectEvent[date].events,
        'yyyy/MM/dd',
      );
    });
  }

  return objectEvent;
}

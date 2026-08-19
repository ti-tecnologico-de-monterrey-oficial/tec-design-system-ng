import { computed, Injectable, signal } from '@angular/core';
import { DateTime, Interval } from 'luxon';
import { IBmbCalendarEvent, IBmbParsedDates } from './types';
import { IBmbColorSemantics } from '../../../_shared/types';
import { DEFAULT_DATE_FORMAT, getWeekDays } from './utils';

const parseFromFormat = (dateString: string, format: string): DateTime => {
  if (format.toLowerCase() === 'iso') return DateTime.fromISO(dateString);

  return DateTime.fromFormat(dateString, format);
};

@Injectable()
export class BmbCalendarComponentService {
  readonly visibleDate = signal<DateTime>(DateTime.now());
  readonly orderedEvents = signal<IBmbParsedDates>({});
  readonly selectedWeek = signal<number>(this.visibleDate().weekNumber);
  readonly renderWeekDays = computed(() => getWeekDays(this.visibleDate()));
  readonly currentTime = signal<DateTime>(DateTime.now());
  readonly filters = signal<Record<string, boolean>>({});
  readonly dateFormat = signal<string>(DEFAULT_DATE_FORMAT);
  readonly filteredEvents = computed<IBmbParsedDates>(() => {
    const _orderedEvents = this.orderedEvents();
    const _filters = this.filters();

    if (!_orderedEvents || Object.keys(_orderedEvents).length === 0) {
      return {};
    }

    return this.setFilteredEvents({
      orderedEvents: _orderedEvents,
      filters: _filters,
    });
  });

  getVisibleDate() {
    return this.visibleDate();
  }

  setVisibleDate(date: DateTime) {
    this.visibleDate.set(date);
  }

  getFilteredEvents() {
    return this.filteredEvents();
  }

  setFilteredEvents({
    orderedEvents,
    filters,
  }: {
    orderedEvents: IBmbParsedDates;
    filters: Record<string, boolean>;
  }): IBmbParsedDates {
    const newEvents = {} as IBmbParsedDates;
    for (const week in orderedEvents) {
      if (week !== 'calendars') {
        newEvents[week] = {};
        for (const date in orderedEvents[week]) {
          newEvents[week][date] = orderedEvents[week][date].map(
            (event) => ({
              ...event,
              isVisible:
                Object.keys(filters).length === 0 ||
                filters[event.calendar || 'Default'] !== false,
            }),
          );
        }
      }
    }

    newEvents.calendars = orderedEvents.calendars;

    return newEvents;
  }

  getOrderedEvents() {
    return this.orderedEvents();
  }

  setOrderedEvents(events: IBmbCalendarEvent[], dateFormat: string) {
    const weeks = events.reduce(
      (acc: IBmbParsedDates, event) => {
        const startDate = parseFromFormat(event.start, dateFormat);
        const endDate = parseFromFormat(event.end, dateFormat);
        const interval = Interval.fromDateTimes(startDate, endDate);
        const week = startDate.weekNumber;
        const stringDate = startDate.toFormat('yyyy-MM-dd');
        const bulletColor: IBmbColorSemantics =
          event.bulletColor || 'success-primary';

        if (!acc[week]) acc[week] = {};
        if (!acc[week][stringDate]) acc[week][stringDate] = [];
        acc[week][stringDate].push({
          ...event,
          startDate,
          endDate,
          interval,
          bulletColor,
        });

        if (event.calendar && !acc.calendars?.includes(event.calendar)) {
          acc.calendars?.push(event.calendar);
        }

        return acc;
      },
      { calendars: [] } as IBmbParsedDates,
    );

    const orderedDates = {} as IBmbParsedDates;

    for (const week in weeks) {
      if (week === 'calendars') {
        orderedDates[week] = weeks[week];
      } else {
        orderedDates[week] = {};

        for (const date in weeks[week]) {
          orderedDates[week][date] = weeks[week][date].sort((a, b) => {
            const aDate = a.startDate ?? DateTime.invalid('Invalid Date');
            const bDate = b.startDate ?? DateTime.invalid('Invalid Date');
            return aDate <= bDate ? -1 : 1;
          });
        }
      }
    }

    this.orderedEvents.set(orderedDates);
  }

  getDayEvents(): IBmbCalendarEvent[] {
    const visibleDateStr = this.visibleDate().toFormat('yyyy-MM-dd');
    const currentWeek = this.visibleDate().weekNumber;
    const events = this.filteredEvents()[currentWeek]?.[visibleDateStr] ?? [];
    return events;
  }

  setSelectedWeek(weekNumber: number) {
    this.selectedWeek.set(weekNumber);
  }

  getSelectedWeek(): number {
    return this.selectedWeek();
  }

  getRenderWeekDays(): DateTime[] {
    return this.renderWeekDays();
  }

  getCurrentTime(): DateTime {
    return this.currentTime();
  }

  setCurrentTime(date: DateTime) {
    this.currentTime.set(date);
  }

  setFilters(filters: Record<string, boolean>) {
    this.filters.set(filters);
  }

  getFilters(): Record<string, boolean> {
    return this.filters();
  }

  applyFilters(filters: Record<string, boolean>) {
    this.setFilters(filters);
  }

  setDateFormat(dateFormat: string) {
    this.dateFormat.set(dateFormat);
  }

  getDateFormat(): string {
    return this.dateFormat();
  }
}

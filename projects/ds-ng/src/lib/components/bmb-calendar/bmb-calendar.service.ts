import { computed, Injectable, signal } from '@angular/core';
import { DateTime, Interval } from 'luxon';
import { IBmbCalendarEvent, IBmbParsedDates } from './types';
import { IBmbColorSemantics } from '../../types';
import { DEFAULT_DATE_FORMAT, getWeekDays } from './utils';

const parseFromFormat = (dateString: string, format: string): DateTime => {
  if (format.toLowerCase() === 'iso') return DateTime.fromISO(dateString);

  return DateTime.fromFormat(dateString, format);
};

@Injectable()
export class BmbCalendarComponentService {
  readonly visibleDate = signal<DateTime>(DateTime.now());
  readonly filteredEvents = signal<IBmbParsedDates>({});
  readonly orderedEvents = signal<IBmbParsedDates>({});
  readonly selectedWeek = signal<number>(this.visibleDate().weekNumber);
  readonly renderWeekDays = computed(() => getWeekDays(this.visibleDate()));
  readonly currentTime = signal<DateTime>(DateTime.now());
  readonly filters = signal<Record<string, boolean>>({});
  readonly temporalFilters = signal<Record<string, boolean>>({});
  readonly dateFormat = signal<string>(DEFAULT_DATE_FORMAT);

  getVisibleDate() {
    return this.visibleDate();
  }

  setVisibleDate(date: DateTime) {
    this.visibleDate.set(date);
  }

  getFilteredEvents() {
    return this.filteredEvents();
  }

  setFilteredEvents(filters: Record<string, boolean>) {
    const newEvents = {} as IBmbParsedDates;
    for (const week in this.orderedEvents()) {
      if (week !== 'calendars') {
        newEvents[week] = {};
        for (const date in this.orderedEvents()[week]) {
          newEvents[week][date] = this.orderedEvents()[week][date].map(
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

    newEvents.calendars = this.orderedEvents().calendars;
    this.filteredEvents.set(newEvents);
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

    console.log('ordered events', orderedDates);

    this.orderedEvents.set(orderedDates);
  }

  getDayEvents(): IBmbCalendarEvent[] {
    const visibleDateStr = this.visibleDate().toFormat('yyyy-MM-dd');
    const currentWeek = this.visibleDate().weekNumber;
    const events =
      this.filteredEvents()[currentWeek]?.[visibleDateStr] ?? [];
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

  applyFilters() {
    this.setFilters(this.temporalFilters());
    this.setTemporalFilters({});
  }

  setTemporalFilters(filters: Record<string, boolean>) {
    this.temporalFilters.set(filters);
  }

  setDateFormat(dateFormat: string) {
    this.dateFormat.set(dateFormat);
  }

  getDateFormat(): string {
    return this.dateFormat();
  }
}

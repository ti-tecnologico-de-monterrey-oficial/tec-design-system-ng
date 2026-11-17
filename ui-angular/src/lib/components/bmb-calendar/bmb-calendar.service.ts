import { computed, Injectable, signal } from '@angular/core';
import { DateTime } from 'luxon';
import {
  DEFAULT_DATE_FORMAT,
  getWeekDays,
} from '../../_shared/logic/components/calendar';
import {
  filterCalendarEvents,
  orderCalendarEvents,
} from '../../_shared/logic/components/calendar-state';
import type {
  IBmbCalendarEvent,
  IBmbParsedDates,
} from '../../_shared/types/components/calendar';

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
    return filterCalendarEvents({
      orderedEvents,
      filters,
    });
  }

  getOrderedEvents() {
    return this.orderedEvents();
  }

  setOrderedEvents(events: IBmbCalendarEvent[], dateFormat: string) {
    this.orderedEvents.set(orderCalendarEvents(events, dateFormat));
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

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  input,
  computed,
} from '@angular/core';
import {
  IBmbCalendarHourFormat,
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
  IBmbCalendarRenderEvents,
  IBmbParsedDates,
} from '../../types';
import { DateTime } from 'luxon';
import { eventsInDate, dayName, weeksAndDays } from '../../utils';
import { CommonModule } from '@angular/common';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';

@Component({
  selector: 'bmb-calendar-template-month',
  standalone: true,
  imports: [CommonModule, BmbCalendarScheduleCardsComponent],
  templateUrl: './bmb-calendar-template-month.component.html',
  styleUrl: './bmb-calendar-template-month.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateMonthComponent {
  lang = input<string>('es-MX');
  now = input<DateTime>(DateTime.now());
  events = input<IBmbParsedDates>({});

  @Output() onSelectEvent: EventEmitter<IBmbCalendarEventClick> =
    new EventEmitter<IBmbCalendarEventClick>();

  weeksAndDaysList = computed<DateTime[]>(() => weeksAndDays(this.now()));
  eventsOnDate = computed<IBmbCalendarEvent[][]>(() => {
    return this.weeksAndDaysList().map((date) => {
      const weekNumber = date.weekNumber;
      const stringDate = date.toFormat('yyyy-MM-dd');
      return this.events()?.[weekNumber]?.[stringDate] ?? [];
    });
  });

  getDayName(date: DateTime, lang: string) {
    return dayName(date, lang);
  }

  isNow(date: DateTime): boolean {
    const diff = date.diffNow('day').days;
    return diff < 0 && diff > -1;
  }

  handleEventSelection(newEvent: IBmbCalendarEventClick) {
    this.onSelectEvent.emit(newEvent);
  }

  renderEvents(events: IBmbCalendarRenderEvents): any[] {
    return eventsInDate(events);
  }
}

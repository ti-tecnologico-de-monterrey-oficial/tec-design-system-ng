import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { BmbCalendarTemplateWeekComponent } from './common/bmb-calendar-template-week/bmb-calendar-template-week.component';
import { BmbCalendarTemplateDayComponent } from './common/bmb-calendar-template-day/bmb-calendar-template-day.component';
import { BmbCalendarTemplateMonthComponent } from './common/bmb-calendar-template-month/bmb-calendar-template-month.component';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';
import { BmbCalendarHeaderComponent } from './common/bmb-calendar-header/bmb-calendar-header.component';
import { Event, EventClick, HourFormat, View } from './types';
import { getWeekDays, getMonthDays } from './utils';
import { BmbCalendarTemplateEventComponent } from './common/bmb-calendar-template-event/bmb-calendar-template-event.component';

@Component({
  selector: 'bmb-calendar',
  standalone: true,
  imports: [
    CommonModule,
    BmbCalendarTemplateDayComponent,
    BmbCalendarTemplateWeekComponent,
    BmbCalendarTemplateMonthComponent,
    BmbLoaderComponent,
    BmbCalendarHeaderComponent,
    BmbCalendarTemplateEventComponent
  ],
  styleUrl: './bmb-calendar.component.scss',
  templateUrl: './bmb-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarComponent {
  @Input() events: Event[] = [];
  @Input() view: View = 'week';
  @Input() isLoading: boolean = false;
  @Input() hourFormat: HourFormat = '12';
  @Input() calendarTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  @Input() clientTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  @Input() lang: string = 'es-MX';
  @Input() currentDate: string = '';
  @Input() height: number | string = 700;

  @Output() onDateChange: EventEmitter<any> = new EventEmitter<any>();

  now = this.currentDate === '' ? DateTime.now() : DateTime.fromISO(this.currentDate);
  weekNumber = this.now.weekNumber;
  renderWeekDays: DateTime[] = getWeekDays(this.now);
  selectedEvent: ({ event: Event, position: any } | null) = null;

  handleDateChange(range: View, now: DateTime): void {
    this.view = range;
    let visibleDates: (string | null)[] = [];

    switch (range) {
      case 'day':
        visibleDates = [now.toISO()];
        break;

      case 'week':
        visibleDates = getWeekDays(now).map(date => date.toISO());
        break;

      case 'month':

        visibleDates = getMonthDays(now).map(date => date.toISO());
        break;

      default:
        break;
    }

    this.onDateChange.emit({
      range,
      now: now.toISO(),
      visibleDates,
    });
  }

  handleCurrentDateChange(newDate: DateTime): void {
    this.now = newDate;
    this.weekNumber = newDate.weekNumber;
    this.renderWeekDays = getWeekDays(newDate);
  }

  handleSelectEvent(newEvent: EventClick | null): void {
    this.selectedEvent = newEvent;
  }

  isAnEventSelected(event: EventClick | null): boolean {
    return !!event;
  }

  getHeight(height: string | number): string {
    if(typeof height === 'number') return `${height}px`;

    return height;
  }
}

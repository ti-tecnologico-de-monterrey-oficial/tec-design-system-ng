import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { BmbCalendarTemplateWeekComponent } from './common/bmb-calendar-template-week/bmb-calendar-template-week.component';
import { BmbCalendarTemplateDayComponent } from './common/bmb-calendar-template-day/bmb-calendar-template-day.component';
import { BmbCalendarTemplateMonthComponent } from './common/bmb-calendar-template-month/bmb-calendar-template-month.component';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';
import { BmbCalendarHeaderComponent } from './common/bmb-calendar-header/bmb-calendar-header.component';
import { BmbCalendarTemplateMobileComponent } from './common/bmb-calendar-template-mobile/bmb-calendar-template-mobile.component';
import { BmbCalendarTemplateEventListComponent } from './common/bmb-calendar-template-event-list/bmb-calendar-template-event-list.component';
import {
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
  IBmbCalendarHourFormat,
  IBmbCalendarView,
} from './types';
import { getWeekDays, getMonthDays } from './utils';
import { BmbCalendarTemplateEventComponent } from './common/bmb-calendar-template-event/bmb-calendar-template-event.component';

export { IBmbCalendarEvent, IBmbCalendarEventClick } from './types';

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
    BmbCalendarTemplateEventComponent,
    BmbCalendarTemplateMobileComponent,
    BmbCalendarTemplateEventListComponent,
  ],
  styleUrl: './bmb-calendar.component.scss',
  templateUrl: './bmb-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarComponent {
  @Input() events: IBmbCalendarEvent[] = [];
  @Input() view: IBmbCalendarView = 'week';
  @Input() isLoading: boolean = false;
  @Input() hourFormat: IBmbCalendarHourFormat = '12';
  @Input() calendarTimezone: string =
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  @Input() clientTimezone: string =
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  @Input() lang: string = 'es-MX';
  @Input() currentDate: string = '';
  @Input() height: number | string = 700;

  @Output() onDateChange: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('window:resize', ['$event'])
  private resize() {
    if (window.innerWidth < 1000) {
      this.view = 'day';
    } else {
      this.isListShowing = false;
    }
  }

  ngOnInit() {
    this.view = window.innerWidth < 1000 ? 'day' : this.view;
  }

  now =
    this.currentDate === ''
      ? DateTime.now()
      : DateTime.fromISO(this.currentDate);
  weekNumber = this.now.weekNumber;
  renderWeekDays: DateTime[] = getWeekDays(this.now);
  selectedEvent: { event: IBmbCalendarEvent; position: any } | null = null;
  isListShowing: boolean = false;

  handleDateChange(range: IBmbCalendarView, now: DateTime): void {
    this.view = range;
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

  handleSelectEvent(newEvent: IBmbCalendarEventClick | null): void {
    this.selectedEvent = newEvent;
  }

  isAnEventSelected(event: IBmbCalendarEventClick | null): boolean {
    return !!event;
  }

  getHeight(height: string | number): string {
    if (typeof height === 'number') return `${height}px`;

    return height;
  }

  onViewTypeChange() {
    this.isListShowing = !this.isListShowing;
  }
}

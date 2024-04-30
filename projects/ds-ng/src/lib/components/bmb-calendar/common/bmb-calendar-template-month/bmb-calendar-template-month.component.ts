import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import {
  IBmbCalendarHourFormat,
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
  IBmbCalendarRenderEvents,
} from '../../types';
import { DateTime, Info } from 'luxon';
import { getWeekDays, eventsInDate } from '../../utils';
import { CommonModule } from '@angular/common';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';

@Component({
  selector: 'bmb-calendar-template-month',
  standalone: true,
  imports: [
    CommonModule,
    BmbCalendarHourViewComponent,
    BmbCalendarScheduleCardsComponent,
  ],
  templateUrl: './bmb-calendar-template-month.component.html',
  styleUrl: './bmb-calendar-template-month.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateMonthComponent {
  @Input() hourFormat: IBmbCalendarHourFormat = '12';
  @Input() now: DateTime = DateTime.now();
  @Input() lang: string = '';
  @Input() events: IBmbCalendarEvent[] = [];

  @Output() onSelectEvent: EventEmitter<IBmbCalendarEventClick> =
    new EventEmitter<IBmbCalendarEventClick>();

  getWeeksAndDays(): DateTime[] {
    const calculateFirstDay = getWeekDays(this.now);

    let weekDays = [];

    for (let day = 0; day <= 34; day++) {
      weekDays.push(calculateFirstDay[0].plus({ days: day }));
    }

    return weekDays;
  }

  getDayName(date: DateTime): string {
    const defaultDayOrder = Info.weekdays('short', { locale: this.lang });
    return defaultDayOrder[date.weekday - 1];
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

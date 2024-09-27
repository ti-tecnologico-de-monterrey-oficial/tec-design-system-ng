import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Info, DateTime } from 'luxon';
import {
  IBmbCalendarHourFormat,
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
  IBmbCalendarRenderEvents,
} from '../../types';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import { eventsInDate } from '../../utils';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';
import { orderDayNames } from '../../../../utils/utils';

@Component({
  selector: 'bmb-calendar-template-week',
  standalone: true,
  imports: [
    CommonModule,
    BmbCalendarHourViewComponent,
    BmbCalendarScheduleCardsComponent,
  ],
  templateUrl: './bmb-calendar-template-week.component.html',
  styleUrl: './bmb-calendar-template-week.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateWeekComponent {
  @Input() weekDays: any[] = [];
  @Input() lang: string = 'es-MX';
  @Input() hourFormat: IBmbCalendarHourFormat = '12';
  @Input() now: DateTime = DateTime.now();
  @Input() events: IBmbCalendarEvent[] = [];

  @Output() onSelectEvent: EventEmitter<IBmbCalendarEventClick> =
    new EventEmitter<IBmbCalendarEventClick>();

  defaultDayOrder = Info.weekdays('short', { locale: this.lang });

  dayNames = orderDayNames(this.defaultDayOrder);

  rows = new Array(25).fill(0);

  isNow(date: DateTime): boolean {
    const diff = date?.diffNow('day')?.days;
    return diff < 0 && diff > -1;
  }

  renderEvents(events: IBmbCalendarRenderEvents): any[] {
    return eventsInDate(events);
  }

  handleEventSelection(newEvent: IBmbCalendarEventClick) {
    this.onSelectEvent.emit(newEvent);
  }
}

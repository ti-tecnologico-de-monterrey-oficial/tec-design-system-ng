import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import { CommonModule } from '@angular/common';
import {
  IBmbCalendarHourFormat,
  IBmbCalendarEvent,
  IBmbCalendarRenderEvents,
  IBmbCalendarEventClick,
} from '../../types';
import { DateTime } from 'luxon';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';
import { eventsInDate } from '../../utils';

@Component({
  selector: 'bmb-calendar-template-day',
  standalone: true,
  imports: [
    CommonModule,
    BmbCalendarHourViewComponent,
    BmbCalendarScheduleCardsComponent,
  ],
  templateUrl: './bmb-calendar-template-day.component.html',
  styleUrl: './bmb-calendar-template-day.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateDayComponent {
  @Input() lang: string = 'es-MX';
  @Input() hourFormat: IBmbCalendarHourFormat = '12';
  @Input() now: DateTime = DateTime.now();
  @Input() events: IBmbCalendarEvent[] = [];

  @Output() onSelectEvent: EventEmitter<IBmbCalendarEventClick> =
    new EventEmitter<IBmbCalendarEventClick>();

  rows = new Array(25).fill(0);

  getNameDay(): string {
    return this.now.toFormat('cccc', { locale: this.lang });
  }

  renderEvents(events: IBmbCalendarRenderEvents): any[] {
    return eventsInDate(events);
  }

  handleEventSelection(newEvent: IBmbCalendarEventClick) {
    this.onSelectEvent.emit(newEvent);
  }

  isNow(date: DateTime): boolean {
    const diff = date.diffNow('day').days;
    return diff < 0 && diff > -1;
  }
}

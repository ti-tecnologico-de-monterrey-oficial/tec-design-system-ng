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
import { HourFormat, Event, EventClick, IRenderEvents } from '../../types';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import { orderDayNames, eventsInDate } from '../../utils';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';



@Component({
  selector: 'bmb-calendar-template-week',
  standalone: true,
  imports: [CommonModule, BmbCalendarHourViewComponent, BmbCalendarScheduleCardsComponent],
  templateUrl: './bmb-calendar-template-week.component.html',
  styleUrl: './bmb-calendar-template-week.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateWeekComponent {
  @Input() weekDays: any[] = [];
  @Input() lang: string = 'es-MX';
  @Input() hourFormat: HourFormat = '12';
  @Input() now: DateTime = DateTime.now();
  @Input() events: Event[] = [];

  @Output() onSelectEvent: EventEmitter<EventClick> = new EventEmitter<EventClick>();

  defaultDayOrder = Info.weekdays('short', {locale: this.lang});

  dayNames = orderDayNames(this.defaultDayOrder);

  rows = new Array(25).fill(0);

  isNow(date: DateTime): boolean {
    const diff = date.diffNow('day').days;
    return diff < 0 && diff > -1;
  }

  renderEvents(events: IRenderEvents): any[] {
    return eventsInDate(events);
  }

  handleEventSelection(newEvent: EventClick) {
    this.onSelectEvent.emit(newEvent);
  }
}

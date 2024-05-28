import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { IBmbCalendarEvent, IBmbCalendarEventClick } from '../../types';
import { DateTime } from 'luxon';
import { getTimeRange } from '../../utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-calendar-schedule-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-calendar-schedule-cards.component.html',
  styleUrl: './bmb-calendar-schedule-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarScheduleCardsComponent {
  @Input() event: IBmbCalendarEvent = {
    title: '',
    detail: '',
    start: new Date().toISOString(),
    end: new Date().toISOString(),
  };
  @Input() isPositionAbsolute: boolean = true;
  @Input() extendedContent: boolean = true;

  @Output() onSelectEvent: EventEmitter<IBmbCalendarEventClick> =
    new EventEmitter<IBmbCalendarEventClick>();

  getPosition(date: IBmbCalendarEvent, isPositionAbsolute: boolean): string {
    if (!isPositionAbsolute) return '';

    const start = DateTime.fromISO(date.start);
    const end = DateTime.fromISO(date.end);
    const startMin = start.hour * 60 + start.minute;
    const endMin = end.hour * 60 + end.minute - startMin;

    return `top: ${startMin + 60}px; height: ${endMin}px`;
  }

  getClassNames(
    date: IBmbCalendarEvent,
    isPositionAbsolute: boolean,
  ): string[] {
    let newClasses = [];
    if (isPositionAbsolute) newClasses.push('bmb_calendar-event-absolute');
    const start = DateTime.fromISO(date.start);
    const end = DateTime.fromISO(date.end);
    const diff = end.hour * 60 + end.minute - (start.hour * 60 + start.minute);

    if (diff < 60) {
      newClasses.push('bmb_calendar-event-grid-reduced');
    } else {
      newClasses.push('bmb_calendar-event-grid-full');
    }

    return newClasses;
  }

  handleSelectEvent(event: IBmbCalendarEvent, domEvent: any) {
    this.onSelectEvent.emit({
      event: event,
      position: domEvent.target.getBoundingClientRect().y,
    });
  }

  handleTimeRange(event: IBmbCalendarEvent): string {
    return getTimeRange(event);
  }
}

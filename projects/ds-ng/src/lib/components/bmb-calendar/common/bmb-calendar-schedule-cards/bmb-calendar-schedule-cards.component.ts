import { Component, ChangeDetectionStrategy, ViewEncapsulation, Input, } from '@angular/core';
import { Event } from '../../types';
import { DateTime } from 'luxon';

@Component({
  selector: 'bmb-calendar-schedule-cards',
  standalone: true,
  imports: [],
  templateUrl: './bmb-calendar-schedule-cards.component.html',
  styleUrl: './bmb-calendar-schedule-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarScheduleCardsComponent {
  @Input() event: Event = {
    title: '',
    detail: '',
    start: new Date(),
    end: new Date(),
    id: '',
  };

  getPosition(date: Event): string {
    const start = DateTime.fromISO(date.start.toISOString());
    const end = DateTime.fromISO(date.end.toISOString());
    const startMin = (start.hour * 60) + start.minute;
    const endMin = ((end.hour * 60) - end.minute) - startMin;

    return `top: ${startMin + 60}px; height: ${endMin}px`;
  }

  getTimeRange(event: Event): string {
    const start = DateTime.fromISO(event.start.toISOString());
    const end = DateTime.fromISO(event.end.toISOString());

    return `${start.toFormat('hh:mm')}:${end.toFormat('hh:mm')}`
  }
}

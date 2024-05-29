import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbCalendarEvent, IBmbCalendarEventClick } from '../../types';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';
import { DateTime } from 'luxon';
import { BmbLayoutDirective } from '../../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbCardComponent } from '../../../bmb-card/bmb-card.component';

@Component({
  selector: 'bmb-calendar-template-event-list',
  standalone: true,
  imports: [
    BmbCalendarScheduleCardsComponent,
    BmbCardComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './bmb-calendar-template-event-list.component.html',
  styleUrl: './bmb-calendar-template-event-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateEventListComponent {
  @Input() events: IBmbCalendarEvent[] = [];

  @Output() onSelectEvent: EventEmitter<IBmbCalendarEventClick> =
    new EventEmitter<IBmbCalendarEventClick>();

  datesWithEvents = {};

  handleEventSelection(newEvent: IBmbCalendarEventClick) {
    this.onSelectEvent.emit(newEvent);
  }

  populateDateWithEvents() {
    const days = this.events.reduce((acc: any, cur: IBmbCalendarEvent) => {
      const date = DateTime.fromISO(cur.start).toFormat('dd/MM/yyyy');
      const events = acc[date] ? [...acc[date], cur] : [cur];

      return { ...acc, [date]: events };
    }, {});
    const nameDays = Object.keys(days).map((day) => {
      return {
        name: day,
        events: days[day],
      };
    });
    return nameDays;
  }
}

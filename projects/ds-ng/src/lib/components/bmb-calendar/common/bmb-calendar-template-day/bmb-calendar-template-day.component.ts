import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  computed,
  output,
} from '@angular/core';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import { CommonModule } from '@angular/common';
import { IBmbCalendarEvent, IBmbCalendarEventClick } from '../../types';
import { DateTime } from 'luxon';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';
import {
  DEFAULT_DATE_FORMAT,
  layoutEvents,
} from '../../utils';
import { BmbCalendarTimeIndicatorComponent } from '../bmb-calendar-time-indicator/bmb-calendar-time-indicator.component';

@Component({
  selector: 'bmb-calendar-template-day',
  standalone: true,
  imports: [
    CommonModule,
    BmbCalendarHourViewComponent,
    BmbCalendarScheduleCardsComponent,
    BmbCalendarTimeIndicatorComponent,
  ],
  templateUrl: './bmb-calendar-template-day.component.html',
  styleUrl: './bmb-calendar-template-day.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateDayComponent {
  lang = input<string>('es-MX');
  now = input<DateTime>(DateTime.now());
  events = input<IBmbCalendarEvent[]>([]);
  currentTime = input<DateTime>(DateTime.now());
  startBusinessHour = input<number>(8);
  dateFormat = input<string>(DEFAULT_DATE_FORMAT);

  onSelectEvent = output<IBmbCalendarEventClick>();

  eventsWithLayout = computed<IBmbCalendarEvent[]>(() => {
    return layoutEvents(this.events());
  });
  rows = new Array(24).fill(0);

  getNameDay(): string {
    return this.now().toFormat('cccc', { locale: this.lang() });
  }

  handleEventSelection(newEvent: IBmbCalendarEventClick) {
    this.onSelectEvent.emit(newEvent);
  }
}

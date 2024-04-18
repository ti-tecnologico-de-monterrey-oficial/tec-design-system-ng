import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Info, DateTime } from 'luxon';
import { HourFormat, Event } from '../../types';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import { orderDayNames } from '../../utils';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';

interface IRenderEvents {
  date: DateTime,
  events: Event[],
}

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

  defaultDayOrder = Info.weekdays('short', {locale: this.lang});

  dayNames = orderDayNames(this.defaultDayOrder);

  rows = new Array(25).fill(0);

  isNow(date: DateTime): boolean {
    const diff = date.diffNow('day').days;
    return diff < 0 && diff > -1;
  }

  renderEvents({ date, events }: IRenderEvents): any[] {
    const todayEvents = events.filter((event: Event) => {
      const diff = date.diff(DateTime.fromISO(event.start.toISOString()), ["days"]).days;

      return diff < 0 && diff > -1;
    });

    return todayEvents;
  }
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Info, DateTime } from 'luxon';
import { HourFormat } from '../../types';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import { orderDayNames } from '../../utils';
@Component({
  selector: 'bmb-calendar-template-week',
  standalone: true,
  imports: [CommonModule, BmbCalendarHourViewComponent],
  templateUrl: './bmb-calendar-template-week.component.html',
  styleUrl: './bmb-calendar-template-week.component.scss'
})
export class BmbCalendarTemplateWeekComponent {
  @Input() weekDays: any[] = [];
  @Input() lang: string = 'es-MX';
  @Input() hourFormat: HourFormat = '12';
  @Input() now: DateTime = DateTime.now();

  defaultDayOrder = Info.weekdays('short', {locale: this.lang});

  isNow(date: DateTime): boolean {
    const diff = date.diffNow('day').days;
    return diff < 0 && diff > -1;
  }

  dayNames = orderDayNames(this.defaultDayOrder);

  rows = new Array(25).fill(0);
}

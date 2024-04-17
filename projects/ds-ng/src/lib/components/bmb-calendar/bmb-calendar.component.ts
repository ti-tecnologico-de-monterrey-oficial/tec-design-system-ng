import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { BmbCalendarTemplateWeekComponent } from './common/bmb-calendar-template-week/bmb-calendar-template-week.component';
import { BmbCalendarTemplateDayComponent } from './common/bmb-calendar-template-day/bmb-calendar-template-day.component';
import { BmbCalendarTemplateMonthComponent } from './common/bmb-calendar-template-month/bmb-calendar-template-month.component';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';
import { BmbCalendarHeaderComponent } from './common/bmb-calendar-header/bmb-calendar-header.component';
import { Event, HourFormat, View } from './types';
import { getWeekDays } from './utils';

@Component({
  selector: 'bmb-calendar',
  standalone: true,
  imports: [
    CommonModule,
    BmbCalendarTemplateDayComponent,
    BmbCalendarTemplateWeekComponent,
    BmbCalendarTemplateMonthComponent,
    BmbLoaderComponent,
    BmbCalendarHeaderComponent
  ],
  styleUrl: './bmb-calendar.component.scss',
  templateUrl: './bmb-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarComponent implements OnChanges {
  @Input() events: Event[] = [];
  @Input() view: View = 'week';
  @Input() isLoading: boolean = false;
  @Input() hourFormat: HourFormat = '12';
  @Input() height: number = 700;
  @Input() calendarTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  @Input() clientTimezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  @Input() lang: string = 'es-MX';
  @Input() currentDate: string = '';

  @Output() onDateChange: EventEmitter<any> = new EventEmitter<any>();

  now = this.currentDate === '' ? DateTime.now() : DateTime.fromISO(this.currentDate);
  weekNumber = this.now.weekNumber;
  renderWeekDays: DateTime[] = getWeekDays(this.now);

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
  }

  handleDateChange(range: View): void {
    this.view = range;
    this.onDateChange.emit(range);
  }

  handleCurrentDateChange(newDate: DateTime): void {
    this.now = newDate;
    this.weekNumber = newDate.weekNumber;
    this.renderWeekDays = getWeekDays(newDate);
  }
}

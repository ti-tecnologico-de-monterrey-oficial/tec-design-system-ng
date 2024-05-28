import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
} from '@angular/core';
import { DateTime } from 'luxon';
import { eventsInDate, dayName, weeksAndDays } from '../../utils';
import { CommonModule } from '@angular/common';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';
import { IBmbCalendarEvent } from '../../types';
import { BmbLayoutDirective } from '../../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbButtonDirective } from '../../../../directives/button.directive';
import { Info } from 'luxon';
import { BmbCalendarTemplateSelectComponent } from '../bmb-calendar-template-select/bmb-calendar-template-select.component';
import { orderDayNames } from '../../utils';

@Component({
  selector: 'bmb-calendar-template-mobile',
  standalone: true,
  imports: [
    CommonModule,
    BmbCalendarScheduleCardsComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbButtonDirective,
    BmbCalendarTemplateSelectComponent,
  ],
  templateUrl: './bmb-calendar-template-mobile.component.html',
  styleUrl: './bmb-calendar-template-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateMobileComponent {
  @Input() weekDays: DateTime[] = [];
  @Input() now: DateTime = DateTime.now();
  @Input() lang: string = '';
  @Input() events: IBmbCalendarEvent[] = [];
  @Input() isListShowing: boolean = false;

  @Output() onCurrentDateChange: EventEmitter<DateTime> =
    new EventEmitter<DateTime>();
  @Output() onViewTypeChange: EventEmitter<void> = new EventEmitter<void>();

  monthsNames = Info.months('long', { locale: this.lang });
  month = this.monthsNames[this.now.month + 1];
  year = this.now.year;
  isCalendarOpen = false;
  defaultDayOrder = Info.weekdays('narrow', { locale: this.lang });
  dayNames = orderDayNames(this.defaultDayOrder);

  handleExpand() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }

  getYears() {
    const yearsList = new Array(21).fill(0);
    const currentYear = this.now.year;
    const yearsFinal = yearsList.map((_, index) => {
      return (currentYear + (-10 + index)).toString();
    });
    return yearsFinal;
  }

  handleMonthChange(value: string) {
    this.month = value;
    const newDate = DateTime.fromObject({
      day: 1,
      month: this.monthsNames.indexOf(value) + 1,
      year: this.now.year,
    });
    this.onCurrentDateChange.emit(newDate);
  }

  handleYearChange(value: string) {
    this.year = Number(value);
    const newDate = DateTime.fromObject({
      day: 1,
      month: this.now.month,
      year: Number(value),
    });
    this.onCurrentDateChange.emit(newDate);
  }

  isSelectedDay(date: DateTime): boolean {
    return date.hasSame(this.now, 'day');
  }

  getWeeksAndDays(): DateTime[] {
    const firstDayOfMonth = DateTime.fromObject({
      day: 1,
      month: this.now.month,
      year: this.now.year,
    });
    return weeksAndDays(firstDayOfMonth);
  }

  handleDayChange(date: DateTime): void {
    this.onCurrentDateChange.emit(date);
    this.month = this.monthsNames[date.month - 1];
    this.year = date.year;
    this.isCalendarOpen = false;
  }

  isNow(date: DateTime): boolean {
    const diff = date.diffNow('day').days;
    return diff < 0 && diff > -1;
  }

  handleViewTypeChange() {
    this.onViewTypeChange.emit();
  }

  findEventsForToday(date: DateTime) {
    const todayHasEvents = this.events.some((day) => {
      return date.hasSame(DateTime.fromISO(day.start), 'day');
    });

    return todayHasEvents;
  }
}

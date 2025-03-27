import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  input,
  output,
} from '@angular/core';
import { DateTime } from 'luxon';
import { weeksAndDays } from '../../utils';
import { CommonModule } from '@angular/common';
import { IBmbCalendarEvent } from '../../types';
import { BmbButtonDirective } from '../../../../directives/button.directive';
import { Info } from 'luxon';
import { orderDayNames } from '../../../../utils/utils';
import { BmbInnerHeaderComponent } from '../../../bmb-inner-header/bmb-inner-header.component';
import { BmbChevronTitleSelectorComponent } from '../../../bmb-chevron-title-selector/bmb-chevron-title-selector.component';
import { BmbPullWedgeComponent } from '../../../bmb-pull-wedge/bmb-pull-wedge.component';

@Component({
  selector: 'bmb-calendar-template-mobile',
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbInnerHeaderComponent,
    BmbChevronTitleSelectorComponent,
    BmbChevronTitleSelectorComponent,
    BmbPullWedgeComponent,
  ],
  templateUrl: './bmb-calendar-template-mobile.component.html',
  styleUrl: './bmb-calendar-template-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateMobileComponent {
  @Input() weekDays: DateTime[] = [];
  @Input() now: DateTime = DateTime.now();
  @Input() lang: string = 'es';
  @Input() events: IBmbCalendarEvent[] = [];
  @Input() isListShowing: boolean = false;
  calendarTitle = input<string>('Mi calendario');

  @Output() onCurrentDateChange: EventEmitter<DateTime> =
    new EventEmitter<DateTime>();
  @Output() onViewTypeChange: EventEmitter<void> = new EventEmitter<void>();
  onClose = output<any>();

  monthsNames = Info.months('long', { locale: this.lang });
  month = this.monthsNames[this.now.month - 1];
  year = this.now.year;
  isCalendarOpen = false;
  defaultDayOrder = Info.weekdays('narrow', { locale: this.lang });
  dayNames = orderDayNames(this.defaultDayOrder);
  isWedgeOpen = false;

  handleClose() {
    this.onClose.emit('close');
  }

  switchToMonthList() {
    console.log('switchToMonthList');
  }

  handleMonthChange(event: string): void {
    const modifyDate = ({ config, date }: any) => {
      if (event === '+') {
        this.onCurrentDateChange.emit(date.plus(config));
      } else {
        this.onCurrentDateChange.emit(date.minus(config));
      }
    };

    const newDate = DateTime.fromObject({
      month: this.now.month,
      year: this.now.year,
      day: 1,
    });

    modifyDate({ config: { month: 1 }, date: newDate });
    this.isWedgeOpen = false;
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
    this.isWedgeOpen = false;
  }

  handleViewTypeChange() {
    this.onViewTypeChange.emit();
    this.isWedgeOpen = false;
  }

  findEventsForToday(date: DateTime) {
    const todayHasEvents = this.events.some((day) => {
      return date.hasSame(DateTime.fromISO(day.start), 'day');
    });

    return todayHasEvents;
  }

  handleCloseWedge() {
    console.log('close wedge');
  }
}

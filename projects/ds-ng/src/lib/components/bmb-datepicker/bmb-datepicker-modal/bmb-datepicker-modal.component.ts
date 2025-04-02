import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { DateTime, Info } from 'luxon';
import { weeksAndDays } from '../../bmb-calendar/utils';
import { BmbButtonDirective } from '../../../directives/button.directive';
import { CommonModule } from '@angular/common';
import { orderDayNames } from '../../../utils/utils';

@Component({
  selector: 'bmb-datepicker-modal',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbButtonDirective,
  ],
  templateUrl: './bmb-datepicker-modal.component.html',
  styleUrls: [
    './bmb-datepicker-modal.component.scss',
    '../../bmb-input/bmb-input.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDatepickerModalComponent implements OnInit {
  isWindowOpen = input<boolean>(false);
  now = input<DateTime>(DateTime.now());
  lang = input<string>('es-MX');
  value = input<string>('');
  dateFormat = input<string>('dd/MM/yyyy');
  stepYearPicker = input<number>(18);
  disableDatesBefore = input<DateTime>();
  disableDatesAfter = input<DateTime>();

  closeWindow = output<boolean>();
  onValueChange = output<string>();

  selectedMonth = 0;
  monthsNames = Info.months('long', { locale: this.lang() });
  month = '';
  year = this.now().year;
  defaultDayOrder = Info.weekdays('narrow', { locale: this.lang() });
  dayNames = orderDayNames(this.defaultDayOrder);
  selectedYear = 0;
  view = 'calendar';
  selectedDate: DateTime | null = null;

  handleMonthChange(event: number) {
    this.selectedMonth = event + 1;
    this.month = this.monthsNames[event];
    this.view = 'calendar';
  }

  handleYearChange(event: any) {
    this.selectedYear = event;
    this.view = 'calendar';
  }

  getYears() {
    const yearsList = new Array(this.stepYearPicker()).fill(0);
    const currentYear = this.selectedYear;
    const yearsFinal = yearsList.map((_, index) => {
      return (currentYear - (this.stepYearPicker() / 2 - 1) + index).toString();
    });
    return yearsFinal;
  }

  handleDayChange(date: DateTime): void {
    const newValue = date.toFormat(this.dateFormat());
    this.onValueChange.emit(newValue);
  }

  getWeeksAndDays(): DateTime[] {
    const firstDayOfMonth = DateTime.fromObject({
      day: 1,
      month: this.selectedMonth ?? this.now().month,
      year: this.selectedYear ?? this.now().year,
    });
    return weeksAndDays(firstDayOfMonth);
  }

  isSelectedDay(date: DateTime): string[] {
    const classList = [];
    if (this.selectedDate && date.hasSame(this.selectedDate, 'day'))
      classList.push('bmb_datepicker-modal-button-selected');
    if (this.now().hasSame(date, 'day'))
      classList.push('bmb_datepicker-modal-button-today');
    return classList;
  }

  handleChangeView(view: string) {
    this.view = view;
  }

  ngOnInit() {
    if (this.value()) {
      const formattedDate = DateTime.fromFormat(
        this.value(),
        this.dateFormat(),
      );
      this.selectedDate = formattedDate;
      this.selectedYear = formattedDate.year;
      this.selectedMonth = formattedDate.month;
      this.month = this.monthsNames[formattedDate.month - 1];
    } else {
      this.selectedYear = this.now().year;
      this.selectedMonth = this.now().month;
      this.month =
        this.monthsNames[(this.selectedMonth || this.now().month) - 1];
    }
  }

  handleChangeMonth(event: string) {
    if (event === 'less') {
      if (this.selectedMonth === 1) {
        this.selectedMonth = 11;
        this.month = this.monthsNames[this.selectedMonth];
        this.selectedYear = this.selectedYear - 1;
      } else {
        this.selectedMonth = this.selectedMonth - 1;
        this.month = this.monthsNames[this.selectedMonth - 1];
      }
    } else {
      if (this.selectedMonth === 12) {
        this.selectedMonth = 1;
        this.month = this.monthsNames[this.selectedMonth - 1];
        this.selectedYear = this.selectedYear + 1;
      } else {
        this.selectedMonth = this.selectedMonth + 1;
        this.month = this.monthsNames[this.selectedMonth - 1];
      }
    }
  }

  checkIfDisabled(date: DateTime): boolean {
    if (this.disableDatesBefore()) {
      return (
        date.startOf('day') <=
        (this.disableDatesBefore()?.startOf('day') ?? DateTime.fromMillis(0))
      );
    }

    if (this.disableDatesAfter()) {
      return this.disableDatesAfter()
        ? date.startOf('day') >= this.disableDatesAfter()!.startOf('day')
        : false;
    }

    return false;
  }

  isSelectedYear(year: string): boolean {
    return this.selectedYear === parseInt(year);
  }
}

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
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { CommonModule } from '@angular/common';
import { orderDayNames } from '../../../utils/utils';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';

@Component({
  selector: 'bmb-datepicker-modal',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbButtonDirective,
    BmbActionIconComponent,
    BmbDividerComponent,
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
  disableDatesBefore = input<DateTime | null>();
  disableDatesAfter = input<DateTime | null>();

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

  ngOnInit() {
    if (!!this.value()) {
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

  handleMonthChange(event: number) {
    this.selectedMonth = event + 1;
    this.month = this.monthsNames[event];
    this.view = 'calendar';
  }

  handleYearChange(event: any) {
    this.selectedYear = event;
    this.view = 'calendar';
  }

  getYears(): string[] {
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
    if (date.month === this.selectedMonth) {
      classList.push('bmb_datepicker-modal-button-current-month');
    }
    if (this.selectedDate && date.hasSame(this.selectedDate, 'day'))
      classList.push('bmb_datepicker-modal-button-selected');
    if (this.now().hasSame(date, 'day'))
      classList.push('bmb_datepicker-modal-button-today');
    return classList;
  }

  handleChangeView(view: string) {
    this.view = view;
  }

  handleChevronClick(event: string) {
    if (this.view === 'calendar' || this.view === 'month') {
      this.handleChangeMonth(event);
    } else {
      this.handleChangeYear(event);
    }
  }

  handleChangeYear(event: string) {
    if (event === 'less') {
      this.selectedYear = this.selectedYear - 18;
    } else {
      this.selectedYear = this.selectedYear + 18;
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
    let isValid: boolean = this.disableDatesBefore()
      ? date.startOf('day') <= this.disableDatesBefore()!.startOf('day')
      : false;

    isValid =
      !isValid && this.disableDatesAfter()
        ? date.startOf('day') >= this.disableDatesAfter()!.startOf('day')
        : isValid;

    return isValid;
  }

  isSelectedYear(year: string): boolean {
    return this.selectedYear === parseInt(year);
  }
}

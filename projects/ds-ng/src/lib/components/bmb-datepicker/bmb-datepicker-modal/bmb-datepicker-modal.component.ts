import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { DateTime, Info } from 'luxon';
import { orderDayNames, weeksAndDays } from '../../bmb-calendar/utils';
import { BmbButtonDirective } from '../../../directives/button.directive';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-datepicker-modal',
  standalone: true,
  imports: [CommonModule, BmbLayoutDirective, BmbLayoutItemDirective, BmbButtonDirective],
  templateUrl: './bmb-datepicker-modal.component.html',
  styleUrl: './bmb-datepicker-modal.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDatepickerModalComponent implements OnInit {
  @Input() isWindowOpen: boolean = false;
  @Input() now: DateTime = DateTime.now();
  @Input() lang: string = 'es';
  @Input() value?: string;
  @Input() dateFormat: string = 'dd/MM/yyyy';
  @Input() stepYearPicker: number = 12;

  @Output() closeWindow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onValueChange: EventEmitter<string> = new EventEmitter<string>();

  selectedMonth = this.now.month;
  monthsNames = Info.months('long', { locale: this.lang });
  month = this.monthsNames[(this.selectedMonth || this.now.month) - 1];
  year = this.now.year;
  defaultDayOrder = Info.weekdays('narrow', { locale: this.lang });
  dayNames = orderDayNames(this.defaultDayOrder);
  selectedYear = this.now.year;
  view = 'calendar';
  selectedDate: DateTime | null = null;

  handleMonthChange(event: number) {
    this.selectedMonth = event + 1;
    this.month = this.monthsNames[event];
    this.view = 'calendar';
  }

  handleYearChange(event: any) {
    console.log('handleYearChange', event);

    this.selectedYear = event;
    this.view = 'calendar';
  }

  getYears() {
    const yearsList = new Array(this.stepYearPicker).fill(0);
    const currentYear = this.selectedYear;
    const yearsFinal = yearsList.map((_, index) => {
      console.log('currentYear', currentYear);

      return (currentYear - (this.stepYearPicker / 2 - 1) + index ).toString();
    });
    return yearsFinal;
  }

  handleDayChange(date: DateTime): void {
    const newValue = date.toFormat(this.dateFormat)
    this.onValueChange.emit(newValue)
  }

  getWeeksAndDays(): DateTime[] {
    const firstDayOfMonth = DateTime.fromObject({
      day: 1,
      month: this.selectedMonth ?? this.now.month,
      year: this.selectedYear ?? this.now.year,
    });
    return weeksAndDays(firstDayOfMonth);
  }

  isSelectedDay(date: DateTime): string {
    if (this.selectedDate && date.hasSame(this.selectedDate, 'day')) return 'bmb_datepicker-modal-calendar-item-button-selected'
    return '';
  }

  handleChangeView(view: string) {
    this.view = view;
  }

  ngOnInit() {
    this.selectedYear = this.now.year;
    this.selectedMonth = this.now.month;
    if (this.value) {
      this.selectedDate = DateTime.fromFormat(this?.value, this.dateFormat)
    }
  }
}

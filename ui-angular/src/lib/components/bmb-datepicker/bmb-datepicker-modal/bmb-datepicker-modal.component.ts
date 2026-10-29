import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime, Info } from 'luxon';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';

import { CommonModule } from '@angular/common';
import { weeksAndDays } from '../../../_shared/logic/components/calendar';
import {
  getAdjustedMonth,
  getAdjustedYear,
  getDatepickerDayClasses,
  getDatepickerYearsRange,
  isDatepickerDateDisabled,
  isDatepickerYearSelected,
  resolveDatepickerInitialState,
} from '../../../_shared/logic/components/datepicker-modal';
import { orderDayNames } from '../../../_shared/logic/utils';
import { BmbButtonDirective } from '../../../directives/bmb-button/button.directive';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbTranslationsService } from '../../../services/translations/translations.service';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';

@Component({
  selector: 'bmb-datepicker-modal',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbButtonDirective,
    BmbActionIconComponent,
    TranslatePipe,
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
  value = input<string>('');
  dateFormat = input<string>('dd/MM/yyyy');
  stepYearPicker = input<number>(18);
  disableDatesBefore = input<DateTime | null>();
  disableDatesAfter = input<DateTime | null>();

  onValueChange = output<string>();

  lang = computed(() => this.translateService.getCurrentLanguage());
  selectedMonth = 0;
  monthsNames = computed(() => Info.months('long', { locale: this.lang() }));
  month = '';
  year = this.now().year;
  defaultDayOrder = computed(() =>
    Info.weekdays('narrow', { locale: this.lang() }),
  );
  dayNames = computed(() => orderDayNames(this.defaultDayOrder()));
  selectedYear = 0;
  view = 'calendar';
  selectedDate: DateTime | null = null;

  private translateService: BmbTranslationsService = inject(
    BmbTranslationsService,
  );

  ngOnInit() {
    const state = resolveDatepickerInitialState(
      this.value(),
      this.dateFormat(),
      this.now(),
    );

    this.selectedDate = state.selectedDate;
    this.selectedYear = state.selectedYear;
    this.selectedMonth = state.selectedMonth;
    this.month =
      this.monthsNames()[(this.selectedMonth || this.now().month) - 1];
  }

  handleMonthChange(event: number) {
    this.selectedMonth = event + 1;
    this.month = this.monthsNames()[event];
    this.view = 'calendar';
  }

  handleYearChange(event: string) {
    this.selectedYear = parseInt(event, 10);
    this.view = 'calendar';
  }

  getYears(): string[] {
    return getDatepickerYearsRange(this.stepYearPicker(), this.selectedYear);
  }

  handleDayChange(date: DateTime): void {
    const newValue = date.toFormat(this.dateFormat());
    this.onValueChange.emit(newValue);
  }

  getWeeksAndDays(): DateTime[][] {
    const firstDayOfMonth = DateTime.fromObject({
      day: 1,
      month: this.selectedMonth ?? this.now().month,
      year: this.selectedYear ?? this.now().year,
    });
    const days = weeksAndDays(firstDayOfMonth);

    return [
      days.slice(0, 7),
      days.slice(7, 14),
      days.slice(14, 21),
      days.slice(21, 28),
      days.slice(28, 35),
      days.slice(35, 42),
    ];
  }

  isSelectedDay(date: DateTime): string[] {
    return getDatepickerDayClasses(
      date,
      this.selectedMonth,
      this.selectedDate,
      this.now(),
    );
  }

  handleChangeView(view: string) {
    this.view = view;
  }

  handleChevronClick(event: string) {
    if (this.view === 'calendar') {
      this.handleChangeMonth(event);
    } else if (this.view === 'month') {
      this.handleChangeYear(event, 1);
    } else {
      this.handleChangeYear(event, this.stepYearPicker());
    }
  }

  handleChangeYear(event: string, yearsAmount: number = 0) {
    this.selectedYear = getAdjustedYear(this.selectedYear, event, yearsAmount);
  }

  handleChangeMonth(event: string) {
    const adjusted = getAdjustedMonth(
      this.selectedMonth,
      this.selectedYear,
      event,
    );

    this.selectedMonth = adjusted.month;
    this.selectedYear = adjusted.year;
    this.month = this.monthsNames()[this.selectedMonth - 1];
  }

  checkIfDisabled(date: DateTime): boolean {
    return isDatepickerDateDisabled(
      date,
      this.disableDatesBefore(),
      this.disableDatesAfter(),
    );
  }

  isSelectedYear(year: string): boolean {
    return isDatepickerYearSelected(this.selectedYear, year);
  }

  onDayKeydown(event: KeyboardEvent, date?: DateTime) {
    if (
      event.key === 'ArrowRight' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowUp' ||
      event.key === 'Tab'
    ) {
      if (date) {
        event.preventDefault();
      }
      const table = (event.currentTarget as HTMLElement).closest('table');
      if (!table) return;
      const buttons = Array.from(
        table.querySelectorAll<HTMLElement>('button:not(:disabled)'),
      );
      const currentIndex = buttons.findIndex(
        (btn) => btn === event.currentTarget,
      );
      let nextIndex = currentIndex;
      if (
        event.key === 'ArrowRight' ||
        (event.key === 'Tab' && !event.shiftKey)
      ) {
        nextIndex = (currentIndex + 1) % buttons.length;
      } else if (
        event.key === 'ArrowLeft' ||
        (event.key === 'Tab' && event.shiftKey)
      ) {
        nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
      } else if (event.key === 'ArrowDown') {
        nextIndex =
          currentIndex + 7 < buttons.length ? currentIndex + 7 : currentIndex;
      } else if (event.key === 'ArrowUp') {
        nextIndex = currentIndex - 7 >= 0 ? currentIndex - 7 : currentIndex;
      }
      buttons[nextIndex]?.focus();
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      const newValue = date?.toFormat(this.dateFormat());
      this.onValueChange.emit(newValue || '');
    }
  }
}

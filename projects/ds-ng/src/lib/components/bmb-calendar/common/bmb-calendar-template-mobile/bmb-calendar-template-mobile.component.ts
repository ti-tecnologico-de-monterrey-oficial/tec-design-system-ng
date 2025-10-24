import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  computed,
  model,
  signal,
} from '@angular/core';
import { DateTime } from 'luxon';
import { getWeeksInMonth, weeksAndDays } from '../../utils';
import { CommonModule } from '@angular/common';
import { IBmbParsedDates } from '../../types';
import { BmbButtonDirective } from '../../../../directives/bmb-button/button.directive';
import { Info } from 'luxon';
import { orderDayNames } from '../../../../utils/utils';
import { BmbInnerHeaderComponent } from '../../../bmb-inner-header/bmb-inner-header.component';
import { BmbChevronTitleSelectorComponent } from '../../../bmb-chevron-title-selector/bmb-chevron-title-selector.component';
import { BmbPullWedgeComponent } from '../../../bmb-pull-wedge/bmb-pull-wedge.component';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { TranslatePipe } from '../../../../pipes/translations';

@Component({
  selector: 'bmb-calendar-template-mobile',
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbInnerHeaderComponent,
    BmbChevronTitleSelectorComponent,
    BmbPullWedgeComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-calendar-template-mobile.component.html',
  styleUrl: './bmb-calendar-template-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateMobileComponent {
  weekDays = input<DateTime[]>([]);
  now = input<DateTime>(DateTime.now());
  events = input<IBmbParsedDates>({});
  calendarTitle = input<string>();
  disableMobileFilter = input<boolean>(false);

  onClose = output<any>();
  onCurrentDateChange = output<DateTime>();
  showFilters = output<void>();

  locale = computed(() => this.translationsService.getCurrentLanguage());
  monthsNames = Info.months('long', { locale: this.locale() });
  month = this.monthsNames[this.now().month - 1];
  year = this.now().year;
  isCalendarOpen = false;
  defaultDayOrder = computed(() =>
    Info.weekdays('narrow', { locale: this.locale() }),
  );
  dayNames = computed(() => orderDayNames(this.defaultDayOrder()));
  isWedgeOpen = false;

  weekAndDays = computed(() => {
    const firstDayOfMonth = DateTime.fromObject({
      day: 1,
      month: this.now().month,
      year: this.now().year,
    });
    return weeksAndDays(firstDayOfMonth);
  });

  weeksInMonth = computed(() => {
    const weeks = getWeeksInMonth(this.now());
    return weeks;
  });

  modalId = signal<string | null>(null);

  constructor(private translationsService: BmbTranslationsService) {}

  handleClose() {
    this.onClose.emit('close');
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
      month: this.now().month,
      year: this.now().year,
      day: 1,
    });

    modifyDate({ config: { month: 1 }, date: newDate });
    this.isWedgeOpen = false;
  }

  isSelectedDay(date: DateTime): boolean {
    return date.hasSame(this.now(), 'day');
  }

  handleDayChange(date: DateTime): void {
    this.onCurrentDateChange.emit(date);
    this.month = this.monthsNames[date.month - 1];
    this.year = date.year;
    this.isCalendarOpen = false;
    this.isWedgeOpen = false;
  }

  handleViewTypeChange() {
    this.showFilters.emit();
  }

  findEventsForToday(date: DateTime) {
    const weekNumber = date.weekNumber;
    const stringDate = date.toFormat('yyyy-MM-dd');
    return !!this.events()?.[weekNumber]?.[stringDate]?.some(
      (event) => event.isVisible,
    );
  }
}

import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  computed,
} from '@angular/core';
import { BmbIconComponent } from '../../../bmb-icon/bmb-icon.component';
import { DateTime } from 'luxon';
import { IBmbCalendarView } from '../../types';
import { BmbButtonGroupDirective } from '../../../../directives/bmb-button-group/bmb-button-group.directive';
import { BmbLayoutDirective } from '../../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbActionIconComponent } from '../../../bmb-action-icon/bmb-action-icon.component';
import { TranslatePipe } from '../../../../pipes/translations';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';

@Component({
  selector: 'bmb-calendar-header',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbButtonGroupDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbActionIconComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-calendar-header.component.html',
  styleUrl: './bmb-calendar-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarHeaderComponent {
  weekDays = input<DateTime[]>([]);
  view = input<IBmbCalendarView>('week');
  currentDate = input<DateTime>(DateTime.now());
  showFilterButton = input<boolean>(false);

  onRangeChange = output<any>();
  onCurrentDateChange = output<DateTime>();
  showFilters = output<void>();

  constructor(private translationsService: BmbTranslationsService) {}

  locale = computed(() => this.translationsService.getCurrentLanguage());

  getTitle(): string {
    if (this.view() === 'week') {
      return `${this.weekDays()[0].setLocale(this.locale()).toFormat('LLL dd')} -
        ${this.weekDays()[6].setLocale(this.locale()).toFormat('LLL dd')}`;
    }

    if (this.view() === 'day') {
      return this.currentDate().setLocale(this.locale()).toLocaleString({
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }

    return this.currentDate()
      .setLocale(this.locale())
      .toLocaleString({ month: 'long' });
  }

  handleRangeChange(event: IBmbCalendarView): void {
    if (event === 'month') {
      const newDate = DateTime.fromObject({
        month: this.currentDate().month,
        year: this.currentDate().year,
        day: 1,
      });

      this.onCurrentDateChange.emit(newDate);
    }
    this.onRangeChange.emit(event);
  }

  handleChangeDate(event: string): void {
    const modifyDate = ({ config, date }: any) => {
      if (event === '+') {
        this.onCurrentDateChange.emit(date.plus(config));
      } else {
        this.onCurrentDateChange.emit(date.minus(config));
      }
    };

    switch (this.view()) {
      case 'day':
        modifyDate({ config: { days: 1 }, date: this.currentDate() });
        break;

      case 'week':
        modifyDate({ config: { days: 7 }, date: this.currentDate() });
        break;
      case 'month':
        const newDate = DateTime.fromObject({
          month: this.currentDate().month,
          year: this.currentDate().year,
          day: 1,
        });

        modifyDate({ config: { month: 1 }, date: newDate });
        break;

      default:
        break;
    }
  }

  goToToday(): void {
    this.onCurrentDateChange.emit(DateTime.now());
  }

  handleShowFilters() {
    this.showFilters.emit();
  }
}

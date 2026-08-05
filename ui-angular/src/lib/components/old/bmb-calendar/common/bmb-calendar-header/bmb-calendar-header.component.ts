import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  computed,
  inject,
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
import { BmbCalendarComponentService } from '../../bmb-calendar.service';
import { getUUID } from '../../../../utils/utils';
import { BmbNativeModalService } from '../../../../services/modal/native-modal.service';
import { BmbCalendarModalComponent } from '../bmb-calendar-modal/bmb-calendar-modal.component';

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
  view = input<IBmbCalendarView>('week');
  showFilterButton = input<boolean>(false);

  onRangeChange = output<any>();
  showFilters = output<void>();

  private readonly calendarService = inject(BmbCalendarComponentService);
  private readonly translationsService = inject(BmbTranslationsService);
  private readonly modalService = inject(BmbNativeModalService);

  currentDate = computed(() => this.calendarService.getVisibleDate());
  weekDays = computed(() => this.calendarService.getRenderWeekDays());
  locale = computed(() => this.translationsService.getCurrentLanguage());

  filterModalId = getUUID();

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

      this.calendarService.setVisibleDate(newDate);
    }
    this.onRangeChange.emit(event);
  }

  handleChangeDate(event: string): void {
    const modifyDate = ({ config, date }: any) => {
      if (event === '+') {
        this.calendarService.setVisibleDate(date.plus(config));
      } else {
        this.calendarService.setVisibleDate(date.minus(config));
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
    this.calendarService.setVisibleDate(DateTime.now());
  }

  handleShowFilters() {
    this.modalService.openModal({
      title: this.translationsService.translate('calendar.modal.title'),
      subtitle: this.translationsService.translate('calendar.subtitle'),
      content: BmbCalendarModalComponent,
      size: 'x-small',
      closeModalClicked: () => {
        this.calendarService.setFilters({});
        this.calendarService.setTemporalFilters({});
      },
      actions: [
        {
          buttonName: 'save',
          appearance: 'primary',
          label: this.translationsService.translate('calendar.filter_save'),
          action: () => {
            this.calendarService.applyFilters();
          },
        },
      ],
    });
  }
}

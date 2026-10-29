import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DateTime } from 'luxon';
import {
  getCalendarHeaderTitle,
  headerGetBulletClass,
  headerGetCalendarName,
} from '../../../../_shared/logic/components/calendar-view';
import { getUUID } from '../../../../_shared/logic/utils';
import type { IBmbCalendarView } from '../../../../_shared/types/components/calendar';
import { BmbLayoutItemDirective } from '../../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../../../directives/bmb-layout/bmb-layout.directive';
import { BmbButtonGroupDirective } from '../../../../directives/old/bmb-button-group/bmb-button-group.directive';
import { TranslatePipe } from '../../../../pipes/translations';
import { BmbNativeModalService } from '../../../../services/old/modal/native-modal.service';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { BmbActionIconComponent } from '../../../bmb-action-icon/bmb-action-icon.component';
import { BmbCheckboxComponent } from '../../../bmb-checkbox/bmb-checkbox.component';
import { BmbDividerComponent } from '../../../bmb-divider/bmb-divider.component';
import { BmbIconComponent } from '../../../bmb-icon/bmb-icon.component';
import { BmbSwitchComponent } from '../../../bmb-switch/bmb-switch.component';
import { BmbCalendarComponentService } from '../../bmb-calendar.service';

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
    ReactiveFormsModule,
    BmbCheckboxComponent,
    BmbDividerComponent,
    BmbSwitchComponent,
  ],
  templateUrl: './bmb-calendar-header.component.html',
  styleUrl: './bmb-calendar-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarHeaderComponent implements OnInit {
  view = input<IBmbCalendarView>('week');
  showFilterButton = input<boolean>(false);

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onRangeChange = output<any>();
  showFilters = output<void>();

  private readonly calendarService = inject(BmbCalendarComponentService);
  private readonly translationsService = inject(BmbTranslationsService);
  private readonly modalService = inject(BmbNativeModalService);
  @ViewChild('filterModalTemplate') filterModalTemplate!: TemplateRef<any>;

  currentDate = computed(() => this.calendarService.getVisibleDate());
  weekDays = computed(() => this.calendarService.getRenderWeekDays());
  locale = computed(() => this.translationsService.getCurrentLanguage());
  events = computed(() => this.calendarService.getFilteredEvents());
  filters = computed(() => this.calendarService.getFilters());

  calendarForm: FormGroup<{ [key: string]: FormControl<any> }> = new FormGroup(
    {},
  );

  filterModalId = getUUID();

  constructor() {
    effect(() => {
      const calendars = this.events().calendars || [];
      calendars.forEach((calendar) => {
        this.calendarForm.addControl(
          calendar,
          new FormControl(this.filters()[calendar] || true),
        );
      });
    });
  }

  ngOnInit() {
    this.calendarForm.addControl('enable_notifications', new FormControl(true));
  }

  getTitle(): string {
    return getCalendarHeaderTitle(
      this.view(),
      this.weekDays(),
      this.locale(),
      this.currentDate(),
    );
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
        modifyDate({
          config: { month: 1 },
          date: DateTime.fromObject({
            month: this.currentDate().month,
            year: this.currentDate().year,
            day: 1,
          }),
        });
        break;

      default:
        break;
    }
  }

  goToToday(): void {
    this.calendarService.setVisibleDate(DateTime.now());
  }

  handleShowFilters() {
    const newModalId = this.modalService.openModal({
      title: this.translationsService.translate('calendar.modal.title'),
      subtitle: this.translationsService.translate('calendar.subtitle'),
      content: this.filterModalTemplate,
      size: 'x-small',
      closeModalClicked: () => {
        this.calendarService.setFilters({});
      },
      actions: [
        {
          buttonName: 'save',
          appearance: 'primary',
          label: this.translationsService.translate('calendar.filter_save'),
          action: () => {
            this.calendarService.applyFilters(this.calendarForm.value);
            this.modalService.closeModal(newModalId || '');
          },
        },
      ],
    });
  }

  getBulletClass(name: string): string[] {
    return headerGetBulletClass(name);
  }

  getFormControl(name: string): FormControl {
    return this.calendarForm.get(name) as FormControl;
  }

  getCalendarName(name: string): string {
    return headerGetCalendarName(name);
  }
}

import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  inject,
  input,
  output,
  computed,
  signal,
  ViewChild,
  TemplateRef,
  effect,
  OnInit,
} from '@angular/core';
import { DateTime } from 'luxon';
import { getWeeksInMonth, weeksAndDays } from '../../utils';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from '../../../../directives/old/bmb-button/button.directive';
import { Info } from 'luxon';
import { orderDayNames } from '../../../../_shared/logic/utils';
import { BmbInnerHeaderComponent } from '../../../old/bmb-inner-header/bmb-inner-header.component';
import { BmbChevronTitleSelectorComponent } from '../../../bmb-chevron-title-selector/bmb-chevron-title-selector.component';
import { BmbPullWedgeComponent } from '../../../bmb-pull-wedge/bmb-pull-wedge.component';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { TranslatePipe } from '../../../../pipes/translations';
import { BmbCalendarComponentService } from '../../bmb-calendar.service';
import { BmbNativeModalService } from '../../../../services/old/modal/native-modal.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BmbCheckboxComponent } from '../../../bmb-checkbox/bmb-checkbox.component';
import { BmbLayoutItemDirective } from '../../../../directives/old/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../../../directives/old/bmb-layout/bmb-layout.directive';
import { BmbDividerComponent } from '../../../bmb-divider/bmb-divider.component';
import { BmbSwitchComponent } from '../../../old/bmb-switch/bmb-switch.component';

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
    ReactiveFormsModule,
    BmbCheckboxComponent,
    BmbLayoutItemDirective,
    BmbLayoutDirective,
    BmbDividerComponent,
    BmbSwitchComponent,
  ],
  templateUrl: './bmb-calendar-template-mobile.component.html',
  styleUrl: './bmb-calendar-template-mobile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateMobileComponent implements OnInit {
  calendarTitle = input<string>();
  disableMobileFilter = input<boolean>(false);

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onClose = output<any>();

  private readonly calendarService = inject(BmbCalendarComponentService);
  private readonly translationsService = inject(BmbTranslationsService);
  private readonly modalService = inject(BmbNativeModalService);
  @ViewChild('filterModalTemplate') filterModalTemplate!: TemplateRef<any>;

  now = computed(() => this.calendarService.getVisibleDate());
  events = computed(() => this.calendarService.getFilteredEvents());
  locale = computed(
    () => this.translationsService.getCurrentLanguage() || 'es',
  );
  weekDays = computed(() => this.calendarService.getRenderWeekDays());
  monthsNames = computed(() => Info.months('long', { locale: this.locale() }));
  month = signal<string>(this.monthsNames()[this.now().month - 1]);
  year = signal<number>(this.now().year);
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

  filters = computed(() => this.calendarService.getFilters());

  modalId = signal<string | null>(null);
  calendarForm: FormGroup<{ [key: string]: FormControl<any> }> = new FormGroup(
    {},
  );

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

  handleClose() {
    this.onClose.emit('close');
  }

  handleMonthChange(event: string): void {
    const modifyDate = ({ config, date }: any) => {
      if (event === '+') {
        this.syncVisibleDate(date.plus(config));
      } else {
        this.syncVisibleDate(date.minus(config));
      }
    };

    if (this.isWedgeOpen) {
      const newDate = DateTime.fromObject({
        month: this.now().month,
        year: this.now().year,
        day: 1,
      });

      modifyDate({ config: { month: 1 }, date: newDate });
    } else {
      modifyDate({ config: { days: 7 }, date: this.now() });
    }
  }

  isSelectedDay(date: DateTime): boolean {
    return date.hasSame(this.now(), 'day');
  }

  handleDayChange(date: DateTime): void {
    this.syncVisibleDate(date);
    this.month.set(this.monthsNames()[date.month - 1]);
    this.year.set(date.year);
    this.isCalendarOpen = false;
    this.isWedgeOpen = false;
  }

  private syncVisibleDate(date: DateTime): void {
    this.calendarService.setVisibleDate(date);
  }

  handleViewTypeChange() {
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

  findEventsForToday(date: DateTime) {
    const weekNumber = date.weekNumber;
    const stringDate = date.toFormat('yyyy-MM-dd');
    return !!this.events()?.[weekNumber]?.[stringDate]?.some(
      (event) => event.isVisible,
    );
  }

  getBulletClass(name: string): string[] {
    return ['bmb_calendar-event-bullet', `bmb_calendar-event-bullet-${name}`];
  }

  getFormControl(name: string): FormControl {
    return this.calendarForm.get(name) as FormControl;
  }

  getCalendarName(name: string): string {
    switch (name) {
      case 'academic':
        return 'Horario de clases';
      case 'life':
        return 'Vida';
      case 'events':
        return 'Eventos';
      case 'save_the_date':
        return 'Save the date';
      default:
        return name;
    }
  }
}

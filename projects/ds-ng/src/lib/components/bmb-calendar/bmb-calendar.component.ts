import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  HostListener,
  model,
  input,
  ViewChild,
  TemplateRef,
  output,
  computed,
  signal,
  OnInit,
  AfterViewInit,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime, Interval } from 'luxon';
import { BmbCalendarTemplateWeekComponent } from './common/bmb-calendar-template-week/bmb-calendar-template-week.component';
import { BmbCalendarTemplateDayComponent } from './common/bmb-calendar-template-day/bmb-calendar-template-day.component';
import { BmbCalendarTemplateMonthComponent } from './common/bmb-calendar-template-month/bmb-calendar-template-month.component';
import { BmbCalendarHeaderComponent } from './common/bmb-calendar-header/bmb-calendar-header.component';
import { BmbCalendarTemplateMobileComponent } from './common/bmb-calendar-template-mobile/bmb-calendar-template-mobile.component';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';
import {
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
  IBmbCalendarView,
  IBmbParsedDates,
} from './types';
import { getWeekDays, getMonthDays, DEFAULT_DATE_FORMAT } from './utils';
import { BmbCalendarService } from '../../services/calendar/calendar.service';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { IBmbNativeModal } from '../bmb-modal/bmb-modal.interface';
import { BmbTranslationsService } from '../../services/translations/translations.service';


const parseFromFormat = (dateString: string, format: string): DateTime => {
  if (format.toLowerCase() === 'iso') return DateTime.fromISO(dateString);

  return DateTime.fromFormat(dateString, format);
};

export {
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
  IBmbEventType,
} from './types';

@Component({
  selector: 'bmb-calendar',
  standalone: true,
  imports: [
    CommonModule,
    BmbCalendarTemplateDayComponent,
    BmbCalendarTemplateWeekComponent,
    BmbCalendarTemplateMonthComponent,
    BmbCalendarHeaderComponent,
    BmbCalendarTemplateMobileComponent,
    BmbBadgeComponent,
    BmbLoaderComponent,
    ReactiveFormsModule,
    BmbCheckboxComponent,
    BmbDividerComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  styleUrl: './bmb-calendar.component.scss',
  templateUrl: './bmb-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarComponent implements OnInit, AfterViewInit {
  view = model<IBmbCalendarView>('week'); // internal
  filters = model<{ [key: string]: boolean }>({});
  calendarTimezone = input<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  clientTimezone = input<string>(
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );
  // lang = input<string>('es-MX'); // deprecated
  height = input<number | string>('100%');
  startBusinessHour = input<number>(8);
  calendarTitle = input<string>();
  dateFormat = input<string>(DEFAULT_DATE_FORMAT);
  events = computed<IBmbCalendarEvent[]>(() =>
    this.eventsSignal.getEventList(),
  );
  showFilterButton = input<boolean>(false);
  disableMobileFilter = input<boolean>(false);
  visibleDate = model<DateTime>(DateTime.now()); // internal

  currentDate = input<string>(''); // Deprecated

  onDateChange = output<any>();
  onClose = output<any>();

  selectedWeek = computed(() => this.visibleDate().weekNumber);
  weekNumber = computed(() => this.visibleDate().weekNumber);
  renderWeekDays = computed(() => getWeekDays(this.visibleDate()));
  isLoading = computed(() => this.eventsSignal.getIsLoading());
  selectedEvent: IBmbCalendarEvent | null = null;
  isMobileHeader: boolean = false;
  orderedEvents = computed<IBmbParsedDates>(() => {
    const weeks = this.events().reduce(
      (acc: IBmbParsedDates, event) => {
        const startDate = parseFromFormat(event.start, this.dateFormat());
        const endDate = parseFromFormat(event.end, this.dateFormat());
        const interval = Interval.fromDateTimes(startDate, endDate);
        const week = startDate.weekNumber;
        const stringDate = startDate.toFormat('yyyy-MM-dd');

        if (!acc[week]) acc[week] = {};
        if (!acc[week][stringDate]) acc[week][stringDate] = [];
        acc[week][stringDate].push({ ...event, startDate, endDate, interval });

        if (
          event.calendar &&
          !acc.calendars?.some((cal) => cal === event.calendar)
        ) {
          acc.calendars?.push(event.calendar);
        }

        return acc;
      },
      { calendars: [] } as IBmbParsedDates,
    );

    const orderedDates = {} as IBmbParsedDates;

    for (const week in weeks) {
      if (week === 'calendars') {
        orderedDates[week] = weeks[week];
      } else {
        orderedDates[week] = {};

        for (const date in weeks[week]) {
          orderedDates[week][date] = weeks[week][date].sort((a, b) => {
            const aDate = a.startDate ?? DateTime.invalid('Invalid Date');
            const bDate = b.startDate ?? DateTime.invalid('Invalid Date');
            return aDate <= bDate ? -1 : 1;
          });
        }
      }
    }

    return orderedDates;
  });
  filteredEvents = computed<IBmbParsedDates>(() => {
    const newEvents = {} as IBmbParsedDates;
    for (const week in this.orderedEvents()) {
      if (week !== 'calendars') {
        newEvents[week] = {};
        for (const date in this.orderedEvents()[week]) {
          newEvents[week][date] = this.orderedEvents()[week][date].map(
            (event) => ({
              ...event,
              isVisible:
                Object.keys(this.filters()).length === 0 ||
                this.filters()[event.calendar || 'Default'] !== false,
            }),
          );
        }
      }
    }

    newEvents.calendars = this.orderedEvents().calendars;

    return newEvents;
  });
  filterModalId = signal<string | null>(null);
  calendarForm: FormGroup<{ [key: string]: FormControl<any> }> = new FormGroup(
    {},
  );

  @ViewChild('detailContent', { read: TemplateRef })
  detailContent?: TemplateRef<any>;
  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  @HostListener('window:resize', ['$event'])
  private resize() {
    if (window.innerWidth < 1000) {
      this.view.set('day');
      this.isMobileHeader = true;
    } else {
      this.isMobileHeader = false;
    }
  }

  constructor(
    private eventsSignal: BmbCalendarService,
    private modalService: BmbNativeModalService,
    private translationsService: BmbTranslationsService,
  ) {
    effect(() => {
      const calendars = this.filteredEvents().calendars || [];
      calendars.forEach((calendar) => {
        this.calendarForm.addControl(
          calendar,
          new FormControl(this.filters()[calendar] || true),
        );
      });
    });
  }

  currentTime = signal<DateTime>(DateTime.now());
  private timerId: any;

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  ngAfterViewInit(): void {
    if (window.innerWidth < 1000) {
      this.view.set('day');
      this.isMobileHeader = true;
    }
  }

  ngOnInit() {
    this.view.update((value) => (window.innerWidth < 1000 ? 'day' : value));

    this.timerId = setInterval(() => {
      this.updateTime();
    }, 60000); // Actualiza cada 60000 milisegundos (1 minuto)
  }

  updateTime() {
    this.currentTime.set(DateTime.now());
  }

  handleDateChange(range: IBmbCalendarView, now: DateTime): void {
    this.view.set(range);
    let visibleDates: (string | null)[] = [];

    switch (range) {
      case 'day':
        visibleDates = getMonthDays(now).map((date) => date.toISO());
        break;

      case 'week':
        visibleDates = getWeekDays(now).map((date) => date.toISO());
        break;

      case 'month':
        visibleDates = getMonthDays(now).map((date) => date.toISO());
        break;

      default:
        break;
    }

    this.onDateChange.emit({
      range,
      now: now.toISO(),
      visibleDates,
    });
  }

  handleCurrentDateChange(newDate: DateTime): void {
    this.visibleDate.set(newDate);
  }

  getDayEvents(): IBmbCalendarEvent[] {
    const visibleDateStr = this.visibleDate().toFormat('yyyy-MM-dd');
    const events =
      this.filteredEvents()[this.selectedWeek()]?.[visibleDateStr] ?? [];
    return events;
  }

  handleSelectEvent(newEvent: IBmbCalendarEventClick): void {
    const { event } = newEvent;
    const title = event.modalTitle ?? event.title;
    const modalTitle =
      event.status === 'disabled' ? `(Cancelado) ${title}` : title;

    this.selectedEvent = event;

    const data: IBmbNativeModal = {
      title: modalTitle,
      subtitle: event.subtitle,
      content: this.detailContent,
      size: 'small',
    };
    this.modalService.openModal(data);
  }

  isAnEventSelected(event: IBmbCalendarEventClick | null): boolean {
    return !!event;
  }

  getHeight(height: string | number): string {
    if (typeof height === 'number') return `${height}px`;

    return height;
  }

  getDuration() {
    if (!this.selectedEvent) return '';
    return `${DateTime.fromISO(this.selectedEvent.start).toFormat('hh:mm a')} - ${DateTime.fromISO(this.selectedEvent.end).toFormat('hh:mm a')}`;
  }

  handleClose() {
    this.onClose.emit('close');
  }

  handleShowModalFilter() {
    this.filterModalId.set(
      this.modalService.openModal({
        title: this.translationsService.translate('calendar.title'),
        subtitle: this.translationsService.translate('calendar.subtitle'),
        content: this.modalTemplate,
        size: 'x-small',
        closeModalClicked: (event: unknown) => this.handleFormReset(event),
        actions: [
          {
            buttonName: 'save',
            appearance: 'primary',
            label: this.translationsService.translate('calendar.filter_save'),
            action: () => this.handleApplyFilters(),
          },
        ],
      }),
    );
  }

  handleFormReset(_: any): void {
    for (const calendar in this.calendarForm.controls) {
      const value =
        Object.keys(this.filters()).length === 0 || !!this.filters()[calendar];
      this.calendarForm.controls[calendar].setValue(value);
    }
  }

  handleApplyFilters(): void {
    const selectedCalendars = Object.keys(this.calendarForm.controls).reduce<{
      [key: string]: boolean;
    }>((acc, calendar) => {
      acc[calendar] = this.calendarForm.controls[calendar].value;
      return acc;
    }, {});
    this.filters.set(selectedCalendars);
    this.modalService.closeModal(this.filterModalId() as string);
    this.filterModalId.set(null);
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

  getBulletClass(name: string): string[] {
    return ['bmb_calendar-event-bullet', `bmb_calendar-event-bullet-${name}`];
  }
}

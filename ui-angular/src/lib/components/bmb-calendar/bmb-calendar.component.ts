import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  model,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import { DEFAULT_DATE_FORMAT } from '../../_shared/logic/components/calendar';
import {
  getCalendarHeight,
  getCalendarDateChange,
} from '../../_shared/logic/components/calendar-view';
import type {
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
  IBmbCalendarView,
} from '../../_shared/types/components/calendar';
import { BmbCalendarService } from '../../services/calendar/calendar.service';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';
import { BmbCalendarComponentService } from './bmb-calendar.service';
import { BmbCalendarHeaderComponent } from './common/bmb-calendar-header/bmb-calendar-header.component';
import { BmbCalendarTemplateDayComponent } from './common/bmb-calendar-template-day/bmb-calendar-template-day.component';
import { BmbCalendarTemplateMobileComponent } from './common/bmb-calendar-template-mobile/bmb-calendar-template-mobile.component';
import { BmbCalendarTemplateMonthComponent } from './common/bmb-calendar-template-month/bmb-calendar-template-month.component';
import { BmbCalendarTemplateWeekComponent } from './common/bmb-calendar-template-week/bmb-calendar-template-week.component';

export type {
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
    BmbLoaderComponent,
  ],
  styleUrl: './bmb-calendar.component.scss',
  templateUrl: './bmb-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [BmbCalendarComponentService],
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
  height = input<number | string>('100%');
  calendarTitle = input<string>();
  dateFormat = input<string>(DEFAULT_DATE_FORMAT);
  showFilterButton = input<boolean>(false);
  disableMobileFilter = input<boolean>(false);
  startBusinessHour = input<number>(8); // deprecated

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onDateChange = output<any>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onClose = output<any>();

  calendarService = inject(BmbCalendarComponentService);
  mainCalendarService = inject(BmbCalendarService);

  visibleDate = computed(() => this.calendarService.getVisibleDate());
  isLoading = computed(() => this.mainCalendarService.getIsLoading());
  events = computed(() => this.mainCalendarService.getEventList());
  selectedWeek = computed(() => this.visibleDate().weekNumber);
  weekNumber = computed(() => this.visibleDate().weekNumber);
  selectedEvent: IBmbCalendarEvent | null = null;
  isMobileHeader = false;

  @HostListener('window:resize')
  resize() {
    if (window.innerWidth < 1000) {
      this.view.set('day');
      this.isMobileHeader = true;
    } else {
      this.isMobileHeader = false;
    }
  }

  constructor() {
    effect(
      () => {
        const events = this.events();

        this.calendarService.setOrderedEvents(events, this.dateFormat());
      },
      { allowSignalWrites: true },
    );

    effect(
      () => {
        const dateFormat = this.dateFormat();

        this.calendarService.setDateFormat(dateFormat);
      },
      { allowSignalWrites: true },
    );
  }

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
    this.calendarService.setCurrentTime(DateTime.now());
  }

  handleDateChange(range: IBmbCalendarView, now: DateTime): void {
    this.view.set(range);
    this.onDateChange.emit(getCalendarDateChange(range, now));
  }

  isAnEventSelected(event: IBmbCalendarEventClick | null): boolean {
    return !!event;
  }

  getHeight(height: string | number): string {
    return getCalendarHeight(height);
  }

  handleClose() {
    this.onClose.emit('close');
  }
}

import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  HostListener,
  model,
  input,
  ViewChild,
  TemplateRef,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { BmbCalendarTemplateWeekComponent } from './common/bmb-calendar-template-week/bmb-calendar-template-week.component';
import { BmbCalendarTemplateDayComponent } from './common/bmb-calendar-template-day/bmb-calendar-template-day.component';
import { BmbCalendarTemplateMonthComponent } from './common/bmb-calendar-template-month/bmb-calendar-template-month.component';
import { BmbCalendarHeaderComponent } from './common/bmb-calendar-header/bmb-calendar-header.component';
import { BmbCalendarTemplateMobileComponent } from './common/bmb-calendar-template-mobile/bmb-calendar-template-mobile.component';
import { BmbCalendarTemplateEventListComponent } from './common/bmb-calendar-template-event-list/bmb-calendar-template-event-list.component';
import {
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
  IBmbCalendarHourFormat,
  IBmbCalendarView,
} from './types';
import { getWeekDays, getMonthDays } from './utils';
import { BmbCalendarService } from '../../services/calendar.service';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDataConfig } from '../bmb-modal/bmb-modal.interface';
import { BmbModalComponent } from '../bmb-modal/bmb-modal.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';

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
    BmbCalendarTemplateEventListComponent,
    BmbIconComponent,
    BmbBadgeComponent,
  ],
  styleUrl: './bmb-calendar.component.scss',
  templateUrl: './bmb-calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarComponent {
  view = model<IBmbCalendarView>('week');

  @Input() hourFormat: IBmbCalendarHourFormat = '12';
  @Input() calendarTimezone: string =
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  @Input() clientTimezone: string =
    Intl.DateTimeFormat().resolvedOptions().timeZone;
  @Input() lang: string = 'es-MX';
  @Input() currentDate: string = '';
  @Input() height: number | string = 700;
  startBusinessHour = input<number>(8);
  calendarTitle = input<string>('Mi horario');

  @Output() onDateChange: EventEmitter<any> = new EventEmitter<any>();
  onClose = output<any>();

  @ViewChild('detailContent', { read: TemplateRef })
  detailContent?: TemplateRef<any>;

  @HostListener('window:resize', ['$event'])
  private resize() {
    if (window.innerWidth < 1000) {
      this.view.set('day');
    } else {
      this.isListShowing = false;
    }
  }

  constructor(
    private eventsSignal: BmbCalendarService,
    private matDialog: MatDialog,
  ) {}

  currentTime: DateTime = DateTime.now();
  private timerId: any;

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  ngOnInit() {
    this.view.update((value) => (window.innerWidth < 1000 ? 'day' : value));
    if (this.currentDate !== '') {
      this.now = DateTime.fromISO(this.currentDate);
    }

    this.timerId = setInterval(() => {
      this.updateTime();
    }, 60000); // Actualiza cada 60000 milisegundos (1 minuto)
  }

  now: DateTime = DateTime.now();
  weekNumber = this.now.weekNumber;
  renderWeekDays: DateTime[] = getWeekDays(this.now);
  selectedEvent: IBmbCalendarEvent | null = null;
  isListShowing: boolean = false;

  updateTime() {
    this.currentTime = DateTime.now();
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
    this.now = newDate;
    this.weekNumber = newDate.weekNumber;
    this.renderWeekDays = getWeekDays(newDate);
  }

  handleSelectEvent(newEvent: IBmbCalendarEventClick): void {
    const { event } = newEvent;
    const title = event.modalTitle ?? event.title;
    const modalTitle =
      event.status === 'disabled' ? `(Cancelado) ${title}` : title;

    this.selectedEvent = event;

    const data: ModalDataConfig = {
      title: modalTitle,
      subtitle: event.subtitle,
      content: this.detailContent,
      size: 'small',
      type: 'informative',
      scrollable: true,
    };
    this.matDialog.open(BmbModalComponent, { data });
  }

  isAnEventSelected(event: IBmbCalendarEventClick | null): boolean {
    return !!event;
  }

  getHeight(height: string | number): string {
    if (typeof height === 'number') return `${height}px`;

    return height;
  }

  onViewTypeChange() {
    this.isListShowing = !this.isListShowing;
  }

  getEvents(): IBmbCalendarEvent[] {
    return this.eventsSignal.getEventList();
  }

  getIsLoading() {
    return this.eventsSignal.getIsLoading();
  }

  getDuration() {
    if (!this.selectedEvent) return '';
    return `${DateTime.fromISO(this.selectedEvent.start).toFormat('hh:mm a')} - ${DateTime.fromISO(this.selectedEvent.end).toFormat('hh:mm a')}`;
  }

  handleClose() {
    this.onClose.emit('close');
  }
}

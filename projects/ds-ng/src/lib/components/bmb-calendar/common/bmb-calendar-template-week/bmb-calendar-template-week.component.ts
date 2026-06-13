import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Info, DateTime } from 'luxon';
import {
  IBmbCalendarEvent,
  IBmbCalendarRenderEvents,
  IBmbParsedDates,
} from '../../types';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import { DEFAULT_DATE_FORMAT, eventsInDate, layoutEvents } from '../../utils';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';
import { orderDayNames } from '../../../../utils/utils';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { BmbCalendarTimeIndicatorComponent } from '../bmb-calendar-time-indicator/bmb-calendar-time-indicator.component';
import { BmbCalendarComponentService } from '../../bmb-calendar.service';

@Component({
  selector: 'bmb-calendar-template-week',
  standalone: true,
  imports: [
    CommonModule,
    BmbCalendarHourViewComponent,
    BmbCalendarScheduleCardsComponent,
    BmbCalendarTimeIndicatorComponent,
  ],
  templateUrl: './bmb-calendar-template-week.component.html',
  styleUrl: './bmb-calendar-template-week.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateWeekComponent {
  dateFormat = input<string>(DEFAULT_DATE_FORMAT);
  selectedWeek = input<number>(0);

  eventsOnWeek = computed<IBmbCalendarEvent[][]>(() => {
    return this.weekDays().map((day) => {
      const eventsOnDay =
        this.events()?.[day.weekNumber]?.[day.toFormat('yyyy-MM-dd')] ?? [];
      return layoutEvents(eventsOnDay);
    });
  });

  private readonly calendarService = inject(BmbCalendarComponentService);
  private readonly translationsService = inject(BmbTranslationsService);

  now = computed(() => this.calendarService.getVisibleDate());
  events = computed(() => this.calendarService.getFilteredEvents());
  weekDays = computed(() => this.calendarService.getRenderWeekDays());
  currentTime = computed(() => this.calendarService.getCurrentTime());

  locale = this.translationsService.getCurrentLanguage();
  defaultDayOrder = Info.weekdays('short', { locale: this.locale });
  dayNames = orderDayNames(this.defaultDayOrder);
  rows = new Array(25).fill(0);

  isNow(date: DateTime): boolean {
    const diff = date?.diffNow('day')?.days;
    return diff < 0 && diff > -1;
  }

  renderEvents(events: IBmbCalendarRenderEvents): any[] {
    return eventsInDate(events);
  }
}

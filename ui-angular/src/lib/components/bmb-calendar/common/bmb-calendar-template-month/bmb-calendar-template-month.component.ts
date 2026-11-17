import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  inject,
} from '@angular/core';
import { DateTime } from 'luxon';
import {
  eventsInDate,
  weeksAndDays,
} from '../../../../_shared/logic/components/calendar';
import {
  getCalendarShortDayName,
  templateMonthIsNow,
} from '../../../../_shared/logic/components/calendar-view';
import type {
  IBmbCalendarEvent,
  IBmbCalendarRenderEvents,
} from '../../../../_shared/types/components/calendar';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { BmbCalendarComponentService } from '../../bmb-calendar.service';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';

@Component({
  selector: 'bmb-calendar-template-month',
  standalone: true,
  imports: [CommonModule, BmbCalendarScheduleCardsComponent],
  templateUrl: './bmb-calendar-template-month.component.html',
  styleUrl: './bmb-calendar-template-month.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateMonthComponent {
  private readonly calendarService = inject(BmbCalendarComponentService);
  private readonly translationsService = inject(BmbTranslationsService);

  now = computed(() => this.calendarService.getVisibleDate());
  events = computed(() => this.calendarService.getFilteredEvents());
  locale = computed(() => this.translationsService.getCurrentLanguage());

  weeksAndDaysList = computed<DateTime[]>(() => weeksAndDays(this.now()));
  eventsOnDate = computed<IBmbCalendarEvent[][]>(() => {
    return this.weeksAndDaysList().map((date) => {
      const weekNumber = date.weekNumber;
      const stringDate = date.toFormat('yyyy-MM-dd');
      return this.events()?.[weekNumber]?.[stringDate] ?? [];
    });
  });

  getDayName(date: DateTime) {
    return getCalendarShortDayName(date, this.locale());
  }

  isNow(date: DateTime): boolean {
    return templateMonthIsNow(date);
  }

  renderEvents(events: IBmbCalendarRenderEvents): any[] {
    return eventsInDate(events);
  }
}

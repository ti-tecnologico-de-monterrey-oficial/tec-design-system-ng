import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Output,
  EventEmitter,
  input,
  computed,
} from '@angular/core';
import {
  IBmbCalendarEvent,
  IBmbCalendarEventClick,
  IBmbCalendarRenderEvents,
  IBmbParsedDates,
} from '../../types';
import { DateTime } from 'luxon';
import { eventsInDate, dayName, weeksAndDays } from '../../utils';
import { CommonModule } from '@angular/common';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';

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
  now = input<DateTime>(DateTime.now());
  events = input<IBmbParsedDates>({});

  constructor(private translationsService: BmbTranslationsService) {}

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
    return dayName(date, this.locale());
  }

  isNow(date: DateTime): boolean {
    const diff = date.diffNow('day').days;
    return diff < 0 && diff > -1;
  }

  renderEvents(events: IBmbCalendarRenderEvents): any[] {
    return eventsInDate(events);
  }
}

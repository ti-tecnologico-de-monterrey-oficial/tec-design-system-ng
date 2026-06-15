import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  computed,
  inject,
} from '@angular/core';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import { CommonModule } from '@angular/common';
import { IBmbCalendarEvent } from '../../types';
import { BmbCalendarScheduleCardsComponent } from '../bmb-calendar-schedule-cards/bmb-calendar-schedule-cards.component';
import { DEFAULT_DATE_FORMAT, layoutEvents } from '../../utils';
import { BmbCalendarTimeIndicatorComponent } from '../bmb-calendar-time-indicator/bmb-calendar-time-indicator.component';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { BmbCalendarComponentService } from '../../bmb-calendar.service';

@Component({
  selector: 'bmb-calendar-template-day',
  standalone: true,
  imports: [
    CommonModule,
    BmbCalendarHourViewComponent,
    BmbCalendarScheduleCardsComponent,
    BmbCalendarTimeIndicatorComponent,
  ],
  templateUrl: './bmb-calendar-template-day.component.html',
  styleUrl: './bmb-calendar-template-day.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateDayComponent {
  dateFormat = input<string>(DEFAULT_DATE_FORMAT);

  private readonly calendarService = inject(BmbCalendarComponentService);
  private readonly translationsService = inject(BmbTranslationsService);

  now = computed(() => this.calendarService.getVisibleDate());
  events = computed(() => this.calendarService.getDayEvents());
  currentTime = computed(() => this.calendarService.getCurrentTime());
  locale = computed(() => this.translationsService.getCurrentLanguage());

  eventsWithLayout = computed<IBmbCalendarEvent[]>(() => {
    return layoutEvents(this.events());
  });
  rows = new Array(24).fill(0);

  getNameDay(): string {
    return this.now().toFormat('cccc', { locale: this.locale() });
  }
}

import { Component, inject } from '@angular/core';
import {
  BmbCalendarComponent,
  BmbCalendarService,
  BmbTranslationsService,
  type IBmbCalendarEvent,
} from 'ui-angular';
import { PropertyPlayground } from '../migration/property-playground/property-playground';
import { createDemoConfiguration } from '../migration/property-playground/demo-configurations';
import type { DemoValue } from '../migration/property-playground/demo-properties';

@Component({
  selector: 'app-calendar',
  imports: [PropertyPlayground],
  providers: [BmbCalendarService],
  templateUrl: './calendar.component.html',
  styles: [':host { display: block; min-height: 0; }'],
})
export class CalendarComponent {
  readonly component = BmbCalendarComponent;
  readonly configuration = createDemoConfiguration('calendar');

  private readonly calendarService = inject(BmbCalendarService);
  private readonly translations = inject(BmbTranslationsService);

  applyServices(values: Record<string, DemoValue>): void {
    this.calendarService.eventList.set(
      values['calendarEvents'] as IBmbCalendarEvent[],
    );
    this.calendarService.setIsLoading(values['calendarLoading'] === true);
    this.translations.setLanguage(String(values['language']));
  }
}

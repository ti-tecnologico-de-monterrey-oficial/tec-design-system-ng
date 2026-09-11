import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { DateTime } from 'luxon';
import {
  BmbTimestreamDetailsComponent,
  type ISelectedDate,
  type ITimelineEvent,
  type ITimelineEventParsed,
} from 'ui-angular';

@Component({
  selector: 'app-timestamp-detail-page',
  imports: [BmbTimestreamDetailsComponent],
  templateUrl: './timestamp-detail-page.html',
  styleUrl: './timestamp-detail-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimestampDetailPage {
  readonly languages = ['es', 'en'];
  readonly lang = signal('es');
  readonly now = signal('2026-09-07');
  readonly selectedDateValue = signal('2026-09-07');
  readonly isMicro = signal(false);
  readonly selected = signal(true);
  readonly eventTitle = signal('Inicio de inscripciones');
  readonly shortDescription = signal('Completa tu proceso de inscripción.');
  readonly lastEvent = signal('Sin interacciones');
  readonly nowDate = computed(() => DateTime.fromISO(this.now()));

  readonly selectedDate = computed<ISelectedDate>(() => {
    const date = DateTime.fromISO(this.selectedDateValue());
    return { day: date.toFormat('dd'), month: date.toFormat('MM'), date };
  });

  readonly orderedEvents = computed<ITimelineEventParsed[]>(() => {
    const date = DateTime.fromISO(this.selectedDateValue());
    const event: ITimelineEvent = {
      id: 1,
      start: date.toISODate() ?? '',
      end: date.plus({ days: 2 }).toISODate() ?? '',
      description: this.shortDescription(),
      short_description: this.shortDescription(),
      type: 'active',
      title: this.eventTitle(),
      image: '',
      icon: 'event',
      originalStart: date,
      startEvent: date,
      endEvent: date.plus({ days: 2 }),
      diff: 2,
    };

    return [
      {
        ...event,
        startEvent: date,
        endEvent: date.plus({ days: 2 }),
        originalStart: date,
        selected: this.selected(),
        diff: 2,
        date,
        events: [event],
      },
    ];
  });

  recordEvent(event: ITimelineEvent): void {
    this.lastEvent.set(`changeSelectedEvent: ${event.id}`);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  signal,
  viewChild,
} from '@angular/core';
import { DateTime } from 'luxon';
import {
  BmbHitoListComponent,
  type IBmbHitoListEvents,
  type ISelectedDate,
} from 'ui-angular';

@Component({
  selector: 'app-hito-list-page',
  imports: [BmbHitoListComponent],
  templateUrl: './hito-list-page.html',
  styleUrl: './hito-list-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HitoListPage {
  readonly hitoList = viewChild(BmbHitoListComponent);
  readonly dateFormat = signal('dd LLL yyyy');
  readonly lang = signal('es');
  readonly now = signal(DateTime.fromISO('2025-01-15'));
  readonly orderedMonths = signal(['January', 'February']);
  readonly selectedDate = signal<ISelectedDate>({
    day: '15',
    month: 'January',
    date: DateTime.fromISO('2025-01-15'),
  });
  readonly lastAction = signal('Sin interacción');
  readonly events: IBmbHitoListEvents = {
    January: {
      name: 'enero',
      year: 2025,
      selected: true,
      orderedEvents: ['01', '15'],
      events: {
        '01': {
          date: DateTime.fromISO('2025-01-01'),
          selected: false,
          events: [{ type: 'meeting' }, { type: 'task' }],
        },
        '15': {
          date: DateTime.fromISO('2025-01-15'),
          selected: true,
          events: [
            { type: 'meeting' },
            { type: 'task' },
            { type: 'holiday' },
            { type: 'reminder' },
            { type: 'deadline' },
          ],
        },
      },
    },
    February: {
      name: 'febrero',
      year: 2025,
      selected: false,
      orderedEvents: ['05', '20'],
      events: {
        '05': {
          date: DateTime.fromISO('2025-02-05'),
          selected: false,
          events: [{ type: 'task' }],
        },
        '20': {
          date: DateTime.fromISO('2025-02-20'),
          selected: false,
          events: [{ type: 'meeting' }, { type: 'reminder' }],
        },
      },
    },
  };

  setDateFormat(value: string): void {
    this.dateFormat.set(value);
  }

  setLang(value: string): void {
    this.lang.set(value);
  }

  reverseMonths(): void {
    this.orderedMonths.update((months) => [...months].reverse());
  }

  handleSelectedDate(value: ISelectedDate): void {
    this.selectedDate.set(value);
    this.lastAction.set(`Seleccionado: ${value.month} ${value.day}`);
  }

  scrollToCurrent(): void {
    this.hitoList()?.scrollToItem();
    this.lastAction.set('scrollToItem ejecutado');
  }

  showCurrentValues(): void {
    const component = this.hitoList();
    if (!component) return;

    const month = this.orderedMonths()[0];
    const day = this.events[month].orderedEvents[0];
    this.lastAction.set(
      `${component.getMonthTitle(month)} · ${component.parseEvent(month, day)}`,
    );
  }
}

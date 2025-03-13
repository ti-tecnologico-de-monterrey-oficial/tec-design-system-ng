import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  output,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbCalendarEvent } from '../../types';
import { DateTime } from 'luxon';
import { BmbContainerButtonComponent } from '../../../bmb-container-button/bmb-container-button.component';

@Component({
  selector: 'bmb-calendar-template-event-list',
  standalone: true,
  imports: [BmbContainerButtonComponent],
  templateUrl: './bmb-calendar-template-event-list.component.html',
  styleUrl: './bmb-calendar-template-event-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateEventListComponent implements OnInit {
  @Input() events: IBmbCalendarEvent[] = [];

  onCurrentDateChange = output<DateTime>();

  now = DateTime.now();
  monthsWithEvents: number[] = [];
  monthsNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

  ngOnInit() {
    this.populateDateWithEvents();
  }

  populateDateWithEvents() {
    const months = new Array(12).fill(0);

    this.events.forEach((cur: IBmbCalendarEvent) => {
      const date = DateTime.fromISO(cur.start);
      months[date.month - 1]++;
    }, []);

    this.monthsWithEvents = months;
  }

  handleDateChange(month: number) {
    this.onCurrentDateChange.emit(
      DateTime.fromObject({
        month: month + 1,
        year: this.now.year,
        day: this.now.day,
      }),
    );
  }

  getSubtitle(items: number) {
    switch (items) {
      case 0:
        return 'No hay eventos';
      case 1:
        return '1 evento';
      default:
        return `${items} eventos`;
    }
  }
}

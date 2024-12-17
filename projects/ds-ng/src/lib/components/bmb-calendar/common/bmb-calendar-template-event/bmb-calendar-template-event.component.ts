import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbCalendarEventClick, IBmbCalendarEvent } from '../../types';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { getTimeRange } from '../../utils';
import { BmbStudentActivityCardOldComponent } from './bmb-calendar-template-event-old.component.ts/bmb-calendar-template-event-old.component';

@Component({
  selector: 'bmb-calendar-template-event',
  standalone: true,
  imports: [
    CommonModule,
    BmbStudentActivityCardOldComponent,
  ],
  templateUrl: './bmb-calendar-template-event.component.html',
  styleUrl: './bmb-calendar-template-event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateEventComponent {
  event = input.required<IBmbCalendarEventClick>();

  closeModal = output<void>();

  getDateFromString(date: string): DateTime {
    return DateTime.fromISO(date);
  }

  handleTimeRange(event: IBmbCalendarEvent): string {
    if (!event) return '';
    return getTimeRange(event);
  }

  handleCloseModal() {
    this.closeModal.emit();
  }
}

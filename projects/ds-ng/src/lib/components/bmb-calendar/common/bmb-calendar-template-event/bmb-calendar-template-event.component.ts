import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  input,
  Input,
  output,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbCalendarEventClick, IBmbCalendarEvent } from '../../types';
import { CommonModule } from '@angular/common';
import { BmbButtonDirective } from '../../../../directives/button.directive';
import { BmbIconComponent } from '../../../bmb-icon/bmb-icon.component';
import { DateTime } from 'luxon';
import { BmbBadgeComponent } from '../../../bmb-badge/bmb-badge.component';
import { getTimeRange } from '../../utils';
import { BmbStudentActivityCardComponent } from '../../../bmb-student-activity-card/bmb-student-activity-card.component';

@Component({
  selector: 'bmb-calendar-template-event',
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbIconComponent,
    BmbBadgeComponent,
    BmbStudentActivityCardComponent,
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

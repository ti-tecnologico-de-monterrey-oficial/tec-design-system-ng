import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
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

@Component({
  selector: 'bmb-calendar-template-event',
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbIconComponent,
    BmbBadgeComponent,
  ],
  templateUrl: './bmb-calendar-template-event.component.html',
  styleUrl: './bmb-calendar-template-event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateEventComponent {
  @Input() event: IBmbCalendarEventClick | null = null;

  @Output() closeModal: EventEmitter<null> = new EventEmitter<null>();

  getPosition(position: any): string {
    return `top: ${position}px`;
  }

  getDateString(event: IBmbCalendarEvent | null | undefined): string {
    if (!event) return '00:00';
    const start = DateTime.fromISO(event.start);

    return start.toFormat('hh:mm');
  }

  handleTimeRange(event: IBmbCalendarEvent | null | undefined): string {
    if (!event) return '';
    return getTimeRange(event);
  }

  handleCloseModal() {
    this.closeModal.emit(null);
  }
}

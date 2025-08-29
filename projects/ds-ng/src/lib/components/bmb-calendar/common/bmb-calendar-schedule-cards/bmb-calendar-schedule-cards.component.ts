import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { IBmbCalendarEvent, IBmbCalendarEventClick } from '../../types';
import { DateTime } from 'luxon';
import { getTimeRange, HOUR_HEIGHT } from '../../utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-calendar-schedule-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-calendar-schedule-cards.component.html',
  styleUrl: './bmb-calendar-schedule-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarScheduleCardsComponent {
  event = input.required<IBmbCalendarEvent>();
  isPositionAbsolute = input<boolean>(true);
  extendedContent = input<boolean>(true);

  onSelectEvent = output<IBmbCalendarEventClick>();

  now = DateTime.now();

  getPosition(): string {
    if (!this.isPositionAbsolute()) return '';

    const startMin =
      (this.event()?.startDate?.hour ?? 0) * HOUR_HEIGHT +
      (this.event()?.startDate?.minute ?? 0) * 2;
    const endMin =
      (this.event()?.endDate?.hour ?? 0) * HOUR_HEIGHT +
      (this.event()?.endDate?.minute ?? 0) * 2 -
      startMin;
    const column = this.event()?.column ?? 0;
    const columnSize = this.event()?.columnCount ?? 1;
    const left = column ? (100 / columnSize) * column + 1 : 0;
    const width = columnSize ? 100 / columnSize : 100;


    return `top: ${startMin}px; height: ${endMin}px; left: calc(${left}% + ${8 / (columnSize + 1)}px); width: calc(${width}% - ${8 / (columnSize + 1)}px)`;
  }

  getClassNames(): string[] {
    let newClasses = [`bmb_calendar-event-type-${this.event().type}`];
    if (this.isPositionAbsolute())
      newClasses.push('bmb_calendar-event-absolute');
    else newClasses.push('bmb_calendar-event-micro');
    if (this.event().status === 'disabled')
      newClasses.push('bmb_calendar-event-disabled');
    const diff = (this.event()?.endDate ?? DateTime.now()).diff(
      this.event()?.startDate ?? DateTime.now(),
      ['minutes'],
    );

    // 30 represents minutes
    if (diff.minutes < 45) {
      newClasses.push('bmb_calendar-event-grid-reduced');
    } else {
      newClasses.push('bmb_calendar-event-grid-full');
    }

    if (
      this.now >= (this.event()?.startDate ?? 0) &&
      this.now <= (this.event()?.endDate ?? 0) &&
      this.event().status !== 'disabled'
    ) {
      newClasses.push('bmb_calendar-event-active');
    }

    return newClasses;
  }

  handleSelectEvent(domEvent: any) {
    this.onSelectEvent.emit({
      event: this.event(),
      position: domEvent.target.getBoundingClientRect().y,
    });
  }

  handleTimeRange(): string {
    return getTimeRange(this.event());
  }
}

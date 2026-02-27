import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import { IBmbCalendarEvent, IBmbCalendarEventClick } from '../../types';
import { DateTime } from 'luxon';
import { getTimeRange, HOUR_HEIGHT } from '../../utils';
import { CommonModule } from '@angular/common';
import { IBmbNativeModal } from '../../../bmb-modal/bmb-modal.interface';
import { BmbNativeModalService } from '../../../../services/modal/native-modal.service';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from '../../../../directives/bmb-layout-grid/bmb-layout-grid.directive';
import { BmbBadgeComponent } from '../../../bmb-badge/bmb-badge.component';
import { BmbDividerComponent } from '../../../bmb-divider/bmb-divider.component';

@Component({
  selector: 'bmb-calendar-schedule-cards',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutGridDirective,
    BmbLayoutGridItemDirective,
    BmbBadgeComponent,
    BmbDividerComponent,
  ],
  templateUrl: './bmb-calendar-schedule-cards.component.html',
  styleUrl: './bmb-calendar-schedule-cards.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarScheduleCardsComponent {
  event = input.required<IBmbCalendarEvent>();
  isPositionAbsolute = input<boolean>(true);
  extendedContent = input<boolean>(true);

  now = DateTime.now();
  @ViewChild('detailContent', { read: TemplateRef })
  detailContent?: TemplateRef<any>;

  constructor(private readonly modalService: BmbNativeModalService) {}

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

  handleTimeRange(): string {
    return getTimeRange(this.event());
  }

  getBulletStyle() {
    return {
      'background-color':
        `rgb(var(--${this.event().bulletColor}))` ||
        'var(--bmb-color-success-primary)',
    };
  }

  getDuration() {
    if (!this.event()) return '';
    return `${DateTime.fromISO(this.event().start).toFormat('hh:mm a')} - ${DateTime.fromISO(this.event().end).toFormat('hh:mm a')}`;
  }

  handleSelectEvent(): void {
    const event = this.event();
    const title = event.modalTitle ?? event.title;
    const modalTitle =
      event.status === 'disabled' ? `(Cancelado) ${title}` : title;

    const data: IBmbNativeModal = {
      title: modalTitle,
      subtitle: event.subtitle,
      content: this.detailContent,
      size: 'small',
    };
    this.modalService.openModal(data);
  }
}

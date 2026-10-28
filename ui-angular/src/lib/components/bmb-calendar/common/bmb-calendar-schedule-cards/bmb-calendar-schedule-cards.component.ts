import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import { getTimeRange } from '../../../../_shared/logic/components/calendar';
import { parseCalendarDate } from '../../../../_shared/logic/components/calendar-state';
import {
  scheduleGetBulletStyle,
  scheduleGetClassNames,
  scheduleGetDuration,
  scheduleGetMicroPosition,
  scheduleGetPosition,
} from '../../../../_shared/logic/components/calendar-view';
import type { IBmbNativeModal as IBmbNativeModalGeneric } from '../../../../_shared/types';

type IBmbNativeModal = IBmbNativeModalGeneric<TemplateRef<any>>;
import type {
  IBmbCalendarEvent,
  IBmbCalendarMicroProgram,
} from '../../../../_shared/types/components/calendar';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from '../../../../directives/old/bmb-layout-grid/bmb-layout-grid.directive';
import { TranslatePipe } from '../../../../pipes/translations';
import { BmbNativeModalService } from '../../../../services/old/modal/native-modal.service';
import { BmbBadgeComponent } from '../../../bmb-badge/bmb-badge.component';
import { BmbDividerComponent } from '../../../bmb-divider/bmb-divider.component';
import { BmbCalendarComponentService } from '../../bmb-calendar.service';

@Component({
  selector: 'bmb-calendar-schedule-cards',
  standalone: true,
  imports: [
    CommonModule,
    BmbLayoutGridDirective,
    BmbLayoutGridItemDirective,
    BmbBadgeComponent,
    BmbDividerComponent,
    TranslatePipe,
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

  modalService = inject(BmbNativeModalService);
  calendarService = inject(BmbCalendarComponentService);

  now = DateTime.now();
  @ViewChild('detailContent', { read: TemplateRef })
  detailContent?: TemplateRef<any>;
  @ViewChild('microDetailContent', { read: TemplateRef })
  microDetailContent?: TemplateRef<any>;
  dateFormat = computed(() => this.calendarService.getDateFormat());
  selectedMicroProgram = signal<IBmbCalendarMicroProgram | null>(null);

  getPosition(): object {
    return scheduleGetPosition(this.isPositionAbsolute(), this.event());
  }

  getClassNames(): string[] {
    return scheduleGetClassNames(
      this.event(),
      this.isPositionAbsolute(),
      this.now,
    );
  }

  handleTimeRange(): string {
    return getTimeRange(this.event());
  }

  getBulletStyle() {
    return scheduleGetBulletStyle(this.event());
  }

  getDuration(isMicroEvent = false): string {
    return scheduleGetDuration(
      isMicroEvent,
      this.event(),
      this.selectedMicroProgram(),
      this.dateFormat(),
    );
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

  parseFromFormat = parseCalendarDate;

  getMicroPosition(microEvent: IBmbCalendarMicroProgram): object {
    return scheduleGetMicroPosition(
      microEvent,
      this.event(),
      this.dateFormat(),
    );
  }

  handleSelectMicroEvent(event: IBmbCalendarMicroProgram): void {
    this.selectedMicroProgram.set(event);
    const data: IBmbNativeModal = {
      title: `${event.code} - ${event.title} - ${event.module}`,
      content: this.microDetailContent,
      size: 'small',
    };
    this.modalService.openModal(data);
  }
}

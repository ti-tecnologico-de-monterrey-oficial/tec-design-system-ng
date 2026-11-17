import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  input,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import { hourViewCreateHoursRows } from '../../../../_shared/logic/components/calendar-view';
import { getUUID } from '../../../../_shared/logic/utils';
import type { IBmbCalendarEvent } from '../../../../_shared/types/components/calendar';

@Component({
  selector: 'bmb-calendar-hour-view',
  standalone: true,
  imports: [],
  templateUrl: './bmb-calendar-hour-view.component.html',
  styleUrl: './bmb-calendar-hour-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarHourViewComponent implements OnChanges, AfterViewInit {
  events = input<IBmbCalendarEvent[]>([]);

  scrollToHour = DateTime.now().hour - 1;
  uuid = getUUID();
  hours = this.createHoursRows();

  createHoursRows() {
    return hourViewCreateHoursRows();
  }

  ngAfterViewInit() {
    const startElement = document.getElementById(
      `bmbCalendarHourViewHour_${this.uuid}_${this.scrollToHour}`,
    );
    if (startElement) {
      startElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  ngOnChanges(): void {
    this.hours = this.createHoursRows();
  }
}

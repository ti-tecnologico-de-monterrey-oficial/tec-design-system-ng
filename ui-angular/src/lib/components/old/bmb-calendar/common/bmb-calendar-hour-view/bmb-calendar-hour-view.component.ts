import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { IBmbCalendarEvent } from '../../types';
import { DateTime } from 'luxon';
import { getUUID } from '../../../../utils/utils';

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
    const placeholderArray = new Array(24).fill(0);
    let hour = 0;
    return placeholderArray.map((_, index) => {
      if (hour === 12) {
        hour = 0;
      }
      if (!index) return '12 am';
      if (!index) return 0;

      hour++;

      return `${hour} ${index < 12 ? 'am' : 'pm'}`;
    });
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

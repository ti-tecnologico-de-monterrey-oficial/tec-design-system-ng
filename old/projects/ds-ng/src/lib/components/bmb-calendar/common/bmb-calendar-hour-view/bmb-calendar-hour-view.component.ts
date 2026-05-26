import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { IBmbCalendarEvent } from '../../types';
import { HOUR_HEIGHT } from '../../utils';

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
  startBusinessHour = input<number>(8);

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

  hours = this.createHoursRows();

  ngOnChanges(): void {
    this.hours = this.createHoursRows();
  }

  ngAfterViewInit() {
    const startElement = document.getElementById('BmbCalendarHourViewStart');
    if (startElement) {
      startElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

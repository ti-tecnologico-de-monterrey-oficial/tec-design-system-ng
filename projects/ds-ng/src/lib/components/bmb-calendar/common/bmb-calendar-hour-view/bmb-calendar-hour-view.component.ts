import {
  Component,
  Input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbCalendarEvent, IBmbCalendarHourFormat } from '../../types';

@Component({
  selector: 'bmb-calendar-hour-view',
  standalone: true,
  imports: [],
  templateUrl: './bmb-calendar-hour-view.component.html',
  styleUrl: './bmb-calendar-hour-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarHourViewComponent {
  @Input() events: IBmbCalendarEvent[] = [];
  @Input() hourFormat: IBmbCalendarHourFormat = '12';

  createHoursRows() {
    const placeholderArray = new Array(24).fill(0);
    let hour = 0;
    return placeholderArray.map((_, index) => {
      if (this.hourFormat === '12' && hour === 12) {
        hour = 0;
      }
      if (this.hourFormat === '12' && !index) return '12 am';
      if (!index) return 0;

      hour++;

      return this.hourFormat === '24'
        ? hour
        : `${hour} ${index < 12 ? 'am' : 'pm'}`;
    });
  }

  hours = this.createHoursRows();

  ngOnchanges(): void {
    this.hours = this.createHoursRows();
  }
}

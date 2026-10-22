import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { DateTime } from 'luxon';
import {
  timeIndicatorGetFormattedTime,
  timeIndicatorGetPosition,
} from '../../../../_shared/logic/components/calendar-view';

@Component({
  selector: 'bmb-calendar-time-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-calendar-time-indicator.component.html',
  styleUrl: './bmb-calendar-time-indicator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTimeIndicatorComponent {
  currentTime = input<DateTime>(DateTime.now());

  getPosition(): string {
    return timeIndicatorGetPosition(this.currentTime());
  }

  getFormattedTime(): string {
    return timeIndicatorGetFormattedTime(this.currentTime());
  }
}

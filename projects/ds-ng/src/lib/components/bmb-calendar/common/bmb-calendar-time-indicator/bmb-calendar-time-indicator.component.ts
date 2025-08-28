import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTime } from 'luxon';
import { HOUR_HEIGHT } from '../../utils';

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
    const startMin =
      this.currentTime().hour * HOUR_HEIGHT + this.currentTime().minute * 2;

    return `top: ${startMin + 52}px`;
  }

  getFormattedTime(): string {
    return this.currentTime().toFormat('hh:mm a');
  }
}

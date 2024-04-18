import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation, } from '@angular/core';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import { CommonModule } from '@angular/common';
import { HourFormat, Event } from '../../types';
import { DateTime } from 'luxon';

@Component({
  selector: 'bmb-bmb-calendar-template-day',
  standalone: true,
  imports: [CommonModule, BmbCalendarHourViewComponent],
  templateUrl: './bmb-calendar-template-day.component.html',
  styleUrl: './bmb-calendar-template-day.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarTemplateDayComponent {
  @Input() lang: string = 'es-MX';
  @Input() hourFormat: HourFormat = '12';
  @Input() now: DateTime = DateTime.now();
  @Input() events: Event[] = [];

  rows = new Array(25).fill(0);

  getNameDay(): string {
    return this.now.toFormat('cccc', { locale: this.lang });
  }
}

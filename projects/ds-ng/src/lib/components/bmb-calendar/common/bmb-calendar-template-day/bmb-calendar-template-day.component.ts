import { Component, Input } from '@angular/core';
import { BmbCalendarHourViewComponent } from '../bmb-calendar-hour-view/bmb-calendar-hour-view.component';
import { CommonModule } from '@angular/common';
import { HourFormat } from '../../types';
import { DateTime } from 'luxon';

@Component({
  selector: 'bmb-bmb-calendar-template-day',
  standalone: true,
  imports: [CommonModule, BmbCalendarHourViewComponent],
  templateUrl: './bmb-calendar-template-day.component.html',
  styleUrl: './bmb-calendar-template-day.component.scss'
})
export class BmbCalendarTemplateDayComponent {
  @Input() lang: string = 'es-MX';
  @Input() hourFormat: HourFormat = '12';
  @Input() now: DateTime = DateTime.now();

  rows = new Array(25).fill(0);

  getNameDay(): string {
    return this.now.toFormat('cccc', { locale: this.lang });
  }
}

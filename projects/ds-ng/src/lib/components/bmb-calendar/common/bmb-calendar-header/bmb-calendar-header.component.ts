import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { BmbButtonDirective } from '../../../../directives/button.directive';
import { BmbIconComponent } from '../../../bmb-icon/bmb-icon.component';
import { DateTime } from 'luxon';
import { IBmbCalendarView } from '../../types';
import { BmbButtonGroupDirective } from '../../../../directives/bmb-button-group/bmb-button-group.directive';
import { BmbLayoutDirective } from '../../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../../directives/bmb-layout/bmb-layout-item.directive';

@Component({
  selector: 'bmb-calendar-header',
  standalone: true,
  imports: [
    CommonModule,
    BmbButtonDirective,
    BmbIconComponent,
    BmbButtonGroupDirective,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './bmb-calendar-header.component.html',
  styleUrl: './bmb-calendar-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCalendarHeaderComponent {
  @Input() weekDays: DateTime[] = [];
  @Input() lang: string = 'es-MX';
  @Input() view: IBmbCalendarView = 'week';
  @Input() currentDate: DateTime = DateTime.now();

  @Output() onRangeChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onCurrentDateChange: EventEmitter<DateTime> =
    new EventEmitter<DateTime>();

  getTitle(): string {
    if (this.view === 'week') {
      return `${this.weekDays[0].toLocaleString({
        month: 'short',
        day: 'numeric',
      })} - ${this.weekDays[6].toLocaleString({
        month: 'short',
        day: 'numeric',
      })}, ${this.currentDate.toLocaleString({ year: 'numeric' })}`;
    }

    if (this.view === 'day') {
      return this.currentDate.toLocaleString({
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      });
    }

    return this.currentDate.toLocaleString({ month: 'long', year: 'numeric' });
  }

  handleRangeChange(event: IBmbCalendarView): void {
    if (event === 'month') {
      const newDate = DateTime.fromObject({
        month: this.currentDate.month,
        year: this.currentDate.year,
        day: 1,
      });

      this.onCurrentDateChange.emit(newDate);
    }
    this.onRangeChange.emit(event);
  }

  handleChangeDate(event: string): void {
    const modifyDate = ({ config, date }: any) => {
      if (event === '+') {
        this.onCurrentDateChange.emit(date.plus(config));
      } else {
        this.onCurrentDateChange.emit(date.minus(config));
      }
    };

    switch (this.view) {
      case 'day':
        modifyDate({ config: { days: 1 }, date: this.currentDate });
        break;

      case 'week':
        modifyDate({ config: { days: 7 }, date: this.currentDate });
        break;
      case 'month':
        const newDate = DateTime.fromObject({
          month: this.currentDate.month,
          year: this.currentDate.year,
          day: 1,
        });

        modifyDate({ config: { month: 1 }, date: newDate });
        break;

      default:
        break;
    }
  }
}

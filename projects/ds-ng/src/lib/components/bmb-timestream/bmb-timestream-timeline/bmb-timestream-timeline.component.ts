import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
  ElementRef,
  AfterViewInit,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { DateTime } from 'luxon';
import { CommonModule } from '@angular/common';
import { ISelectedDate } from '../types';

@Component({
  selector: 'bmb-timestream-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-timestream-timeline.component.html',
  styleUrl: './bmb-timestream-timeline.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamTimelineComponent implements AfterViewInit {
  @Input() dateFormat: string = 'dd/MM/yyyy';
  @Input() lang: string = 'es';
  @Input() now: DateTime = DateTime.now();
  @Input() events?: any;
  @Input() selectedDate: ISelectedDate = {
    day: '',
    month: '',
    date: this.now,
  };
  @Input() orderedMonths: string[] = [];

  @Output() changeSelectedDate: EventEmitter<ISelectedDate> =
    new EventEmitter<ISelectedDate>();

  @ViewChild('monthList') monthList!: ElementRef;

  ngAfterViewInit(): void {
    this.scrollToItem();
  }

  scrollToItem() {
    let currentMonthElement = this.monthList.nativeElement.querySelector(
      '.bmb_timestream-timeline-content-item-current',
    );
    if (currentMonthElement) {
      currentMonthElement.scrollIntoView();
      this.monthList.nativeElement.scrollTop =
        this.monthList.nativeElement.scrollTop - 45;
    } else {
      currentMonthElement = this.monthList.nativeElement.querySelector(
        '.bmb_timestream-timeline-item-current',
      );
      currentMonthElement?.scrollIntoView();
    }
  }

  getMonthTitle(month: string) {
    return `${this.events[month].name} ${this.events[month].year}`;
  }

  handleDateChange({ event, month }: { event: string; month: string }): void {
    this.changeSelectedDate.emit({
      month,
      day: event,
      date: this.events[month].events[event].date,
    });
  }

  parseEvent(month: string, date: string) {
    return this.events[month].events[date].date
      .setLocale(this.lang)
      .toFormat('dd LLL yyyy');
  }
}

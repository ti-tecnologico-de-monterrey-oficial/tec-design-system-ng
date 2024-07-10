import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  ElementRef,
  AfterViewInit,
  ViewChild,
  ViewChildren,
  QueryList,
  Output,
  EventEmitter,
} from '@angular/core';
import { DateTime } from 'luxon';
import { CommonModule } from '@angular/common';
import { ITimelineEvent } from '../types';

@Component({
  selector: 'bmb-bmb-timestream-timeline',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-timestream-timeline.component.html',
  styleUrl: './bmb-timestream-timeline.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamTimelineComponent implements OnInit, AfterViewInit {
  @ViewChild('monthList') monthList!: ElementRef;
  @ViewChildren('.bmb_timestream-timeline-item-current', {})
  elementos!: QueryList<ElementRef>;

  @Input() start: DateTime | null = null;
  @Input() end: DateTime | null = null;
  @Input() dateFormat: string = 'dd/MM/yyyy';
  @Input() lang: string = 'es';
  @Input() now: DateTime = DateTime.now();
  @Input() events?: any;
  @Input() selectedDate: DateTime = DateTime.now();
  @Input() orderedMonths: string[] = [];

  @Output() changeSelectedDate: EventEmitter<DateTime> =
    new EventEmitter<DateTime>();

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.scrollToItem();
  }

  getMonthTitle(month: string) {
    return `${this.events[month].name} ${this.events[month].year}`;
  }

  getCurrentMonth(date: string): boolean {
    const parsedDate = DateTime.fromFormat(date, 'yyyy/MM');
    return (
      parsedDate.month === this.selectedDate.month &&
      parsedDate.year === this.selectedDate.year
    );
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
      currentMonthElement.scrollIntoView();
    }
  }

  getOrderedEvents(monthEvents: any) {
    const daysList = Object.keys(monthEvents);
    const orderedDays = daysList.sort((dateA: string, dateB: string) => {
      const parsedDateA = monthEvents[dateA].date;
      const parsedDateB = monthEvents[dateB].date;
      return parsedDateA.toMillis() - parsedDateB.toMillis();
    });
    return orderedDays;
  }

  parseEvent(month: string, date: string) {
    return this.events[month].events[date].date
      .setLocale(this.lang)
      .toFormat('dd LLL yyyy');
  }

  getCircles(month: string, date: string) {
    return this.events[month].events[date].events;
  }

  getCurrentDate(date: string): boolean {
    const parsedDate = DateTime.fromFormat(date, 'yyyy/MM/dd');
    return (
      parsedDate.month === this.selectedDate.month &&
      parsedDate.year === this.selectedDate.year &&
      parsedDate.day === this.selectedDate.day
    );
  }

  handleDateChange({ event, month }: { event: string; month: string }): void {
    this.changeSelectedDate.emit(this.events[month].events[event].date);
  }
}

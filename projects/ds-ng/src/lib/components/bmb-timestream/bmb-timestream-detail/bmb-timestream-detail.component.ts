import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  effect,
  ElementRef,
  EventEmitter,
  input,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import { ISelectedDate, ITimelineEvent, ITimelineEventParsed } from '../types';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../bmb-card/bmb-card.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbHitoCardComponent } from '../../bmb-hito-card/bmb-hito-card.component';

@Component({
  selector: 'bmb-timestream-detail',
  standalone: true,
  imports: [
    CommonModule,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbIconComponent,
    BmbBadgeComponent,
    BmbHitoCardComponent,
  ],
  templateUrl: './bmb-timestream-detail.component.html',
  styleUrl: './bmb-timestream-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamDetailsComponent implements AfterViewInit, OnChanges {
  lang = input<string>('es');
  @Input() now: DateTime = DateTime.now();
  @Input() selectedDate: ISelectedDate = {
    day: '',
    month: '',
    date: this.now,
  };
  orderedEvents = input<ITimelineEventParsed[]>([]);

  @Output() changeSelectedEvent: EventEmitter<ITimelineEvent> =
    new EventEmitter<ITimelineEvent>();

  @ViewChild('monthDetailList') monthList!: ElementRef;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToItem();
    }, 1);
  }

  ngOnChanges(changes: SimpleChanges) {
    const selectedDateChange = changes['selectedDate'];
    console.log('changes', changes);

    if (
      selectedDateChange.previousValue &&
      selectedDateChange.previousValue.day !==
        selectedDateChange.currentValue?.day
    ) {
      setTimeout(() => {
        this.scrollToItem();
      }, 1);
    }
  }

  getCurrentMonth(date: string): boolean {
    const parsedDate = DateTime.fromFormat(date, 'yyyy/MM');
    return (
      parsedDate.month === this.selectedDate.date.month &&
      parsedDate.year === this.selectedDate.date.year
    );
  }

  getMonthTitle(date: DateTime) {
    return date.setLocale(this.lang()).toFormat('cccc dd LLLL yyyy');
  }

  scrollToItem() {
    let currentMonthElement = this.monthList.nativeElement.querySelector(
      '.bmb_timestream-detail-item-current',
    );

    if (currentMonthElement) {
      currentMonthElement.scrollIntoView();
      this.monthList.nativeElement.scrollTop =
        this.monthList.nativeElement.scrollTop;
    }
  }

  getDurationString(event: ITimelineEvent): string {
    return `Duración: ${event.originalStart?.day} - ${event.endEvent?.setLocale(this.lang()).toFormat('dd LLLL yyyy')} (${(event.diff || 0) + 1} Días)`;
  }

  handleEventChange(event: ITimelineEvent) {
    this.changeSelectedEvent.emit(event);
  }
}

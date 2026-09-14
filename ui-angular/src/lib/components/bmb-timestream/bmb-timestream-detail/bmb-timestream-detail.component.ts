import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  effect,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import type {
  ISelectedDate,
  ITimelineEvent,
  ITimelineEventParsed,
} from '../../../_shared/types/components/timestream';
import { BmbHitoCardComponent } from '../../bmb-hito-card/bmb-hito-card.component';
import {
  getTimestreamDurationString,
  getTimestreamMonthTitle,
  isTimestreamCurrentMonth,
  isTimestreamTodayEvent,
} from '../../../_shared/logic/components/timestream-detail';

@Component({
  selector: 'bmb-timestream-detail',
  standalone: true,
  imports: [CommonModule, BmbHitoCardComponent],
  templateUrl: './bmb-timestream-detail.component.html',
  styleUrl: './bmb-timestream-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamDetailsComponent implements AfterViewInit {
  lang = input<string>('es');
  now = input<DateTime>(DateTime.now());
  selectedDate = input<ISelectedDate>({
    day: '',
    month: '',
    date: this.now(),
  });
  orderedEvents = input<ITimelineEventParsed[]>([]);
  isMicro = input<boolean>(false);

  changeSelectedEvent = output<ITimelineEvent>();

  @ViewChild('monthDetailList') monthList!: ElementRef;

  constructor() {
    effect(() => {
      const selectedDate = this.selectedDate();

      if (selectedDate?.day) {
        setTimeout(() => {
          this.scrollToItem();
        }, 1);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.scrollToItem();
    }, 1);
  }

  getCurrentMonth(date: string): boolean {
    return isTimestreamCurrentMonth(date, this.selectedDate().date);
  }

  getMonthTitle(date: DateTime): string {
    return getTimestreamMonthTitle(date, this.lang());
  }

  scrollToItem() {
    const currentMonthElement = this.monthList.nativeElement.querySelector(
      '.bmb_timestream-detail-item-current',
    );

    if (currentMonthElement) {
      currentMonthElement.scrollIntoView();
    }
  }

  getDurationString(event: ITimelineEvent): string {
    return getTimestreamDurationString(event, this.lang());
  }

  isTodayEvent(event: ITimelineEventParsed): boolean {
    return isTimestreamTodayEvent(event, this.now());
  }

  handleEventChange(event: ITimelineEvent) {
    this.changeSelectedEvent.emit(event);
  }
}

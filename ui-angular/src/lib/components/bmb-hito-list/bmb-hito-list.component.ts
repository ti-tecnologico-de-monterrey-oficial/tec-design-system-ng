import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  ElementRef,
  AfterViewInit,
  ViewChild,
  input,
  output,
} from '@angular/core';
import { DateTime } from 'luxon';
import { CommonModule } from '@angular/common';
import type {
  IBmbHitoListEvents,
  ISelectedDate,
} from '../../_shared/types/components/hito-list';
import {
  formatHitoEventDate,
  getHitoEventTypeClass,
  getHitoMonthTitle,
  getHitoSelectedDate,
} from '../../_shared/logic/components/hito-list';

@Component({
  selector: 'bmb-hito-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-hito-list.component.html',
  styleUrl: './bmb-hito-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHitoListComponent implements AfterViewInit {
  dateFormat = input<string>('dd/MM/yyyy');
  lang = input<string>('es');
  now = input<DateTime>(DateTime.now());
  events = input<IBmbHitoListEvents>({});
  selectedDate = input<ISelectedDate>({
    day: '',
    month: '',
    date: this.now(),
  });
  orderedMonths = input<string[]>([]);
  changeSelectedDate = output<ISelectedDate>();

  @ViewChild('monthList') monthList!: ElementRef;

  ngAfterViewInit(): void {
    this.scrollToItem();
  }

  scrollToItem(): void {
    let currentMonthElement = this.monthList.nativeElement.querySelector(
      '.bmb_hito_list-content-item-current',
    );
    if (currentMonthElement) {
      currentMonthElement.scrollIntoView?.();
      this.monthList.nativeElement.scrollTop =
        this.monthList.nativeElement.scrollTop - 45;
    } else {
      currentMonthElement = this.monthList.nativeElement.querySelector(
        '.bmb_hito_list-item-current',
      );
      currentMonthElement?.scrollIntoView?.();
    }
  }

  getMonthTitle(month: string): string {
    return getHitoMonthTitle(this.events(), month);
  }

  handleDateChange({ event, month }: { event: string; month: string }): void {
    this.changeSelectedDate.emit(
      getHitoSelectedDate(this.events(), month, event),
    );
  }

  parseEvent(month: string, date: string): string {
    return formatHitoEventDate(
      this.events(),
      month,
      date,
      this.lang(),
      this.dateFormat(),
    );
  }

  getEventTypeClass(type: unknown): string {
    return getHitoEventTypeClass(type);
  }
}

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import { ISelectedDate, ITimelineEvent } from '../types';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../../bmb-card/bmb-card.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';

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
  ],
  templateUrl: './bmb-timestream-detail.component.html',
  styleUrl: './bmb-timestream-detail.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamDetailsComponent implements AfterViewInit, OnChanges {
  @ViewChild('monthDetailList') monthList!: ElementRef;

  @Input() start: DateTime | null = null;
  @Input() end: DateTime | null = null;
  @Input() dateFormat: string = 'dd/MM/yyyy';
  @Input() lang: string = 'en';
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

  ngAfterViewInit(): void {
    this.scrollToItem();
  }

  ngOnChanges(changes: SimpleChanges) {
    const selectedDateChange = changes['selectedDate'];
    console.log('selectedDateChange', selectedDateChange);

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

  getMonthTitle(event: string, month: string) {
    const date = this.events[month].events[event].date;
    return date.setLocale(this.lang).toFormat('cccc dd LLLL yyyy');
  }

  scrollToItem() {
    let currentMonthElement = this.monthList.nativeElement.querySelector(
      '.bmb_timestream-detail-item-current',
    );
    console.log('currentMonthElement', currentMonthElement);

    if (currentMonthElement) {
      currentMonthElement.scrollIntoView()
      this.monthList.nativeElement.scrollTop =
        this.monthList.nativeElement.scrollTop;
    }
  }

  handleEventClick(event: any) {
    console.log(event);
  }

  formatBadgeText(legend: string): string {
    return legend.replace(/_/g, ' ');
  }

  appearanceBadgeText(type: string): string {
    switch (type) {
      case 'enriquecedor': return 'mitec-red';
      case 'seriado': return 'mitec-orange';
      case 'inscripciones': return 'green-light';
      case 'avance_academico': return 'mitec-blue';
      case 'otra': return 'purple-light';
      case 'flexible': return 'mitec-green';
      default: return 'mitec-blue';
    }
  }

  getDurationString(event: ITimelineEvent): string {
    return `Duración: ${ event.originalStart?.day } - ${ event.endEvent?.setLocale(this.lang).toFormat('dd LLLL yyyy') } (${ event.diff } Días)`;
  }
}

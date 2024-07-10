import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime, Info } from 'luxon';
import { BmbTimestreamErrorComponent } from './bmb-timestream-error/bmb-timestream-error.component';
import { BmbTimestreamTimelineComponent } from './bmb-timestream-timeline/bmb-timestream-timeline.component';
import { ITimelineEvent } from './types';

interface IPlaceholderObject {
  [key: string]: any | any[];
}

@Component({
  selector: 'bmb-timestream',
  standalone: true,
  imports: [BmbTimestreamErrorComponent, BmbTimestreamTimelineComponent],
  templateUrl: './bmb-timestream.component.html',
  styleUrl: './bmb-timestream.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamComponent implements OnInit {
  @Input() startDate: string = '';
  @Input() endDate: string = '';
  @Input() dateFormat: string = 'dd/MM/yyyy';
  @Input() lang: string = 'es';
  @Input() events: ITimelineEvent[] | null = null;

  error = false;
  now = DateTime.now();
  start: DateTime | null = null;
  end: DateTime | null = null;
  difference = 0;
  validMonths: any = [];
  parsedEvents: any | null = null;
  monthsNames = Info.months('long', { locale: this.lang });
  isDialogOpen = false;
  selectedDate: DateTime = this.now;
  orderedMonths: string[] = [];

  ngOnInit(): void {
    this.dateValidation();

    this.start = DateTime.fromFormat(this.startDate, this.dateFormat);
    this.end = DateTime.fromFormat(this.endDate, this.dateFormat);
    this.difference = Math.ceil(this.end.diff(this.start, 'months').months);
    this.parsedEvents = this.prepareEvents(this.events);
    this.orderedMonths = this.orderDates(this.parsedEvents, 'yyyy/MM');
    this.selectedDate = this.selectAValidDate();
  }

  dateValidation() {
    const isValidStart = DateTime.fromFormat(
      this.startDate,
      this.dateFormat,
    ).isValid;
    const isValidEnd = DateTime.fromFormat(
      this.endDate,
      this.dateFormat,
    ).isValid;

    this.error = !isValidEnd || !isValidStart;
  }

  prepareEvents(events: ITimelineEvent[] | null) {
    if (events) {
      const objectEvent: IPlaceholderObject = {};

      events.forEach((event) => {
        const startDate = DateTime.fromFormat(event.start, this.dateFormat);
        const endDate = DateTime.fromFormat(event.end, this.dateFormat);
        const diff = endDate.diff(startDate, 'days').days + 1;

        for (let index = 0; index < diff; index++) {
          const currentDate = startDate.plus({ days: index });
          const stringDate = currentDate.toFormat('yyyy/MM/dd');
          const month = currentDate.toFormat('yyyy/MM');

          objectEvent[month] ??= {
            events: {},
            name: this.monthsNames[currentDate.month - 1],
            stringDate: month,
            year: currentDate.year,
            date: currentDate,
          };

          objectEvent[month].events[stringDate] ??= {
            events: [],
            date: currentDate,
            stringDate,
          };

          objectEvent[month].events[stringDate].events.push({
            ...event,
            start: stringDate,
            startEvent: currentDate,
            endEvent: endDate,
          });
        }
      });

      return objectEvent;
    }

    return {};
  }

  orderDates(events: any, format: string): string[] {
    const monthsList = Object.keys(events);
    const monthsOrdered = monthsList.sort((dateA: string, dateB: string) => {
      const parsedDateA = DateTime.fromFormat(dateA, format);
      const parsedDateB = DateTime.fromFormat(dateB, format);
      return parsedDateA.toMillis() - parsedDateB.toMillis();
    });

    return monthsOrdered;
  }

  selectAValidDate(): DateTime {
    const month =
      this.orderedMonths.find((date) => {
        const parsedDate = this.parsedEvents[date].date;
        return (
          this.now.year <= parsedDate.year && this.now.month <= parsedDate.month
        );
      }) ||
      this.orderedMonths.at(-1) ||
      0;
    const orderedEvents = this.orderDates(
      this.parsedEvents[month].events,
      'yyyy/MM/dd',
    );

    const day =
      orderedEvents.find((date) => {
        const parsedDate = this.parsedEvents[month].events[date].date;
        return (
          this.now.year <= parsedDate.year &&
          this.now.month <= parsedDate.month &&
          this.now.day <= parsedDate.day
        );
      }) ||
      orderedEvents.at(-1) ||
      '';

    return DateTime.fromFormat(day, 'yyyy/MM/dd');
  }

  handleSelectedDateChange(date: DateTime) {
    this.selectedDate = date;
  }
}

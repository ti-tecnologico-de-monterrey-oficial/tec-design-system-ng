import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime, Info } from 'luxon';
import { BmbTimestreamErrorComponent } from './bmb-timestream-error/bmb-timestream-error.component';
import { BmbTimestreamTimelineComponent } from './bmb-timestream-timeline/bmb-timestream-timeline.component';
import { BmbTimestreamDetailsComponent } from './bmb-timestream-detail/bmb-timestream-detail.component';
import { ITimelineEvent, ISelectedDate, ITimelineEventParsed } from './types';
import { BmbTimestreamDialogComponent } from './bmb-timestream-dialog/bmb-timestream-dialog.component';
import { CommonModule } from '@angular/common';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { IBmbDataTopBar } from '../bmb-breadcrumb/bmb-breadcrumb.component';
import { IBmbColor } from '../../types/colors';
import { BmbFilterCardComponent } from '../bmb-filter-card/bmb-filter-card.component';
import { IBmbControlType } from '../bmb-filter-card/bmb-filter-card.interface';
import { IBmbActionHeader } from '../bmb-header-section/bmb-header-section.component';

interface IPlaceholderObject {
  [key: string]: any | any[];
}

export interface IBmbClamp {
  min: number | string;
  max: number | string;
  size: number | string;
}

@Component({
  selector: 'bmb-timestream',
  standalone: true,
  imports: [
    BmbTimestreamErrorComponent,
    BmbTimestreamTimelineComponent,
    BmbTimestreamDetailsComponent,
    // BmbTimestreamDialogComponent,
    CommonModule,
    BmbHomeCardComponent,
    BmbFilterCardComponent,
  ],
  templateUrl: './bmb-timestream.component.html',
  styleUrl: './bmb-timestream.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamComponent {
  // startDate = input.required<string>();
  // endDate = input.required<string>();

  lang = input<string>('es');
  dateFormat = input<string>('dd/MM/yyyy');
  title = input.required<string>();
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  icon = input<string>('trending_up');
  bgIconAppearance = input<IBmbColor>('mitec-red');
  controlTypes = input<IBmbControlType[]>([]);
  events = input<ITimelineEvent[]>([]);
  clamp = input<IBmbClamp>({ min: 0, max: '100dvh', size: '100%' });

  // internal state
  error = false;
  actionHeaders: IBmbActionHeader[] = [
    {
      icon: 'tune',
      isToggleActive: false,
      action: () => {
        console.log('header click');
      },
    },
    {
      icon: 'tune',
      isToggleActive: false,
      action: () => {
        console.log('header click');
      },
    },
  ];
  now = DateTime.now();
  start: DateTime | null = null;
  parsedEvents?: any;
  isMobile: boolean = false;
  monthsNames = Info.months('long', { locale: this.lang() });
  orderedEvents: ITimelineEventParsed[] = [];
  selectedDate: ISelectedDate = {
    day: '',
    month: '',
    date: this.now,
  };
  orderedMonths: string[] = [];
  isDialogOpen: null | ITimelineEvent = null;

  // end: DateTime | null = null;
  // difference = 0;
  // validMonths: any = [];
  //
  // isModalOpen: boolean = false;
  // leftIcon: string = 'tune';
  // headerActions: IBmbHeaderAction[] = [
  //   {
  //     icon: 'tune',
  //     action: () => {
  //       this.isModalOpen = !this.isModalOpen;
  //     },
  //   },
  // ];

  ngOnInit(): void {
    this.parsedEvents = this.prepareEvents(this.events());
    this.orderedMonths = this.orderDates(this.parsedEvents, 'yyyy/MM');
    this.selectedDate = this.selectAValidDate();

    //   this.dateValidation();
    //   this.start = DateTime.fromFormat(this.startDate(), this.dateFormat);
    //   this.end = DateTime.fromFormat(this.endDate(), this.dateFormat);
    //   this.difference = Math.ceil(this.end.diff(this.start, 'months').months);
  }

  // dateValidation() {
  //   const isValidStart = DateTime.fromFormat(
  //     this.startDate(),
  //     this.dateFormat,
  //   ).isValid;
  //   const isValidEnd = DateTime.fromFormat(
  //     this.endDate(),
  //     this.dateFormat,
  //   ).isValid;

  //   this.error = !isValidEnd || !isValidStart;
  // }

  getHeight(): string {
    const height =
      typeof this.clamp().size === 'string'
        ? this.clamp().size
        : `${this.clamp().size}px`;
    const min =
      typeof this.clamp().min === 'string'
        ? this.clamp().min
        : `${this.clamp().min}px`;
    const max =
      typeof this.clamp().max === 'string'
        ? this.clamp().max
        : `${this.clamp().max}px`;

    return `clamp(${min}, ${height}, ${max})`;
  }

  prepareEvents(events?: ITimelineEvent[]) {
    if (!events) return {};

    const objectEvent: IPlaceholderObject = {};
    events.forEach((event) => {
      const startDate = DateTime.fromFormat(event.start, this.dateFormat());
      const endDate = DateTime.fromFormat(event.end, this.dateFormat());
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
          selected: false,
        };

        objectEvent[month].events[stringDate].events.push({
          ...event,
          start: stringDate,
          startEvent: currentDate,
          endEvent: endDate,
          selected: false,
          diff: diff - 1,
          originalStart: startDate,
        });
      }
    });

    const orderedEvents = this.orderDates(objectEvent, 'yyyy/MM');

    if (orderedEvents.length) {
      objectEvent['orderedEvents'] = orderedEvents;

      objectEvent['orderedEvents'].forEach((date: string) => {
        objectEvent[date]['orderedEvents'] = this.orderDates(
          objectEvent[date].events,
          'yyyy/MM/dd',
        );
      });

      this.orderedEvents = objectEvent['orderedEvents']
        .map((month: string) => {
          return objectEvent[month]['orderedEvents'].map(
            (day: string) => objectEvent[month].events[day],
          );
        })
        .flat();
    }
    return objectEvent;
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

  selectAValidDate(): { month: string; day: string; date: DateTime } {
    if (!this.orderedMonths)
      return {
        month: this.now.month + '',
        day: this.now.day + '',
        date: this.now,
      };

    const month =
      this.orderedMonths.find((date) => {
        const parsedDate = this.parsedEvents[date].date;
        return (
          this.now.year <= parsedDate.year && this.now.month <= parsedDate.month
        );
      }) ||
      this.orderedMonths.at(-1) ||
      '';
    const orderedEvents = this.parsedEvents?.[month]?.orderedEvents;

    const day =
      orderedEvents?.find((date: string) => {
        const parsedDate = this.parsedEvents[month].events[date].date;
        return (
          this.now.year <= parsedDate.year &&
          this.now.month <= parsedDate.month &&
          this.now.day <= parsedDate.day
        );
      }) ||
      orderedEvents?.at(-1) ||
      '';

    if (this.parsedEvents[month]) {
      this.parsedEvents[month].selected = true;
      this.parsedEvents[month].events[day].selected = true;
    }
    return {
      month,
      day,
      date: this.parsedEvents?.[month]?.events?.[day]?.date,
    };
  }

  handleSelectedDateChange({ month, day }: { month: string; day: string }) {
    this.parsedEvents[this.selectedDate.month].selected = false;
    this.parsedEvents[this.selectedDate.month].events[
      this.selectedDate.day
    ].selected = false;

    this.parsedEvents[month].selected = true;
    this.parsedEvents[month].events[day].selected = true;

    this.selectedDate = {
      month,
      day,
      date: this.parsedEvents[month].events[day].date,
    };
  }

  handleSelectedEventChange(event: ITimelineEvent) {
    this.isDialogOpen = event;
  }

  // closeDetail() {
  //   this.isDialogOpen = null;
  // }
}

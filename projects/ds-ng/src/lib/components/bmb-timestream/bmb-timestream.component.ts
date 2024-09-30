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
import { IBmbHeaderAction } from '../bmb-header-section/bmb-header-section.component';
import { BmbFilterCardComponent } from '../bmb-filter-card/bmb-filter-card.component';
import { IBmbControlType } from '../bmb-filter-card/bmb-filter-card.interface';

interface IPlaceholderObject {
  [key: string]: any | any[];
}

@Component({
  selector: 'bmb-timestream',
  standalone: true,
  imports: [
    BmbTimestreamErrorComponent,
    BmbTimestreamTimelineComponent,
    BmbTimestreamDetailsComponent,
    BmbTimestreamDialogComponent,
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
  // @Input() dateFormat: string = 'dd/MM/yyyy';
  // @Input() lang: string = 'es';
  // @Input() events?: ITimelineEvent[];

  // startDate = input.required<string>();
  // endDate = input.required<string>();
  title = input.required<string>();
  subtitle = input<string>();
  dataLocalNav = input<IBmbDataTopBar[]>([]);
  icon = input<string>('trending_up');
  bgIconAppearance = input<IBmbColor>('mitec-red');
  controlTypes = input<IBmbControlType[]>([]);

  error = false;
  // now = DateTime.now();
  // start: DateTime | null = null;
  // end: DateTime | null = null;
  // difference = 0;
  // validMonths: any = [];
  // parsedEvents?: any;
  // monthsNames = Info.months('long', { locale: this.lang });
  // isDialogOpen: null | ITimelineEvent = null;
  // selectedDate: ISelectedDate = {
  //   day: '',
  //   month: '',
  //   date: this.now,
  // };
  // orderedMonths: string[] = [];
  // orderedEvents: ITimelineEventParsed[] = [];

  isMobile: boolean = false;
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

  // ngOnInit(): void {
  //   this.dateValidation();

  //   this.start = DateTime.fromFormat(this.startDate(), this.dateFormat);
  //   this.end = DateTime.fromFormat(this.endDate(), this.dateFormat);
  //   this.difference = Math.ceil(this.end.diff(this.start, 'months').months);
  //   this.parsedEvents = this.prepareEvents(this.events);
  //   this.orderedMonths = this.orderDates(this.parsedEvents, 'yyyy/MM');
  //   this.selectedDate = this.selectAValidDate();
  // }

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

  // prepareEvents(events?: ITimelineEvent[]) {
  //   if (!events) return {};

  //   const objectEvent: IPlaceholderObject = {};
  //   events.forEach((event) => {
  //     const startDate = DateTime.fromFormat(event.start, this.dateFormat);
  //     const endDate = DateTime.fromFormat(event.end, this.dateFormat);
  //     const diff = endDate.diff(startDate, 'days').days + 1;

  //     for (let index = 0; index < diff; index++) {
  //       const currentDate = startDate.plus({ days: index });
  //       const stringDate = currentDate.toFormat('yyyy/MM/dd');
  //       const month = currentDate.toFormat('yyyy/MM');

  //       objectEvent[month] ??= {
  //         events: {},
  //         name: this.monthsNames[currentDate.month - 1],
  //         stringDate: month,
  //         year: currentDate.year,
  //         date: currentDate,
  //       };

  //       objectEvent[month].events[stringDate] ??= {
  //         events: [],
  //         date: currentDate,
  //         stringDate,
  //         selected: false,
  //       };

  //       objectEvent[month].events[stringDate].events.push({
  //         ...event,
  //         start: stringDate,
  //         startEvent: currentDate,
  //         endEvent: endDate,
  //         selected: false,
  //         diff: diff - 1,
  //         originalStart: startDate,
  //       });
  //     }
  //   });

  //   const orededEvents = this.orderDates(objectEvent, 'yyyy/MM');
  //   objectEvent['orderedEvents'] = orededEvents;

  //   objectEvent['orderedEvents'].forEach((date: string) => {
  //     objectEvent[date]['orderedEvents'] = this.orderDates(
  //       objectEvent[date].events,
  //       'yyyy/MM/dd',
  //     );
  //   });

  //   this.orderedEvents = objectEvent['orderedEvents']
  //     .map((month: string) => {
  //       return objectEvent[month]['orderedEvents'].map(
  //         (day: string) => objectEvent[month].events[day],
  //       );
  //     })
  //     .flat();

  //   return objectEvent;
  // }

  // orderDates(events: any, format: string): string[] {
  //   const monthsList = Object.keys(events);
  //   const monthsOrdered = monthsList.sort((dateA: string, dateB: string) => {
  //     const parsedDateA = DateTime.fromFormat(dateA, format);
  //     const parsedDateB = DateTime.fromFormat(dateB, format);
  //     return parsedDateA.toMillis() - parsedDateB.toMillis();
  //   });

  //   return monthsOrdered;
  // }

  // selectAValidDate(): { month: string; day: string; date: DateTime } {
  //   const month =
  //     this.orderedMonths.find((date) => {
  //       const parsedDate = this.parsedEvents[date].date;
  //       return (
  //         this.now.year <= parsedDate.year && this.now.month <= parsedDate.month
  //       );
  //     }) ||
  //     this.orderedMonths.at(-1) ||
  //     '';
  //   const orderedEvents = this.parsedEvents?.[month]?.orderedEvents;

  //   const day =
  //     orderedEvents?.find((date: string) => {
  //       const parsedDate = this.parsedEvents[month].events[date].date;
  //       return (
  //         this.now.year <= parsedDate.year &&
  //         this.now.month <= parsedDate.month &&
  //         this.now.day <= parsedDate.day
  //       );
  //     }) ||
  //     orderedEvents?.at(-1) ||
  //     '';

  //   if (this.parsedEvents[month]) {
  //     this.parsedEvents[month].selected = true;
  //     this.parsedEvents[month].events[day].selected = true;
  //   }
  //   return {
  //     month,
  //     day,
  //     date: this.parsedEvents?.[month]?.events?.[day]?.date,
  //   };
  // }

  // handleSelectedDateChange({ month, day }: { month: string; day: string }) {
  //   this.parsedEvents[this.selectedDate.month].selected = false;
  //   this.parsedEvents[this.selectedDate.month].events[
  //     this.selectedDate.day
  //   ].selected = false;

  //   this.parsedEvents[month].selected = true;
  //   this.parsedEvents[month].events[day].selected = true;

  //   this.selectedDate = {
  //     month,
  //     day,
  //     date: this.parsedEvents[month].events[day].date,
  //   };
  // }

  // handleSelectedEventChange(event: ITimelineEvent) {
  //   this.isDialogOpen = event;
  // }

  // closeDetail() {
  //   this.isDialogOpen = null;
  // }
}

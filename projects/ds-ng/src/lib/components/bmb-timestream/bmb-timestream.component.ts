import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime, Info } from 'luxon';
import { BmbTimestreamErrorComponent } from './bmb-timestream-error/bmb-timestream-error.component';
import { BmbTimestreamTimelineComponent } from './bmb-timestream-timeline/bmb-timestream-timeline.component';
import { BmbTimestreamDetailsComponent } from './bmb-timestream-detail/bmb-timestream-detail.component';
import { ITimelineEvent, ISelectedDate, ITimelineEventParsed } from './types';
import { CommonModule } from '@angular/common';
import { ModalDataConfig } from '../bmb-modal/bmb-modal.interface';
import { BmbModalComponent } from '../bmb-modal/bmb-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { BmbTabsComponent } from '../bmb-tabs/bmb-tabs.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbHitoCardComponent } from '../bmb-hito-card/bmb-hito-card.component';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';

interface IPlaceholderObject {
  [key: string]: any | any[];
}

interface Tab {
  id: number;
  title: string;
  isActive?: boolean;
  badge?: number;
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
    CommonModule,
    BmbUserImageComponent,
    BmbTabsComponent,
    BmbButtonDirective,
    BmbDividerComponent,
    BmbHitoCardComponent,
    BmbBadgeComponent,
  ],
  templateUrl: './bmb-timestream.component.html',
  styleUrl: './bmb-timestream.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamComponent {
  isMicro = input<boolean>(false);
  lang = input<string>('es');
  dateFormat = input<string>('dd/MM/yyyy');
  events = input<ITimelineEvent[]>([]);
  clamp = input<IBmbClamp>({ min: 100, max: '100dvh', size: '100%' });

  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate?: TemplateRef<any>;

  // internal state
  error = false;
  now = DateTime.now();
  start: DateTime | null = null;
  parsedEvents?: any;
  monthsNames = Info.months('long', { locale: this.lang() });
  orderedEvents = signal<ITimelineEventParsed[]>([]);
  selectedDate: ISelectedDate = {
    day: '',
    month: '',
    date: this.now,
  };
  orderedMonths: string[] = [];
  newModal!: TemplateRef<any>;
  selectedEvent: ITimelineEvent | null = null;
  eventTabs: Tab[] = [
    { id: 1, title: 'Descripción', isActive: true },
    { id: 2, title: 'Instancias' },
  ];
  tabSelected = 1;

  constructor(private matDialog: MatDialog) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);

    this.parsedEvents = this.prepareEvents(changes['events'].currentValue);
    this.orderedMonths = this.orderDates(this.parsedEvents, 'yyyy/MM');
    this.selectedDate = this.selectAValidDate();
  }

  ngOnInit(): void {
    console.log('events', this.events());

    this.parsedEvents = this.prepareEvents(this.events());
    this.orderedMonths = this.orderDates(this.parsedEvents, 'yyyy/MM');
    this.selectedDate = this.selectAValidDate();
    console.log('isMicro', this.isMicro());
  }

  ngAfterViewInit(): void {
    if (this.modalTemplate) {
      this.newModal = this.modalTemplate;
    }
  }

  handleTabSelected(tab: Tab) {
    this.tabSelected = tab.id;
  }

  getHeight(): string {
    const height =
      typeof this.clamp().size === 'string'
        ? this.clamp().size
        : `${this.clamp().size}px`;
    const min =
      typeof this.clamp().min === 'string'
        ? this.clamp().min
        : `${this.clamp().min}px`;
    const max = this.isMicro()
      ? '283px'
      : typeof this.clamp().max === 'string'
        ? this.clamp().max
        : `${this.clamp().max}px`;

    return `clamp(${min}, ${height}, ${max})`;
  }

  prepareEvents(events?: ITimelineEvent[]) {
    if (!events?.length) {
      this.orderedEvents.set([]);
      return {};
    }

    console.log('events found', events);

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

    console.log('objectEvent', objectEvent);

    const orderedEvents = this.orderDates(objectEvent, 'yyyy/MM');

    if (orderedEvents.length) {
      objectEvent['orderedEvents'] = orderedEvents;

      objectEvent['orderedEvents'].forEach((date: string) => {
        objectEvent[date]['orderedEvents'] = this.orderDates(
          objectEvent[date].events,
          'yyyy/MM/dd',
        );
      });

      console.log('objectEvent', objectEvent);

      this.orderedEvents.set(
        objectEvent['orderedEvents']
          .map((month: string) => {
            return objectEvent[month]['orderedEvents'].map(
              (day: string) => objectEvent[month].events[day],
            );
          })
          .flat(),
      );
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
        if (date === 'orderedEvents') return false;
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

    if (this.parsedEvents[month] && month !== 'orderedEvents') {
      debugger;
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
    this.selectedEvent = event;

    const data: ModalDataConfig = {
      title: event.title,
      content: this.newModal,
      size: 'large',
      hidePrimaryButton: true,
    };

    this.matDialog.open(BmbModalComponent, { data });
  }

  getMonthTitle(date: DateTime) {
    return date.setLocale(this.lang()).toFormat('cccc dd LLLL yyyy');
  }

  getInstances(event: any): string[] {
    const instances = [];
    for (let index = 0; index < (event.diff || 0) + 1; index++) {
      const date = event.originalStart.plus({ days: index });
      instances.push(this.getMonthTitle(date));
    }
    return instances;
  }

  getDurationString(event: ITimelineEvent): string {
    return `Duración: ${event.originalStart?.day} - ${event.endEvent?.setLocale(this.lang()).toFormat('dd LLLL yyyy')} (${(event.diff || 0) + 1} Días)`;
  }

  getDiffString(diff: number = 0): string {
    return diff + 1 > 1 ? `${diff + 1} Días` : `${diff + 1} Día`;
  }

  appearanceBadge(eventType: string): IBbmBgAppearance {
    switch (eventType) {
      case 'active':
        return 'mitec_blue';
      case 'done':
        return 'success';
      case 'pending':
        return 'normal';
      case 'under_review':
        return 'warning';
      default:
        return 'mitec_blue';
    }
  }
}

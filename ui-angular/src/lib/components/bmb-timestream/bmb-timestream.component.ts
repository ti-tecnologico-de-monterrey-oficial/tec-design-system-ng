import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  signal,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime, Info } from 'luxon';
import {
  getTimestreamDuration,
  getTimestreamInstances,
  getTimestreamMonthTitle,
  orderTimestreamDates,
  prepareTimestreamEvents,
  selectTimestreamDate,
  timestreamAppearanceBadge,
  timestreamGetBadgeText,
  timestreamGetDiffString,
} from '../../_shared/logic/components/timestream';
import type { IBmbNativeModal } from '../../_shared/types';
import type { IBbmBgAppearance } from '../../_shared/types/components/advertisement-card';
import type { IBmbClamp, Tab } from '../../_shared/types/components/timestream';
import type {
  IBmbTimelineCustomEvent,
  ISelectedDate,
  ITimelineEvent,
  ITimelineEventParsed,
} from '../../_shared/types/components/timestream';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { TranslatePipe } from '../../pipes/translations';
import { BmbNativeModalService } from '../../services/old/modal/native-modal.service';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { BmbBadgeComponent } from '../bmb-badge/bmb-badge.component';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BmbHitoCardComponent } from '../bmb-hito-card/bmb-hito-card.component';
import { BmbHitoListComponent } from '../bmb-hito-list/bmb-hito-list.component';
import { BmbTabsComponent } from '../bmb-tabs/bmb-tabs.component';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { BmbTimestreamDetailsComponent } from './bmb-timestream-detail/bmb-timestream-detail.component';
import { BmbTimestreamErrorComponent } from './bmb-timestream-error/bmb-timestream-error.component';
export type { IBmbClamp } from '../../_shared/types/components/timestream';

@Component({
  selector: 'bmb-timestream',
  standalone: true,
  imports: [
    BmbTimestreamErrorComponent,
    BmbHitoListComponent,
    BmbTimestreamDetailsComponent,
    CommonModule,
    BmbUserImageComponent,
    BmbTabsComponent,
    BmbButtonDirective,
    BmbDividerComponent,
    BmbHitoCardComponent,
    BmbBadgeComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-timestream.component.html',
  styleUrl: './bmb-timestream.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamComponent {
  private readonly translationsService = inject(BmbTranslationsService);

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
    {
      id: 1,
      title: this.translationsService.translate('timestream.tabs.description'),
      isActive: true,
    },
    {
      id: 2,
      title: this.translationsService.translate('timestream.tabs.instances'),
    },
  ];
  tabSelected = 1;

  private modalService: BmbNativeModalService = inject(BmbNativeModalService);

  ngOnChanges(changes: SimpleChanges) {
    this.parsedEvents = this.prepareEvents(changes['events'].currentValue);
    this.orderedMonths = this.orderDates(this.parsedEvents, 'yyyy/MM');
    this.selectedDate = this.selectAValidDate();
  }

  ngOnInit(): void {
    this.parsedEvents = this.prepareEvents(this.events());
    this.orderedMonths = this.orderDates(this.parsedEvents, 'yyyy/MM');
    this.selectedDate = this.selectAValidDate();
  }

  ngAfterViewInit(): void {
    if (this.modalTemplate) {
      this.newModal = this.modalTemplate;
    }
  }

  handleTabSelected(tab: Tab) {
    this.tabSelected = tab.id;
  }

  prepareEvents(events?: ITimelineEvent[]) {
    const objectEvent = prepareTimestreamEvents(
      events,
      this.dateFormat(),
      this.monthsNames,
    );
    if (!events?.length) this.orderedEvents.set([]);
    else if (objectEvent['orderedEvents']?.length) {
      this.orderedEvents.set(
        objectEvent['orderedEvents'].flatMap((month: string) =>
          objectEvent[month]['orderedEvents'].map(
            (day: string) => objectEvent[month].events[day],
          ),
        ),
      );
    }
    return objectEvent;
  }

  orderDates(events: any, format: string): string[] {
    return orderTimestreamDates(events, format);
  }

  selectAValidDate(): { month: string; day: string; date: DateTime } {
    return selectTimestreamDate(
      this.orderedMonths,
      this.parsedEvents,
      this.now,
    );
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

    const data: IBmbNativeModal = {
      title: event.title,
      content: this.newModal,
      size: 'large',
    };
    this.modalService.openModal(data);
  }

  getMonthTitle(date: DateTime) {
    return getTimestreamMonthTitle(date, this.lang());
  }

  getInstances(event: any): string[] {
    return getTimestreamInstances(event, this.lang());
  }

  getDurationString(event: ITimelineEvent): string {
    return getTimestreamDuration(event, this.lang());
  }

  getDiffString(diff = 0): string {
    return timestreamGetDiffString(diff);
  }

  appearanceBadge(
    eventType: string | IBmbTimelineCustomEvent,
  ): IBbmBgAppearance {
    return timestreamAppearanceBadge(eventType);
  }

  getBadgeText(eventType: string | IBmbTimelineCustomEvent): string {
    return timestreamGetBadgeText(eventType);
  }
}

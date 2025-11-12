import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  computed,
  model,
} from '@angular/core';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { CommonModule } from '@angular/common';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { DateTime } from 'luxon';
import { BmbAlertCenterFormComponent } from './bmb-alert-center-form/bmb-alert-center-form.component';
import {
  IBmbDataAlert,
  IBmbDataAlertsParsed,
  IBmbAlertCenterCategories,
  IBmbDataAlertsOutput,
  IBmbAlertEmptyState,
  IBmbAlertCenterTabConfig,
  IBmbAlertCenterFooterEvent,
  IBmbAlertCenterProtoEventFooter,
  IBmbAlertCenterFooterEventName,
} from './types';
import { BmbAlertCenterAdsComponent } from './bmb-alert-center-ads/bmb-alert-center-ads.component';
import { BmbAlertCenterEmptyComponent } from './bmb-alert-center-empty/bmb-alert-center-empty.component';
import { BmbAlertCenterService } from './bmb-alert-center.service';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import { IBmbNativeModal } from '../bmb-modal/bmb-modal.interface';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { BmbAlertCenterDetailComponent } from '../utils/bmb-alert-center-detail/bmb-alert-center-detail.component';

@Component({
  selector: 'bmb-alert-center',
  standalone: true,
  imports: [
    BmbTabsComponent,
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbAlertCenterFormComponent,
    BmbAlertCenterDetailComponent,
    BmbAlertCenterAdsComponent,
    BmbAlertCenterEmptyComponent,
    BmbLoaderComponent,
  ],
  templateUrl: './bmb-alert-center.component.html',
  styleUrl: './bmb-alert-center.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterComponent {
  dateFormat = input<string>('dd/MM/yyyy');
  tabsName = input<string[] | IBmbAlertCenterTabConfig[]>([
    { title: 'Notificaciones', isMobile: true, isDesktop: true },
    { title: 'No leídos', isMobile: false, isDesktop: true },
    { title: 'Favoritos', isMobile: false, isDesktop: true },
    { title: 'Archivados', isMobile: false, isDesktop: true },
    { title: 'Anuncios', isMobile: true, isDesktop: true },
  ]);
  hideTabs = input<boolean>(false);
  enableMultipleSelection = input<boolean>(true);
  showMobileVersion = input<boolean>(false);
  emptyStateData = input<IBmbAlertEmptyState>({
    primaryText: '',
    secondaryText: '',
    tertiaryText: '',
    buttonText: '',
    size: 'large',
    showButton: false,
  });

  // deprecated properties
  alerts = input<IBmbDataAlert[]>([]);
  advertisements = input<IBmbDataAlert[]>([]);

  onChangeAlertStatus = output<IBmbDataAlertsOutput>();
  alertEvent = output<IBmbDataAlert>();
  showAlertDetail = output<IBmbDataAlert>();
  closeAlertDetail = output<IBmbDataAlert>();
  navigationBarEvents = output<IBmbAlertCenterFooterEvent>();

  @ViewChild('detailContent', { read: TemplateRef })
  detailContent?: TemplateRef<any>;
  @ViewChild('container') container!: ElementRef;

  constructor(
    private nativeModalService: BmbNativeModalService,
    private bmbAlertCenterService: BmbAlertCenterService,
    public translationsService: BmbTranslationsService,
  ) {}

  alertList = computed<IBmbDataAlert[]>(() => {
    const alertsOnInput = this.alerts();
    const alertsOnService = this.bmbAlertCenterService.getAlerts();
    return [...alertsOnInput, ...alertsOnService];
  });
  advertisementsList = computed<IBmbDataAlert[]>(() => {
    const advertisementsOnInput = this.advertisements();
    const advertisementsOnService =
      this.bmbAlertCenterService.getAdvertisements();
    return [...advertisementsOnInput, ...advertisementsOnService];
  });
  isLoading = computed<boolean>(() => {
    return this.bmbAlertCenterService.getLoadingState();
  });

  tabs = computed<IBmbTab[]>(() => {
    return this.tabsName().map((tab, index) => {
      const complexTab: IBmbTab = {
        id: index,
        title: typeof tab === 'string' ? tab : tab.title,
        isActive: index === 0,
        badge:
          index === 0 || index === 1
            ? this.alertList().filter((alert) => !alert.isRead).length
            : 0,
        isMobile: typeof tab === 'string' ? true : tab.isMobile,
        isDesktop: typeof tab === 'string' ? true : tab.isDesktop,
      };
      return complexTab;
    });
  });
  selectedTab = model<number>(1);
  selectedAlert: IBmbDataAlert[] = [];
  orderedEvents = computed<IBmbDataAlertsParsed[]>(() => {
    return this.orderEvents(this.alertList());
  });
  now = DateTime.now();
  eventsInCategories = computed<IBmbAlertCenterCategories>(() => {
    return this.orderCategories(this.orderedEvents());
  });
  visibleAlert: IBmbDataAlertsParsed | null = null;

  orderEvents(alerts: IBmbDataAlert[]): IBmbDataAlertsParsed[] {
    const parserDates = alerts.map((alert) => ({
      ...alert,
      pDate: DateTime.fromFormat(
        `${alert.date} ${alert.time}`,
        `${this.dateFormat()} HH:mm`,
      ),
    }));

    return parserDates.sort((a, b) => {
      return b.pDate.toMillis() - a.pDate.toMillis();
    });
  }

  orderCategories(alerts: IBmbDataAlertsParsed[]): IBmbAlertCenterCategories {
    const objectEvent: IBmbAlertCenterCategories = {
      recent: [],
      sevenDays: [],
      month: [],
      rest: [],
    };
    alerts.forEach((alert) => {
      const diff = Math.trunc(this.now.diff(alert.pDate, 'days').days || 0);
      if (diff === 0) objectEvent.recent.push(alert);
      else if (diff <= 7) objectEvent.sevenDays.push(alert);
      else if (diff <= 30) objectEvent.month.push(alert);
      else objectEvent.rest.push(alert);
    });
    return objectEvent;
  }

  handleShowAlert(item: IBmbDataAlertsParsed): void {
    this.visibleAlert = item;
    const { pDate, ...alertData } = item;

    if (
      this.container.nativeElement.clientWidth < 350 ||
      window.innerWidth < 1000 ||
      this.showMobileVersion()
    ) {
      const data: IBmbNativeModal = {
        title: item.title,
        content: this.detailContent,
        size: 'small',
        scrollable: true,
        actions: [
          {
            buttonName: 'close',
            label: 'Cerrar',
            appearance: 'secondary-outlined',
            action: this.handleCloseDetail.bind(this, item),
          },
        ],
        closeModalClicked: this.handleCloseDetail.bind(this, item),
      };
      this.nativeModalService.openModal(data);
    }

    this.showAlertDetail.emit(alertData);
  }

  handleCloseDetail(alert: IBmbDataAlertsParsed): void {
    const { pDate, ...alertData } = alert;
    this.closeAlertDetail.emit(alertData);
    this.nativeModalService.closeAllModals();
  }

  handleAlertEvent(alert: IBmbDataAlert): void {
    this.alertEvent.emit(alert);
  }

  handleChangeAlertStatus(alert: IBmbDataAlertsOutput): void {
    this.onChangeAlertStatus.emit(alert);
  }

  handleNavigationBarEvents(event: IBmbAlertCenterProtoEventFooter): void {
    const events = this.alertList().filter((alert) =>
      event.alerts.includes(alert.id.toString()),
    );

    if (events.length === 0) return;
    if (event.event === 'tags') {
      this.navigationBarEvents.emit({
        alerts: events,
        event: 'tags',
      });
      return;
    }
    const names = {
      isRead: 'read',
      isFavorite: 'favorite',
      isArchived: 'archived',
    };
    const eventName = names[event.event] || event.event;
    const isPositiveOperation = events.some((alert) => !alert[event.event]);
    const eventType = isPositiveOperation
      ? `add_${eventName}`
      : `remove_${eventName}`;
    this.navigationBarEvents.emit({
      alerts: events,
      event: eventType as IBmbAlertCenterFooterEventName,
    });
  }
}

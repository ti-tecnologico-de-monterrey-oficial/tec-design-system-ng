import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import {
  categorizeAlertCenterEvents,
  getAlertCenterFooterEvent,
  getAlertCenterTabs,
  orderAlertCenterEvents,
} from '../../_shared/logic/components/alert-center';
import type { IBmbNativeModal as IBmbNativeModalGeneric } from '../../_shared/types';

type IBmbNativeModal = IBmbNativeModalGeneric<TemplateRef<any>>;
import type {
  IBmbAlertCenterCategories,
  IBmbAlertCenterFooterEvent,
  IBmbAlertCenterProtoEventFooter,
  IBmbAlertCenterTabConfig,
  IBmbAlertEmptyState,
  IBmbBottomNavigationBarProps,
  IBmbDataAlert,
  IBmbDataAlertsOutput,
  IBmbDataAlertsParsed,
} from '../../_shared/types/components/alert-center';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { TranslatePipe } from '../../pipes/translations';
import { BmbNativeModalService } from '../../services/old/modal/native-modal.service';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';
import { BmbTabsComponent } from '../bmb-tabs/bmb-tabs.component';
import type { IBmbTab } from '../../_shared/types/components/tabs';
import { BmbAlertCenterDetailComponent } from '../utils/bmb-alert-center-detail/bmb-alert-center-detail.component';
import { BmbAlertCenterAdsComponent } from './bmb-alert-center-ads/bmb-alert-center-ads.component';
import { BmbAlertCenterEmptyComponent } from './bmb-alert-center-empty/bmb-alert-center-empty.component';
import { BmbAlertCenterFormComponent } from './bmb-alert-center-form/bmb-alert-center-form.component';
import { BmbAlertCenterService } from './bmb-alert-center.service';

export * from './types';

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
    TranslatePipe,
  ],
  templateUrl: './bmb-alert-center.component.html',
  styleUrl: './bmb-alert-center.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterComponent {
  private readonly translationsService: BmbTranslationsService = inject(
    BmbTranslationsService,
  );

  dateFormat = input<string>('dd/MM/yyyy');
  tabsName = input<string[] | IBmbAlertCenterTabConfig[]>([
    {
      title: this.translationsService.translate(
        'alert_center.tabs.notifications',
      ),
      isMobile: true,
      isDesktop: true,
    },
    {
      title: this.translationsService.translate('alert_center.tabs.unread'),
      isMobile: true,
      isDesktop: true,
    },
    {
      title: this.translationsService.translate('alert_center.tabs.favorites'),
      isMobile: false,
      isDesktop: true,
    },
    {
      title: this.translationsService.translate('alert_center.tabs.archived'),
      isMobile: false,
      isDesktop: true,
    },
    {
      title: this.translationsService.translate('alert_center.tabs.ads'),
      isMobile: false,
      isDesktop: false,
    },
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
  enabledFooterOptions = input<IBmbBottomNavigationBarProps>({
    tags: true,
    favorites: true,
    archive: true,
  });
  enableSwipe = input<boolean>(false);

  notificationSelectionState = model<{ [key: string]: boolean }>({});

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onChangeAlertStatus = output<IBmbDataAlertsOutput>();
  alertEvent = output<IBmbDataAlert>();
  showAlertDetail = output<IBmbDataAlert>();
  closeAlertDetail = output<IBmbDataAlert>();
  navigationBarEvents = output<IBmbAlertCenterFooterEvent>();
  getDeleteClick = output<IBmbDataAlertsParsed>();

  @ViewChild('detailContent', { read: TemplateRef })
  detailContent?: TemplateRef<any>;
  @ViewChild('container') container!: ElementRef;

  nativeModalService: BmbNativeModalService = inject(BmbNativeModalService);
  bmbAlertCenterService: BmbAlertCenterService = inject(BmbAlertCenterService);

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

  tabs = computed<IBmbTab[]>(() =>
    getAlertCenterTabs(this.tabsName(), this.alertList()),
  );
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
    return orderAlertCenterEvents(alerts, this.dateFormat());
  }

  orderCategories(alerts: IBmbDataAlertsParsed[]): IBmbAlertCenterCategories {
    return categorizeAlertCenterEvents(alerts, this.now);
  }

  handleShowAlert(item: IBmbDataAlertsParsed): void {
    if (item.customEventHandler) {
      const { pDate, ...alertData } = item;
      this.showAlertDetail.emit(alertData);
      return;
    }

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
            label: this.translationsService.translate('alert_center.close'),
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

  handleDelete(alert: IBmbDataAlertsParsed): void {
    this.getDeleteClick.emit(alert);
  }

  handleNavigationBarEvents(event: IBmbAlertCenterProtoEventFooter): void {
    const payload = getAlertCenterFooterEvent(event, this.alertList());
    if (payload) this.navigationBarEvents.emit(payload);
  }
}

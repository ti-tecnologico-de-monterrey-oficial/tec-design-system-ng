import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IBmbAlertEmptyState,
  IBmbDataAlert,
  IBmbDataAlertsParsed,
} from '../bmb-alert-center/types';
import { IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { BmbTabsComponent } from '../bmb-tabs/bmb-tabs.component';
import { BmbAlertCenterAdsComponent } from '../bmb-alert-center/bmb-alert-center-ads/bmb-alert-center-ads.component';
import { BmbAlertCenterListComponent } from '../bmb-alert-center/bmb-alert-center-list/bmb-alert-center-list.component';
import { DateTime } from 'luxon';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import { BmbNotificationCardModalComponent } from './bmb-notification-card-modal/bmb-notification-card-modal.component';

@Component({
  selector: 'bmb-notification-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbTabsComponent,
    BmbHomeCardComponent,
    BmbAlertCenterAdsComponent,
    BmbAlertCenterListComponent,
  ],
  templateUrl: './bmb-notification-card.component.html',
  styleUrl: './bmb-notification-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNotificationCardComponent {
  data = input<IBmbDataAlert[]>([]);
  advertisements = input<IBmbDataAlert[]>([]);
  hideExpandBtn = input<boolean>(false);
  maxHeight = input<string>('auto');
  emptyStateData = input<IBmbAlertEmptyState>();
  dateFormat = input<string>('dd/MM/yyyy HH:mm');
  showAdvertisements = input<boolean>(true);

  alertEvent = output<IBmbDataAlert>();
  showAlertDetail = output<IBmbDataAlert>();
  onExpandClick = output<void>();

  expanded: boolean = false;
  activeData: any = [];
  activeTab: number = 1;
  activeDot: number = 0;
  parsedData = computed<IBmbDataAlertsParsed[]>(() => {
    return this.data().map((alert) => {
      const date =
        this.dateFormat() === 'iso'
          ? DateTime.fromISO(alert.date)
          : DateTime.fromFormat(alert.date, this.dateFormat());
      return {
        ...alert,
        pDate: date,
      };
    });
  });
  visibleAlert: IBmbDataAlertsParsed | null = null;

  constructor(
    private translationsService: BmbTranslationsService,
    private projectionService: BmbProjectionContentService,
    private modalService: BmbNativeModalService,
  ) {}

  getEmptyStateData(): IBmbAlertEmptyState {
    if (Object.keys(this.emptyStateData() || {}).length) {
      return this.emptyStateData() as IBmbAlertEmptyState;
    }

    return {
      primaryText: this.translationsService.translate(
        'notification_card.empty_state.primary_text',
      ),
      showButton: false,
      size: 'large',
    };
  }

  selectedTab = model<number>(1);
  badgeTabs = computed<number[]>(() => {
    return [
      this.data().reduce((acc: number, alert: IBmbDataAlert) => {
        if (!alert.isRead) return acc + 1;
        return acc;
      }, 0),
      this.advertisements().reduce(
        (acc: number, advertisement: IBmbDataAlert) => {
          if (!advertisement.isRead) return acc + 1;
          return acc;
        },
        0,
      ),
    ];
  });
  tabsConfig = computed<IBmbTab[]>(() => [
    {
      title: this.translationsService.translate(
        'notification_card.tabs.notifications',
      ),
      isMobile: true,
      isDesktop: true,
      id: 0,
      isActive: true,
      badge: this.badgeTabs()[0],
    },
    {
      title: this.translationsService.translate(
        'notification_card.tabs.advertisements',
      ),
      isMobile: true,
      isDesktop: true,
      id: 1,
    },
  ]);

  handleAlertEvent(alert: unknown) {
    this.alertEvent.emit(alert as IBmbDataAlert);
  }

  handleAlertSelected(alert: IBmbDataAlertsParsed) {
    this.showAlertDetail.emit(alert);
    this.projectionService.closeContent();
    this.modalService.openModal({
      title: alert.title,
      content: BmbNotificationCardModalComponent,
      size: 'small',
      inputContext: {
        visibleAlert: alert,
      },
    });
  }
}

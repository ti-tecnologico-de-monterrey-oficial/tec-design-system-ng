import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import { countUnreadItems } from '../../_shared/logic/components/notification-card';
import type {
  IBmbAlertEmptyState,
  IBmbDataAlert,
  IBmbDataAlertsParsed,
} from '../../_shared/types/components/alert-center';
import { TranslatePipe } from '../../pipes/translations';
import { BmbNativeModalService } from '../../services/old/modal/native-modal.service';
import { BmbProjectionContentService } from '../../services/old/projection/projection.service';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { BmbAlertCenterAdsComponent } from '../bmb-alert-center/bmb-alert-center-ads/bmb-alert-center-ads.component';
import { BmbAlertCenterListComponent } from '../bmb-alert-center/bmb-alert-center-list/bmb-alert-center-list.component';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';
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
    TranslatePipe,
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
  enableRowClick = input<boolean>(true);
  emptyStateData = input<IBmbAlertEmptyState>();
  dateFormat = input<string>('dd/MM/yyyy HH:mm');
  showAdvertisements = input<boolean>(true);
  leftIcon = input<string>('');
  enableCustomHandlerClick = input<boolean>(false);
  componentTitle = input<string>('');
  enableSwipe = input<boolean>(false);

  alertEvent = output<IBmbDataAlert>();
  showAlertDetail = output<IBmbDataAlert>();
  onExpandClick = output<void>();
  getDeleteClick = output<IBmbDataAlertsParsed>();

  expanded = false;
  activeTab = 1;
  activeDot = 0;
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

  private translationsService: BmbTranslationsService = inject(
    BmbTranslationsService,
  );
  private projectionService: BmbProjectionContentService = inject(
    BmbProjectionContentService,
  );
  private modalService: BmbNativeModalService = inject(BmbNativeModalService);

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
      countUnreadItems(this.data()),
      countUnreadItems(this.advertisements()),
    ];
  });
  tabsConfig = computed<IBmbTab[]>(() => {
    const tabs: IBmbTab[] = [
      {
        title: this.translationsService.translate(
          'notification_card.tabs.notifications',
        ),
        isMobile: true,
        isDesktop: true,
        id: 1,
        isActive: true,
        badge: this.badgeTabs()[0],
      },
    ];

    if (this.showAdvertisements()) {
      tabs.push({
        title: this.translationsService.translate(
          'notification_card.tabs.advertisements',
        ),
        isMobile: true,
        isDesktop: true,
        id: 2,
        isActive: false,
        badge: this.badgeTabs()[1],
      });
    }

    return tabs;
  });
  unreadAlerts = computed<IBmbDataAlertsParsed[]>(() => {
    return this.parsedData().filter((alert) => !alert.isRead);
  });

  handleAlertEvent(alert: unknown) {
    this.alertEvent.emit(alert as IBmbDataAlert);
  }

  handleAlertSelected(alert: IBmbDataAlertsParsed) {
    if (this.enableCustomHandlerClick()) {
      this.handleAlertEvent(alert);
      return;
    }

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

  handleDelete(item: IBmbDataAlertsParsed): void {
    this.getDeleteClick.emit(item);
  }
}

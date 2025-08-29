import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbAlertCenterComponent } from '../bmb-alert-center/bmb-alert-center.component';
import { IBmbDataAlert } from '../bmb-alert-center/types';
import { IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbImageComponent } from '../bmb-image/bmb-image.component';
import { IBmbAlertCenterTabConfig } from '../bmb-alert-center/types';

@Component({
  selector: 'bmb-notification-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbAlertCenterComponent,
    BmbHomeCardComponent,
    BmbButtonDirective,
    BmbImageComponent,
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

  alertEvent = output<IBmbDataAlert>();

  expanded: boolean = false;
  activeData: any = [];
  activeTab: number = 1;
  activeDot: number = 0;
  tabs = computed<IBmbTab[]>(() => {
    return [
      {
        id: 1,
        title: 'Notificaciones',
        badge: this.newAlerts(),
        isActive: true,
      },
      { id: 2, title: 'Anuncios' },
    ];
  });

  tabsConfig: IBmbAlertCenterTabConfig[] = [
    {
      title: 'Notificaciones',
      isMobile: true,
      isDesktop: true,
    },
    {
      title: 'No leídos',
      isMobile: false,
      isDesktop: false,
    },
    {
      title: 'Favoritos',
      isMobile: false,
      isDesktop: false,
    },
    {
      title: 'Archivados',
      isMobile: false,
      isDesktop: false,
    },
    {
      title: 'Anuncios',
      isMobile: true,
      isDesktop: true,
    },
  ];

  setActiveTab(tab: IBmbTab) {
    this.activeTab = tab.id;
  }

  onDotPress(event: any) {
    this.activeDot = event;
  }

  setSize(size: string) {
    this.expanded = size === 'expand' ? true : false;
  }

  newAlerts() {
    return this.data().reduce((acc: number, alert: IBmbDataAlert) => {
      if (!alert.isRead) return acc + 1;
      return acc;
    }, 0);
  }

  handleAlertEvent(alert: IBmbDataAlert) {
    this.alertEvent.emit(alert);
  }
}

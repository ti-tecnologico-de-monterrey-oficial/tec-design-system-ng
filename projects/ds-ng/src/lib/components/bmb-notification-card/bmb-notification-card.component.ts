import {
  ChangeDetectionStrategy,
  Component,
  input,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { IBmbNotificationCardData } from './types';
import { CommonModule } from '@angular/common';
import { BmbAlertCenterComponent } from '../bmb-alert-center/bmb-alert-center.component';
import { IBmbDataAlert } from '../bmb-alert-center/types';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';

@Component({
  selector: 'bmb-notification-card',
  standalone: true,
  imports: [
    BmbIconComponent,
    CommonModule,
    BmbAlertCenterComponent,
    BmbTabsComponent,
    BmbHomeCardComponent,
  ],
  templateUrl: './bmb-notification-card.component.html',
  styleUrl: './bmb-notification-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNotificationCardComponent implements OnInit {
  data = input<IBmbDataAlert[]>([]);
  alerts = input<IBmbDataAlert[]>([]);
  hideExpandBtn = input<boolean>(false);

  expanded: boolean = false;
  activeData: any = [];
  activeTab: number = 1;
  activeDot: number = 0;
  tabs = [
    { id: 1, title: 'Notificaciones', badge: 0, isActive: true },
    { id: 2, title: 'Anuncios' },
  ];

  ngOnInit(): void {
    this.tabs[0].badge = this.newAlerts()
  }

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
    return this.data().reduce(
      (acc: number, alert: IBmbDataAlert) => {
        if (!alert.isRead) return acc + 1;
        return acc;
      },
      0,
    );
  }
}

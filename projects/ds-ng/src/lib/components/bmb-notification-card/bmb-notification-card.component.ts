import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbAlertCenterComponent } from '../bmb-alert-center/bmb-alert-center.component';
import { IBmbDataAlert } from '../bmb-alert-center/types';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { BmbCarouselComponent } from '../bmb-carousel/bmb-carousel.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbImageComponent } from '../bmb-image/bmb-image.component';

@Component({
  selector: 'bmb-notification-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbAlertCenterComponent,
    BmbTabsComponent,
    BmbHomeCardComponent,
    BmbCarouselComponent,
    BmbButtonDirective,
    BmbImageComponent,
  ],
  templateUrl: './bmb-notification-card.component.html',
  styleUrl: './bmb-notification-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbNotificationCardComponent implements OnInit {
  data = input<IBmbDataAlert[]>([]);
  advertisements = input<IBmbDataAlert[]>([]);
  hideExpandBtn = input<boolean>(false);

  alertEvent = output<IBmbDataAlert>();

  expanded: boolean = false;
  activeData: any = [];
  activeTab: number = 1;
  activeDot: number = 0;
  tabs = [
    { id: 1, title: 'Notificaciones', badge: 0, isActive: true },
    { id: 2, title: 'Anuncios' },
  ];

  ngOnInit(): void {
    this.tabs[0].badge = this.newAlerts();
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
    return this.data().reduce((acc: number, alert: IBmbDataAlert) => {
      if (!alert.isRead) return acc + 1;
      return acc;
    }, 0);
  }

  handleAlertEvent(alert: IBmbDataAlert) {
    this.alertEvent.emit(alert);
  }
}

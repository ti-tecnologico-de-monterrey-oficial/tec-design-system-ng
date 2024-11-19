import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { BmbTabsComponent, IBmbTab } from '../bmb-tabs/bmb-tabs.component';
import { CommonModule } from '@angular/common';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import {
  BmbBottomNavigationBarComponent,
  IBmbNavigationBarIcons,
} from '../bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component';

export interface IBmbDataAlert {
  id: number | string;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
  time: string;
}

@Component({
  selector: 'bmb-alert-center',
  standalone: true,
  imports: [
    BmbTabsComponent,
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbBottomNavigationBarComponent,
  ],
  templateUrl: './bmb-alert-center.component.html',
  styleUrl: './bmb-alert-center.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterComponent {
  tabsName = ['Todos', 'No Leídos', 'Favoritos', 'Archivados'];
  alerts = input.required<IBmbDataAlert[]>();
  navigationBarIcons: IBmbNavigationBarIcons = {
    one: { name: 'done_all', label: '' },
    two: { name: 'sell', label: '' },
    three: { name: 'star', label: '' },
    four: { name: 'inventory_2', label: '' },
  };

  tabs: IBmbTab[] = [];

  selectedTab = 0;
  selectedAlert: IBmbDataAlert[] = [];

  ngOnInit(): void {
    this.tabs = this.tabsName.map((tab, index) => {
      const badge = this.alerts().filter((alert) => !alert.isRead).length;
      return {
        id: index,
        title: tab,
        isActive: index === 0,
        badge: index === 0 ? badge : 0,
      };
    });
  }

  getClassList(): string[] {
    const classList = ['bmb_alert-center'];
    return classList;
  }

  handleTabChange(tabId: IBmbTab): void {
    this.selectedTab = tabId.id;
  }

  getFooterClassList(): string[] {
    const classList = ['bmb_alert-center-footer'];
    if (this.selectedAlert.length)
      classList.push('bmb_alert-center-footer-active');

    console.log('classList', classList);

    return classList;
  }

  toggleNotification() {
    this.selectedAlert = this.selectedAlert.length ? [] : this.alerts();
    console.log('this.selectedAlert', this.selectedAlert);
  }
}

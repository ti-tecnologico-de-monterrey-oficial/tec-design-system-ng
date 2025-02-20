import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
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
} from './types';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbImageComponent } from '../bmb-image/bmb-image.component';
import { BmbModalComponent } from '../bmb-modal/bmb-modal.component';
import { ModalDataConfig } from '../bmb-modal/bmb-modal.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'bmb-alert-center',
  standalone: true,
  imports: [
    BmbTabsComponent,
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbAlertCenterFormComponent,
    BmbButtonDirective,
    BmbImageComponent,
  ],
  templateUrl: './bmb-alert-center.component.html',
  styleUrl: './bmb-alert-center.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterComponent {
  alerts = input.required<IBmbDataAlert[]>();
  dateFormat = input<string>('dd/MM/yyyy');
  isSmall = input<boolean>(false);
  tabsName = input<string[]>(['Todos', 'No Leídos', 'Favoritos', 'Archivados']);

  onChangeAlertStatus = output<IBmbDataAlertsOutput>();
  alertEvent = output<IBmbDataAlert>();

  @ViewChild('detailContent', { read: TemplateRef })
  detailContent?: TemplateRef<any>;

  constructor(private matDialog: MatDialog) {}


  tabs: IBmbTab[] = [];
  selectedTab = 0;
  selectedAlert: IBmbDataAlert[] = [];
  orderedEvents: IBmbDataAlertsParsed[] = [];
  now = DateTime.now();
  eventsInCategories: IBmbAlertCenterCategories = {
    recent: [],
    sevenDays: [],
    month: [],
    rest: [],
  };
  visibleAlert: IBmbDataAlertsParsed | null = null;

  ngOnInit(): void {
    this.tabs = this.tabsName().map((tab, index) => {
      const badge = this.alerts().filter((alert) => !alert.isRead).length;
      return {
        id: index,
        title: tab,
        isActive: index === 0,
        badge: index === 0 || index === 1 ? badge : 0,
      };
    });

    this.orderedEvents = this.orderEvents(this.alerts());
    this.eventsInCategories = this.orderCategories(this.orderedEvents);
  }

  handleTabChange(tabId: IBmbTab): void {
    this.selectedTab = tabId.id;
    this.eventsInCategories = this.filterEvents(tabId.id);
  }

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

  filterEvents(id: number): IBmbAlertCenterCategories {
    switch (id) {
      case 0:
        return this.orderCategories(this.orderedEvents);
      case 1:
        return this.orderCategories(
          this.orderedEvents.filter((alert) => !alert.isRead),
        );
      case 2:
        return this.orderCategories(
          this.orderedEvents.filter((alert) => alert.isFavorite),
        );
      case 3:
        return this.orderCategories(
          this.orderedEvents.filter((alert) => alert.isArchived),
        );
      default:
        return this.orderCategories(this.orderedEvents);
    }
  }

  handleShowAlert(item: IBmbDataAlertsParsed): void {
    this.visibleAlert = item;

    if (this.isSmall()) {
      const data: ModalDataConfig = {
        title: item.title,
        content: this.detailContent,
        size: 'small',
        type: 'informative',
        scrollable: true,
      };
      this.matDialog.open(BmbModalComponent, { data });
    }
  }

  handleAlertEvent(alert: IBmbDataAlert): void {
    this.alertEvent.emit(alert);
  }

  handleChangeAlertStatus(alert: IBmbDataAlertsOutput): void {
    this.onChangeAlertStatus.emit(alert);
  }
}

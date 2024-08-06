import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITimelineEvent } from '../types';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbTabsComponent } from '../../bmb-tabs/bmb-tabs.component';
import { BmbContainerComponent } from '../../bmb-container/bmb-container.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbButtonDirective } from '../../../directives/button.directive';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { DateTime } from 'luxon';

interface Tab {
  id: number;
  title: string;
  isActive?: boolean;
  badge?: number;
}

@Component({
  selector: 'bmb-timestream-dialog',
  standalone: true,
  imports: [
    BmbIconComponent,
    BmbTabsComponent,
    BmbContainerComponent,
    BmbBadgeComponent,
    BmbButtonDirective,
    BmbDividerComponent,
    CommonModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
  ],
  templateUrl: './bmb-timestream-dialog.component.html',
  styleUrl: './bmb-timestream-dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbTimestreamDialogComponent {
  @Input() event: ITimelineEvent | null = null;
  @Input() lang: string = 'es';

  @Output() closeDialog: EventEmitter<void> = new EventEmitter<void>();

  handleCloseEvent() {
    this.closeDialog.emit();
  }

  formatBadgeText(legend: string): string {
    return legend.replace(/_/g, ' ');
  }

  appearanceBadgeText(type: string): string {
    switch (type) {
      case 'enriquecedor':
        return 'mitec-red';
      case 'seriado':
        return 'mitec-orange';
      case 'inscripciones':
        return 'green-light';
      case 'avance_academico':
        return 'mitec-blue';
      case 'otra':
        return 'purple-light';
      case 'flexible':
        return 'mitec-green';
      default:
        return 'mitec-blue';
    }
  }

  eventTabs: Tab[] = [
    { id: 1, title: 'Descripción', isActive: true },
    { id: 2, title: 'Instancias' },
  ];
  tabSelected = 1;

  handleTabSelected(tab: Tab) {
    this.tabSelected = tab.id;
  }

  getMonthTitle(date: DateTime) {
    return date.setLocale(this.lang).toFormat('cccc dd LLLL yyyy');
  }

  getInstances(event: any): string[] {
    const instances = [];
    for (let index = 0; index < (event.diff || 0) + 1; index++) {
      const date = event.originalStart.plus({ days: index });
      instances.push(this.getMonthTitle(date));
    }
    return instances;
  }

  getDurationString(event: ITimelineEvent): string {
    return `Duración: ${event.originalStart?.day} - ${event.endEvent?.setLocale(this.lang).toFormat('dd LLLL yyyy')} (${(event.diff || 0) + 1} Días)`;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { IBmbDataAlertsParsed } from '../types';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { DateTime } from 'luxon';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from '../../../directives/bmb-layout-grid/bmb-layout-grid.directive';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-alert-center-list',
  standalone: true,
  imports: [
    BmbCheckboxComponent,
    BmbBadgeComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbLayoutGridDirective,
    BmbLayoutGridItemDirective,
    BmbIconComponent,
  ],
  templateUrl: './bmb-alert-center-list.component.html',
  styleUrl: './bmb-alert-center-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterListComponent {
  alerts = input.required<IBmbDataAlertsParsed[]>();
  name = input<string>('');
  enableMultipleSelection = input<boolean>(true);

  alertSelected = output<IBmbDataAlertsParsed>();
  selectedAlert = output<{ event: Event; item: IBmbDataAlertsParsed }>();

  isSelected: IBmbDataAlertsParsed[] = [];

  handleSelection(event: Event, item: IBmbDataAlertsParsed): void {
    this.selectedAlert.emit({ event, item });
  }

  getTextFromDate(date: DateTime): string {
    return date.toFormat('EEEE dd LLLL yyyy', { locale: 'es' });
  }

  handleRowClick(item: IBmbDataAlertsParsed): void {
    this.alertSelected.emit(item);
  }

  getFormattedTime(date: any): string {
    return DateTime.fromFormat(date, 'HH:mm').toFormat('h:mm a');
  }
}

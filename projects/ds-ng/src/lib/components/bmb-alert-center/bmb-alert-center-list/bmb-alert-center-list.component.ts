import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { IBmbDataAlertsParsed } from '../types';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { DateTime } from 'luxon';

@Component({
  selector: 'bmb-alert-center-list',
  standalone: true,
  imports: [BmbCheckboxComponent, BmbBadgeComponent],
  templateUrl: './bmb-alert-center-list.component.html',
  styleUrl: './bmb-alert-center-list.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterListComponent {
  alerts = input.required<IBmbDataAlertsParsed[]>();
  name = input<string>('');

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
}

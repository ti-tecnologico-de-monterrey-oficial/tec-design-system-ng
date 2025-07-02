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

  handleRowClick(event: Event, item: IBmbDataAlertsParsed): void {
    const target = event.target as HTMLElement;
    // if (target?.id || target.classList?.[0]?.search(/bmb_checkbox/) !== -1) {
    //   console.log('remove this log');
    // } else {
    //   this.alertSelected.emit(item);
    // }
    this.alertSelected.emit(item);
  }

  getFormattedTime(date: any): string {
    return DateTime.fromFormat(date, 'HH:mm').toFormat('h:mm a');
  }
}

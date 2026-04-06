import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  output,
  untracked,
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
import { CommonModule } from '@angular/common';

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
    CommonModule,
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
  selectionState = model<Record<string, boolean>>({});
  enableRowClick = input<boolean>(true);

  alertSelected = output<IBmbDataAlertsParsed>();
  selectedAlert = output<{ event: Event; item: IBmbDataAlertsParsed }>();
  isSomeAlertSelected = computed(() => {
    const state = this.selectionState();
    return Object.values(state).some((isSelected) => isSelected);
  });

  handleSelection(event: Event, item: IBmbDataAlertsParsed): void {
    this.selectionState.update((state) => {
      return {
        ...state,
        [item.id]: (event.target as HTMLInputElement).checked,
      };
    });
    this.selectedAlert.emit({ event, item });
  }

  getTextFromDate(date: DateTime): string {
    return date.toFormat('EEEE dd LLLL yyyy', { locale: 'es' });
  }

  handleRowClick(item: IBmbDataAlertsParsed): void {
    this.alertSelected.emit(item);
  }

  getTimeVariant(pDate: DateTime): 'today' | 'yesterday' | 'date' {
    if (!pDate?.isValid) return 'date';

    const now = DateTime.now().startOf('day');
    const target = pDate.startOf('day');
    const diffDays = now.diff(target, 'days').days;

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'yesterday';

    return 'date';
  }

  getFormattedTime(time: string, pDate: DateTime): string {
    if (!pDate?.isValid) return '';

    const now = DateTime.now().startOf('day');
    const target = pDate.startOf('day');

    const diffDays = now.diff(target, 'days').days;

    const [hour, minute] = time.split(':').map(Number);

    const dateTime = pDate.set({ hour, minute });
    if (diffDays < 0) {
      return dateTime.toFormat('h:mm a').toLowerCase();
    }

    if (diffDays === 0) {
      return dateTime.toFormat('h:mm a');
    }

    if (diffDays === 1) {
      return 'Ayer';
    }

    return pDate.toFormat('dd/MM/yyyy');
  }
}

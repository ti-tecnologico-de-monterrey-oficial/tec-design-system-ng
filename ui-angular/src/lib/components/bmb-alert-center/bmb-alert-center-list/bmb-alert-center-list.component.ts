import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DateTime } from 'luxon';
import {
  alertCenterGetFormattedTime,
  alertCenterGetTextFromDate,
  alertCenterGetTimeVariant,
} from '../../../_shared/logic/components/alert-center-list';
import type { IBmbDataAlertsParsed } from '../../../_shared/types/components/alert-center';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import {
  BmbSwipeDirective,
  BmbSwipeLeftActionsDirective,
  BmbSwipeRightActionsDirective,
  IBmbSwipeSide,
} from '../../../directives/bmb-swipe/bmb-swipe.directive';
import {
  BmbLayoutGridDirective,
  BmbLayoutGridItemDirective,
} from '../../../directives/old/bmb-layout-grid/bmb-layout-grid.directive';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';
import { BmbBadgeComponent } from '../../bmb-badge/bmb-badge.component';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
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
    CommonModule,
    BmbSwipeDirective,
    BmbSwipeRightActionsDirective,
    BmbActionIconComponent,
    TranslatePipe,
    BmbSwipeLeftActionsDirective,
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
  enableSwipe = input<boolean>(false);

  alertSelected = output<IBmbDataAlertsParsed>();
  selectedAlert = output<{ event: Event; item: IBmbDataAlertsParsed }>();
  getDeleteClick = output<IBmbDataAlertsParsed>();

  isSomeAlertSelected = computed(() => {
    const state = this.selectionState();
    return Object.values(state).some((isSelected) => isSelected);
  });

  readonly threshold = signal(0.4);
  readonly closeOnAction = signal(true);
  readonly lastEvent = signal<IBmbSwipeSide | null>(null);

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
    return alertCenterGetTextFromDate(date);
  }

  handleRowClick(item: IBmbDataAlertsParsed): void {
    this.alertSelected.emit(item);
  }

  getTimeVariant(pDate: DateTime): 'today' | 'yesterday' | 'date' {
    return alertCenterGetTimeVariant(pDate);
  }

  getFormattedTime(time: string, pDate: DateTime): string {
    return alertCenterGetFormattedTime(time, pDate);
  }

  handleSwipe(side: IBmbSwipeSide | null): void {
    this.lastEvent.set(side);
  }

  handleDelete(item: IBmbDataAlertsParsed): void {
    this.getDeleteClick.emit(item);
  }
}

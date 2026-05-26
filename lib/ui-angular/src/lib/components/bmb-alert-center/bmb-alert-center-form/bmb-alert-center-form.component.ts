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
import {
  IBmbAlertCenterCategories,
  IBmbAlertCenterProtoEventFooter,
  IBmbAlertEmptyState,
  IBmbBottomNavigationBarProps,
  IBmbDataAlertsEventType,
  IBmbDataAlertsOutput,
  IBmbDataAlertsParsed,
} from '../types';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbAlertCenterListComponent } from '../bmb-alert-center-list/bmb-alert-center-list.component';
import { BmbAlertCenterEmptyComponent } from '../bmb-alert-center-empty/bmb-alert-center-empty.component';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbNavigationBarComponent } from '../../bmb-navigation-bar/bmb-navigation-bar.component';
import { IBmbActionHeader } from '../../../types';
import { BmbTranslationsService } from '../../../services/translations/translations.service';

@Component({
  selector: 'bmb-alert-center-form',
  standalone: true,
  imports: [
    BmbNavigationBarComponent,
    CommonModule,
    ReactiveFormsModule,
    BmbAlertCenterListComponent,
    BmbAlertCenterEmptyComponent,
    BmbLayoutItemDirective,
    BmbCheckboxComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-alert-center-form.component.html',
  styleUrl: './bmb-alert-center-form.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterFormComponent {
  eventsInCategories = input.required<IBmbAlertCenterCategories>();
  filterBy = input<'all' | 'unread' | 'archived' | 'favorites'>('all');
  enableMultipleSelection = input<boolean>(true);
  emptyStateData = input<IBmbAlertEmptyState>({
    primaryText: '',
    secondaryText: '',
    tertiaryText: '',
    buttonText: '',
    size: 'large',
    showButton: false,
  });
  enabledOptions = input<IBmbBottomNavigationBarProps>({
    tags: true,
    favorites: true,
    archive: true,
  });
  selectionState = model<Record<string, boolean>>({});

  showAlertDetail = output<IBmbDataAlertsParsed>();
  changeAlertStatus = output<IBmbDataAlertsOutput>();
  navigationBarEvents = output<IBmbAlertCenterProtoEventFooter>();
  filteredEvents = computed<IBmbAlertCenterCategories>(() => {
    if (this.filterBy() === 'unread') {
      return {
        recent: this.eventsInCategories().recent.filter(
          (event) => !event.isRead,
        ),
        sevenDays: this.eventsInCategories().sevenDays.filter(
          (event) => !event.isRead,
        ),
        month: this.eventsInCategories().month.filter((event) => !event.isRead),
        rest: this.eventsInCategories().rest.filter((event) => !event.isRead),
      };
    }
    if (this.filterBy() === 'archived') {
      return {
        recent: this.eventsInCategories().recent.filter(
          (event) => event.isArchived,
        ),
        sevenDays: this.eventsInCategories().sevenDays.filter(
          (event) => event.isArchived,
        ),
        month: this.eventsInCategories().month.filter(
          (event) => event.isArchived,
        ),
        rest: this.eventsInCategories().rest.filter(
          (event) => event.isArchived,
        ),
      };
    }
    if (this.filterBy() === 'favorites') {
      return {
        recent: this.eventsInCategories().recent.filter(
          (event) => event.isFavorite,
        ),
        sevenDays: this.eventsInCategories().sevenDays.filter(
          (event) => event.isFavorite,
        ),
        month: this.eventsInCategories().month.filter(
          (event) => event.isFavorite,
        ),
        rest: this.eventsInCategories().rest.filter(
          (event) => event.isFavorite,
        ),
      };
    }

    return this.eventsInCategories();
  });
  isSomeAlertSelected = computed(() => {
    const state = this.selectionState();
    const summarySelection = Object.values(state).reduce(
      (acc, value) => {
        acc.some = acc.some || value;
        acc.all = acc.all && value;
        return acc;
      },
      { some: false, all: true },
    );
    return summarySelection;
  });

  navigationBarIcons = computed<IBmbActionHeader[]>(() => {
    const actions: IBmbActionHeader[] = [
      {
        icon: 'done_all',
        alt: this.translationsService.translate(
          'notification_center.actions.mark_as_read',
        ),
        action: () => {
          this.handleNavigationBarEvents('isRead');
        },
      },
    ];
    if (this.enabledOptions().tags) {
      actions.push({
        icon: 'sell',
        alt: this.translationsService.translate(
          'notification_center.actions.add_tag',
        ),
        action: () => {
          this.handleNavigationBarEvents('tags');
        },
      });
    }
    if (this.enabledOptions().favorites) {
      actions.push({
        icon: 'star',
        alt: this.translationsService.translate(
          'notification_center.actions.mark_as_favorite',
        ),
        action: () => {
          this.handleNavigationBarEvents('isFavorite');
        },
      });
    }
    if (this.enabledOptions().archive) {
      actions.push({
        icon: 'inventory_2',
        alt: this.translationsService.translate(
          'notification_center.actions.mark_as_archive',
        ),
        action: () => {
          this.handleNavigationBarEvents('isArchived');
        },
      });
    }
    return actions;
  });

  constructor(private translationsService: BmbTranslationsService) {
    effect(() => {
      const alertList = this.eventsInCategories();
      const flatAlerts = Object.values(alertList).flat();

      const initialSelectionState: Record<string, boolean> = flatAlerts.reduce(
        (acc, alert) => {
          acc[`${alert.id}`] = false;
          return acc;
        },
        {} as Record<string, boolean>,
      );

      untracked(() => {
        this.selectionState.set(initialSelectionState);
      });
    });
  }

  alertSelected(item: IBmbDataAlertsParsed) {
    this.showAlertDetail.emit(item);
  }

  handleNavigationBarEvents(event: IBmbDataAlertsEventType): void {
    const values = this.selectionState();
    const selectedOptions = Object.keys(values).filter(
      (value) => values[value] === true,
    );

    this.navigationBarEvents.emit({
      alerts: selectedOptions,
      event,
    });
  }

  handleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectionState.update((state) => {
      const updatedState: Record<string, boolean> = {};
      for (const key in state) {
        if (state.hasOwnProperty(key)) {
          updatedState[key] = isChecked;
        }
      }
      return updatedState;
    });
  }
}

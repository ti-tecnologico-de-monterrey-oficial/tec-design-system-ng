import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  filterAlertCenterCategories,
  getAlertCenterSelectionSummary,
  getInitialAlertSelection,
  getSelectedAlertIds,
  selectAllAlertIds,
} from '../../../_shared/logic/components/alert-center';
import type {
  IBmbAlertCenterCategories,
  IBmbAlertCenterProtoEventFooter,
  IBmbAlertEmptyState,
  IBmbBottomNavigationBarProps,
  IBmbDataAlertsEventType,
  IBmbDataAlertsOutput,
  IBmbDataAlertsParsed,
} from '../../../_shared/types/components/alert-center';
import type { IBmbActionHeader } from '../../../_shared/types/index';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbTranslationsService } from '../../../services/translations/translations.service';
import { BmbCheckboxComponent } from '../../bmb-checkbox/bmb-checkbox.component';
import { BmbNavigationBarComponent } from '../../bmb-navigation-bar/bmb-navigation-bar.component';
import { BmbAlertCenterEmptyComponent } from '../bmb-alert-center-empty/bmb-alert-center-empty.component';
import { BmbAlertCenterListComponent } from '../bmb-alert-center-list/bmb-alert-center-list.component';

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
  enableSwipe = input<boolean>(false);
  selectionState = model<Record<string, boolean>>({});

  showAlertDetail = output<IBmbDataAlertsParsed>();
  changeAlertStatus = output<IBmbDataAlertsOutput>();
  navigationBarEvents = output<IBmbAlertCenterProtoEventFooter>();
  getDeleteClick = output<IBmbDataAlertsParsed>();
  filteredEvents = computed<IBmbAlertCenterCategories>(() =>
    filterAlertCenterCategories(this.filterBy(), this.eventsInCategories()),
  );
  isSomeAlertSelected = computed(() =>
    getAlertCenterSelectionSummary(this.selectionState()),
  );
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

  private translationsService: BmbTranslationsService = inject(
    BmbTranslationsService,
  );

  constructor() {
    effect(() => {
      const initialSelectionState = getInitialAlertSelection(
        this.eventsInCategories(),
      );

      untracked(() => {
        this.selectionState.set(initialSelectionState);
      });
    });
  }

  alertSelected(item: IBmbDataAlertsParsed) {
    this.showAlertDetail.emit(item);
  }

  handleDelete(item: IBmbDataAlertsParsed): void {
    this.getDeleteClick.emit(item);
  }

  handleNavigationBarEvents(event: IBmbDataAlertsEventType): void {
    const selectedOptions = getSelectedAlertIds(this.selectionState());

    this.navigationBarEvents.emit({
      alerts: selectedOptions,
      event,
    });
  }

  handleSelectAll(event: Event): void {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectionState.update((state) => selectAllAlertIds(state, isChecked));
  }
}

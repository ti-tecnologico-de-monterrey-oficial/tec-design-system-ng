import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  untracked,
  ViewEncapsulation,
} from '@angular/core';
import {
  IBmbAlertCenterCategories,
  IBmbAlertCenterProtoEventFooter,
  IBmbAlertEmptyState,
  IBmbDataAlertsEventType,
  IBmbDataAlertsOutput,
  IBmbDataAlertsParsed,
} from '../types';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BmbBottomNavigationBarComponent,
  IBmbNavigationBarIcons,
} from '../../bmb-bottom-navigation-bar/bmb-bottom-navigation-bar.component';
import { CommonModule } from '@angular/common';
import { BmbAlertCenterListComponent } from '../bmb-alert-center-list/bmb-alert-center-list.component';
import { BmbAlertCenterEmptyComponent } from '../bmb-alert-center-empty/bmb-alert-center-empty.component';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';

@Component({
  selector: 'bmb-alert-center-form',
  standalone: true,
  imports: [
    BmbBottomNavigationBarComponent,
    CommonModule,
    ReactiveFormsModule,
    BmbAlertCenterListComponent,
    BmbAlertCenterEmptyComponent,
    BmbLayoutItemDirective,
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

  alertSelectionForm: FormGroup<{ [key: string]: FormControl }> = new FormGroup(
    {},
  );
  navigationBarIcons: IBmbNavigationBarIcons = {
    one: { name: 'done_all', label: '' },
    two: { name: 'sell', label: '' },
    three: { name: 'star', label: '' },
    four: { name: 'inventory_2', label: '' },
  };
  hasSelectedAlerts = false;

  constructor() {
    effect(() => {
      const categoriesKeys = Object.keys(this.eventsInCategories()) as Array<
        keyof IBmbAlertCenterCategories
      >;

      untracked(() => {
        categoriesKeys.forEach((key) => {
          this.eventsInCategories()[key].forEach((alert: any) => {
            this.alertSelectionForm.addControl(
              `${alert.id}`,
              new FormControl(false),
            );
          });
        });
      });
    });
  }

  handleSelection(eventObject: {
    event: Event;
    item: IBmbDataAlertsParsed;
  }): void {
    const target = eventObject.event.target as HTMLInputElement;
    const controlName = `${eventObject.item.id}`;

    this.alertSelectionForm.controls[controlName].setValue(target.checked);
    this.hasSelectedAlerts = this.updateSelection();
  }

  getFooterClassList(): string[] {
    const classList = ['bmb_alert-center-form-footer'];
    if (this.hasSelectedAlerts)
      classList.push('bmb_alert-center-form-footer-active');
    return classList;
  }

  onSubmit(event: any): void {
    let type = '';
    switch (event.submitter.name) {
      case 'done_all':
        type = 'set_as_read';
        break;
      case 'sell':
        type = 'add_tag';
        break;
      case 'star':
        type = 'add_to_favorite';
        break;
      case 'inventory_2':
        type = 'add_to_archive';
        break;
    }
    const selectedAlerts = Object.keys(this.alertSelectionForm.value).filter(
      (key) => this.alertSelectionForm.value[key],
    );

    this.changeAlertStatus.emit({ type, data: selectedAlerts });
  }

  updateSelection(): boolean {
    const state = Object.values(this.alertSelectionForm.value).some(
      (value: boolean) => value,
    );
    return state;
  }

  alertSelected(item: IBmbDataAlertsParsed) {
    this.showAlertDetail.emit(item);
  }

  handleNavigationBarEvents(event: string): void {
    const values = this.alertSelectionForm.value;
    const selectedOptions = Object.keys(values).filter(
      (value) => values[value] === true,
    );
    let eventType = '';

    switch (event) {
      case 'back':
        eventType = 'isRead';
        break;
      case 'forward':
        eventType = 'tags';
        break;
      case 'share':
        eventType = 'isFavorite';
        break;
      case 'reload':
        eventType = 'isArchived';
        break;
    }

    this.navigationBarEvents.emit({
      alerts: selectedOptions,
      event: eventType as IBmbDataAlertsEventType,
    });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  IBmbAlertCenterCategories,
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

@Component({
  selector: 'bmb-alert-center-form',
  standalone: true,
  imports: [
    BmbBottomNavigationBarComponent,
    CommonModule,
    ReactiveFormsModule,
    BmbAlertCenterListComponent,
  ],
  templateUrl: './bmb-alert-center-form.component.html',
  styleUrl: './bmb-alert-center-form.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAlertCenterFormComponent {
  eventsInCategories = input.required<IBmbAlertCenterCategories>();
  showAlertDetail = output<IBmbDataAlertsParsed>();

  changeAlertStatus = output<IBmbDataAlertsOutput>();

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

  ngOnInit(): void {
    const categoriesKeys = Object.keys(this.eventsInCategories()) as Array<
      keyof IBmbAlertCenterCategories
    >;
    categoriesKeys.forEach((key) => {
      this.eventsInCategories()[key].forEach((alert: any) => {
        this.alertSelectionForm.addControl(
          `${alert.id}`,
          new FormControl(false),
        );
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
}

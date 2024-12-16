import {
  Component,
  input,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  ViewChild,
  output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbSwitchComponent } from '../bmb-switch/bmb-switch.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { BmbModalComponent } from '../bmb-modal/bmb-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDataConfig } from '../bmb-modal/bmb-modal.interface';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { IBmbControlType } from './bmb-filter-card.interface';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbFormValidationComponent } from '../bmb-form-validation/bmb-form-validation.component';

@Component({
  selector: 'bmb-filter-card',
  templateUrl: './bmb-filter-card.component.html',
  styleUrls: ['./bmb-filter-card.component.scss'],
  standalone: true,
  imports: [
    BmbFormValidationComponent,
    CommonModule,
    ReactiveFormsModule,
    BmbIconComponent,
    BmbInputComponent,
    BmbSwitchComponent,
    BmbRadialComponent,
    BmbCheckboxComponent,
    BmbButtonDirective,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbFilterCardComponent {
  modalTitle = input<string>('');
  primaryBtnLabel = input<string>('');
  secondaryBtnLabel = input<string>('');
  icon = input<string>('');
  placeholderSearch = input<string>('');
  controlTypes = input<IBmbControlType[]>([]);
  storedValues: { [name: string]: any } = {};
  inLine = input<boolean>(false);

  applyFilters = output<void>();
  resetFilters = output<void>();

  filterForm: FormGroup = new FormGroup({
    search: new FormControl<string>(''),
  });

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(private matDialog: MatDialog) {}

  openModalComponent() {
    const data: ModalDataConfig = {
      type: 'informative',
      title: this.modalTitle(),
      size: 'small',
      content: this.modalTemplate,
      scrollable: true,
    };

    this.matDialog.open(BmbModalComponent, { data });
  }

  onReset() {
    this.filterForm.reset();
    this.resetFilters.emit();
  }

  onSubmitVal(event: unknown): void {
    console.log('onSubmit', event);
  }
}

import {
  Component,
  input,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  ViewChild,
  output,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import { BmbSwitchComponent } from '../bmb-switch/bmb-switch.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { BmbModalComponent } from '../bmb-modal/bmb-modal.component';
import { BmbTagComponent } from '../bmb-tags/bmb-tags.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalDataConfig } from '../bmb-modal/bmb-modal.interface';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { ControlType } from './bmb-filter-card.interface';

@Component({
  selector: 'bmb-filter-card',
  templateUrl: './bmb-filter-card.component.html',
  styleUrls: ['./bmb-filter-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbHomeCardComponent,
    BmbIconComponent,
    BmbInputComponent,
    BmbSwitchComponent,
    BmbRadialComponent,
    BmbCheckboxComponent,
    BmbTagComponent,
    BmbModalComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbFilterCardComponent implements OnInit {
  modalTitle = input<string>('');
  primaryBtnLabel = input<string>('');
  secondaryBtnLabel = input<string>('');
  icon = input<string>('');
  placeholderSearch = input<string>('');
  controlTypes = input<ControlType[]>([]);
  storedValues: { [name: string]: any } = {};

  applyFilters = output<void>();
  resetFilters = output<void>();

  filterForm: FormGroup = new FormGroup({
    search: new FormControl<string>(''),
  });

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.controlTypes().forEach((controlType) => {
      controlType.control.forEach((control) => {
        this.filterForm.addControl(
          control.name,
          new FormControl<boolean>(control.checked),
        );
      });
    });
  }

  constructor(private matDialog: MatDialog) {}

  openModalComponent() {
    const data: ModalDataConfig = {
      title: this.modalTitle(),
      size: 'small',
      primaryBtnLabel: this.primaryBtnLabel(),
      secondaryBtnLabel: this.secondaryBtnLabel(),
      content: this.modalTemplate,
      primaryAction: this.onSubmit.bind(this),
      secondaryAction: this.onReset.bind(this),
    };

    this.matDialog.open(BmbModalComponent, { data });
  }

  onControlChange(control: any, event: any) {
    const formControl = this.filterForm.get(control.name);
    if (formControl) {
      if (control.type === 'switch') {
        formControl.setValue(event);
        const switchValue = {
          name: control.name,
          label: control.rightText,
          checked: event,
          type: control.type,
        };
        this.storedValues[control.name] = switchValue;
      } else if (control.type === 'checkbox') {
        formControl.setValue(event.target.checked);
        const checkboxValue = {
          name: control.name,
          label: control.label,
          checked: event.target.checked,
          type: control.type,
        };
        this.storedValues[control.name] = checkboxValue;
      } else if (control.type === 'radial') {
        formControl.setValue(control.label);
        const radialValue = {
          label: control.label,
          checked: event.checked,
          name: control.name,
          type: control.type,
        };
        this.storedValues[control.name] = radialValue;
      }
    }
  }

  onSubmit() {
    const formData: any = {};
    Object.keys(this.storedValues).forEach((key) => {
      formData[key] = this.storedValues[key];
    });
    formData.search = this.filterForm.get('search')?.value;
    console.log(formData);
    this.applyFilters.emit(formData);
  }

  onReset() {
    this.filterForm.reset();
    this.resetFilters.emit();
  }

  getFormControl(search: string): FormControl {
    return this.filterForm.get(search) as FormControl;
  }
}

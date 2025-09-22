import {
  Component,
  input,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  ViewChild,
  output,
  effect,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbSwitchComponent } from '../bmb-switch/bmb-switch.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import {
  IBmbNativeModal,
  ModalDataConfig,
} from '../bmb-modal/bmb-modal.interface';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { IBmbControlType } from './bmb-filter-card.interface';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbDropdownComponent } from '../bmb-dropdown/bmb-dropdown.component';
import { BmbTagComponent } from '../bmb-tags/bmb-tags.component';
import { BmbNativeModalService } from '../../services/native-modal.service';

@Component({
  selector: 'bmb-filter-card',
  templateUrl: './bmb-filter-card.component.html',
  styleUrl: './bmb-filter-card.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbIconComponent,
    BmbInputComponent,
    BmbSwitchComponent,
    BmbRadialComponent,
    BmbCheckboxComponent,
    BmbDropdownComponent,
    BmbButtonDirective,
    BmbTagComponent,
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
  showDropdown = input<boolean>(false);
  dropdownOptions = input<string[]>([]);

  applyFilters = output<any>();
  resetFilters = output<void>();

  filterForm: FormGroup = new FormGroup({
    search: new FormControl<string>(''),
    selectedDropdown: new FormControl<string>(''),
  });

  modalId = signal<string | null>(null);

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(private modalService: BmbNativeModalService) {
    effect(() => {
      this.controlTypes().forEach((controlType) => {
        controlType.control.forEach((control) => {
          if (control.type === 'radial') {
            const controlName = this.filterForm.get(control.name);
            if (controlName) {
              controlName.setValue(
                control.checked ? control.label : controlName.value,
              );
            } else {
              this.filterForm.addControl(
                control.name,
                new FormControl<string>(control.checked ? control.label : ''),
              );
            }
          } else {
            this.filterForm.addControl(
              control.name,
              new FormControl<boolean>(control.checked),
            );
          }
        });
      });
    });
  }

  openModalComponent() {
    const data: IBmbNativeModal = {
      title: this.modalTitle(),
      size: 'small',
      content: this.modalTemplate,
      actions: [
        {
          label: this.primaryBtnLabel(),
          action: this.handleSubmit.bind(this),
          appearance: 'primary',
          buttonName: this.primaryBtnLabel(),
        },
        {
          label: this.secondaryBtnLabel(),
          action: this.onReset.bind(this),
          appearance: 'secondary-outlined',
          buttonName: this.secondaryBtnLabel(),
        },
      ],
      scrollable: true,
    };

    this.modalId.set(this.modalService.openModal(data));
  }

  onControlChange(control: any, event: any) {
    const formControl = this.filterForm.get(control.name);
    if (formControl) {
      switch (control.type) {
        case 'switch':
          formControl.setValue(event);
          const switchValue = {
            name: control.name,
            label: control.rightText,
            checked: event,
            type: control.type,
          };
          this.storedValues[control.name] = switchValue;
          break;
        case 'checkbox':
          formControl.setValue(event.target.checked);
          const checkboxValue = {
            name: control.name,
            label: control.label,
            checked: event.target.checked,
            type: control.type,
          };
          this.storedValues[control.name] = checkboxValue;
          break;
        case 'radial':
          formControl.setValue(control.label);
          const radialValue = {
            label: control.label,
            checked: event.checked,
            name: control.name,
            type: control.type,
          };
          this.storedValues[control.name] = radialValue;
          break;
        default: //for the tag option or any other option that does not have an activated control
          formControl.setValue(control.label);
          const elementValue = {
            label: control.label,
            checked: !this.storedValues[control.name]?.checked,
            name: control,
            type: control.type,
          };
          this.storedValues[control.name] = elementValue;
          break;
      }
    }
  }

  handleSubmit() {
    debugger;
    const formData: any = {};
    Object.keys(this.storedValues).forEach((key) => {
      formData[key] = this.storedValues[key];
    });
    formData.search = this.filterForm.get('search')?.value;
    this.modalService.closeModal(this.modalId() as string);
    this.applyFilters.emit(formData);
  }

  onReset() {
    this.filterForm.reset();
    this.resetFilters.emit();
  }

  getFormControl(search: string): FormControl {
    return this.filterForm.get(search) as FormControl;
  }

  onValueChange(event: string) {
    this.filterForm.get('search')?.setValue(event);
  }
}

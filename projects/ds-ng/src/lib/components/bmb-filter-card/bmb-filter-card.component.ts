import {
  Component,
  input,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  TemplateRef,
  ViewChild,
  output,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbSwitchComponent } from '../bmb-switch/bmb-switch.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { IBmbNativeModal } from '../bmb-modal/bmb-modal.interface';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { IBmbControlType } from './bmb-filter-card.interface';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbDropdownComponent } from '../bmb-dropdown/bmb-dropdown.component';
import { BmbTagComponent } from '../bmb-tags/bmb-tags.component';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import { TranslatePipe } from '../../pipes/translations';

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
    TranslatePipe,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbFilterCardComponent implements OnInit {
  modalTitle = input<string>('');
  primaryBtnLabel = input<string>('');
  secondaryBtnLabel = input<string>('');
  icon = input<string>('');
  controlTypes = input<IBmbControlType[]>([]);
  storedValues: { [name: string]: any } = {};
  inLine = input<boolean>(false);
  showGlobalSearch = input<boolean>(true);

  showDropdown = input<boolean>(false); // deprecated
  dropdownOptions = input<string[]>([]); // deprecated
  placeholderSearch = input<string>('');

  applyFilters = output<any>();
  resetFilters = output<void>();

  filterForm: FormGroup = new FormGroup({
    search: new FormControl<string>(''),
    selectedDropdown: new FormControl<string>(''),
  });

  modalId = signal<string | null>(null);

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  constructor(private modalService: BmbNativeModalService) {}

  ngOnInit(): void {
    this.controlTypes().forEach((controlType) => {
      controlType.control.forEach((control) => {
        switch (control.type) {
          case 'switch':
          case 'checkbox':
          case 'tag':
            this.filterForm.addControl(
              control.name,
              new FormControl<boolean>(control.checked ?? false),
            );
            this.storedValues[control.name] = {
              ...control,
              checked: control.checked ?? false,
              originalControl: control,
            };
            break;
          case 'radial':
            const controlName = this.filterForm.get(control.name);
            if (controlName) {
              controlName.setValue(
                control.checked ? control.label : controlName.value,
              );
              const storedValue = this.storedValues[control.name];
              this.storedValues[control.name] = {
                ...storedValue,
                checked: control.checked || storedValue.checked,
                value: control.checked ? control.value : storedValue.value,
                originalControl: [...storedValue.originalControl, control],
              };
            } else {
              this.filterForm.addControl(
                control.name,
                new FormControl<string>(control.checked ? control.label : ''),
              );
              this.storedValues[control.name] = {
                ...control,
                checked: control.checked ?? false,
                value: control.checked ? control.value : '',
                originalControl: [control],
              };
            }
            break;
          case 'dropdown':
            this.filterForm.addControl(
              control.name,
              new FormControl<string>(control.value || ''),
            );
            this.storedValues[control.name] = {
              ...control,
              value: control.value ?? control.label,
              originalControl: control,
            };
            break;
          default:
            console.error('Control type not supported');
        }
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

  controlChange(control: any, event: any) {
    const formControl = this.filterForm.get(control.name);
    if (formControl) {
      switch (control.type) {
        case 'switch':
          formControl.setValue(event);
          const switchValue = {
            ...this.storedValues[control.name],
            checked: event,
          };
          this.storedValues[control.name] = switchValue;
          break;
        case 'checkbox':
          formControl.setValue(event.target.checked);
          const checkboxValue = {
            ...this.storedValues[control.name],
            checked: event.target.checked,
          };
          this.storedValues[control.name] = checkboxValue;
          break;
        case 'radial':
          formControl.setValue(control.label);
          const radialValue = {
            ...this.storedValues[control.name],
            checked: event.checked,
            value: control.value ?? control.label,
          };
          this.storedValues[control.name] = radialValue;
          break;
        case 'dropdown':
          formControl.setValue(event);
          this.storedValues[control.name] = {
            ...this.storedValues[control.name],
            value: control.value ?? control.label,
          };
          break;
        default: //for the tag option or any other option that does not have an activated control
          const updatedValue = !this.storedValues[control.name]?.checked;
          formControl.setValue(updatedValue);
          const elementValue = {
            ...this.storedValues[control.name],
            checked: updatedValue,
          };
          this.storedValues[control.name] = elementValue;
          break;
      }
    }
  }

  handleSubmit() {
    const formData: any = {};
    Object.keys(this.storedValues).forEach((key) => {
      if (
        (this.storedValues[key].checked &&
          (this.storedValues[key].type === 'checkbox' ||
            this.storedValues[key].type === 'tag' ||
            this.storedValues[key].type === 'radial' ||
            this.storedValues[key].type === 'switch')) ||
        (this.storedValues[key].value &&
          this.storedValues[key].type === 'dropdown')
      ) {
        formData[key] = this.storedValues[key];
      }
    });
    const globalSearchValue = this.filterForm.get('search')?.value;
    if (globalSearchValue) {
      formData.search = globalSearchValue;
    }
    this.modalService.closeModal(this.modalId() as string);
    this.applyFilters.emit(formData);
  }

  onReset() {
    this.filterForm.reset();
    this.resetFilters.emit();
  }

  getFormControl(name: string): FormControl {
    return this.filterForm.get(name) as FormControl;
  }

  onValueChange(event: string, name: string) {
    this.filterForm.get(name)?.setValue(event);
  }
}

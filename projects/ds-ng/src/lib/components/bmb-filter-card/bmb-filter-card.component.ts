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
import { BmbSwitchComponent } from '../bmb-switch/bmb-switch.component';
import { BmbRadialComponent } from '../bmb-radial/bmb-radial.component';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';
import { BmbTagComponent } from '../bmb-tags/bmb-tags.component';
import { ModalDataConfig } from '../bmb-modal/bmb-modal.interface';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { IBmbControlType } from './bmb-filter-card.interface';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbModalService } from '../../services/modal.service';

@Component({
  selector: 'bmb-filter-card',
  templateUrl: './bmb-filter-card.component.html',
  styleUrls: ['./bmb-filter-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbIconComponent,
    BmbInputComponent,
    BmbSwitchComponent,
    BmbRadialComponent,
    BmbCheckboxComponent,
    BmbTagComponent,
    BmbButtonDirective,
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
  controlTypes = input<IBmbControlType[]>([]);
  storedValues: { [name: string]: any } = {};
  inLine = input<boolean>(false);

  applyFilters = output<void>();
  resetFilters = output<void>();

  modalId = '';

  filterForm: FormGroup = new FormGroup({
    search: new FormControl<string>(''),
  });

  @ViewChild('modalTemplate') modalTemplate!: TemplateRef<any>;

  ngOnInit(): void {
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
  }

  constructor(private modalService: BmbModalService) {}

  openModalComponent() {
    this.modalId = this.modalService.openModal({
      title: this.modalTitle(),
      size: 'small',
      content: this.modalTemplate,
      scrollable: true,
      disableCloseButtonFooter: true,
      hideFooter: true,
    });
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
    this.applyFilters.emit(formData);
    this.modalService.closeModal(this.modalId);
  }

  onReset() {
    this.filterForm.reset();
    this.resetFilters.emit();
  }

  getFormControl(search: string): FormControl {
    return this.filterForm.get(search) as FormControl;
  }
}

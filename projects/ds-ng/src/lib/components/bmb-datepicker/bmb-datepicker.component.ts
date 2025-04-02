import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormsModule,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
  ValidationErrors,
  FormControl,
} from '@angular/forms';
import { DateTime } from 'luxon';
import {
  BmbInputComponent,
  IBmbInputAppearance,
} from '../bmb-input/bmb-input.component';
import { BmbDatepickerModalComponent } from './bmb-datepicker-modal/bmb-datepicker-modal.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';

@Component({
  selector: 'bmb-datepicker',
  standalone: true,
  imports: [
    FormsModule,
    BmbInputComponent,
    ReactiveFormsModule,
    BmbDatepickerModalComponent,
    ClickOutsideDirective,
  ],
  templateUrl: './bmb-datepicker.component.html',
  styleUrl: './bmb-datepicker.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDatepickerComponent implements OnInit {
  label = input<string>('');
  placeholder = input<string>('');
  icon = input<string>('calendar_month');
  invalidFormatErrorMessage = input<string>('Formato invalido');
  requiredFieldErrorMessage = input<string>('Campo requerido');
  appearance = input<IBmbInputAppearance | string>('normal');
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  isClearable = input<boolean>(false);
  control = input<FormControl>(new FormControl());
  dateFormat = input<string>('dd/MM/yyyy');
  // inline = input<boolean>(false);
  stepYearPicker = input<number>(18);
  name = input<string>('');
  disableDatesBefore = input<DateTime | undefined>(undefined);
  disableDatesAfter = input<DateTime | undefined>(undefined);
  lang = input<string>('es-MX');

  onChange = output<string>();

  now = DateTime.now();
  defaultDate = new Date();
  isWindowOpen = false;

  ngOnInit() {
    this.control().addValidators(this.customValidatorDate());
    this.control().updateValueAndValidity();
  }

  customValidatorDate(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      const isValidDate = DateTime.fromFormat(
        control.value,
        this.dateFormat(),
      ).isValid;

      return !isValidDate ? { validationDate: true } : null;
    };
  }

  getErrorMessage(errors: ValidationErrors | null): string {
    if (errors?.['validationDate']) return this.invalidFormatErrorMessage();
    if (errors?.['required']) return this.requiredFieldErrorMessage();
    return '';
  }

  handleFocusedEvent(event: boolean) {
    if (event) {
      this.isWindowOpen = event;
    }
  }

  handleWindowOpen(event: boolean) {
    this.isWindowOpen = event;
  }

  handleValueChange(event: string) {
    this.control().setValue(event);
    this.isWindowOpen = false;
    this.onChange.emit(event);
  }

  clickOutside(): void {
    this.isWindowOpen = false;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  ValidationErrors,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { DateTime } from 'luxon';
import {
  BmbInputComponent,
  IBmbInputAppearance,
  IBmbInputError,
} from '../bmb-input/bmb-input.component';
import { BmbDatepickerModalComponent } from './bmb-datepicker-modal/bmb-datepicker-modal.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import {
  getCustomValidation,
  getCustomValidationMessage,
  getUUID,
  isErrorMessageSet,
} from '../../utils/utils';
import {
  assignNewFormControl,
  newFormControlByType,
} from '../../utils/formControl';

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
  inputId = input<string>(getUUID());
  label = input<string>('');
  icon = input<string>('calendar_month');
  dateFormat = input<string>('dd/MM/yyyy');
  invalidFormatErrorMessage = input<string>(); //The default value is assigned as '||' in the corresponding error message
  requiredFieldErrorMessage = input<string>(); //The default value is assigned as '||' in the corresponding error message
  appearance = input<IBmbInputAppearance | string>('normal'); //Deprecated
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  isClearable = input<boolean>(false);
  placeholder = input<string>(this.dateFormat());
  // inline = input<boolean>(false);
  stepYearPicker = input<number>(18);
  name = input<string>(getUUID());
  disableDatesBefore = input<string>('');
  disableDatesAfter = input<string>('');
  lang = input<string>('es-MX');
  helperMessage = input<string>(this.dateFormat());
  value = input<string>();
  customValidation = input<ValidatorFn>();
  errorMessage = input<string | IBmbInputError>('');

  control = model<FormControl>(newFormControlByType());

  onChange = output<string>();

  now = DateTime.now();
  defaultDate = new Date();
  isWindowOpen = false;
  isControlNull: boolean = false;
  customValidationMessage: string = '';

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(assignNewFormControl(this.name(), this.control())!);
      this.isControlNull = true;
    }
  }

  handleCustomValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const { value } = control;
      if (!value) return null;

      const isValidDate = DateTime.fromFormat(
        control.value,
        this.dateFormat(),
      ).isValid;

      if (!isValidDate) {
        this.customValidationMessage = `Por favor ingresa la fecha con formato ${this.dateFormat()}`;
        return {
          customValidation: true,
        };
      }

      const result = getCustomValidation(
        this.customValidation()!,
        this.control(),
      );
      this.customValidationMessage = getCustomValidationMessage(
        result,
        this.errorMessage(),
      );

      return result;
    };
  }

  getErrorMessage(): IBmbInputError {
    const defaultErrorMessages: IBmbInputError = {
      required:
        this.requiredFieldErrorMessage() ||
        `Por favor ingresa la fecha de ${this.label()}`,
      customValidation: this.customValidationMessage,
    };

    if (isErrorMessageSet(this.errorMessage())) {
      const errorMessages = this.errorMessage() as IBmbInputError;
      return {
        ...defaultErrorMessages,
        required: errorMessages.required || defaultErrorMessages.required,
      };
    }

    return defaultErrorMessages;
  }

  handleFocusedEvent(event: KeyboardEvent | MouseEvent) {
    if (this.disabled()) return;

    if (event instanceof KeyboardEvent) {
      if (event.key === 'Enter' || event.key === ' ') {
        if (!this.isWindowOpen) {
          event.preventDefault();
          this.isWindowOpen = true;
        }
      }
    }

    if (event instanceof MouseEvent) {
      if (!this.isWindowOpen) this.isWindowOpen = true;
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

  convertToDate(date: string): DateTime | null {
    const dateTime = DateTime.fromFormat(date, this.dateFormat());
    return dateTime.isValid ? dateTime : null;
  }
}

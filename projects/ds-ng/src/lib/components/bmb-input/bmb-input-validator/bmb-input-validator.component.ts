import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  model,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  IBmbInputAppearance,
  IBmbInputError,
  IBmbInputType,
} from '../bmb-input.component';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IBbmSidePosition } from '../../../types';
import { CommonModule } from '@angular/common';
import { BmbTooltipComponent } from '../../bmb-tooltip/bmb-tooltip.component';
import { getPositionClass } from '../../../utils/utils';

export type IBmbInputValType =
  | 'radio'
  | 'checkbox'
  | 'email'
  | 'phone'
  | 'switch'
  | 'file';

@Component({
  selector: 'bmb-input-validator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BmbTooltipComponent],
  templateUrl: './bmb-input-validator.component.html',
  styleUrl: './bmb-input-validator.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInputValidatorComponent implements OnInit {
  inputId = input<string>('');
  type = input<IBmbInputType | IBmbInputValType>('text');
  appearance = input<IBmbInputAppearance | string>('normal');
  label = input<string>('');
  labelPosition = input<IBbmSidePosition | null>();
  name = input<string>('');
  value = input<string | string[]>();
  checked = input<boolean>(false);
  isRequired = input<boolean>(false);
  isDisabled = input<boolean>(false);
  max = input<number>();
  min = input<number>();
  maxLength = input<number>();
  minLength = input<number>();
  pattern = input<string>();
  jsonFormat = input<boolean>(false);
  tooltip = input<string>('');
  rows = input<number>(3);
  showMaxTextLength = input<boolean | null>(true);
  helperMessage = input<string>('');
  errorMessage = input<string | IBmbInputError>('');
  customValidation = input<ValidatorFn | ValidatorFn[]>();
  isMultipleFile = input<boolean | null>(true);

  showError = model<boolean>(false);
  control = model<FormControl>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!!this.min() && !!this.max() && this.max()! < this.min()!) {
      throw new Error(
        `
          [${this.name()}]: Please enter a value greater or equal than min.
          The values ​​entered are:
          -min: ${this.min()}
          -max: ${this.max()}
          `,
      );
    }

    this.addControlConfig(
      this.type(),
      this.value(),
      this.checked(),
      this.isRequired(),
      this.min()!,
      this.max()!,
      this.minLength()!,
      this.pattern()!,
      this.jsonFormat(),
      this.customValidation()!,
    );
  }

  addControlConfig(
    type: string,
    value: unknown,
    checked: boolean,
    isRequired: boolean,
    min: number,
    max: number,
    minLength: number,
    pattern: string,
    isJsonFormat: boolean,
    customValidation: ValidatorFn | ValidatorFn[],
  ): void {
    if (!this.control()?.value && (!!value || checked)) {
      this.addValue(this.control()!, type, value, checked);
    }

    if (isRequired && !this.control()?.hasValidator(Validators.required)) {
      this.control()?.addValidators(Validators.required);
    }

    if (min) {
      this.control()?.addValidators(Validators.min(min));
    }

    if (max) {
      this.control()?.addValidators(Validators.max(max));
    }

    if (minLength) {
      this.control()?.addValidators(Validators.minLength(minLength));
    }

    if (pattern) {
      this.control()?.addValidators(Validators.pattern(pattern));
    }

    if (type === 'email' && !this.control()?.hasValidator(Validators.email)) {
      this.control()?.addValidators(Validators.email);
    }

    if (isJsonFormat) {
      this.control()?.addValidators(this.validatorError('jsonValidation'));
    }

    if (!!customValidation) {
      if (Array.isArray(customValidation)) {
        customValidation.forEach((currentValidation: ValidatorFn) =>
          this.control()?.addValidators(this.validatorError(currentValidation)),
        );
      } else {
        this.control()?.addValidators(this.validatorError(customValidation));
      }
    }

    if (this.isDisabled()) this.control()?.disable();
    else this.control()?.enable();

    this.control()?.valueChanges.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  validatorError(errorType: string | ValidatorFn): ValidatorFn {
    if (typeof errorType === 'string') {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
          return null;
        }

        if (errorType === 'jsonValidation') {
          try {
            JSON.parse(control.value);
            return null;
          } catch (e) {
            return { invalidJson: true };
          }
        }
        return null;
      };
    } else {
      return errorType;
    }
  }

  addValue(
    control: FormControl,
    type: string,
    value: unknown,
    checked: boolean,
  ): void {
    if (type === 'checkbox' || type === 'radio') {
      if (checked) {
        if (!!value) control.setValue(value);
        else control.setValue(checked);
      }
      return;
    }

    if (type === 'switch') {
      if (checked) control.setValue(checked);
      return;
    }

    if (value) {
      control.setValue(value);
      return;
    }
  }

  getClasses(className: string): string {
    if (this.type() === 'radio' || this.type() === 'checkbox') {
      return getPositionClass(`${className}-direction`, this.labelPosition()!);
    }

    return '';
  }

  getErrorType(
    errorMessages: IBmbInputError,
    type: string,
    alternativeMessage: string,
  ): string {
    if (!!errorMessages && !!(errorMessages as any)[type])
      return (errorMessages as any)[type];
    return alternativeMessage;
  }

  isFieldRequired(): boolean {
    return (
      this.control()?.hasValidator(Validators.required) || this.isRequired()
    );
  }

  getErrorMessage(): string {
    if (typeof this.errorMessage() === 'string' && !!this.errorMessage()) {
      return this.errorMessage().toString();
    }

    const errorMessages = this.errorMessage() as IBmbInputError;

    if (this.control()?.hasError('pattern'))
      return this.getErrorType(
        errorMessages,
        'pattern',
        `Por favor ingresa el formato permitido ${this.pattern()}`,
      );
    if (this.control()?.hasError('min'))
      return this.getErrorType(
        errorMessages,
        'min',
        `Por favor ingresa un valor mayor o igual que ${this.min()}`,
      );
    if (this.control()?.hasError('max'))
      return this.getErrorType(
        errorMessages,
        'max',
        `Por favor ingresa un valor menor o igual que ${this.max()}`,
      );
    if (this.control()?.hasError('minlength'))
      return this.getErrorType(
        errorMessages,
        'minLength',
        `Por favor ingresa al menos ${this.minLength()} carácteres`,
      );
    if (this.control()?.hasError('maxlength'))
      return this.getErrorType(
        errorMessages,
        'maxLength',
        `Por favor ingresa máximo ${this.maxLength()} carácteres`,
      );
    if (this.control()?.hasError('required'))
      return this.getErrorType(
        errorMessages,
        'required',
        `Por favor ingresa el dato de ${this.label()}`,
      );
    if (this.control()?.hasError('invalidJson'))
      return this.getErrorType(
        errorMessages,
        'jsonFormat',
        'Por favor ingresa el contenido en formato JSON válido',
      );
    if (this.control()?.hasError('customValidation'))
      return errorMessages?.customValidation || '';

    return '';
  }
}

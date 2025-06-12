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
  IBmbInputTooltipPosition,
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

export type IBmbInputValType = 'checkbox' | 'email' | 'phone' | 'switch';

@Component({
  selector: 'bmb-input-validation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BmbTooltipComponent],
  templateUrl: './bmb-input-validation.component.html',
  styleUrl: './bmb-input-validation.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInputValidationComponent implements OnInit {
  inputId = input<string>('');
  type = input<IBmbInputType | IBmbInputValType>('text');
  appearance = input<IBmbInputAppearance | string>('normal');
  label = input<string>('');
  labelPosition = input<IBbmSidePosition | null>();
  name = input<string>('');
  value = input<string | string[]>();
  checked = input<boolean>(false);
  isRequired = input<boolean>(false);
  idDisabled = input<boolean>(false);
  max = input<number>();
  min = input<number>();
  maxLength = input<number>();
  minLength = input<number>();
  pattern = input<string>();
  jsonFormat = input<boolean>(false);
  tooltip = input<string>('');
  rows = input<number>(3);
  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  });
  showMaxTextLength = input<boolean | null>(true);
  helperMessage = input<string>('');
  errorMessage = input<string | IBmbInputError>('');
  customValidation = input<ValidatorFn>();

  isCustomError = model<boolean>(false);
  showError = model<boolean>(false);
  control = model<FormControl>();

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
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
      this.isCustomError(),
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
    isCustomError: boolean,
    customValidation: ValidatorFn,
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

    if (isCustomError) {
      this.control()?.addValidators(this.validatorError(customValidation));
    }

    if (this.idDisabled()) this.control()?.disable();
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
    if (type === 'radio') {
      if (checked) control.setValue(value);
      return;
    }

    if (type === 'checkbox' || type === 'switch') {
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

  getErrorMessage(): string {
    if (typeof this.errorMessage() === 'string') {
      return this.errorMessage().toString();
    }

    const error = this.errorMessage() as IBmbInputError;

    if (this.control()?.hasError('pattern') && !!error.pattern)
      return error.pattern;
    if (this.control()?.hasError('min') && !!error.min) return error.min;
    if (this.control()?.hasError('max') && !!error.max) return error.max;
    if (this.control()?.hasError('minlength') && !!error.minLength)
      return error.minLength;
    if (this.control()?.hasError('maxlength') && !!error.maxLength)
      return error.maxLength;
    if (this.control()?.hasError('required') && !!error.required)
      return error.required;
    if (this.control()?.hasError('invalidJson') && !!error.jsonFormat)
      return error.jsonFormat;
    if (
      this.control()?.hasError('customValidation') &&
      !!error.customValidation
    )
      return error.customValidation;

    return '';
  }
}

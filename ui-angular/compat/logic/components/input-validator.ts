export {
  getInputValidatorClasses,
  getInputValidatorErrorType,
} from './input-validator-core';
import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IBmbInputError } from '../../types/input';

export function getInputValidatorValidatorError(
  errorType: string | ValidatorFn,
): ValidatorFn {
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

export function addInputValidatorValue(
  control: FormControl,
  type: string,
  value: unknown,
  checked: boolean,
): void {
  if (type === 'checkbox' || type === 'radio') {
    if (checked) {
      if (value) control.setValue(value);
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

export function configureInputValidatorControl({
  control,
  type,
  value,
  checked,
  isRequired,
  min,
  max,
  minLength,
  pattern,
  isJsonFormat,
  customValidation,
  isDisabled,
}: {
  control: FormControl | undefined;
  type: string;
  value: unknown;
  checked: boolean;
  isRequired: boolean;
  min: number;
  max: number;
  minLength: number;
  pattern: string;
  isJsonFormat: boolean;
  customValidation: ValidatorFn | ValidatorFn[];
  isDisabled: boolean;
}): void {
  if (!control?.value && (!!value || checked)) {
    addInputValidatorValue(control!, type, value, checked);
  }

  if (isRequired && !control?.hasValidator(Validators.required)) {
    control?.addValidators(Validators.required);
  }

  if (min) {
    control?.addValidators(Validators.min(min));
  }

  if (max) {
    control?.addValidators(Validators.max(max));
  }

  if (minLength) {
    control?.addValidators(Validators.minLength(minLength));
  }

  if (pattern) {
    control?.addValidators(Validators.pattern(pattern));
  }

  if (type === 'email' && !control?.hasValidator(Validators.email)) {
    control?.addValidators(Validators.email);
  }

  if (isJsonFormat) {
    control?.addValidators(getInputValidatorValidatorError('jsonValidation'));
  }

  if (customValidation) {
    if (Array.isArray(customValidation)) {
      customValidation.forEach((currentValidation: ValidatorFn) =>
        control?.addValidators(
          getInputValidatorValidatorError(currentValidation),
        ),
      );
    } else {
      control?.addValidators(getInputValidatorValidatorError(customValidation));
    }
  }

  if (isDisabled) control?.disable();
  else control?.enable();
}

export function getInputValidatorIsFieldRequired({
  control,
  isRequired,
}: {
  control: FormControl | undefined;
  isRequired: boolean;
}): boolean {
  return control?.hasValidator(Validators.required) || isRequired;
}

import { getInputErrorMessage } from './input-validator-core';
export function getInputValidatorErrorMessage(options: {
  control: FormControl | undefined;
  errorMessage: string | IBmbInputError;
  pattern: string | undefined;
  min: number | undefined;
  max: number | undefined;
  minLength: number | undefined;
  maxLength: number | undefined;
  label: string;
}): string {
  const errors: Record<string, boolean> = {};
  if (!(typeof options.errorMessage === 'string' && options.errorMessage)) {
    for (const key of [
      'pattern',
      'min',
      'max',
      'minlength',
      'maxlength',
      'required',
      'invalidJson',
      'customValidation',
    ]) {
      if (options.control?.hasError(key)) {
        errors[key] = true;
        break;
      }
    }
  }
  return getInputErrorMessage({ ...options, errors });
}

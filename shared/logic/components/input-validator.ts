import {
  AbstractControl,
  FormControl,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IBmbInputError } from '../../types/input';
import { getPositionClass } from '../utils';

export function getInputValidatorClasses({
  type,
  className,
  labelPosition,
}: {
  type: string;
  className: string;
  labelPosition: string | null | undefined;
}): string {
  if (type === 'radio' || type === 'checkbox') {
    return getPositionClass(`${className}-direction`, labelPosition!);
  }

  return '';
}

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

export function getInputValidatorErrorType(
  errorMessages: IBmbInputError,
  type: string,
  alternativeMessage: string,
): string {
  if (!!errorMessages && !!(errorMessages as any)[type])
    return (errorMessages as any)[type];
  return alternativeMessage;
}

export function getInputValidatorErrorMessage({
  control,
  errorMessage,
  pattern,
  min,
  max,
  minLength,
  maxLength,
  label,
}: {
  control: FormControl | undefined;
  errorMessage: string | IBmbInputError;
  pattern: string | undefined;
  min: number | undefined;
  max: number | undefined;
  minLength: number | undefined;
  maxLength: number | undefined;
  label: string;
}): string {
  if (typeof errorMessage === 'string' && !!errorMessage) {
    return errorMessage.toString();
  }

  const errorMessages = errorMessage as IBmbInputError;

  if (control?.hasError('pattern'))
    return getInputValidatorErrorType(
      errorMessages,
      'pattern',
      `Por favor ingresa el formato permitido ${pattern}`,
    );
  if (control?.hasError('min'))
    return getInputValidatorErrorType(
      errorMessages,
      'min',
      `Por favor ingresa un valor mayor o igual que ${min}`,
    );
  if (control?.hasError('max'))
    return getInputValidatorErrorType(
      errorMessages,
      'max',
      `Por favor ingresa un valor menor o igual que ${max}`,
    );
  if (control?.hasError('minlength'))
    return getInputValidatorErrorType(
      errorMessages,
      'minLength',
      `Por favor ingresa al menos ${minLength} carácteres`,
    );
  if (control?.hasError('maxlength'))
    return getInputValidatorErrorType(
      errorMessages,
      'maxLength',
      `Por favor ingresa máximo ${maxLength} carácteres`,
    );
  if (control?.hasError('required'))
    return getInputValidatorErrorType(
      errorMessages,
      'required',
      `Por favor ingresa el dato de ${label}`,
    );
  if (control?.hasError('invalidJson'))
    return getInputValidatorErrorType(
      errorMessages,
      'jsonFormat',
      'Por favor ingresa el contenido en formato JSON válido',
    );
  if (control?.hasError('customValidation'))
    return errorMessages?.customValidation || '';

  return '';
}

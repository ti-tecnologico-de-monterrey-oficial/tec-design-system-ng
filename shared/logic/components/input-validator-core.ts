import type { IBmbInputError } from '../../types/input';
import { getPositionClass } from '../utils-core';
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

export function getInputValidatorErrorType(
  errorMessages: IBmbInputError,
  type: string,
  alternativeMessage: string,
): string {
  if (!!errorMessages && !!(errorMessages as any)[type])
    return (errorMessages as any)[type];
  return alternativeMessage;
}

export function getInputErrorMessage({
  errors,
  errorMessage,
  pattern,
  min,
  max,
  minLength,
  maxLength,
  label,
}: {
  errors: Record<string, unknown> | null | undefined;
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

  if (errors?.['pattern'])
    return getInputValidatorErrorType(
      errorMessages,
      'pattern',
      `Por favor ingresa el formato permitido ${pattern}`,
    );
  if (errors?.['min'])
    return getInputValidatorErrorType(
      errorMessages,
      'min',
      `Por favor ingresa un valor mayor o igual que ${min}`,
    );
  if (errors?.['max'])
    return getInputValidatorErrorType(
      errorMessages,
      'max',
      `Por favor ingresa un valor menor o igual que ${max}`,
    );
  if (errors?.['minlength'])
    return getInputValidatorErrorType(
      errorMessages,
      'minLength',
      `Por favor ingresa al menos ${minLength} carácteres`,
    );
  if (errors?.['maxlength'])
    return getInputValidatorErrorType(
      errorMessages,
      'maxLength',
      `Por favor ingresa máximo ${maxLength} carácteres`,
    );
  if (errors?.['required'])
    return getInputValidatorErrorType(
      errorMessages,
      'required',
      `Por favor ingresa el dato de ${label}`,
    );
  if (errors?.['invalidJson'])
    return getInputValidatorErrorType(
      errorMessages,
      'jsonFormat',
      'Por favor ingresa el contenido en formato JSON válido',
    );
  if (errors?.['customValidation'])
    return errorMessages?.customValidation || '';

  return '';
}

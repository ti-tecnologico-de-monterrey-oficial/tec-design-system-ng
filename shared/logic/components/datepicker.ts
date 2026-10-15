import { DateTime } from 'luxon';
import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import {
  getCustomValidation,
  getCustomValidationMessage,
  isErrorMessageSet,
} from '../utils';
import { IBmbInputError } from '../../types/input';

export function getDatepickerValidationResult(
  value: string,
  dateFormat: string,
  customValidation: ValidatorFn | undefined,
  control: FormControl,
  errorMessage: string | IBmbInputError,
): { errors: ValidationErrors | null; message?: string } {
  if (!value) return { errors: null };

  const isValidDate = DateTime.fromFormat(value, dateFormat).isValid;

  if (!isValidDate) {
    return {
      errors: { customValidation: true },
      message: `Por favor ingresa la fecha con formato ${dateFormat}`,
    };
  }

  const result = getCustomValidation(customValidation!, control);

  return { errors: result, message: getCustomValidationMessage(result, errorMessage) };
}

export function buildDatepickerErrorMessage(
  requiredFieldErrorMessage: string | undefined,
  label: string,
  customValidationMessage: string,
  errorMessage: string | IBmbInputError,
): IBmbInputError {
  const defaultErrorMessages: IBmbInputError = {
    required: requiredFieldErrorMessage || `Por favor ingresa la fecha de ${label}`,
    customValidation: customValidationMessage,
  };

  if (isErrorMessageSet(errorMessage)) {
    const errorMessages = errorMessage as IBmbInputError;
    return {
      ...defaultErrorMessages,
      required: errorMessages.required || defaultErrorMessages.required,
    };
  }

  return defaultErrorMessages;
}

export function parseDatepickerDate(
  date: string,
  dateFormat: string,
): DateTime | null {
  const dateTime = DateTime.fromFormat(date, dateFormat);
  return dateTime.isValid ? dateTime : null;
}

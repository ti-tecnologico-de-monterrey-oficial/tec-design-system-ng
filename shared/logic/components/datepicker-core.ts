import type { ValidationErrors } from '../../types/validation';
import { DateTime } from 'luxon';
import {
  getCustomValidation,
  getCustomValidationMessage,
  isErrorMessageSet,
} from '../utils-core';
import { IBmbInputError } from '../../types/input';

export function getDatepickerValidationResult<TValue>(
  value: string,
  dateFormat: string,
  customValidation: ((value: TValue) => ValidationErrors | null) | undefined,
  control: TValue,
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

  return {
    errors: result,
    message: getCustomValidationMessage(result, errorMessage),
  };
}

export function buildDatepickerErrorMessage(
  requiredFieldErrorMessage: string | undefined,
  label: string,
  customValidationMessage: string,
  errorMessage: string | IBmbInputError,
): IBmbInputError {
  const defaultErrorMessages: IBmbInputError = {
    required:
      requiredFieldErrorMessage || `Por favor ingresa la fecha de ${label}`,
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

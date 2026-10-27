import type {
  FormControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import type { IBmbInputError } from '../../types/input';
import * as Core from './datepicker-core';
export * from './datepicker-core';
export function getDatepickerValidationResult(
  value: string,
  dateFormat: string,
  customValidation: ValidatorFn | undefined,
  control: FormControl,
  errorMessage: string | IBmbInputError,
): { errors: ValidationErrors | null; message?: string } {
  return Core.getDatepickerValidationResult(
    value,
    dateFormat,
    customValidation,
    control,
    errorMessage,
  );
}

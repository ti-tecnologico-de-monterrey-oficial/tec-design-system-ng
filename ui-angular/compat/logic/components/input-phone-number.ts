import type {
  FormControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import type { IBmbInputError } from '../../types/input';
import * as Core from './input-phone-number-core';
export * from './input-phone-number-core';
export function getPhoneNumberValidationResult(
  value: string,
  hasPatternError: boolean,
  hasLengthOrMinLengthError: boolean,
  lada: string,
  length: number,
  customValidation: ValidatorFn | undefined,
  control: FormControl,
  errorMessage: string | IBmbInputError,
): { errors: ValidationErrors | null; message?: string } {
  return Core.getPhoneNumberValidationResult(
    value,
    hasPatternError,
    hasLengthOrMinLengthError,
    lada,
    length,
    customValidation,
    control,
    errorMessage,
  );
}

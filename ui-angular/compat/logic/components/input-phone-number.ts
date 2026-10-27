import type {
  FormControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import type { IBmbInputError } from '../../types/input';
import * as Core from './input-phone-number-core';
export * from './input-phone-number-core';
type PhoneNumberValidationArguments = [
  value: string,
  hasPatternError: boolean,
  hasLengthOrMinLengthError: boolean,
  lada: string,
  length: number,
  customValidation: ValidatorFn | undefined,
  control: FormControl,
  errorMessage: string | IBmbInputError,
];

// Keep the existing eight positional arguments and delegate without another wrapper.
export const getPhoneNumberValidationResult: (
  ...args: PhoneNumberValidationArguments
) => { errors: ValidationErrors | null; message?: string } =
  Core.getPhoneNumberValidationResult;

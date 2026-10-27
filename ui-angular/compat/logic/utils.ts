import type {
  FormControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import * as Core from './utils-core';
export * from './utils-core';
export function getCustomValidation(
  customValidation: ValidatorFn,
  formControl: FormControl,
): ValidationErrors | null {
  return Core.getCustomValidation(customValidation, formControl);
}

export { getUUID, handleImageNotFoundError } from './browser/utils';

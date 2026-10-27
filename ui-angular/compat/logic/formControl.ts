import {
  getInitialFieldValue,
  showError as showFieldError,
} from './formControl-core';
import { FormControl } from '@angular/forms';
import { IBmbInputType, IBmbInputValType } from '../types/input';

export const showError = (control: FormControl): boolean =>
  showFieldError(control);

export const newFormControlByType = (
  type: IBmbInputType | IBmbInputValType = 'text',
  isMultipleFile = false,
): FormControl => {
  return new FormControl(getInitialFieldValue(type, isMultipleFile));
};

export const assignNewFormControl = (
  name: string,
  control: FormControl,
  type: IBmbInputType | IBmbInputValType = 'text',
  isMultipleFile = false,
): FormControl | null => {
  if (!control) {
    console.warn(
      `[bmb-input - ${name}] -`,
      'The assigned control was not valid, a new formControl was generated.',
    );
    return newFormControlByType(type, isMultipleFile);
  }
  return null;
};

export const handleValidity = (control: FormControl): void => {
  control.updateValueAndValidity();
  control.markAsTouched();
};

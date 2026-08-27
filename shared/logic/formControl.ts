import { FormControl } from '@angular/forms';
import { IBmbInputType, IBmbInputValType } from '../types/input';

export const showError = (control: FormControl): boolean => {
  return (control?.invalid && (control?.touched || control?.dirty)) || false;
};

export const newFormControlByType = (
  type: IBmbInputType | IBmbInputValType = 'text',
  isMultipleFile = false,
): FormControl => {
  if (
    type === 'radio' ||
    type === 'checkbox' ||
    type === 'phone' ||
    type === 'number' ||
    type === 'switch'
  )
    return new FormControl(null);

  if (type === 'file') return new FormControl(isMultipleFile ? [null] : null);

  return new FormControl('');
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

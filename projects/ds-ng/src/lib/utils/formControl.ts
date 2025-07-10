import { FormControl } from '@angular/forms';
import { IBmbInputType } from '../components/bmb-input/bmb-input.component';
import { IBmbInputValType } from '../components/bmb-input/bmb-input-validator/bmb-input-validator.component';

export const showError = (control: FormControl): boolean => {
  return (control?.invalid && (control?.touched || control?.dirty)) || false;
};

export const newFormControlByType = (
  type: IBmbInputType | IBmbInputValType = 'text',
): FormControl => {
  if (
    type === 'radio' ||
    type === 'checkbox' ||
    type === 'phone' ||
    type === 'number' ||
    type === 'switch'
  )
    return new FormControl(null);

  return new FormControl('');
};

export const assignNewFormControl = (
  name: string,
  control: FormControl,
  type: IBmbInputType | IBmbInputValType = 'text',
): FormControl | null => {
  if (!control) {
    console.warn(
      `[bmb-input - ${name}] -`,
      'The assigned control was not valid, a new formControl was generated.',
    );
    return newFormControlByType(type);
  }
  return null;
};

export const handleValidity = (control: FormControl): void => {
  control.updateValueAndValidity();
  control.markAsTouched();
};

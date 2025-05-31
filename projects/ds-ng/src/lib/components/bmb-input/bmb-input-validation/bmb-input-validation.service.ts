import { ChangeDetectorRef, Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  Validators,
  ValidatorFn,
} from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class BmbInputValidationService {
  private controls: { [key: string]: FormControl } = {};

  getFormControlByName(name: string): FormControl {
    return this.controls[name] as FormControl;
  }

  setFormControl(controlAdded: FormControl, type: string, name: string): void {
    if (!this.getFormControlByName(name)) {
      if (controlAdded) {
        this.controls[name] = controlAdded;
        return;
      }

      this.controls[name] = this.newFormControlByType(type);
    }
  }

  newFormControlByType(type: any): FormControl {
    if (
      type === 'radio' ||
      type === 'checkbox' ||
      type === 'phone' ||
      type === 'number' ||
      type === 'switch'
    )
      return new FormControl(null);

    return new FormControl('');
  }

  addValue(
    control: FormControl,
    type: string,
    value: unknown,
    checked: boolean,
  ): void {
    if (type === 'radio') {
      if (checked) control.setValue(value);
      return;
    }

    if (type === 'checkbox' || type === 'switch') {
      if (checked) control.setValue(checked);
      return;
    }

    if (value) {
      control.setValue(value);
      return;
    }
  }

  addControlConfig(
    type: string,
    name: string,
    value: unknown,
    checked: boolean,
    isRequired: boolean,
    min: number,
    max: number,
    minLength: number,
    pattern: string,
    isJsonFormat: boolean,
    isCustomError: boolean,
    customValidation: ValidatorFn,
    cdr: ChangeDetectorRef,
  ): void {
    const formControl: FormControl = this.getFormControlByName(name);

    if (!formControl.value && (!!value || checked)) {
      this.addValue(formControl, type, value, checked);
    }

    if (isRequired && !formControl.hasValidator(Validators.required)) {
      formControl.addValidators(Validators.required);
    }

    if (min) {
      formControl.addValidators(Validators.min(min));
    }

    if (max) {
      formControl.addValidators(Validators.max(max));
    }

    if (minLength) {
      formControl.addValidators(Validators.minLength(minLength));
    }

    if (pattern) {
      formControl.addValidators(Validators.pattern(pattern));
    }

    if (type === 'email' && !formControl.hasValidator(Validators.email)) {
      formControl.addValidators(Validators.email);
    }

    if (isJsonFormat) {
      formControl.addValidators(this.validatorError('jsonValidation'));
    }

    if (isCustomError) {
      formControl.addValidators(this.validatorError(customValidation));
    }

    formControl.valueChanges.subscribe(() => {
      cdr.markForCheck();
    });
  }

  validatorError(errorType: string | ValidatorFn): ValidatorFn {
    if (typeof errorType === 'string') {
      return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
          return null;
        }

        if (errorType === 'jsonValidation') {
          try {
            JSON.parse(control.value);
            return null;
          } catch (e) {
            return { invalidJson: true };
          }
        }
        return null;
      };
    } else {
      return errorType;
    }
  }

  showError(name: string): boolean {
    const control = this.getFormControlByName(name);
    return (control?.invalid && (control?.touched || control?.dirty)) || false;
  }

  handleValidity(name: string): void {
    const control: FormControl = this.getFormControlByName(name);
    control.updateValueAndValidity();
    control.markAsTouched();
  }
}

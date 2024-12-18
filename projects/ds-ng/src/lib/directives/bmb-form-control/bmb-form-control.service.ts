import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class BmbFormService {
  private formGroup: FormGroup = new FormGroup({});
  private textLength: { [key: string]: number } = {};

  getFormGroup(): FormGroup {
    return this.formGroup;
  }

  setFormGroup(formGroup: FormGroup): void {
    this.formGroup = formGroup;
  }

  getFormControlByName(name: string): FormControl {
    return this.getFormGroup().get(name) as FormControl;
  }

  setFormControl(controlAdded: FormControl, type: string, name: string): void {
    if (this.getFormControlByName(name) === null) {
      if (controlAdded) {
        this.formGroup.addControl(name, controlAdded);
        return;
      }

      this.setFormControlByType(type, name);
    }
  }

  setFormControlByType(type: any, name: string): void {
    if (
      type === 'radio' ||
      type === 'checkbox' ||
      type === 'phone' ||
      type === 'number' ||
      type === 'switch'
    ) {
      this.formGroup.addControl(name, new FormControl(null));
      return;
    }

    this.formGroup.addControl(name, new FormControl(''));
  }

  getTextLength(key: string): number {
    return this.textLength[key] || 0;
  }

  setTextLength(key: string, value: number): void {
    this.textLength[key] = value;
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
    cdr: ChangeDetectorRef,
  ): void {
    const formControl: FormControl = this.getFormControlByName(name);
    const control = this.getFormControlByName(name);
    const valueControlAdded = control.value;
    if (!valueControlAdded) {
      this.addValue(control, type, value, checked);
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

    if (type !== 'phone') {
      formControl.valueChanges.subscribe(() => {
        cdr.markForCheck();
      });
    }
  }

  showError(type: string, name: string): boolean {
    const control = this.getFormGroup().get(name);
    if (control !== null) {
      if (
        type.toLocaleLowerCase() === 'checkbox' &&
        this.getFormControlByName(name).value !== null
      ) {
        return !this.getFormControlByName(name).value;
      }
      return control.invalid && (control.touched || control.dirty);
    }

    return false;
  }

  showErrorByValidation(name: string, validValue: string): boolean {
    const control = this.getFormGroup().get(name);
    if (control !== null) {
      control.setValue(validValue);
      control.updateValueAndValidity();
      return !!!validValue && (control.touched || control.dirty);
    }

    return false;
  }
}

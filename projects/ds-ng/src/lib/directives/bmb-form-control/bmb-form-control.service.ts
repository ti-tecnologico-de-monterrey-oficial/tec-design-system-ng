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

  setFormControl(name: string, control: FormControl): void {
    this.addFormControl(name, control);
  }

  setFormControlByType(type: any, name: string, value: unknown): void {
    if (type === 'radio' || type === 'checkbox') {
      this.addFormControl(name, new FormControl(null));
      return;
    }

    if (type === 'phone' || type === 'number') {
      this.addFormControl(name, new FormControl(value || null));
      return;
    }

    this.addFormControl(name, new FormControl(value || ''));
  }

  addFormControl(name: string, control: FormControl): void {
    if (!this.getFormControlByName(name)) {
      this.formGroup.addControl(name, control);
    }
  }

  getTextLength(key: string): number {
    return this.textLength[key] || 0;
  }

  setTextLength(key: string, value: number): void {
    this.textLength[key] = value;
  }

  getControl(
    type: string,
    name: string,
    value: unknown,
    isAddConfig: boolean,
    isRequired: boolean,
    cdr: ChangeDetectorRef,
    control: FormControl,
  ): FormControl {
    if (control) {
      this.setFormControl(name, control);
    }

    const newControl = this.getFormControlByName(name);
    if (newControl === null) {
      this.setFormControlByType(type, name, value);
    }

    if (isAddConfig) {
      if (isRequired && !newControl.hasValidator(Validators.required)) {
        newControl.addValidators(Validators.required);
      }

      if (type === 'email' && !control.hasValidator(Validators.email)) {
        control.addValidators(Validators.email);
      }

      if (type !== 'phone') {
        newControl.valueChanges.subscribe(() => {
          cdr.markForCheck();
        });
      }
    }

    return this.getFormControlByName(name);
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

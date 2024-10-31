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

  getFormControl(name: string): FormControl {
    return this.getFormGroup().get(name) as FormControl;
  }

  setFormControl(name: string, control: FormControl): void {
    this.addFormControl(name, control);
  }

  setFormControlByType(name: string, type: any): void {
    if (type === 'radio' || type === 'phone') {
      this.addFormControl(name, new FormControl(null));
      return;
    }

    if (type === 'number') {
      this.addFormControl(name, new FormControl(0));
      return;
    }

    this.addFormControl(name, new FormControl<string>(''));
  }

  addFormControl(name: string, control: FormControl): void {
    if (!this.getFormControl(name)) {
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

    const newControl = this.getFormControl(name);
    if (newControl === null) {
      this.setFormControlByType(name, type);
    }

    if (isAddConfig) {
      if (isRequired && !newControl.hasValidator(Validators.required)) {
        newControl.addValidators(Validators.required);
      }

      if (type === 'email' && !control.hasValidator(Validators.email)) {
        control.addValidators(Validators.email);
      }

      if (type !== 'radio' && type !== 'phone') {
        control.setValue(value);
      }

      if (type !== 'phone') {
        newControl.valueChanges.subscribe(() => {
          cdr.markForCheck();
        });
      }
    }

    return this.getFormControl(name);
  }

  showError(name: string): boolean {
    const control = this.getFormGroup().get(name);
    if (control !== null) {
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

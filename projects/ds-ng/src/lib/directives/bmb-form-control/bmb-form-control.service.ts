import { ChangeDetectorRef, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class BmbFormService {
  private controls: { [key: string]: FormControl } = {};
  private textLength: { [key: string]: number } = {};

  getFormControlByName(name: string): FormControl {
    return this.controls[name] as FormControl;
  }

  setFormControl(controlAdded: FormControl, type: string, name: string): void {
    if (!this.getFormControlByName(name)) {
      if (controlAdded) {
        this.controls[name] = controlAdded;
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
      this.controls[name] = new FormControl(null);
      return;
    }

    this.controls[name] = new FormControl('');
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

    if (!formControl.value) {
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

    if (type !== 'phone') {
      formControl.valueChanges.subscribe(() => {
        cdr.markForCheck();
      });
    }
  }

  showError(name: string): boolean {
    const control = this.getFormControlByName(name);
    return (control?.invalid && (control?.touched || control?.dirty)) || false;
  }
}

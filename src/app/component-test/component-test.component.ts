import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BmbButtonDirective,
  BmbCheckboxComponent,
  BmbDatepickerComponent,
  BmbInputComponent,
  BmbRadialComponent,
  BmbDateRangeComponent,
} from '../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-app',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbButtonDirective,
    BmbDatepickerComponent,
    BmbCheckboxComponent,
    BmbDateRangeComponent,
    BmbRadialComponent,
    BmbInputComponent,
  ],
  templateUrl: './component-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  userForm: FormGroup = new FormGroup({
    date_picker: new FormControl(),
    checkbox: new FormControl(),
    date_range_start: new FormControl(),
    date_range_end: new FormControl(),
    radial_group: new FormControl(),
    input_field: new FormControl(),
  });

  handleCheckboxChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    console.log('Checkbox checked state:', element.checked);
    console.log('Checkbox name:', element.name);
  }

  handleRadial(element: HTMLInputElement): void {
    console.log('Radio value:', element.value);
    console.log('Radio name:', element.name);
  }

  onSubmit() {
    if (this.userForm.valid) {
      //Add your code
      return;
    }
    this.userForm.markAllAsTouched();
    this.updateErrorState();
  }

  updateErrorState() {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.getFormControl(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }
}

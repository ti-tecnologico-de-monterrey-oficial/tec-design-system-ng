import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BmbButtonDirective,
  BmbCheckboxComponent,
  BmbDatepickerComponent,
  BmbInputComponent,
  BmbRadialComponent,
} from '../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-app',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbButtonDirective,
    BmbInputComponent,
    BmbDatepickerComponent,
    BmbCheckboxComponent,
    BmbRadialComponent,
  ],
  templateUrl: './component-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  userForm: FormGroup = new FormGroup({
    input_field1: new FormControl(),
    datepicker1: new FormControl(),
    checkbox1: new FormControl(),
    checkbox2: new FormControl(),
    radial1: new FormControl(),
  });

  handleCheckboxChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    console.log('Checkbox checked state:', element.checked);
    console.log('Checkbox name:', element.name);
  }

  handleRadial(element: HTMLInputElement): void {
    console.log('Radio value:', element.value);
    console.log('Radio name:', element.name);
    console.log('Is it checked?', element.checked);
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

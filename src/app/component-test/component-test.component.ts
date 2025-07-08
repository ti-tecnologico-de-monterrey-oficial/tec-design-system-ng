import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BmbButtonDirective,
  BmbInputComponent,
} from '../../../projects/ds-ng/src/public-api';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'bmb-app',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbButtonDirective,
    BmbInputComponent,
  ],
  templateUrl: './component-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  userForm: FormGroup = new FormGroup({
    input_field1: new FormControl(),
  });

  //Add your code

  onSubmit() {
    console.log(this.userForm);
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

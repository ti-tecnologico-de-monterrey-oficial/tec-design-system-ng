import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  BmbInputPhoneNumberComponent,
  BmbButtonDirective,
  BmbInputComponent,
  BmbWheelMenuComponent,
} from '../../../projects/ds-ng/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-home',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BmbInputPhoneNumberComponent,
    CommonModule,
    BmbButtonDirective,
    BmbInputComponent,
    BmbWheelMenuComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  userForm: FormGroup;
  isPhoneDisabled = false;
  showErrors: { [key: string]: boolean } = {};

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
  ) {
    this.userForm = this.fb.group({
      phone: new FormControl(
        { value: null, disabled: this.isPhoneDisabled },
        Validators.required,
      ),
      name: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
      this.updateErrorState();
      this.cdr.markForCheck();
    }
  }

  updateErrorState() {
    Object.keys(this.userForm.controls).forEach((field) => {
      const control = this.userForm.get(field);
      if (control instanceof FormControl) {
        this.showErrors[field] =
          control.invalid && (control.touched || control.dirty);
      }
    });
  }

  get phoneControl(): FormControl {
    return this.userForm.get('phone') as FormControl;
  }

  get nameControl(): FormControl {
    return this.userForm.get('name') as FormControl;
  }
}

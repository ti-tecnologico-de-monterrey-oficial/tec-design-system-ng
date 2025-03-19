import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  BmbButtonDirective,
  BmbDropdownComponent,
} from '../../projects/ds-ng/src/public-api';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BmbDropdownComponent, ReactiveFormsModule, BmbButtonDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  userForm: FormGroup = new FormGroup({
    dropdown: new FormControl<string>('', Validators.required),
  });
  showErrors: { [key: string]: boolean } = {};

  onSubmit() {
    if (this.userForm.valid) {
      return;
    }
    this.userForm.markAllAsTouched();
    this.updateErrorState();
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

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  onValueChange(event: any): any {
    console.log(event);
  }
}

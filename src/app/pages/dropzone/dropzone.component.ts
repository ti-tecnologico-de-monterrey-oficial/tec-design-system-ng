import { Component, signal } from '@angular/core';
import {
  BmbDropzoneComponent,
  BmbButtonDirective,
  BmbThemeComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bmb-dropzone-page',
  templateUrl: './dropzone.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BmbThemeComponent,
    BmbDropzoneComponent,
    BmbButtonDirective,
  ],
})
export class DropzonePageComponent {
  userForm: FormGroup = new FormGroup({
    dropzone: new FormControl(),
  });
  progressFiles = signal<Record<string, number>>({});

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
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
    Object.keys(this.userForm.controls).forEach((field: any) => {
      const control = this.getFormControl(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }

  onNewFile(file: File | File[]) {
    setTimeout(() => {
      const updatedProgress = { ...this.progressFiles() };
      if (Array.isArray(file)) {
        file.forEach((f) => {
          updatedProgress[f.name] = 100;
        });
      } else {
        updatedProgress[file.name] = 100;
      }
      this.progressFiles.set(updatedProgress);
    }, 1000);
  }
}

import { Component, signal } from '@angular/core';
import {
  BmbDropzoneComponent,
  BmbButtonDirective,
  BmbThemeComponent,
  BmbDividerComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-dropzone-page',
  templateUrl: './dropzone.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbThemeComponent,
    BmbDividerComponent,
    BmbDropzoneComponent,
    BmbButtonDirective,
  ],
})
export class DropzonePageComponent {
  userForm: FormGroup = new FormGroup({
    dropzoneMulti: new FormControl(),
    dropzoneSingle: new FormControl(),
  });
  progressFiles = signal<Record<string, number>>({});

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

  handleNewFileMulti(files: File | File[]) {
    console.info('handleNewFileMulti', files, this.progressFiles());
    setTimeout(() => {
      const updatedProgress = { ...this.progressFiles() };
      if (Array.isArray(files)) {
        files.forEach((f) => {
          updatedProgress[f.name] = 100;
        });
      } else {
        updatedProgress[files.name] = 100;
      }
      this.progressFiles.set(updatedProgress);
    }, 2000);
    console.info('handleNewFileMulti 2', this.progressFiles());

    // this.userForm.controls['dropzoneMulti']?.patchValue(Array.from(files).map((file: any) => file.name) );
    // this.getFormControl('dropzone')?.updateValueAndValidity();
    // console.info('handleNewFile', this.userForm.controls);
  }

  handleNewFileSingle(file: File | File[]) {
    console.info(
      'handleNewFileSingle',
      file,
      this.progressFiles(),
      this.userForm.controls['dropzoneSingle'],
    );
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
    }, 2000);
    console.info('handleNewFileSingle 2', this.progressFiles());

    // this.userForm.controls['dropzoneSingle'].patchValue(file );
    // this.getFormControl('dropzone')?.updateValueAndValidity();
    // console.info('handleNewFile', this.userForm.controls);
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }
}

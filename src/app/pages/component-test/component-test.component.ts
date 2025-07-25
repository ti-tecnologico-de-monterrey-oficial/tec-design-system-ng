// import { CommonModule } from '@angular/common';
// import { Component, ChangeDetectionStrategy } from '@angular/core';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import {
//   BmbButtonDirective,
//   BmbCheckboxComponent,
//   BmbDatepickerComponent,
//   BmbInputComponent,
//   BmbRadialComponent,
//   BmbDateRangeComponent,
//   BmbSwitchComponent,
//   BmbThemeComponent,
// } from '../../../../projects/ds-ng/src/public-api';

// @Component({
//   selector: 'bmb-app',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     BmbButtonDirective,
//     BmbDatepickerComponent,
//     BmbCheckboxComponent,
//     BmbDateRangeComponent,
//     BmbRadialComponent,
//     BmbSwitchComponent,
//     BmbInputComponent,
//     BmbThemeComponent,
//   ],
//   templateUrl: './component-test.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class AppComponent {
//   userForm: FormGroup = new FormGroup({
//     date_picker: new FormControl(),
//     checkbox: new FormControl(),
//     date_range_start: new FormControl(),
//     date_range_end: new FormControl(),
//     radial_group: new FormControl(),
//     input_field: new FormControl(),
//   });

//   handleCheckboxChange(event: Event): void {
//     const element = event.target as HTMLInputElement;
//     console.log('Checkbox checked state:', element.checked);
//     console.log('Checkbox name:', element.name);
//   }

//   handleRadial(element: HTMLInputElement): void {
//     console.log('Radio value:', element.value);
//     console.log('Radio name:', element.name);
//   }

//   onSubmit() {
//     if (this.userForm.valid) {
//       //Add your code
//       return;
//     }
//     this.userForm.markAllAsTouched();
//     this.updateErrorState();
//   }

//   updateErrorState() {
//     Object.keys(this.userForm.controls).forEach((field) => {
//       const control = this.getFormControl(field);
//       if (control instanceof FormControl) {
//         control.markAsTouched();
//         control.updateValueAndValidity();
//       }
//     });
//   }

//   getFormControl(name: string): FormControl {
//     return this.userForm.get(name) as FormControl;
//   }
// }
// import { CommonModule } from '@angular/common';
// import {
//   Component,
//   ChangeDetectionStrategy,
//   ViewChild,
//   signal,
// } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import {
//   BmbButtonDirective,
//   BmbDropzoneComponent,
// } from '../../../../projects/ds-ng/src/public-api';

// @Component({
//   selector: 'bmb-app',
//   standalone: true,
//   imports: [
//     CommonModule,
//     ReactiveFormsModule,
//     BmbButtonDirective,
//     BmbDropzoneComponent,
//   ],
//   templateUrl: './component-test.component.html',
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class AppComponent {
//   @ViewChild(BmbDropzoneComponent) dropzone?: BmbDropzoneComponent;

//   form: FormGroup;
//   progress = signal<Record<string, number>>({});

//   constructor(private fb: FormBuilder) {
//     this.form = this.fb.group({
//       file: [null],
//     });
//   }

//   onFileReceived(files: File | File[]) {
//     const incomingFiles = Array.isArray(files) ? files : [files];
//     const current = this.getCurrentFiles();

//     const currentKeys = new Set(current.map((f) => `${f.name}-${f.size}`));
//     const newFiles = incomingFiles.filter(
//       (f) => !currentKeys.has(`${f.name}-${f.size}`),
//     );

//     const updated = [...current, ...newFiles];
//     this.form.patchValue({
//       file: this.formAllowsMultiple(updated) ? updated : updated[0],
//     });

//     newFiles.forEach(this.simulateUpload.bind(this));
//   }

//   simulateUpload(file: File) {
//     let progress = 0;

//     this.progress.update((map) => ({ ...map, [file.name]: 0 }));

//     const interval = setInterval(() => {
//       progress += 50;
//       this.progress.update((map) => ({
//         ...map,
//         [file.name]: Math.min(progress, 100),
//       }));

//       if (progress >= 100) {
//         clearInterval(interval);
//         console.log('Archivo simulado al 100%');
//       }
//     }, 300);
//   }

//   removeFileFromForm(fileName: string) {
//     const files = this.getCurrentFiles();
//     const updated = files.filter((f) => f.name !== fileName);

//     this.form.patchValue({
//       file: updated.length > 1 ? updated : (updated[0] ?? null),
//     });

//     const progressMap = { ...this.progress() };
//     delete progressMap[fileName];
//     this.progress.set(progressMap);
//   }

//   onSubmit() {
//     const files = this.getCurrentFiles();
//     const allUploaded = files.every((f) => this.progress()[f.name] === 100);

//     if (!allUploaded) {
//       console.warn('Algunos archivos no se han subido completamente.');
//       return;
//     }

//     console.log('Archivos listos para enviar:', files);

//     // Resetear
//     this.form.reset();
//     this.progress.set({});
//     this.dropzone?.reset();
//   }

//   getCurrentFiles(): File[] {
//     const control = this.form.value.file;
//     if (!control) return [];
//     return Array.isArray(control) ? control : [control];
//   }

//   formAllowsMultiple(files: File[]): boolean {
//     return files.length > 1;
//   }

//   printLog() {
//     console.log(this.form);
//     return 'a';
//   }
// }

import { CommonModule } from '@angular/common';
import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  signal,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BmbButtonDirective,
  BmbDropzoneComponent,
} from '../../../../projects/ds-ng/src/public-api';

@Component({
  selector: 'bmb-app',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbButtonDirective,
    BmbDropzoneComponent,
  ],
  templateUrl: './component-test.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild(BmbDropzoneComponent) dropzone?: BmbDropzoneComponent;
  progress = signal<Record<string, number>>({});
  form: FormGroup = new FormGroup({
    dropzone: new FormControl(),
  });

  onFileReceived(files: File | File[]) {
    const incomingFiles = Array.isArray(files) ? files : [files];
    const current = this.getCurrentFiles();

    const currentKeys = new Set(current.map((f) => `${f.name}-${f.size}`));
    const newFiles = incomingFiles.filter(
      (f) => !currentKeys.has(`${f.name}-${f.size}`),
    );

    const updated = [...current, ...newFiles];
    this.form.patchValue({
      file: this.formAllowsMultiple(updated) ? updated : updated[0],
    });

    newFiles.forEach(this.simulateUpload.bind(this));
  }

  simulateUpload(file: File) {
    let progress = 0;

    this.progress.update((map) => ({ ...map, [file.name]: 0 }));

    const interval = setInterval(() => {
      progress += 50;
      this.progress.update((map) => ({
        ...map,
        [file.name]: Math.min(progress, 100),
      }));

      if (progress >= 100) {
        clearInterval(interval);
        console.log('Archivo simulado al 100%');
      }
    }, 300);
  }

  removeFileFromForm(fileName: string) {
    const files = this.getCurrentFiles();
    const updated = files.filter((f) => f.name !== fileName);

    this.form.patchValue({
      file: updated.length > 1 ? updated : (updated[0] ?? null),
    });

    const progressMap = { ...this.progress() };
    delete progressMap[fileName];
    this.progress.set(progressMap);
  }

  onSubmit() {
    const files = this.getCurrentFiles();
    const allUploaded = files.every((f) => this.progress()[f.name] === 100);

    if (!allUploaded) {
      console.warn('Algunos archivos no se han subido completamente.');
      return;
    }

    console.log('Archivos listos para enviar:', files);

    // Resetear
    this.form.reset();
    this.progress.set({});
    this.dropzone?.reset();
  }

  getCurrentFiles(): File[] {
    const control = this.form.value.file;
    if (!control) return [];
    return Array.isArray(control) ? control : [control];
  }

  formAllowsMultiple(files: File[]): boolean {
    return files.length > 1;
  }

  printLog() {
    console.log(this.form);
    return 'a';
  }
}

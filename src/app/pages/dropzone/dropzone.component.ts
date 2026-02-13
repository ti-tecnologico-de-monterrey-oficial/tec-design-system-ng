import { Component, signal } from '@angular/core';
import {
  BmbDropzoneComponent,
  BmbButtonDirective,
  BmbFilterCardComponent,
  IBmbControlType,
} from '../../../../projects/ds-ng/src/public-api';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'bmb-dropzone-page',
  templateUrl: './dropzone.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, BmbDropzoneComponent, BmbButtonDirective, BmbFilterCardComponent],
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
    }, 2000);
  }

  filterControls: IBmbControlType[] = [
    {
      title: 'Filter - Dropdown',
      control: [
        {
          name: 'dropdown-1',
          type: 'dropdown',
          label: 'Dropdown test',
          options: [
            { value: 'banana', name: 'Banana' },
            { value: 'apple', name: 'Apple' },
            { value: 'tomato', name: 'Tomato' }
          ],
          value: 'apple'
        }
      ]
    },
    {
      title: 'Filter - tags',
      control: [
        { name: 'tag-1', type: 'tag', label: 'Name tag 1', checked: true, id: 'some_field_id' },
        { name: 'tag-2', type: 'tag', label: 'Name tag 2', checked: false, id: 'some_field_id' }
      ]
    },
    {
      title: 'Filter - Radial',
      control: [
        {
          name: 'radial-1',
          type: 'radial',
          label: 'Radial 1',
          id: 'radial-1',
          value: '1',
          checked: true
        },
        {
          name: 'radial-1',
          type: 'radial',
          label: 'Radial 2',
          id: 'radial-2',
          value: '2',
          checked: false
        }
      ]
    },
    {
      title: 'Filter - Checkbox',
      control: [
        {
          name: 'checkbox-1',
          type: 'checkbox',
          label: 'Checkbox 1',
          checked: true
        },
        {
          name: 'checkbox-2',
          type: 'checkbox',
          label: 'Checkbox 2',
          checked: false
        }
      ]
    },
    {
      title: 'Filter - Switch',
      control: [
        {
          name: 'switch-1',
          type: 'switch',
          rightText: 'Switch 3',
          checked: false,
          label: 'Switch test'
        }
      ]
    },
  ];

  handleFilters(values: unknown) {
    console.log('apply filters', values);
  }

  handleResetFilters() {
    console.log('reset filters');

  }
}

import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  BmbButtonDirective,
  BmbLayoutDirective,
  BmbLayoutItemDirective,
  BmbInputComponent,
  BmbFilterCardComponent,
  IBmbControlType,
} from 'ui-angular';
@Component({
  selector: 'app-input-page',
  templateUrl: './input.component.html',
  standalone: true,
  imports: [
    BmbInputComponent,
    BmbButtonDirective,
    ReactiveFormsModule,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbFilterCardComponent,
  ],
})
export class InputPageComponent {
  userForm: FormGroup = new FormGroup({
    inputField: new FormControl(),
  });

  controlTypes: IBmbControlType[] = [
    {
      title: 'Filter - Dropdown',
      control: [
        {
          name: 'dropdown-1',
          type: 'dropdown',
          options: [
            { value: 'banana', name: 'Banana' },
            { value: 'apple', name: 'Apple' },
            { value: 'tomato', name: 'Tomato' },
          ],
          value: 'apple',
          isMultiSelect: true,
          label: 'Select a fruit',
        },
      ],
    },
    {
      title: 'Filter - tags',
      control: [
        { name: 'tag-1', type: 'tag', label: 'Name tag 1', checked: false },
        { name: 'tag-2', type: 'tag', label: 'Name tag 2', checked: false },
      ],
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
          checked: false,
        },
        {
          name: 'radial-1',
          type: 'radial',
          label: 'Radial 2',
          id: 'radial-2',
          value: '2',
          checked: false,
        },
      ],
    },
    {
      title: 'Filter - Checkbox',
      control: [
        {
          name: 'checkbox-1',
          type: 'checkbox',
          label: 'Checkbox 1',
          checked: false,
        },
        {
          name: 'checkbox-2',
          type: 'checkbox',
          label: 'Checkbox 2',
          checked: false,
        },
      ],
    },
    {
      title: 'Filter - Switch',
      control: [
        {
          name: 'switch-1',
          type: 'switch',
          rightText: 'Switch 3',
          checked: false,
          label: 'Switch 3',
        },
      ],
    },
  ];

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

  handleFocus(event: boolean): void {
    // console.info('handleFocus', event);
  }

  handleBlur(event: boolean): void {
    // console.info('handleBlur', event);
  }

  handleChange(event: HTMLInputElement): void {
    // console.info('handleChange', event);
  }
}

import type { Meta, StoryObj } from '@storybook/angular';
import { BmbDropdownComponent } from './bmb-dropdown.component';

export default {
  title: 'Micro Componentes/Dropdown',
  component: BmbDropdownComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BmbDropdownComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [
    BmbDropdownComponent,
    ReactiveFormsModule,
    BmbButtonDirective,
    BmbInputComponent,
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
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
}
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: {
        type: 'text',
      },
      description: 'The name of the icon. See Material Icons.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    required: {
      name: 'Required',
      control: { type: 'boolean' },
      description:
        'When set to true, The Dropdown border color turns to red. By default, it is false, and you do not need to explicitly set it.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    showIcon: {
      name: 'Show Icon',
      control: { type: 'boolean' },
      description: 'When set to true, the dropdown icon is show',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      name: 'Placeholder',
      control: {
        type: 'text',
      },
      description: 'The text of the placeholder for the dropdown.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    options: {
      name: 'Options',
      control: {
        type: 'array',
      },
      description:
        'The inputs to show on the dropdown. The data types it allows are a string array or an array of objects',
      table: {
        category: 'Properties',
        defaultValue: { summary: '[]' },
        type: {
          summary: `array: string[] | IBmbDropdownItem[]. IBmbDropdownItem = {
            value: string;
            name: string;
          }`,
        },
      },
    },
    helperText: {
      name: 'Helper Text',
      control: {
        type: 'text',
      },
      description: 'The text of the bottom for the dropdown.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      description:
        'When set to true, The dropdown disabled. By default, it is false, and you do not need to explicitly set it.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      name: 'Label',
      control: {
        type: 'text',
      },
      description: 'The text show an text as a label',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    control: {
      control: { type: 'object' },
      description: 'Instance of FormControl to manage the input control state.',
      table: {
        category: 'Properties',
        type: { summary: 'FormControl' },
        defaultValue: { summary: "FormControl('', Validators.required)" },
      },
    },
    onValueChange: {
      name: 'On value change',
      control: {
        type: '',
      },
      description:
        'Emitted when an option is selected. Contains the value or item of the selected option.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    icon: 'bolt',
    placeholder: 'Set Fruit',
    required: true,
    label: 'Fruit',
    showIcon: true,
    options: [
      { value: '1', name: 'Apple' },
      { value: '2', name: 'Banana' },
      { value: '3', name: 'Orange' },
      { value: '4', name: 'Pear' },
      { value: '5', name: 'Grape' },
    ],
    onValueChange: (params: any) => {
      window.alert(params.toString());
    },
  },
} as Meta<typeof BmbDropdownComponent>;

type Story = StoryObj<BmbDropdownComponent>;

export const Default: Story = {};

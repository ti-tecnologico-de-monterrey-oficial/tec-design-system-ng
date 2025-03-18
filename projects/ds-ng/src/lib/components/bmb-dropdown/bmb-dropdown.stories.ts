import type { Meta, StoryFn } from '@storybook/angular';
import { BmbDropdownComponent } from './bmb-dropdown.component';
import { attributes } from '../../utils/utils';

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
      control: { type: 'text' },
      description: 'The name of the icon. See Material Icons.',
      table: { category: 'Properties', type: { summary: 'string' } },
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
      control: { type: 'text' },
      description: 'The text of the placeholder for the dropdown.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    options: {
      name: 'Options',
      control: { type: 'array' },
      description:
        'The inputs to show on the dropdown. The data types it allows are a string array or an array of objects',
      table: {
        category: 'Properties',
        type: {
          summary: `array: string[] | IBmbDropdownItem[]. IBmbDropdownItem = {
            value: string;
            name: string;
            icon: string;
            id?: string;
          }`,
        },
      },
    },
    helperText: {
      name: 'Helper Text',
      control: { type: 'text' },
      description: 'The text of the bottom for the dropdown.',
      table: { category: 'Properties', type: { summary: 'string' } },
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
      control: { type: 'text' },
      description: 'The text show an text as a label',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    control: {
      control: null,
      name: 'Control',
      description: 'Instance of FormControl to manage the input control state.',
      table: {
        category: 'Properties',
        type: { summary: 'FormControl' },
        defaultValue: { summary: "FormControl('', Validators.required)" },
      },
    },
    onValueChange: {
      name: 'On value change',
      control: { type: '' },
      description:
        'Emitted when an option is selected. Contains the value or item of the selected option.',
      table: { category: 'Events', type: { summary: 'function' } },
    },
    preferredOptions: {
      name: 'Preferred options',
      control: { type: 'array' },
      description:
        'List of options to be displayed at the top, the text must match the value property of an option or must be equal to an option in case the options are text.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    isMultiSelect: {
      name: 'Is Multi Select',
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    isMultiSelect: false,
    icon: 'bolt',
    placeholder: 'Set Fruit',
    required: false,
    label: 'Fruit',
    showIcon: true,
    options: ['Apple', 'Banana', 'Orange', 'Pear', 'Grape'],
    disabled: false,
    helperText: 'Select a fruit',
    preferredOptions: ['Banana'],
    onValueChange: (params: any) => {
      console.log(params);
      window.alert(params.name.toString());
    },
  },
} as Meta<typeof BmbDropdownComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <div style="height: 300px">
      <bmb-dropdown
        ${attributes(args)}
      />
    </div>
    `,
});

export const Default = customizable();

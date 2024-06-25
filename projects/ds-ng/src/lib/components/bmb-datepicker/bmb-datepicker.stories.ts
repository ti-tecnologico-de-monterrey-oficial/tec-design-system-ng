import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbDatepickerComponent } from './bmb-datepicker.component';

export default {
  title: 'Micro Componentes/Datepicker',
  component: BmbDatepickerComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BmbDatepickerComponent,
      ],
    }),
  ],
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
import { BmbDatepickerComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BmbDatepickerComponent,
  ],
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class AppComponent {
  userForm: FormGroup;
  showErrors: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.userForm = this.fb.group({
      name: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
      this.cdr.markForCheck();
    }
  }

  get nameControl(): FormControl {
    return this.userForm.get('name') as FormControl;
  }
}
\`\`\`

### Example in HTML

Below is an example of how to use this component in HTML:

\`\`\`html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <bmb-datepicker
    placeholder="Selecciona la fecha de cumpleaños"
    name="datePicker"
    dateFormat="MM/dd/yyyy"
    label="Fecha de tu cumpleaños"
    [disabled]="false"
    icon="cake"
    [isRequired]="true"
    [isClearable]="true"
    invalidFormaterrorMessage="El formato debe ser el siguiente: dd/mm/yyyy"
    requiredFieldErrorMessage="Este campo es requerido"
  />
</form>


\`\`\`
        `,
      },
    },
  },
  argTypes: {
    control: {
      control: { type: 'object' },
      description: 'Instance of FormControl to manage the input control state.',
      table: {
        category: 'Properties',
        type: { summary: 'FormControl' },
        defaultValue: { summary: "FormControl('', Validators.required)" },
      },
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'text',
      },
      description:
        'Name of the icon to be displayed in the input field. Refer to Material Icons for options.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'calendar_month'}
      },
    },
    invalidFormaterrorMessage: {
      name: 'Invalid format error message',
      control: {
        type: 'text',
      },
      description: 'Text to be displayed when there is a format error.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    requiredFieldErrorMessage: {
      name: 'Required field error message',
      control: {
        type: 'text',
      },
      description: 'Text to be displayed when there is a required error.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    isRequired: {
      name: 'Required',
      control: { type: 'boolean' },
      description: 'Indicates whether the input field is required.',
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
      description: 'Placeholder text to be displayed inside the input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      description: 'Disables the input field when set to true.',
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
      description: 'Label text to be displayed above the input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    appearance: {
      name: 'Appearance',
      control: {
        type: 'select',
      },
      options: ['main', 'normal', 'simple'],
      description: 'Defines the appearance style of the input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    isClearable: {
      name: 'Is clearable field',
      control: {
        type: 'boolean',
      },
      description: 'Display a button to clear the field',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    dateFormat: {
      name: 'Date format',
      control: {
        type: 'text',
      },
      description: 'Set the format to validate the value and set the value format',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'dd/MM/yyyy'}
      },
    },
    name: {
      name: 'Name',
      control: {
        type: 'text',
      },
      description: 'Set the name and ID fields attributes.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: ''}
      },
    }
  },

  args: {
    icon: 'calendar_month',
    invalidFormaterrorMessage: 'Formato invalido',
    requiredFieldErrorMessage: 'Campo requerido',
    isRequired: false,
    placeholder: 'Placeholder',
    disabled: false,
    label: 'Input Label',
    appearance: 'normal',
    isClearable: false,
    dateFormat: 'dd/MM/yyyy',
    name: 'custom_date_picker'
  },
} as Meta<typeof BmbDatepickerComponent>;

type Story = StoryObj<BmbDatepickerComponent>;

export const Default: Story = {};

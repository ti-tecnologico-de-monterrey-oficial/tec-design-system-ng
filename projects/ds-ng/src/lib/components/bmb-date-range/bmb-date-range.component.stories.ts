import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbDateRangeComponent } from './bmb-date-range.component';

export default {
  title: 'Micro Componentes/Date range',
  component: BmbDateRangeComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BmbDateRangeComponent,
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
import { BmbDateRangeComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BmbDateRangeComponent,
  ],
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
\`\`\`

### Example in HTML

Below is an example of how to use this component in HTML:

\`\`\`html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <bmb-date-range
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
    placeholderStartDate: {
      name: 'Placeholder for start date',
      control: {
        type: 'text',
      },
      description:
        'Placeholder text to be displayed inside the start date input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    placeholderEndDate: {
      name: 'Placeholder for end date',
      control: {
        type: 'text',
      },
      description:
        'Placeholder text to be displayed inside the end date input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
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
        defaultValue: { summary: 'calendar_month' },
      },
    },
    invalidFormatErrorMessage: {
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
    controlStart: {
      control: null,
      description: 'Instance of FormControl to manage the input control state.',
      table: {
        category: 'Properties',
        type: { summary: 'FormControl' },
        defaultValue: { summary: "FormControl('', Validators.required)" },
      },
    },
    controlEnd: {
      control: null,
      description: 'Instance of FormControl to manage the input control state.',
      table: {
        category: 'Properties',
        type: { summary: 'FormControl' },
        defaultValue: { summary: "FormControl('', Validators.required)" },
      },
    },
    dateFormat: {
      name: 'Date format',
      control: {
        type: 'text',
      },
      description:
        'Set the format to validate the value and set the value format',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'dd/MM/yyyy' },
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
        defaultValue: { summary: '' },
      },
    },
    multipleRow: {
      name: 'Multiple rows',
      control: { type: 'boolean' },
      description: 'Force the mobile version.',

      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },

  args: {
    label: 'Input Label',
    placeholderStartDate: 'Start date',
    placeholderEndDate: 'End date',
    icon: 'calendar_month',
    invalidFormatErrorMessage: 'Formato invalido',
    requiredFieldErrorMessage: 'Campo requerido',
    appearance: 'normal',
    disabled: false,
    isRequired: false,
    isClearable: false,
    dateFormat: 'dd/MM/yyyy',
    name: 'custom_date_picker',
    multipleRow: false,
  },
} as Meta<typeof BmbDateRangeComponent>;

type Story = StoryObj<BmbDateRangeComponent>;

export const Default: Story = {};

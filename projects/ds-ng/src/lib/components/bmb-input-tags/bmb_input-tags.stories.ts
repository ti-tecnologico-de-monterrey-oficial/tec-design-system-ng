import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

import { BmbInputTagsComponent } from './bmb-input-tags.component';

export default {
  title: 'Micro Componentes/ Input Tags',
  component: BmbInputTagsComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        BmbIconComponent,
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
import { BmbInputTagsComponent, BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BmbButtonDirective,
    BmbInputTagsComponent,
  ],
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class AppComponent {
  userForm: FormGroup = new FormGroup({
    food: new FormControl<string>('', Validators.required),
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

### Example in HTML

Below is an example of how to use this component in HTML:

\`\`\`html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
    <bmb-input-tags
      [formControl]="getFormControl('food')"      
      [label]="'Etiqueta'"
      [tagOptions]="comidaMexicana"
      [tooltip]="'Este es un tooltip para el input tags'"
      [isRequired]="true"
      [errorMessage]="'Mensaje Error'"
      [helperMessage]="'Mensaje Ayuda'"
      [placeholder]="'Ingrese su comida favorita'"
    />
  <button bmbButton appearance="primary" type="submit">Submit</button>
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
    errorMessage: {
      name: 'Error Message',
      control: {
        type: 'text',
      },
      description: 'Text to be displayed when there is an error.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    helperMessage: {
      name: 'Helper Message',
      control: {
        type: 'text',
      },
      description: 'Text to be displayed as a helper message below the input.',
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
    showError: {
      name: 'Show Error',
      control: {
        type: 'boolean',
      },
      description: 'Boolean to show or hide the error message.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    tagOptions: {
      name: 'Tag Options',
      control: {
        type: 'text',
      },
      description: 'Set the array of options that the user can select',
      table: {
        category: 'Properties',
        type: { summary: 'Array<string>' },
      },
    },
    toolTip: {
      name: 'Tooltip',
      control: {
        type: 'text',
      },
      description: 'Shows a tooltip with extra information about the input',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },

  args: {
    errorMessage: 'Error Message',
    helperMessage: 'Helper Message',
    isRequired: false,
    placeholder: 'Placeholder',
    disabled: false,
    label: 'Input Label',
    showError: false,
    tooltip: 'tooltip del input tag',
    tagOptions: [
      'Tacos al pastor',
      'Enchiladas',
      'Tamales',
      'Quesadillas',
      'Chiles en nogada',
      'Mole poblano',
      'Sopes',
      'Gorditas',
      'Pozole',
      'Ceviche',
      'Tortas',
      'Guacamole',
      'Tacos de pescado',
      'Flautas',
      'Chalupas',
      'Huevos rancheros',
      'Elote',
      'Mole verde',
      'Arroz a la mexicana',
      'Burritos',
    ],
  },
} as Meta<typeof BmbInputTagsComponent>;

type Story = StoryObj<BmbInputTagsComponent>;

export const Default: Story = {};

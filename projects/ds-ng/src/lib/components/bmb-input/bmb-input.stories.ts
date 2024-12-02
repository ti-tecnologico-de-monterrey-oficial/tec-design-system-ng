import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

import { BmbInputComponent } from './bmb-input.component';

export default {
  title: 'Micro Componentes/Input',
  component: BmbInputComponent,
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
import { BmbInputComponent, BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BmbButtonDirective,
    BmbInputComponent,
  ],
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class AppComponent {
    formGroup: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
  });

  onSubmit(): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      console.log('FORM VALID');
      return;
    }
    console.log('FORM', this.formGroup.status);
    this.updateErrorState();
  }

  updateErrorState() {
    const invalidInputs = this.el.nativeElement.querySelectorAll('.ng-invalid');
    invalidInputs.forEach((input: HTMLElement) => {
      const name =
        input.getAttribute('name') ||
        input.getAttribute('ng-reflect-name') ||
        input.parentElement?.getAttribute('ng-reflect-name') ||
        '';
      const control = this.formGroup.get(name);
      if (control) {
        control.updateValueAndValidity();
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }
}
\`\`\`

### Example in HTML

Below is an example of how to use this component in HTML:

\`\`\`html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <bmb-input
    [name]="'name'"
    [label]="'Input Label'"
    [placeholder]="'Placeholder'"
    [icon]="'apps'"
    [errorMessage]="'Error'"
    [helperMessage]="'Helper Message'"
    [disabled]="false"
    [isRequired]="false"
    [appearance]="'normal'"
    [control]="getFormControl('name')"
  />
  <button bmbButton appearance="primary" type="submit">Submit</button>
</form>


\`\`\`
        `,
      },
    },
  },
  argTypes: {
    type: {
      name: 'Type',
      control: {
        type: 'radio',
      },
      options: ['text', 'password', 'number', 'text-area'],
      description: 'Select the type of the input',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'text' },
      },
    },
    name: {
      name: 'Name',
      control: { type: 'text' },
      description:
        'The name of the input which is used to identify the form data.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
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
    appearance: {
      name: 'Appearance',
      control: {
        type: 'select',
      },
      options: ['normal', 'simple'],
      description: 'Defines the appearance style of the input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    spellcheck: {
      name: 'Spellcheck',
      control: {
        type: 'boolean',
      },
      description: 'Enable the browser spellcheck.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    maxlength: {
      name: 'Max length',
      control: {
        type: 'text',
      },
      description: 'Sets the maximum size of the text string.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    minlength: {
      name: 'Min length',
      control: {
        type: 'text',
      },
      description: 'Sets the minimum size of the text string.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    pattern: {
      name: 'Pattern',
      control: {
        type: 'text',
      },
      description: 'Sets the a validation pattern.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    size: {
      name: 'Size',
      control: {
        type: 'text',
      },
      description: 'Sets a fixed size of the text string.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    showMaxTextLength: {
      name: 'Show Max Text Length',
      control: { type: 'boolean' },
      description:
        'This property shows a text in the right side of the label, the text indicates the max number of characters that the input accept. The maxLength property need to be set.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'true' },
        type: { summary: 'boolean' },
      },
    },
    rows: {
      name: 'Rows',
      control: {
        type: 'text',
      },
      description:
        'Sets the number of lines visible in the control. Only for text area input.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
  },

  args: {
    icon: 'apps',
    name: 'name',
    errorMessage: 'Error Message',
    helperMessage: 'Helper Message',
    isRequired: false,
    placeholder: 'Placeholder',
    disabled: false,
    label: 'Input Label',
    appearance: 'normal',
  },
} as Meta<typeof BmbInputComponent>;

type Story = StoryObj<BmbInputComponent>;

export const Default: Story = {};

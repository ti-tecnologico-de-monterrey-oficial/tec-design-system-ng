import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

import { BmbInputComponent } from './bmb-input.component';

export default {
  title: 'Components/Inputs/Text input',
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
  styleUrl: './component.scss',
})
export class AppComponent {
  userForm: FormGroup = new FormGroup({
    name: new FormControl<string>('', Validators.required),
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
  <bmb-input
    [label]="'Input Label'"
    [placeholder]="'Placeholder'"
    [icon]="'apps'"
    [errorMessage]="'Error'"
    [helperMessage]="'Helper Message'"
    [tooltip]="'Esto es un tooltipo'"
    [disabled]="false"
    [isRequired]="false"
    [appearance]="'normal'"
    [control]="getFormControl('name')"
    [showError]="showErrors['name']"
  />
  <button bmbButton appearance="primary" type="submit">Submit</button>
</form>
\`\`\`

## Architecture

\`\`\`html
<section class="bmb_field" <!-- conditional class bmb_field-disabled --> >
  <!-- if label is defined -->
  <label class="bmb_field-label" for="input">{ label }</label>

  <section class="bmb_field-wrapper">
    <input { configuration } />
  </section>

  <!-- if helper message is defined -->
  <p class="bmb_field-helper">{ helperMessage }</p>

  <!-- if error message is defined -->
  <p class="bmb_field-error">{ errorMessage }</p>
</section>

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
        type: 'object',
      },
      description:
        'Text to be displayed when there is an error. This could be a string or any of the following: required, min, max, minLength, pattern.',
      table: {
        category: 'Properties',
        type: { summary: 'string or IBmbInputError' },
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
    tooltip: {
      name: 'Tooltip',
      control: {
        type: 'text',
      },
      description:
        'Set a text to display a icon tooltip above the input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    tooltipPosition: {
      name: 'Tooltip Position',
      control: {
        type: 'object',
      },
      description: 'Set the position of the tooltip.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '{ align: "above", justify: "before" }' },
        type: { summary: 'IBmbInputTooltipPosition' },
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
    additionalAction: {
      name: 'Additional action',
      control: {
        type: 'radio',
      },
      options: ['copy', 'showHide', 'none'],
      description:
        'Sets additional action to perform (copy, showHide, none). "copy": copy the contents of the entry to the clipboard and "showHide": works only for password type',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    jsonFormat: {
      name: 'JSON Format',
      control: { type: 'boolean' },
      description:
        'If enabled, the input field will validate the content as a JSON format. Only applies to textarea inputs. You will need to remove the pattern.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    heightTextArea: {
      name: 'Height (TextArea)',
      control: { type: 'number' },
      description: 'Sets the height of the textarea in pixels.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    isClearable: {
      name: 'Is Clearable',
      control: { type: 'boolean' },
      description:
        'If enabled, a clear button will be displayed in the input field.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isFocus: {
      name: 'Is Focus',
      description: 'If enabled, the input field will be focused.',
      table: {
        category: 'Events',
        type: { summary: 'boolean' },
      },
    },
    isBlur: {
      name: 'Is Blur',
      description: 'If enabled, the input field will be blurred.',
      table: {
        category: 'Events',
        type: { summary: 'boolean' },
      },
    },
    keyDown: {
      name: 'Key Down',
      description: 'Emits key down event.',
      table: {
        category: 'Events',
        type: { summary: 'KeyboardEvent' },
      },
    },
  },

  args: {
    icon: 'apps',
    errorMessage: {
      required: 'This field is required.',
      jsonFormat: 'El contenido no es un JSON válido.',
      minLength: 'Minimum 4 characters.',
      pattern: 'Only accepts letters.',
    },
    helperMessage: 'Helper Message',
    isRequired: true,
    placeholder: 'Placeholder',
    disabled: false,
    label: 'Input Label',
    appearance: 'normal',
    showError: false,
    tooltip: 'Tooltip example for the input',
    additionalAction: '',
    minlength: '4',
    maxlength: '20',
    pattern: '[A-Za-z]+',
    tooltipPosition: { align: 'above', justify: 'before' },
    isClearable: false,
    spellcheck: false,
  },
} as Meta<typeof BmbInputComponent>;

type Story = StoryObj<BmbInputComponent>;

export const Default: Story = {};

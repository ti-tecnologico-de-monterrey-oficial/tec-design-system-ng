import {
  Meta,
  StoryFn,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbInputPhoneNumberComponent } from './bmb-input-phone-number.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { attributes } from '../../utils/utils';

export default {
  title: 'Micro Componentes/Input Phone Number',
  component: BmbInputPhoneNumberComponent,
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
    componentWrapperDecorator((story: string) => {
      return `
        <div style="height: 25rem">
          ${story}
        </div>`;
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
import { BmbInputPhoneNumberComponent, BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BmbInputPhoneNumberComponent,
    BmbButtonDirective,
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class AppComponent {
  userForm: FormGroup;
  isPhoneDisabled = false;
  showErrors: { [key: string]: boolean } = {};

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.userForm = this.fb.group({
      phone: new FormControl(
        { value: null, disabled: this.isPhoneDisabled },
        Validators.required,
      ),
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);
    } else {
      console.log('Form is invalid');
      this.userForm.markAllAsTouched();
      this.updateErrorState();
      this.cdr.markForCheck();
    }
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

  get phoneControl(): FormControl {
    return this.userForm.get('phone') as FormControl;
  }
}
\`\`\`

### Example in HTML

Below is an example of how to use this component in HTML:

\`\`\`html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <bmb-input-phone-number
  [control]="phoneControl"
  [disabled]="isPhoneDisabled"
  [isRequired]="false"
  [showError]="showErrors['phone']"
  [errorMessage]="'Error Phone'"
  [preferredCountries]="['mx', 'us']"
  [onlyCountries]="['mx', 'us', 'ca']"
  [useOnlyCountries]="true"
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
    showError: {
      name: 'Show Error',
      control: {
        type: 'boolean',
      },
      description: 'Boolean to show or hide the error message.',
      table: {
        category: 'Deprecated',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    preferredCountries: {
      name: 'Preferred Countries',
      control: { type: 'array' },
      description: 'List of countries that should be shown at the top.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: "['mx']" },
      },
    },
    onlyCountries: {
      name: 'Only Countries',
      control: { type: 'array' },
      description:
        'Restricts the dropdown to only these countries (county codes example: mx, us, ca).',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    label: {
      name: 'Label',
      control: { type: 'text' },
      description: 'Label to be displayed above the input field.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    disabled: false,
    showError: false,
    errorMessage: {
      required: 'This field is required.',
      pattern: 'Only accepts numbers.',
    },
    isRequired: false,
    preferredCountries: ['mx'],
    onlyCountries: ['mx', 'us', 'ca'],
  },
} as Meta<typeof BmbInputPhoneNumberComponent>;

const customizable = (): StoryFn => (args) => ({
  props: args,
  template: `
    <bmb-input-phone-number
      ${attributes(args)}
    />
    `,
});

export const Default = customizable();

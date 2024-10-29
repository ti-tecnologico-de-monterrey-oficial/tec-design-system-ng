import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BmbInputPhoneNumberComponent } from './bmb-input-phone-number.component';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

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
        NgxMatIntlTelInputComponent,
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
  styleUrls: ['./component.scss'],
})
export class AppComponent {
  userForm: FormGroup;
  isPhoneDisabled = false;

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
    this.userForm = this.fb.group({
      phone: new FormControl(
        null,
        Validators.required,
      ),
    });
  }

  onSubmit() {
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
        control.markAsTouched();
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
  <bmb-input-phone-number
    [name]="'phone'"
    [disabled]="false"
    [isRequired]="true"
    [errorMessage]="'Error phone'"
    [helperMessage]="'Helper message phone'"
    [control]="getFormControl('phone')"
  />
  <button bmbButton appearance="primary" type="submit">Submit</button>
</form>

\`\`\`
        `,
      },
    },
  },
  argTypes: {
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
    value: {
      name: 'Value',
      control: { type: 'text' },
      description:
        'The current value of the input field.',
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
    control: {
      name: 'Control',
      control: { type: 'object' },
      description: 'Instance of FormControl to manage the input control state. The control is only required if you do not use the form validations component.',
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
  },
  args: {
    name: 'phone',
    value: null,
    disabled: false,
    isRequired: true,
    errorMessage: 'Error Message',
    helperMessage: 'Helper Message',
  },
} as Meta<typeof BmbInputPhoneNumberComponent>;

type Story = StoryObj<BmbInputPhoneNumberComponent>;

export const Default: Story = {};

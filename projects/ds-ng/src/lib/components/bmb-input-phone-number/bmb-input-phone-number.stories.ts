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
        type: 'text',
      },
      description: 'Text to be displayed when there is an error.',
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
  },
  args: {
    disabled: false,
    showError: false,
    errorMessage: 'Error Message',
    isRequired: false,
  },
} as Meta<typeof BmbInputPhoneNumberComponent>;

type Story = StoryObj<BmbInputPhoneNumberComponent>;

export const Default: Story = {};

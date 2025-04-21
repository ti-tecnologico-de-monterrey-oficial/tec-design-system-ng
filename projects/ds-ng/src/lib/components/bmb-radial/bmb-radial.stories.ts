import { Meta, StoryObj } from '@storybook/angular';
import { BmbRadialComponent } from './bmb-radial.component';
import { FormControl } from '@angular/forms';

export default {
  title: 'Micro Componentes/Radial',
  component: BmbRadialComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbRadialComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [
    BmbRadialComponent
    FormControl,
    FormGroup
    ReactiveFormsModule,
    Validators,
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class Component {
  userForm: FormGroup = new FormGroup({
    contract: new FormControl<string>('', Validators.required),
  });
  showErrors: { [key: string]: boolean } = {};

   onSubmit(): void {
    this.formGroup.markAllAsTouched();
    this.formGroup.updateValueAndValidity();
    console.log('FORM STATE', this.formGroup);
    if (this.formGroup.valid) {
      console.log('FORM VALID');
      return;
    }
    console.log('FORM STATUS', this.formGroup.status);
    this.updateErrorState();
  }

  updateErrorState() {
    Object.keys(this.formGroup.controls).forEach((field) => {
      const control = this.getFormControl(field);

      if (control instanceof FormControl) {
        control.markAsTouched();
        control.updateValueAndValidity();
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.userForm.get(name) as FormControl;
  }

  handleRadial(element: HTMLInputElement): void {
    console.log('Radio value:', element.value);
    console.log('Radio name:', element.name);
    console.log('Is it checked?', element.checked);
  }
}
\`\`\`

### Example in HTML

Below is an example of how to use this component in HTML:

\`\`\`html
<form [formGroup]="userForm" (ngSubmit)="onSubmit()">
  <bmb-radial
    id="radio1"
    value="CCM"
    name="contract"
    label="Contract for teacher CCM.pdf"
    [checked]="false"
    [required]="true"
    [disabled]="false"
    errorMessage="Error message"
    helperMessage="Helper message"
    labelPosition="before"
    [control]="getFormControl('contract')"
    (change)="handleRadial($event)"
  />
  <bmb-radial
    id="radio2"
    value="CCB"
    name="contract"
    label="Contract for teacher CCB.pdf"
    [checked]="false"
    [required]="true"
    [disabled]="false"
    errorMessage="Error message"
    helperMessage="Helper message"
    [control]="getFormControl('contract')"
    (change)="handleRadial($event)"
  />
  <button bmbButton appearance="primary" type="submit">Submit</button>
</form>
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    id: {
      name: 'Id',
      control: { type: 'text' },
      description:
        'Sets the unique identifier for the radial component. This is used to link the label to the checkbox input element using the "for" attribute, improving accessibility and usability.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    checked: {
      name: 'Checked',
      control: { type: 'boolean' },
      description:
        'Sets the value given to the radial when true.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      description:
        'Sets the input to disabled when true.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    required: {
      name: 'Required',
      control: { type: 'boolean' },
      description:
        'Sets the input as required when true..',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    value: {
      name: 'Value',
      control: { type: 'text' },
      description:
        'Sets the value of the control when the radial is true.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    name: {
      name: 'Name',
      control: { type: 'text' },
      description:
        'Sets the name of the radial. Multiple radials can share the same name to create a group where one item can be selected.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    label: {
      name: 'Label',
      control: { type: 'text' },
      description:
        'Sets the label associated with the radial.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    ariaDescribedby: {
      name: 'Aria Described by',
      control: { type: 'text' },
      description:
        'Sets additional descriptive text for the radial, improving accessibility by linking the radial to a descriptive element by ID.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    ariaLabel: {
      name: 'Aria Label',
      control: { type: 'text' },
      description:
        'Sets a label for the radial for accessibility purposes, which can be used when there is no visible label text.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    ariaLabelledby: {
      name: 'Aria Labelled by',
      control: { type: 'text' },
      description:
        'Identifies the element(s) that labels the radial for accessibility purposes, providing a reference to the IDs of the elements that serve as the radial label.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    labelPosition: {
      name: 'Label Position',
      control: { type: 'radio' },
      options: [ 'before', 'after' ],
      description:`
Sets the position of the label relative to the radial, indicating whether the label appears to the left or right of the radial.

    IBbmSidePosition = 'before' | 'after'
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBbmSidePosition' },
      },
    },
    control: {
      control: { type: 'object' },
      description: 'Instance of FormControl to manage the control state.',
      table: {
        category: 'Properties',
        type: { summary: 'FormControl' },
      },
    },
    showError: {
      name: 'Show Error',
      control: {
        type: 'boolean',
      },
      description: 'This is deprecated because errors are evaluated from the control',
      table: {
        category: 'Deprecated',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
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
    change: {
      name: 'Change',
      control: {
        type: '',
      },
      description:
        'An event that is emitted when the state of the radial changes, such as when it is checked or unchecked. This can be used to trigger functions or actions based on the radial state change.',
      table: {
        category: 'Events',
        type: { summary: '(change)="handleRadial($event)"' },
      },
    },
  },
  args: {
    id: 'radio1',
    checked: false,
    disabled: false,
    required: false,
    value: '',
    name: '',
    label: 'Contract for teacher CCM.pdf',
    ariaDescribedby: '',
    ariaLabel: '',
    ariaLabelledby: '',
    labelPosition: 'before',
    change: () => {
      window.alert('Radial clicked');
    },
  },
} as Meta<typeof BmbRadialComponent>;

type Story = StoryObj<BmbRadialComponent>;

export const Default: Story = {};

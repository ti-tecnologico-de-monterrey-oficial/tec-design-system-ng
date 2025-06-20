import { Meta, StoryObj } from '@storybook/angular';
import { BmbCheckboxComponent } from './bmb-checkbox.component';
import { storiesLayoutHorizontal } from '../../utils/bambooLayout';

export default {
  title: 'Components/Inputs/Checkbox',
  component: BmbCheckboxComponent,
  decorators: [storiesLayoutHorizontal],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbCheckboxComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [
    BmbCheckboxComponent ,
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
    checkbox1: new FormControl<boolean>('', Validators.required),
  });
  showErrors: { [key: string]: boolean } = {};

   onSubmit(): void {
    this.formGroup.updateValueAndValidity();
    if (this.formGroup.valid) {
      console.log('FORM VALID');
      return;
    }

    this.updateErrorState();
  }

  updateErrorState(): void {
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

  handleCheckboxChange(event: Event): void {
    const element = event.target as HTMLInputElement;
    console.log('Checkbox checked state:', element.checked);
    console.log('Checkbox name:', element.name);
  }
}
\`\`\`

## Architecture

\`\`\`html
<label class="bmb_checkbox" <!-- conditional class bmb_checkbox-before bmb_checkbox-after bmb_checkbox-required --> >
  <input { input config } />
  <div class="bmb_checkbox-box">
    <span class="bmb_checkbox-mark"></span>
  </div>

  <!-- if label is defined -->
  <span class="bmb_checkbox-label">{{ label }}</span>
</label>
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
        'The unique identifier for the checkbox component. It is used to link the label with the checkbox input element through the "for" attribute, enhancing accessibility and usability.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    checked: {
      name: 'Checked',
      control: { type: 'boolean' },
      description:
        'Determines whether the checkbox is checked or not. Setting this property to true checks the checkbox, and false unchecks it.',
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
        'If set to true, disables the checkbox input, making it non-interactive and unclickable. This is useful for conditions where user interaction should be restricted.',
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
        'Specifies whether the radio button must be filled out before submitting the form. If set to true, a radio button within the group must be selected to validate the form. This is commonly used to ensure that users do not skip mandatory choices in forms, enhancing data integrity and user interaction compliance.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    indeterminate: {
      name: 'Indeterminate',
      control: { type: 'boolean' },
      description:
        'Sets the checkbox to an indeterminate state, which is typically used to represent a mixed state in complex forms like tree views or nested lists. Note: This does not affect the checked property and is purely visual.',
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
        'The value that will be submitted with the form if the checkbox is checked. This is the value that will be sent to the server or handled on form submission.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    name: {
      name: 'Name',
      control: { type: 'text' },
      description:
        'The name of the checkbox, which is used to identify the form data after it’s submitted. Multiple checkboxes can share the same name to create a group where multiple items can be selected.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    label: {
      name: 'Label',
      control: { type: 'text' },
      description:
        'The text label associated with the checkbox. It is displayed next to the checkbox and helps users understand the context of what the checkbox represents.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    ariaDescribedby: {
      name: 'Aria Described by',
      control: { type: 'text' },
      description:
        'Provides additional descriptive text for the checkbox, enhancing accessibility by linking the checkbox to a descriptive element by ID.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    ariaLabel: {
      name: 'Aria Label',
      control: { type: 'text' },
      description:
        'Defines a string that labels the checkbox for accessibility purposes, which can be used when a visible label text is not present.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    ariaLabelledby: {
      name: 'Aria Labelled by',
      control: { type: 'text' },
      description:
        'Identifies the element(s) that labels the checkbox for accessibility purposes, providing a reference to the IDs of the elements that serve as the checkbox label.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    labelPosition: {
      name: 'Label Position',
      control: { type: 'text' },
      description:
        'Specifies the position of the label relative to the checkbox. Can be set to "before" or "after", indicating whether the label appears to the left or right of the checkbox.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
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
        'An event that is emitted when the state of the checkbox changes, such as when it is checked or unchecked. This can be used to trigger functions or actions based on the checkbox’s state change.',
      table: {
        category: 'Events',
        type: { summary: '(change)="handleCheckboxChange($event)"' },
      },
    },
  },
  args: {
    id: 'checkbox1',
    checked: false,
    disabled: false,
    required: false,
    indeterminate: false,
    value: '',
    name: '',
    label: 'Contrato profesor cátedra Biología marina CCM.pdf',
    ariaDescribedby: '',
    ariaLabel: '',
    ariaLabelledby: '',
    labelPosition: 'before',
    change: () => {
      window.alert('Checkbox clicked');
    },
  },
} as Meta<typeof BmbCheckboxComponent>;

type Story = StoryObj<BmbCheckboxComponent>;

export const Default: Story = {};

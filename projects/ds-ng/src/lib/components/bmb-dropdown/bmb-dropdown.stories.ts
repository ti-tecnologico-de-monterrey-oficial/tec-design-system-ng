import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryFn,
} from '@storybook/angular';
import { BmbDropdownComponent } from './bmb-dropdown.component';
import { attributes, getEmptyStateMessage } from '../../utils/doc/utils';
import { BmbFormValidationComponent } from '../bmb-form-validation/bmb-form-validation.component';

export default {
  title: 'Components/Inputs/Dropdown',
  component: BmbDropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbFormValidationComponent],
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
<br/>
### Warning:
The \`isFilterable\` feature is not compatible with the current version of Storybook, We are working on to fix this issue. You should be able to use it in your Angular application.
${getEmptyStateMessage()}
Below is an example of how you can use this component in TypeScript:

  \`\`\`typescript
  @Component({
  selector: 'component',
  standalone: true,
  imports: [
    BmbDropdownComponent,
    FormControl,
    FormGroup
    ReactiveFormsModule,
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
export class Component {
  formGroup: FormGroup = new FormGroup({
    inputDropdown1: new FormControl<string>('', Validators.required),
  });

  onSubmit() {
    console.log('App - onSubmit', this.formGroup);
    if (this.formGroup.valid) {
      console.log('onSubmit', this.formGroup.status);
      return;
    }

    this.formGroup.markAllAsTouched();
    this.updateErrorState();
  }

  updateErrorState() {
    Object.keys(this.formGroup.controls).forEach((field) => {
      const control = this.getFormControl(field);

      if (control instanceof FormControl) {
        control.updateValueAndValidity();
      }
    });
  }

  getFormControl(name: string): FormControl {
    return this.formGroup.get(name) as FormControl;
  }

  onValueChange(value: unknown): void {
    console.log('Value changed:', value);
  }
}
  \`\`\`
  Below is an example of how you can use this component in HTML:
  \`\`\`html
  <form [formGroup]="form" (ngSubmit)="onSubmit()">
    <bmb-dropdown
      name="inputDropdown1"
      icon="bolt"
      placeholder="Set Fruit"
      tooltip="Tooltip dropdown"
      [required]="true"
      label="Fruit prefered"
      [showIcon]="true"
      [options]="[
        { name: 'Apple name', value: '_apple', icon: 'home', id: 'apple_' },
        { name: 'Banana name', value: '_banana', icon: 'bolt', id: 'banana_' },
        { name: 'Orange name', value: '_orange', icon: 'bolt', id: 'orange_' },
        { name: 'Pear name', value: '_pear', icon: 'info', id: 'pear_' },
        { name: 'Grape name', value: '_grape', icon: 'bolt', id: 'grape_' },
      ]"
      [preferredOptions]="['_orange']"
      [disabled]="false"
      helperText="Select a fruit"
      errorMessage="Error input dropdown"
      [value]="_pear"
      [control]="getFormControl('inputDropdown1')"
      (onValueChange)="onValueChange($event)"
    />
  <button type="submit" bmbButton>Submit</button>
</form>
  \`\`\`
  This example demonstrates how to use the **BmbDropdownComponent** within an Angular Reactive Form, ensuring validation and handling the selected value properly.
        `,
      },
    },
  },
  argTypes: {
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'The name of the icon. See Material Icons.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    required: {
      name: 'Required',
      control: { type: 'boolean' },
      description:
        'When set to true, The Dropdown border color turns to red. By default, it is false, and you do not need to explicitly set it.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    showIcon: {
      name: 'Show Icon',
      control: { type: 'boolean' },
      description: 'When set to true, the dropdown icon is show',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      name: 'Placeholder',
      control: { type: 'text' },
      description: 'The text of the placeholder for the dropdown.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    options: {
      name: 'Options',
      control: { type: 'array' },
      description:
        'The inputs to show on the dropdown. The data types it allows are a string array or an array of objects',
      table: {
        category: 'Properties',
        type: {
          summary: `array: string[] | IBmbDropdownItem[]. IBmbDropdownItem = {
            value: string;
            name: string;
            icon: string;
            id?: string;
          }`,
        },
      },
    },
    helperText: {
      name: 'Helper Text',
      control: { type: 'text' },
      description: 'The text of the bottom for the dropdown.',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    disabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      description:
        'When set to true, The dropdown disabled. By default, it is false, and you do not need to explicitly set it.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      name: 'Label',
      control: { type: 'text' },
      description: 'The text show an text as a label',
      table: { category: 'Properties', type: { summary: 'string' } },
    },
    control: {
      control: null,
      name: 'Control',
      description: 'Instance of FormControl to manage the input control state.',
      table: {
        category: 'Properties',
        type: { summary: 'FormControl' },
        defaultValue: { summary: "FormControl('')" },
      },
    },
    onValueChange: {
      name: 'On value change',
      control: { type: '' },
      description:
        'Emitted when an option is selected. Contains the value or item of the selected option.',
      table: { category: 'Events', type: { summary: 'function' } },
    },
    isFilterable: {
      name: 'Is Filterable',
      control: { type: 'boolean' },
      description: `When set to true, the user can type in order to filter the options list.

**Note**: The \`isFilterable\` is not compatible with the \`isMultiSelect\`. If you set the **isMultiSelect** property to true, the **isFilterable** property will be ignored.`,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    preferredOptions: {
      name: 'Preferred options',
      control: { type: 'array' },
      description:
        'List of options to be displayed at the top, the text must match the value property of an option or must be equal to an option in case the options are text.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    isMultiSelect: {
      name: 'Is Multi Select',
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    dropDownId: {
      name: 'Input ID',
      control: { type: 'text' },
      description:
        'The ID of the input element. If not set, it will be generated automatically.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'name' },
      },
    },
  },
  args: {
    isMultiSelect: false,
    icon: 'bolt',
    placeholder: 'Set Fruit',
    required: true,
    label: 'Fruit',
    showIcon: true,
    options: [
      { name: 'Apple name', value: '_apple', icon: 'home', id: 'apple_' },
      { name: 'Banana name', value: '_banana', icon: 'bolt', id: 'banana_' },
      { name: 'Orange name', value: '_orange', icon: 'bolt', id: 'orange_' },
      { name: 'Pear name', value: '_pear', icon: 'info', id: 'pear_' },
      { name: 'Grape name', value: '_grape', icon: 'bolt', id: 'grape_' },
    ],
    disabled: false,
    helperText: 'Select a fruit',
    errorMessage: 'Error input dropdown',
    preferredOptions: ['_pear'],
    tooltip: 'Tool tip',
    isFilterable: false,
    dropDownId: 'this-value-should-be-unique',
  },
} as Meta<typeof BmbDropdownComponent>;

const customizable = (): StoryFn => (args) => ({
  props: {
    ...args,
    onValueChange: (value: any) => {
      args['value'] = value;
      setTimeout(() => {
        args['control']?.setValue(value, { emitEvent: true });
      });
    },
  },
  template: `
    <bmb-dropdown
      ${attributes(args)}
    />
  `,
});

export const Default = customizable();

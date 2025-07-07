import { Meta, StoryObj } from '@storybook/angular';
import { BmbInputComponent } from './bmb-input.component';
import {
  getDescribeTypeTextBlock,
  getGeneralComponentDescription,
  getHTMLFormExampleTextBlock,
  getInputArchitecture,
  getTypescriptFormExampleTextBlock,
} from '../../utils/doc/utils';
import {
  DEPRECATED_PROPERTIES_DESCRIPTION,
  InputParameterDescriptions,
} from '../../utils/doc/parameterDescriptions';

const additionalDescription = `input various types of data, such as:
>
>- text
>- password
>- number
>- text-area`;

const inputExample = `<bmb-input
  id="input_field_id"
  name="input_field"
  label="Input Label"
  tooltip="Tooltip example"
  placeholder="Placeholder"
  icon="apps"
  [errorMessage]="{
    required: 'Please enter the required data',
    minLength: 'Please enter at least 4 characters',
    pattern: 'Please enter only letters'
  }"
  helperMessage="Helper Message"
  [isRequired]="true"
  [maxlength]="20"
  [minlength]="4"
  pattern="[A-Za-z]+"
/>`;

const getTextInputWarnings = (
  propertyName: string = '',
  isPatternProperty: boolean = false,
) => `

**Important:**

This \`${propertyName}\` property should only be used for form input fields of the type:

- **text**
- **password**
- **textarea**: ${isPatternProperty ? 'In case \`jsonFormat\` property is assigned, the \`pattern\` property should be omitted' : ''}

If the recommendation is omitted, it will cause erroneous behavior when performing the validations.
`;

export default {
  title: 'Components/Inputs/Text input',
  component: BmbInputComponent,
  tags: ['!autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralComponentDescription('bmb-input', additionalDescription)}
${getInputArchitecture()}
${getTypescriptFormExampleTextBlock('BmbInputComponent')}
${getHTMLFormExampleTextBlock(inputExample)}
${getDescribeTypeTextBlock('HTML')}
      `,
      },
    },
    controls: {
      exclude: ['handleChange', 'handleKeyPress', 'onBlur', 'onFocus'],
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'radio',
      },
      options: ['text', 'password', 'number', 'text-area'],
      description: 'Sets the type of the form input field',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbInputType',
          detail: `
IBmbInputType = 'text' | 'password' | 'number' | 'text-area'
          `,
        },
        defaultValue: { summary: 'text' },
      },
    },
    id: InputParameterDescriptions.inputId,
    name: InputParameterDescriptions.name,
    value: InputParameterDescriptions.value,
    appearance: {
      control: {
        type: 'select',
      },
      options: ['normal', 'simple'],
      description: 'Sets the appearance style of the form input field.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbInputAppearance',
          detail: `
IBmbInputAppearance = 'normal' | 'simple'
          `,
        },
        defaultValue: { summary: 'normal' },
      },
    },
    label: InputParameterDescriptions.label,
    tooltip: InputParameterDescriptions.tooltip,
    tooltipPosition: InputParameterDescriptions.tooltipPosition,
    icon: InputParameterDescriptions.icon,
    placeholder: InputParameterDescriptions.placeholder,
    disabled: InputParameterDescriptions.disabled,
    isRequired: InputParameterDescriptions.isRequired,
    helperMessage: InputParameterDescriptions.helperMessage,
    errorMessage: InputParameterDescriptions.errorMessage,
    spellcheck: {
      control: {
        type: 'boolean',
      },
      description: 'Enables the browser spellcheck when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    autocomplete: {
      control: {
        type: 'text',
      },
      description: 'Sets autocomplete on the form input field when true.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    maxlength: {
      control: {
        type: 'text',
      },
      description: `
Sets the maximum allowed length of the text string.
${getTextInputWarnings('maxlength')}
      `,
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    minlength: {
      control: {
        type: 'text',
      },
      description: `
Sets the minimum allowed length of the text string.
${getTextInputWarnings('minlength')}
      `,
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
    max: {
      control: {
        type: 'number',
      },
      description: 'Sets the maximum numeric value allowed.',
      table: {
        category: 'Properties',
        subcategory: 'Number',
        type: { summary: 'number' },
      },
    },
    min: {
      control: {
        type: 'number',
      },
      description: 'Sets the minimum numeric value allowed.',
      table: {
        category: 'Properties',
        subcategory: 'Number',
        type: { summary: 'number' },
      },
    },
    pattern: {
      control: {
        type: 'text',
      },
      description: `
Sets the allowed format validation pattern.
${getTextInputWarnings('pattern', true)}
      `,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    showMaxTextLength: {
      control: { type: 'boolean' },
      description: `
Shows the length of text typed in the form textarea field, this is shown on the right side of the label when true.

This property only works for the form textarea field.

If the \`maxlength\` property has been assigned to this form textarea field, this data will also be displayed below the length of text typed, otherwise only a hyphen will be displayed.

Example: 10/20 or 10/-
      `,
      table: {
        category: 'Properties',
        subcategory: 'Textarea',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    rows: {
      control: {
        type: 'text',
      },
      description:
        'Sets the number of visible lines in the form textarea field, this property only works for the form textarea field.',
      table: {
        category: 'Properties',
        subcategory: 'Textarea',
        type: { summary: 'number' },
      },
    },
    customValidation: {
      control: {
        type: 'object',
      },
      description: `
Sets custom validator function to the field.

Example of a \`ValidatorFn\`
    customValidatorDate(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        const { value } = control;
        if (!value) return null;

        const isValidDate = DateTime.fromFormat(
          control.value,
          this.dateFormat(),
        ).isValid;

        return !isValidDate ? { customValidation: true } : null;
      };
    }
`,
      table: {
        category: 'Properties',
        type: { summary: 'ValidatorFn' },
      },
    },
    jsonFormat: {
      control: { type: 'boolean' },
      description: `
Enables the skill to validate JSON content when true, this skill only works for the form textarea field.

<br>
**Important:**

For correct behavior, the \`pattern\` property must not be assigned to the form input field.
      `,
      table: {
        category: 'Properties',
        subcategory: 'Textarea',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    heightTextArea: {
      control: { type: 'number' },
      description:
        'Sets the height of the textarea in pixels, this property only works for the form textarea field..',
      table: {
        category: 'Properties',
        subcategory: 'Textarea',
        type: { summary: 'number' },
      },
    },
    isClearable: InputParameterDescriptions.isClearable,
    additionalAction: {
      control: {
        type: 'radio',
      },
      options: ['copy', 'showHide', 'none'],
      description: `
Sets additional skills to run on this form input field.

- **copy**: copies the contents of the entry to the clipboard
- **showHide**: shows and hides the contents of a password type form input field, this skill only works for the password type form input field
`,
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbAdditionalAction',
          detail: `
IBmbAdditionalAction = 'copy' | 'showHide' | 'none'
          `,
        },
        defaultValue: { summary: 'none' },
      },
    },
    control: InputParameterDescriptions.control,
    isFocus: {
      description: 'Emits focus event.',
      table: {
        category: 'Events',
        type: { summary: 'boolean' },
      },
    },
    isBlur: {
      control: { type: 'boolean' },
      description: 'Emits blur event.',
      table: {
        category: 'Events',
        type: { summary: 'boolean' },
      },
    },
    onChange: {
      control: { type: 'boolean' },
      description: 'Emits change event.',
      table: {
        category: 'Events',
        type: { summary: 'HTMLInputElement' },
      },
    },
    onKeyDown: {
      control: { type: 'boolean' },
      description: 'Emits keydown event.',
      table: {
        category: 'Events',
        type: { summary: 'KeyboardEvent' },
      },
    },
    customInputContent: {
      description:
        'Allows to provide custom content inside the form input field using a TemplateRef.',
      table: {
        category: 'Content child',
        type: { summary: 'TemplateRef<any>' },
      },
    },
    showError: InputParameterDescriptions.showError,
    size: {
      control: {
        type: 'text',
      },
      description: DEPRECATED_PROPERTIES_DESCRIPTION,
      table: {
        category: 'Deprecated',
        type: { summary: 'number' },
      },
    },
  },
  args: {
    type: 'text',
    id: '',
    name: '',
    value: '',
    appearance: 'normal',
    label: 'Input Label',
    tooltip: 'Tooltip example',
    tooltipPosition: { align: 'above', justify: 'before' },
    icon: 'apps',
    placeholder: 'Placeholder',
    disabled: false,
    isRequired: true,
    spellcheck: false,
    autocomplete: '',
    minlength: '4',
    maxlength: '20',
    pattern: '[A-Za-z]+',
    isClearable: false,
    additionalAction: '',
    helperMessage: 'Helper Message',
    errorMessage: {
      required: 'Please enter the required data',
      jsonFormat: 'Please enter content in valid JSON format',
      minLength: 'Please enter at least 4 characters',
      pattern: 'Please enter only letters',
    },
    customValidation: null,
    control: null,
  },
} as Meta<typeof BmbInputComponent>;

type Story = StoryObj<BmbInputComponent>;

export const Default: Story = {};

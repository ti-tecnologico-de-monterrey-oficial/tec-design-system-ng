import { Meta, StoryObj } from '@storybook/angular';
import { BmbInputComponent } from './bmb-input.component';
import {
  generateLabel,
  getArchitectureSection,
  getBasicExampleBlock,
  getFieldDescription,
  getFormatName,
  getFormExampleBlock,
  getOnEvent,
  IBmbOnEvent,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbInputParamDesc,
  getOnEventParam,
  getDefaultValueControl,
  getAppearanceParam,
} from '../../utils/doc/parameterDescriptions';

const additionalDescription = `input various types of data, such as:
>
>- text
>- password
>- number
>- text-area`;
const inputName = 'text_field';
const formatName: string = getFormatName(inputName, '_');
const handleChange: IBmbOnEvent = getOnEvent(
  '',
  `${formatName}Change`,
  'HTMLInputElement',
  true,
);
const inputExample = `<bmb-input
  inputId="${inputName}_id"
  name="${inputName}"
  label="${generateLabel(inputName)}"
  tooltip="Tooltip example"
  tooltipTitle="Tooltip title example"
  icon="apps"
  placeholder="Placeholder"
  helperMessage="Helper Message"
  [control]="getFormControl('${inputName}')"
  (onChange)="${handleChange.propertyValue}"
 />`;
const onChange: IBmbOnEvent = getOnEvent(
  'field',
  'onChange',
  handleChange.type,
);

const getTextInputWarnings = (
  propertyName: string = '',
  isPatternProperty: boolean = false,
) => `

${RELEVANT_TITLE.important}
This \`${propertyName}\` property should only be used for input fields of the type:

- **text**
- **password**
- **textarea**: ${isPatternProperty ? 'In case `jsonFormat` property is assigned, the `pattern` property should be omitted' : ''}

If the recommendation is omitted, it will cause erroneous behavior when performing the validations.
`;

export default {
  title: 'Components/Inputs/Text input',
  component: BmbInputComponent,
  tags: ['!autodocs'],
  parameters: {
    controls: {
      exclude: [
        'handleChange',
        'handleKeyPress',
        'onBlur',
        'onFocus',
        'isLoading',
      ],
    },
    docs: {
      description: {
        component: `
${getFieldDescription(
  'input',
  additionalDescription,
  'https://bamboo.tec.mx/latest/componentes/text-input/descripcion-general-PxlXQ5FH',
)}
${getArchitectureSection(`<section class="bmb_field">
  <!-- conditional class bmb_field-disabled -->
  <section>
    <!-- if label is defined -->
    <label class="bmb_field-label" for="input">{ label }</label>
    <input { configuration } />
  </section>

  <!-- if customInputContent is defined -->
  <ng-template #customInputContent/>

  <!-- if helper message is defined -->
  <p class="bmb_field-helper">{ helperMessage }</p>

  <!-- if error message is defined -->
  <p class="bmb_field-error">{ errorMessage }</p>
</section>`)}
${getFormExampleBlock('BmbInputComponent', inputName, handleChange.handleExample, inputExample)}
${getBasicExampleBlock('BmbInputComponent', '', onChange.handleExample)}
      `,
      },
    },
  },
  argTypes: {
    type: {
      control: {
        type: 'radio',
      },
      options: ['text', 'password', 'number', 'text-area'],
      description: 'Sets the type of the input field',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbInputType',
          detail: `
IBmbInputType = 'text' | 'password' | 'number' | 'text-area'
          `,
        },
        defaultValue: getDefaultValueControl('text'),
      },
    },
    inputId: DBmbInputParamDesc.inputId,
    name: DBmbInputParamDesc.name,
    value: DBmbInputParamDesc.value,
    appearance: getAppearanceParam('input field', ['normal', 'simple']),
    label: DBmbInputParamDesc.label,
    tooltip: DBmbInputParamDesc.tooltip,
    tooltipTitle: DBmbInputParamDesc.tooltipTitle,
    tooltipPosition: DBmbInputParamDesc.tooltipPosition,
    icon: DBmbInputParamDesc.icon,
    placeholder: DBmbInputParamDesc.placeholder,
    disabled: DBmbInputParamDesc.disabled,
    isRequired: DBmbInputParamDesc.isRequired,
    helperMessage: DBmbInputParamDesc.helperMessage,
    errorMessage: DBmbInputParamDesc.errorMessage,
    spellcheck: {
      control: {
        type: 'boolean',
      },
      description: 'Enables the browser spellcheck when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
    autocomplete: {
      control: {
        type: 'text',
      },
      description: 'Sets autocomplete on the input field when true.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl('off'),
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
        defaultValue: getDefaultValueControl('true'),
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
        defaultValue: getDefaultValueControl(3),
      },
    },
    customValidation: DBmbInputParamDesc.customValidation,
    jsonFormat: {
      control: { type: 'boolean' },
      description: `
Enables the skill to validate JSON content when true, this skill only works for the form textarea field.

<br/>
${RELEVANT_TITLE.important}
For correct behavior, the \`pattern\` property must not be assigned to the input field.
      `,
      table: {
        category: 'Properties',
        subcategory: 'Textarea',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
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
    isClearable: DBmbInputParamDesc.isClearable,
    additionalAction: {
      control: {
        type: 'radio',
      },
      options: ['copy', 'showHide', 'none'],
      description: `
Sets additional skills to run on this input field.

- **copy**: copies the contents of the entry to the clipboard
- **showHide**: shows and hides the contents of a password type input field, this skill only works for the password type input field
`,
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbAdditionalAction',
          detail: `
IBmbAdditionalAction = 'copy' | 'showHide' | 'none'
          `,
        },
        defaultValue: getDefaultValueControl('none'),
      },
    },
    control: DBmbInputParamDesc.control,
    isFocus: getOnEventParam(
      getOnEvent('', 'isFocus', 'boolean'),
      'when field has received or lost focus, by interactions as clicking or tabbing.',
      'other',
    ),
    isBlur: getOnEventParam(
      getOnEvent('', 'isBlur', 'boolean'),
      'when field has lost focus, by interactions as clicking or tabbing.',
      'other',
    ),
    onChange: getOnEventParam(onChange),
    onKeyDown: DBmbInputParamDesc.onKeyDown,
    customInputContent: {
      control: false,
      description:
        'Allows to provide custom content inside the input field using a TemplateRef.',
      table: {
        category: 'Content child',
        type: { summary: 'TemplateRef<any>' },
      },
    },
    showError: DBmbInputParamDesc.showError,
  },
  args: {
    type: 'text',
    inputId: '',
    name: '',
    value: '',
    appearance: 'normal',
    label: 'Input Label',
    tooltip: 'Tooltip example',
    tooltipTitle: 'Tooltip title example',
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
    onChange: () => {
      console.info('onChange');
    },
    onKeyDown: () => {
      console.info('onKeyDown');
    },
  },
} as Meta<typeof BmbInputComponent>;

type Story = StoryObj<BmbInputComponent>;

export const Default: Story = {};

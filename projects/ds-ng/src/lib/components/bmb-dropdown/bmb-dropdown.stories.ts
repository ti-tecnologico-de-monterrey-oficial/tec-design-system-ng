import { moduleMetadata, StoryObj, type Meta } from '@storybook/angular';
import { BmbDropdownComponent } from './bmb-dropdown.component';
import {
  getArchitectureSection,
  getEmptyStateMessage,
  getFieldDescription,
  getSpecialSpecifications,
  getBasicExampleBlock,
  getFormExampleBlock,
  generateLabel,
  getFormatName,
  getOnEvent,
  IBmbOnEvent,
  RELEVANT_TITLE,
  getAlertBlockquote,
  BlockquoteType,
} from '../../utils/doc/utils';
import { BmbFormValidatorComponent } from '../bmb-form-validator/bmb-form-validator.component';
import {
  DBmbInputParamDesc,
  getDefaultValueControl,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';

const inputName = 'dropdown';
const formatName: string = getFormatName(inputName, '_');
const handleChange: IBmbOnEvent = getOnEvent(
  '',
  `${formatName}Change`,
  'unknown',
  true,
);
const inputExample = ` <bmb-${inputName}
  inputId="${inputName}_id"
  name="${inputName}"
  label="${generateLabel(inputName)}"
  [control]="getFormControl('${inputName}')"
  (onValueChange)="${handleChange.propertyValue}"
  />`;
const onChange: IBmbOnEvent = getOnEvent(
  'selected option',
  'onValueChange',
  handleChange.type,
);

export default {
  title: 'Components/Inputs/Dropdown',
  component: BmbDropdownComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BmbFormValidatorComponent],
    }),
  ],
  parameters: {
    controls: {
      exclude: [
        'filteredOptions',
        'isOpen',
        'items',
        'onBlur',
        'onFocus',
        'isKeyboardEvent',
        'selectedIcon',
        'selectedItem',
        'selectionControl',
        'uuid',
        'closeList',
        'getIcon',
        'getUUID',
        'getValidInitialValues',
        'handleFocus',
        'handleValidity',
        'initOptions',
        'onKeyDown',
        'openList',
        'selectOptionWithKey',
        'setSelectedValue',
        'setSelectionControl',
      ],
    },
    docs: {
      description: {
        component: `
${getFieldDescription(
  'dropdown',
  'select an option from a list.',
  'https://bamboo.tec.mx/latest/componentes/dropdown/descripcion-general-4wp8B5ut',
)}
${getArchitectureSection(`
<bmb-input class="bmb_dropdown-field">
    <ng-template #customContent>
      <label [htmlFor]="inputId">
        <bmb-icon class="bmb_field-actions"/>
      </label>
    </ng-template>
  </bmb-input>
  <bmb-dropdown-content class="bmb_dropdown-list"/>
</section>
`)}
${getSpecialSpecifications(
  `
${getAlertBlockquote(
  `The \`isFilterable\` feature is not compatible with the current version of Storybook, We are working on to fix this issue. You should be able to use it in your Angular application.`,
  {
    title: '###'.concat(RELEVANT_TITLE.warning),
    blockquoteType: BlockquoteType.warning,
  },
)}
<br/>
${getEmptyStateMessage()}
`,
  { showAdditionalBlockquote: true },
)}
${getFormExampleBlock(
  'BmbDropdownComponent',
  inputName,
  `${handleChange.handleExample}
  `,
  inputExample,
)}
${getBasicExampleBlock('BmbDropdownComponent', '', onChange.handleExample)}
        `,
      },
    },
  },
  argTypes: {
    icon: DBmbInputParamDesc.icon,
    required: DBmbInputParamDesc.isRequired,
    showIcon: {
      control: { type: 'boolean' },
      description: `
Shows the icon assigned in the \`icon\` property when true.
      `,
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
    placeholder: DBmbInputParamDesc.placeholder,
    options: {
      control: { type: 'array' },
      description: 'Sets the data to be displayed in the dropdown.',
      table: {
        category: 'Properties',
        type: {
          summary: 'string[] | IBmbDropdownItem[]',
          detail: `
IBmbDropdownItem = {
  value: string;
  name: string;
  icon: string;
  id?: string;
}
          `,
        },
        defaultValue: { summary: '[]' },
      },
    },
    helperText: DBmbInputParamDesc.helperMessage,
    disabled: DBmbInputParamDesc.disabled,
    label: DBmbInputParamDesc.label,
    control: DBmbInputParamDesc.control,
    onValueChange: getOnEventParam(onChange),
    isFilterable: {
      control: { type: 'boolean' },
      description: `
Enables the functionality to filter data when true, the user can type in order to filter the options list.

${RELEVANT_TITLE.important}

The \`isFilterable\` is not compatible with the \`isMultiSelect\`.

If you set the \`isMultiSelect\` property to true, the \`isFilterable\` property will be ignored.`,
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(false),
        type: { summary: 'boolean' },
      },
    },
    preferredOptions: {
      control: { type: 'array' },
      description: `
Sets the list of options to display at the top of the data.

${RELEVANT_TITLE.important}

The order given will be the position in which it will be displayed.

**Considerations**

If the data is a list of string type, the preferred options should be a fragment of the data.

**Example**:
    [options]="[
      'Apple name',
      'Banana name',
      'Orange name',
      'Pear name',
      'Grape name',
    ]"
<br/>
    [preferredOptions]="[
      'Grape name',
      'Orange name',
    ]"

If the data is a list of  IBmbDropdownItem type, the preferred options should be the value attribute of the object.
**Example**:
    [options]="[
      { name: 'Apple name', value: '_apple', icon: 'home', id: 'apple_' },
      { name: 'Banana name', value: '_banana', icon: 'bolt', id: 'banana_' },
      { name: 'Orange name', value: '_orange', icon: 'bolt', id: 'orange_' },
      { name: 'Pear name', value: '_pear', icon: 'info', id: 'pear_' },
      { name: 'Grape name', value: '_grape', icon: 'bolt', id: 'grape_' },
    ]"
<br/>
    [preferredOptions]="[
      '_grape',
      '_orange',
    ]"
      `,
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    isMultiSelect: {
      control: { type: 'boolean' },
      description: '',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },

    customValidation: DBmbInputParamDesc.customValidation,
    inputId: DBmbInputParamDesc.inputId,
    tooltip: DBmbInputParamDesc.tooltip,
    errorMessage: DBmbInputParamDesc.errorMessage,
    name: DBmbInputParamDesc.name,
    tooltipPosition: DBmbInputParamDesc.tooltipPosition,
    value: DBmbInputParamDesc.value,
  },
  args: {
    inputId: 'this-value-should-be-unique',
    name: 'dropdown',
    value: '',
    label: 'Fruit',
    tooltip: 'Tool tip',
    tooltipPosition: '',
    showIcon: true,
    icon: 'bolt',
    placeholder: 'Set Fruit',
    options: [
      { name: 'Apple name', value: '_apple', icon: 'home', id: 'apple_' },
      { name: 'Banana name', value: '_banana', icon: 'bolt', id: 'banana_' },
      { name: 'Orange name', value: '_orange', icon: 'bolt', id: 'orange_' },
      { name: 'Pear name', value: '_pear', icon: 'info', id: 'pear_' },
      { name: 'Grape name', value: '_grape', icon: 'bolt', id: 'grape_' },
    ],
    preferredOptions: ['_pear'],
    isFilterable: false,
    disabled: false,
    required: true,
    helperText: 'Select a fruit',
    errorMessage: 'Error input dropdown',
    control: null,
    isMultiSelect: false,
    onValueChange: () => {
      console.info('onChange');
    },
  },
} as Meta<typeof BmbDropdownComponent>;

type Story = StoryObj<BmbDropdownComponent>;

export const Default: Story = {};

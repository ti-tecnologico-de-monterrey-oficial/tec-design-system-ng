import {
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryFn,
} from '@storybook/angular';
import { BmbDropdownComponent } from './bmb-dropdown.component';
import {
  attributes,
  getArchitectureSection,
  getEmptyStateMessage,
  getFieldDescription,
  getSpecialSpecifications,
  getBasicExampleBlock,
  getFormExampleBlock,
  generateLabel,
} from '../../utils/doc/utils';
import { BmbFormValidatorComponent } from '../bmb-form-validator/bmb-form-validator.component';
import { InputParameterDescriptions } from '../../utils/doc/parameterDescriptions';

const title = 'Components/Inputs/Dropdown';
const inputName = 'dropdown';
const additionalBlock = `handleDropdownChange(value: string): void {
    console.log('Value changed:', value);
    //Add your code
}`;
const inputExample = ` <bmb-${inputName}
  inputId="${inputName}_id"
  name="${inputName}"
  label="${generateLabel(inputName)}"
  [control]="getFormControl('${inputName}')"
  (change)="handleDropdownChange($event)"
  />`;

export default {
  title,
  component: BmbDropdownComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [BmbFormValidatorComponent],
    }),
    componentWrapperDecorator((story: string) => {
      return `
        <div style="height: 25rem">
          ${story}
        </div>`;
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
${getSpecialSpecifications(`
  ### Warning:
The \`isFilterable\` feature is not compatible with the current version of Storybook, We are working on to fix this issue. You should be able to use it in your Angular application.
>${getEmptyStateMessage()}
`)}
${getFormExampleBlock('BmbDropdownComponent', inputName, additionalBlock, inputExample)}
${getBasicExampleBlock('BmbDropdownComponent')}
        `,
      },
    },
  },
  argTypes: {
    icon: InputParameterDescriptions.icon,
    required: InputParameterDescriptions.isRequired,
    showIcon: {
      control: { type: 'boolean' },
      description: `
Shows the icon assigned in the \`icon\` property when true.
      `,
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: InputParameterDescriptions.placeholder,
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
    helperText: InputParameterDescriptions.helperMessage,
    disabled: InputParameterDescriptions.disabledFormControl,
    label: InputParameterDescriptions.label,
    control: InputParameterDescriptions.control,
    onValueChange: {
      control: { type: '' },
      description: 'Emits the value of the selected option',
      table: { category: 'Events', type: { summary: 'function' } },
    },
    isFilterable: {
      control: { type: 'boolean' },
      description: `
Enables the functionality to filter data when true, the user can type in order to filter the options list.

**Important**:

The \`isFilterable\` is not compatible with the \`isMultiSelect\`.

If you set the \`isMultiSelect\` property to true, the \`isFilterable\` property will be ignored.`,
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    preferredOptions: {
      control: { type: 'array' },
      description: `
Sets the list of options to display at the top of the data.

**Important**

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
        defaultValue: { summary: 'false' },
      },
    },
    inputId: InputParameterDescriptions.inputId,
    tooltip: InputParameterDescriptions.tooltip,
    errorMessage: InputParameterDescriptions.errorMessage,
    name: InputParameterDescriptions.name,
    tooltipPosition: InputParameterDescriptions.tooltipPosition,
    value: InputParameterDescriptions.value,
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

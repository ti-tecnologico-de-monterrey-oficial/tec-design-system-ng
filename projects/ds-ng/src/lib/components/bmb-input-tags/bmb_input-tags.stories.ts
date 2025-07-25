import {
  componentWrapperDecorator,
  type Meta,
  type StoryFn,
} from '@storybook/angular';
import {
  attributes,
  generateLabel,
  getBasicExampleBlock,
  getEmptyStateMessage,
  getFieldDescription,
  getFormExampleBlock,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import { BmbInputTagsComponent } from './bmb-input-tags.component';
import { InputParameterDescriptions } from '../../utils/doc/parameterDescriptions';

const inputName = 'input_with_tags';
const additionalBlock = `handleInputWithTagsChange(value: string[]): void {
  console.log('Value changed:', value);
  //Add your code
}
>
handleInputWithTagsKeyDown(event: KeyboardEvent): void {
  //Add your code
}`;
const inputExample = `<bmb-input-tags
  id="${inputName}_id"
  name="${inputName}"
  label="${generateLabel(inputName)}"
  helperMessage="Helper Message"
  [tagOptions]="[
    'Tacos al pastor',
    'Enchiladas',
    'Tamales',
    'Quesadillas',
    'Chiles en nogada',
    'Mole poblano',
    'Sopes',
    'Gorditas',
    'Pozole',
    'Ceviche',
    'Tortas',
    'Guacamole',
    'Tacos de pescado',
    'Flautas',
    'Chalupas',
    'Huevos rancheros',
    'Elote',
  ]"
  [control]="getFormControl('${inputName}')"
  (onChange)="handleInputWithTagsChange($event)"
  (onKeyDown)="handleInputWithTagsKeyDown($event)"
 />`;

export default {
  title: 'Components/Inputs/Text input with tags',
  component: BmbInputTagsComponent,
  tags: ['!autodocs'],
  decorators: [
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
        'addOption',
        'closeList',
        'getUUID',
        'getValidInitialValues',
        'handleFocus',
        'handleKeyDown',
        'handleValidity',
        'initOptions',
        'openList',
        'removeTag',
        'selectOptionWithKey',
        'setSelectedTags',
        'setSelectedValue',
        'filterControl',
        'filteredOptions',
        'isFocused',
        'isKeyboardEvent',
        'items',
        'selectedTags',
        'showDropdown',
        'uuid',
      ],
    },
    docs: {
      description: {
        component: `
${getFieldDescription(
  'input-phone-number',
  'select multiple tags from a drop-down list.',
  'https://bamboo.tec.mx/latest/componentes/text-input-with-tags/descripcion-general-wdIzT606',
)}
${getSpecialSpecifications(getEmptyStateMessage())}
${getFormExampleBlock('BmbInputTagsComponent', inputName, additionalBlock, inputExample)}
${getBasicExampleBlock('BmbInputTagsComponent')}
          `,
      },
    },
  },
  argTypes: {
    control: InputParameterDescriptions.control,
    errorMessage: InputParameterDescriptions.errorMessage,
    helperMessage: InputParameterDescriptions.helperMessage,
    isRequired: InputParameterDescriptions.isRequired,
    placeholder: InputParameterDescriptions.placeholder,
    disabled: InputParameterDescriptions.disabledFormControl,
    label: InputParameterDescriptions.label,
    showError: InputParameterDescriptions.showError,
    tagOptions: {
      control: {
        type: 'array',
      },
      description: 'Sets the options the user can select from.',
      table: {
        category: 'Properties',
        type: { summary: 'string, string[]' },
        defaultValue: { summary: '' },
      },
    },
    tooltip: InputParameterDescriptions.tooltip,
    tooltipPosition: InputParameterDescriptions.tooltipPosition,
    maxSelectedItems: InputParameterDescriptions.deprecated,
    inputId: InputParameterDescriptions.inputId,
    name: InputParameterDescriptions.name,
    value: InputParameterDescriptions.value,
    onChange: {
      control: false,
      description:
        'Emits when the selected tags change. The event payload is an array of selected tag strings.',
      table: {
        category: 'Event',
        type: { summary: '' },
      },
    },
    onKeyDown: {
      control: false,
      description:
        'Emits when a key is pressed while the input is focused. The event payload is a KeyboardEvent.',
      table: {
        category: 'Event',
        type: { summary: '' },
      },
    },
  },
  args: {
    inputId: '',
    name: '',
    value: '',
    label: '',
    tooltip: '',
    tooltipPosition: {},
    placeholder: '',
    helperMessage: 'Helper Message',
    disabled: false,
    isRequired: false,
    tagOptions: [
      'Tacos al pastor',
      'Enchiladas',
      'Tamales',
      'Quesadillas',
      'Chiles en nogada',
      'Mole poblano',
      'Sopes',
      'Gorditas',
      'Pozole',
      'Ceviche',
      'Tortas',
      'Guacamole',
      'Tacos de pescado',
      'Flautas',
      'Chalupas',
      'Huevos rancheros',
      'Elote',
      'Mole verde',
      'Arroz a la mexicana',
      'Burritos',
    ],
  },
} as Meta<typeof BmbInputTagsComponent>;

const customizable = (): StoryFn => (args) => ({
  template: `
    <bmb-input-tags
      ${attributes(args)}
      (onValueChange)="onValueChange($event)"
    />
  `,
});

export const Default = customizable();

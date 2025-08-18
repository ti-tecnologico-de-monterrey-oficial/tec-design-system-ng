import {
  componentWrapperDecorator,
  StoryObj,
  type Meta,
} from '@storybook/angular';
import {
  attributes,
  generateLabel,
  getBasicExampleBlock,
  getEmptyStateMessage,
  getFieldDescription,
  getFormatName,
  getFormExampleBlock,
  getOnEvent,
  getSpecialSpecifications,
  IBmbOnEvent,
} from '../../utils/doc/utils';
import { BmbInputTagsComponent } from './bmb-input-tags.component';
import {
  DBmbGenericParamDesc,
  DBmbInputParamDesc,
  getDefaultValueControl,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';

const inputName: string = 'input_with_tags';
const formatName: string = getFormatName(inputName, '_');
const onChange: IBmbOnEvent = getOnEvent(
    '',
    `${formatName}Change`,
    'string[]',
    true,
  ),
  onKeyDown = getOnEvent('', `${formatName}KeyDown`, 'KeyboardEvent', true);
const additionalBlock: string = `${onChange.handleExample}
${onKeyDown.handleExample}`;
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
  (onChange)="${onChange.propertyValue}"
  (onKeyDown)="${onKeyDown.propertyValue}"
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
${getBasicExampleBlock('BmbInputTagsComponent', '', additionalBlock)}
          `,
      },
    },
  },
  argTypes: {
    control: DBmbInputParamDesc.control,
    errorMessage: DBmbInputParamDesc.errorMessage,
    helperMessage: DBmbInputParamDesc.helperMessage,
    isRequired: DBmbInputParamDesc.isRequired,
    placeholder: DBmbInputParamDesc.placeholder,
    disabled: DBmbInputParamDesc.disabled,
    label: DBmbInputParamDesc.label,
    showError: DBmbInputParamDesc.showError,
    tagOptions: {
      control: {
        type: 'array',
      },
      description: 'Sets the options the user can select from.',
      table: {
        category: 'Properties',
        type: { summary: 'string, string[]' },
        defaultValue: getDefaultValueControl(),
      },
    },
    tooltip: DBmbInputParamDesc.tooltip,
    tooltipPosition: DBmbInputParamDesc.tooltipPosition,
    maxSelectedItems: DBmbGenericParamDesc.deprecated,
    inputId: DBmbInputParamDesc.inputId,
    name: DBmbInputParamDesc.name,
    value: DBmbInputParamDesc.value,
    onChange: getOnEventParam(
      getOnEvent('selected tags', 'onChange', onChange.type),
      ' The event payload is an array of selected tag strings.',
    ),
    onKeyDown: DBmbInputParamDesc.onKeyDown,
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
    onChange: () => {
      console.info('onChange');
    },
    onKeyDown: () => {
      console.info('onKeyDown');
    },
  },
} as Meta<typeof BmbInputTagsComponent>;

type Story = StoryObj<BmbInputTagsComponent>;

export const Default: Story = {
  render: (args: any) => ({
    template: `
    <bmb-input-tags
      ${attributes(args)}
    />
    `,
  }),
};

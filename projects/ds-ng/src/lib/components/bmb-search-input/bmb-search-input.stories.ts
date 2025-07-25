import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { BmbSearchInputComponent } from './bmb-search-input.component';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import { InputParameterDescriptions } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Inputs/Search',
  component: BmbSearchInputComponent,
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
        'filterControl',
        'filteredData',
        'isDialogOpen',
        'items',
        'uid',
        'closeList',
        'handleItemClick',
        'handleKeyDown',
        'initOptions',
        'setSelectedValue',
        'value',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('search-input')} to enter text and run a search.`, 'https://bamboo.tec.mx/latest/componentes/search/descripcion-general-EAreKqon')}
${getSpecialSpecifications(getEmptyStateMessage())}
${getBasicExampleBlock('BmbSearchInputComponent')}
        `,
      },
    },
  },
  argTypes: {
    inputId: InputParameterDescriptions.inputId,
    name: InputParameterDescriptions.name,
    data: {
      control: false,
      description:
        'Data should be a collection of strings like: ["duck", "dog", ...]',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    isLoading: {
      control: 'boolean',
      description: 'Set the loading state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Properties',
      },
    },
    isServerSideFilter: {
      control: 'boolean',
      description: 'Set the server side filter.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Properties',
      },
    },
    placeholder: InputParameterDescriptions.placeholder,
    serverSideFilteredData: {
      control: false,
      description:
        'Once the server has filtered the result it must place it in this input attribute.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: { summary: '[]' },
      },
    },
    onValueChange: {
      control: false,
      description: 'These events are triggered once the input value changes.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onServerSideFilterEvent: {
      control: false,
      description:
        'This function is executed once the value of the field has changed, the result must be stored in serverSideFilteredData.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onClearField: {
      control: false,
      description: 'Emits an event when the input field is cleared.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
    inputId: '',
    name: '',
    placeholder: '',
    data: [
      'Carlee Bengochea',
      'Reynard Howgate',
      'Pearce Jore',
      'Giacopo Mellings',
      'Clyve Nerval',
      'Pauletta Pavelka',
      'Midge Girardot',
    ],
    isLoading: false,
    serverSideFilteredData: [
      'Giacopo Mellings',
      'Clyve Nerval',
      'Pauletta Pavelka',
      'Midge Girardot',
    ],
    onServerSideFilterEvent: () => {
      console.log('onServerSideFilterEvent');
    },
    isServerSideFilter: false,
    onValueChange: () => {
      console.log('onValueChange');
    },
  },
} as Meta<typeof BmbSearchInputComponent>;

type Story = StoryObj<BmbSearchInputComponent>;

export const Default: Story = {};

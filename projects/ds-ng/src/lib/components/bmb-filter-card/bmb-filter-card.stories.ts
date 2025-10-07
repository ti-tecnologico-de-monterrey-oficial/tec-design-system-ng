import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbFilterCardComponent } from './bmb-filter-card.component';
import { CommonModule } from '@angular/common';
import {
  getBasicExampleBlock,
  getEmptyStateMessage,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import {
  DBmbButtonParamDesc,
  DBmbModalParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Containers/Filter card',
  component: BmbFilterCardComponent,
  decorators: [moduleMetadata({ imports: [CommonModule] })],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getFormControl',
          'onControlChange',
          'onReset',
          'onSubmit',
          'onValueChange',
          'openModalComponent',
          'ngOnInit',
          'filterForm',
          'storedValues',
          'modalTemplate',
        ],
      },
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'filter-card' })} to display and managing filter controls in a modal dialog.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/filter-card/descripcion-general-Be01z0Al' })}
${getSpecialSpecifications(getEmptyStateMessage())}
${getBasicExampleBlock('BmbFilterCardComponent')}
        `,
      },
    },
  },
  argTypes: {
    modalTitle: DBmbModalParamDesc.title,
    primaryBtnLabel: DBmbModalParamDesc.primaryBtnLabel,
    secondaryBtnLabel: DBmbModalParamDesc.secondaryBtnLabel,
    icon: DBmbButtonParamDesc.icon,
    placeholderSearch: {
      control: { type: 'text' },
      description: 'Sets the placeholder text for the search input.',
      table: { category: 'Properties', defaultValue: { summary: '' } },
    },
    controlTypes: {
      control: { type: 'array' },
      description:
        'An array of control types, each with a title and an array of controls.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: {
          summary: 'IBmbControlType[]',
          detail: `IBmbControlType {
  title: string;
  control: {
    name: string;
    type: 'radial' | 'checkbox' | 'switch' | 'tag';
    label: string;
    checked: boolean;
    rightText?: string;
  }[];
}`,
        },
      },
    },
    applyFilters: getOnClickParam(
      getOnEvent('apply filters', 'applyFilters', 'void'),
    ),
    resetFilters: getOnClickParam(getOnEvent('reset ', 'resetFilters', 'void')),
    inLine: {
      control: { type: 'boolean' },
      description:
        'Display the filter card in the document instead of the dialog',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    showDropdown: {
      control: { type: 'boolean' },
      description:
        'Determines if the dropdown should be displayed instead of the input.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    dropdownOptions: {
      control: { type: 'array' },
      description: 'Defines the list of options available in the dropdown.',
      table: {
        category: 'Properties',
        type: { summary: 'string[]' },
        defaultValue: {
          summary: "['Apple', 'Banana', 'Orange', 'Pear', 'Grape']",
        },
      },
    },
  },
  args: {
    showDropdown: false,
    dropdownOptions: ['Apple', 'Banana', 'Orange', 'Pear', 'Grape'],
    modalTitle: 'Opciones Filtrado',
    primaryBtnLabel: 'Aplicar Filtros',
    secondaryBtnLabel: 'Limpiar Filtros',
    icon: 'tune',
    placeholderSearch: 'Search',
    applyFilters: (filters: any) => {
      console.log('Filters applied', filters);
    },
    controlTypes: [
      {
        title: 'Filter - tags',
        control: [
          {
            name: 'tag-1',
            type: 'tag',
            label: 'Name tag 1',
            checked: false,
          },
          {
            name: 'tag-2',
            type: 'tag',
            label: 'Name tag 2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Radial',
        control: [
          {
            name: 'radial-1',
            type: 'radial',
            label: 'Radial 1',
            id: 'radial-1',
            value: '1',
            checked: false,
          },
          {
            name: 'radial-1',
            type: 'radial',
            label: 'Radial 2',
            id: 'radial-2',
            value: '2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Checkbox',
        control: [
          {
            name: 'checkbox-1',
            type: 'checkbox',
            label: 'Checkbox 1',
            checked: false,
          },
          {
            name: 'checkbox-2',
            type: 'checkbox',
            label: 'Checkbox 2',
            checked: false,
          },
        ],
      },
      {
        title: 'Filter - Switch',
        control: [
          {
            name: 'switch-1',
            type: 'switch',
            rightText: 'Switch 3',
            checked: false,
          },
        ],
      },
    ],
    inLine: false,
  },
} as Meta<typeof BmbFilterCardComponent>;

type Story = StoryObj<typeof BmbFilterCardComponent>;

export const Default: Story = {};

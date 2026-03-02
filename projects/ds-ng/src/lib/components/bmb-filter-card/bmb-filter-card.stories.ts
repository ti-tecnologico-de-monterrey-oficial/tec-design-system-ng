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
  getTechnicalDocReferences,
} from '../../utils/doc/utils';
import {
  DBmbButtonParamDesc,
  DBmbModalParamDesc,
  getOnClickParam,
} from '../../utils/doc/parameterDescriptions';
import * as checkboxStory from './../bmb-checkbox/bmb-checkbox.stories';
import * as switchStory from './../bmb-switch/bmb-switch.stories';
import * as radialStory from './../bmb-radial/bmb-radial.stories';
import * as dropdownStory from './../bmb-dropdown/bmb-dropdown.stories';
import * as tagsStory from './../bmb-tags/bmb-tags.stories';

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
          'modalId',
          'handleSubmit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'filter-card' })} to display and managing filter controls in a modal dialog.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/filter-card/descripcion-general-Be01z0Al' })}
${getSpecialSpecifications(
  `${getEmptyStateMessage()} ${getTechnicalDocReferences({
    references: [
      { title: dropdownStory.default.title! },
      { title: tagsStory.default.title! },
      { title: radialStory.default.title! },
      { title: checkboxStory.default.title! },
      { title: switchStory.default.title! },
    ],
  })}`,
  { showAdditionalBlockquote: true },
)}
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
      description: `
Sets the data list of control types.

Data descriptions:
- ***name***: Unique identifier name for the control
- ***type***: Type of control to render (radial, checkbox, switch, tag, dropdown'
- ***label***: Display label for the control
- ***checked***: Whether the control is checked/selected (for checkbox, switch, radial)
- ***placeholder***: Placeholder text (for input/dropdown controls)
- ***rightText***: Additional text to display on the right side
- ***value***: Current value of the control
- ***id***: Unique identifier for the control element
- ***options***: Available options for selection controls (for dropdown controls)
- ***isMultiSelect***: Whether multiple selections are allowed (for dropdown controls), when this attribute is true the list will not be filterable.
        `,
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: {
          summary: 'IBmbControlType[]',
          detail: `IBmbControlType {
  name: string;
  type: 'radial' | 'checkbox' | 'switch' | 'tag' | 'dropdown';
  label: string;
  checked?: boolean;
  placeholder?: string;
  rightText?: string;
  value?: string;
  id?: string;
  options?: string[] | IBmbDropdownItem[];
  isMultiSelect?: boolean;
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
        'Displays the filter card in the document instead of the dialog.',
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
        category: 'Deprecated',
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
      },
    },
    dropdownOptions: {
      control: { type: 'array' },
      description: 'Defines the list of options available in the dropdown.',
      table: {
        category: 'Deprecated',
        type: { summary: 'string[]' },
        defaultValue: {
          summary: "['Apple', 'Banana', 'Orange', 'Pear', 'Grape']",
        },
      },
    },
    showGlobalSearch: {
      control: 'boolean',
      Description:
        'Determines if the global search is visible (input or dropdown).',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
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
        title: 'Filter - Dropdown',
        control: [
          {
            name: 'dropdown-1',
            type: 'dropdown',
            options: [
              { value: 'banana', name: 'Banana' },
              { value: 'apple', name: 'Apple' },
              { value: 'tomato', name: 'Tomato' },
            ],
            value: 'apple',
            isMultiSelect: true,
          },
        ],
      },
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
    showGlobalSearch: true,
  },
} as Meta<typeof BmbFilterCardComponent>;

type Story = StoryObj<typeof BmbFilterCardComponent>;

export const Default: Story = {};

import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbFilterCardComponent } from './bmb-filter-card.component';
import { CommonModule } from '@angular/common';

export default {
  title: 'Components/Containers/Filter card',
  component: BmbFilterCardComponent,
  decorators: [moduleMetadata({ imports: [CommonModule] })],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbFilterCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbFilterCardComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    modalTitle: {
      name: 'Title',
      control: { type: 'text' },
      description: 'The title of the modal dialog.',
      table: { category: 'Properties' },
    },
    primaryBtnLabel: {
      name: 'Primary Button Label',
      control: { type: 'text' },
      description: 'The label of the primary button.',
      table: { category: 'Properties' },
    },
    secondaryBtnLabel: {
      name: 'Secondary Button Label',
      control: { type: 'text' },
      description: 'The label of the secondary button.',
      table: { category: 'Properties' },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'The icon to display on the button.',
      table: { category: 'Properties' },
    },
    placeholderSearch: {
      name: 'Placeholder Search',
      control: { type: 'text' },
      description: 'The placeholder text for the search input.',
      table: { category: 'Properties' },
    },
    controlTypes: {
      name: 'Control Types',
      control: { type: 'array' },
      description:
        'An array of control types, each with a title and an array of controls.',
      table: { category: 'Properties', type: { summary: 'IBmbControlType[]' } },
    },
    applyFilters: {
      name: 'Apply Filters',
      control: { type: 'void' },
      description: 'Emits an event when the user applies the filters.',
      table: { category: 'Outputs', type: { summary: 'void' } },
    },
    resetFilters: {
      name: 'Reset Filters',
      control: { type: 'void' },
      description: 'Emits an event when the user resets the filters.',
      table: { category: 'Outputs ', type: { summary: 'void' } },
    },
    inLine: {
      name: 'In line',
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
      name: 'Show Dropdown / Hide Input',
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
      name: 'Dropdown Options',
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
    applyFilters: '',
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
            checked: false,
          },
          {
            name: 'radial-1',
            type: 'radial',
            label: 'Radial 2',
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

import type { Meta, StoryObj } from '@storybook/angular';
import { BmbDropdownComponent } from './bmb-dropdown.component';

export default {
  title: 'Micro Componentes/Dropdown',
  component: BmbDropdownComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbDropdownComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbDropdownComponent ],
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
    iconName: {
      name: 'Icon',
      control: {
        type: 'text',
      },
      description: 'The name of the icon. See Material Icons.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    isRequired: {
      name: 'Required',
      control: { type: 'boolean' },
      description:
        'When set to true, The Dropdown border color turns to red. By default, it is false, and you do not need to explicitly set it.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    placeholder: {
      name: 'Placeholder',
      control: {
        type: 'text',
      },
      description: 'The text of the placeholder for the dropdown.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    isDisabled: {
      name: 'Disabled',
      control: { type: 'boolean' },
      description:
        'When set to true, The dropdown disabled. By default, it is false, and you do not need to explicitly set it.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    label: {
      name: 'Label',
      control: {
        type: 'text',
      },
      description:
        'The text show an text as a label',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    allOptions: {
      name: 'Options',
      control: {
        type: 'array',
      },
      description:
        'The inputs to show on the dropdown',
      table: {
        category: 'Properties',
        type: { summary: 'array' },
      },
    },
    selectedItem:{
        name: 'Selected value',
        control: {
          type: '',
        },
        description: 'This handler can be used for pull the value selected.',
        table: {
          category: 'Events',
          type: { summary: 'function' },
        },
    }
  },
  args: {
    icon: 'apps',
    isRequired: false,
    placeholder: 'Placeholder',
    isDisabled: false,
    label: 'Dropdown Label',
    allOptions: ['Apple', 'Banana', 'Orange', 'Pear', 'Grape'],
    selectedItem: (params: any) => {
        window.alert(params.toString());
      },
  },
} as Meta<typeof BmbDropdownComponent>;

type Story = StoryObj<BmbDropdownComponent>;

export const Default: Story = {};

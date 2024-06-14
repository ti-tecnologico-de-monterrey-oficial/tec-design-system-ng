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
    icon: {
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
    required: {
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
    showIcon: {
      name: 'Show Icon',
      control: { type: 'boolean' },
      description: 'When set to true, the dropdown icon is show',
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
    options: {
      name: 'Options',
      control: {
        type: 'array',
      },
      description: 'The inputs to show on the dropdown',
      table: {
        category: 'Properties',
        type: { summary: 'array' },
      },
    },
    helperText: {
      name: 'Helper Text',
      control: {
        type: 'text',
      },
      description: 'The text of the bottom for the dropdown.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    disabled: {
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
      description: 'The text show an text as a label',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    type: {
      name: 'Type',
      control: {
        type: 'text',
      },
      description: 'Set the variation of the component',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'default' },
      },
    },
    onValueChange: {
      name: 'Selected value',
      control: {
        type: '',
      },
      description: 'This handler can be used for pull the value selected.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    icon: 'bolt',
    placeholder: 'Set Fruit',
    required: true,
    label: 'Fruit',
    showIcon: true,
    type: 'default',
    allOptions: ['Apple', 'Banana', 'Orange', 'Pear', 'Grape'],
    onValueChange: (params: any) => {
      window.alert(params.toString());
    },
  },
} as Meta<typeof BmbDropdownComponent>;

type Story = StoryObj<BmbDropdownComponent>;

export const Default: Story = {};

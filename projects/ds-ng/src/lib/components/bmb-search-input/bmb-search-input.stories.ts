import { Meta, StoryObj } from '@storybook/angular';
import { BmbSearchInputComponent } from './bmb-search-input.component';

export default {
  title: 'Micro Componentes/Search input',
  component: BmbSearchInputComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbSearchInputComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbSearchInputComponent ],
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
    data: {
      name: 'Data',
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
      name: 'Loading state',
      control: 'boolean',
      description: 'Set the loading state.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Properties',
      },
    },
    isServerSideFilter: {
      name: 'Server side filter',
      control: 'boolean',
      description: 'Set the server side filter.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: false },
        category: 'Properties',
      },
    },
    placeholder: {
      name: 'Placeholder',
      control: {
        type: 'text',
      },
      description: 'Set the placeholder value for the search input',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    serverSideFilteredData: {
      name: 'Server side filtered data',
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
      name: 'On value change',
      control: false,
      description: 'These events are triggered once the input value changes.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
    onServerSideFilterEvent: {
      name: 'Server side filter event',
      control: false,
      description:
        'This function is executed once the value of the field has changed, the result must be stored in serverSideFilteredData.',
      table: {
        type: { summary: 'function' },
        category: 'Events',
      },
    },
  },
  args: {
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

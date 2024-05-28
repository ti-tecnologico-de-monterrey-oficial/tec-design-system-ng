import { Meta, StoryObj } from '@storybook/angular';
import { BmbBalanceOverviewComponent } from './bmb-balance-overview.component';

export default {
  title: 'Macro Componentes/Balance Overview',
  component: BmbBalanceOverviewComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbBalanceOverviewComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbBalanceOverviewComponent ],
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
    progressCirclePercent: {
      name: 'Progress Circle Percent',
      control: {
        type: 'number',
      },
      description:
        'Refers to the percentage that the Progress Circle component show.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    progressCircleValue: {
      name: 'Progress Circle Value',
      control: {
        type: 'string',
      },
      description:
        'Refers to the total value that the Progress Circle component show.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    showProgressCircleValue: {
      name: 'Show Progress Circle Value',
      control: {
        type: 'boolean',
      },
      description: 'Set if the Progress Circle Value will be displayed.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    progressCircleTitle: {
      name: 'Progress Circle Title',
      control: {
        type: 'string, Array<string>',
      },
      description:
        'Is the text of the Progress Circle, to show the text in one line use a simple array, if you want to show the title in more than one line, use an array string',
      table: {
        category: 'Properties',
        type: { summary: 'string, Array<string>' },
        defaultValue: { summary: 'Title' },
      },
    },
    showprogressCircleTitle: {
      name: 'Show Progress Circle Title',
      control: {
        type: 'boolean',
      },
      description: 'Set if the title of the Progress Circle will be displayed.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    showProgressCircleBackground: {
      name: 'Show Progress Circle Background',
      control: {
        type: 'boolean',
      },
      description:
        'Set if the background of the Progress Circle will be displayed.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    labelPrimary: {
      name: 'Label Primary',
      control: 'text',
      description: 'Label section of the left content.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'Text' },
      },
    },
    valuePrimary: {
      name: 'Value Primary',
      control: {
        type: 'text',
      },
      description: 'Value section of the left content.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '$0' },
      },
    },
    labelSecondary: {
      name: 'Label Secondary',
      control: 'text',
      description: 'Label section of the right content.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: 'Text' },
      },
    },
    valueSecondary: {
      name: 'Value Secondary',
      control: {
        type: 'text',
      },
      description: 'Value section of the right content.',
      table: {
        type: { summary: 'string' },
        category: 'Properties',
        defaultValue: { summary: '$0' },
      },
    },
  },
  args: {
    progressCirclePercent: 75,
    progressCircleValue: '$10,000',
    showProgressCircleValue: true,
    progressCircleTitle: ['Total a pagar', 'este mes'],
    labelPrimary: 'Cuota Mensual',
    valuePrimary: '$7,500.00',
    labelSecondary: 'Pendiente',
    valueSecondary: '$2,500.00',
  },
} as Meta<typeof BmbBalanceOverviewComponent>;

type Story = StoryObj<BmbBalanceOverviewComponent>;

export const Default: Story = {};

import { Meta, StoryObj } from '@storybook/angular';
import { BmbProgressCircleComponent } from './bmb-progress-circle.component';

export default {
  title: 'Micro Componentes/Progress Circle',
  component: BmbProgressCircleComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbProgressCircleComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbProgressCircleComponent ],
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
    valueLabel: {
      name: 'Value Label',
      control: {
        type: 'string',
      },
      description: 'Refers to the total value that the component show.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    showValueLabel: {
      name: 'Show Value Label',
      control: {
        type: 'boolean',
      },
      description: 'Set if the value label will be displayed.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    percent: {
      name: 'Percent',
      control: {
        type: 'number',
      },
      description: 'Refers to the percentage that the component show.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: { summary: 0 },
      },
    },
    title: {
      name: 'Title',
      control: {
        type: 'string, Array<string>',
      },
      description:
        'Is the text of the component, to show the text in one line use a simple array, if you want to show the title in more than one line, use an array string',
      table: {
        category: 'Properties',
        type: { summary: 'string, Array<string>' },
      },
    },
    showTitle: {
      name: 'Show Title',
      control: {
        type: 'boolean',
      },
      description: 'Set if the title label will be displayed.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
    showBackground: {
      name: 'Show Background',
      control: {
        type: 'boolean',
      },
      description:
        'Set if the background of the progress circle will be displayed.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: true },
      },
    },
  },
  args: {
    percent: 85,
    title: ['Total a pagar', 'este mes'],
    valueLabel: '$10000',
    showBackground: true,
  },
} as Meta<typeof BmbProgressCircleComponent>;

type Story = StoryObj<BmbProgressCircleComponent>;

export const Default: Story = {};

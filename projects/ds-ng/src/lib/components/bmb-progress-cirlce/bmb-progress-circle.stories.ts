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
    percentValue: {
      name: 'Percent Value',
      control: {
        type: 'number',
      },
      description: 'Refers to the percentage that the component show.',
      table: {
        type: { summary: 'number' },
      },
    },
    valueLabel: {
      name: 'Label Value',
      control: {
        type: 'number',
      },
      description: 'Is the value to show.',
      table: {
        type: { summary: 'number' },
      },
    },
    title: {
        name: 'Title',
        control: {
          type: 'string',
        },
        description: 'Is the text of the component',
        table: {
          type: { summary: 'string' },
        },
    }
  },
  args: {
    percentValue: 85,
    valueLabel: 310,
    title: 'Titulo'
  },
} as Meta<typeof BmbProgressCircleComponent>;

type Story = StoryObj<BmbProgressCircleComponent>;

export const Default: Story = {};

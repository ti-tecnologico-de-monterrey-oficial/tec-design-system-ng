import { Meta, StoryObj } from '@storybook/angular';
import { BmbStatCounterComponent } from './bmb-stat-counter.component';

export default {
  title: 'Micro Componentes/Stat Counter',
  component: BmbStatCounterComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbStatCounterComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbStatCounterComponent ],
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
    activeStep: {
      name: 'Active Step',
      control: {
        type: 'number',
      },
      description: 'Refers to the step that is active.',
      table: {
        type: { summary: 'number' },
      },
    },
    totalSteps: {
      name: 'Total Steps',
      control: {
        type: 'number',
      },
      description: 'Number of steps that the counter will show.',
      table: {
        type: { summary: 'number' },
      },
    },
  },
  args: {
    totalSteps: 5,
    activeStep: 3,
  },
} as Meta<typeof BmbStatCounterComponent>;

type Story = StoryObj<BmbStatCounterComponent>;

export const Default: Story = {};

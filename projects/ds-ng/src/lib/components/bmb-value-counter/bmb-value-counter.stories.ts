import { Meta, StoryObj } from '@storybook/angular';
import { BmbValueCounterComponent } from './bmb-value-counter.component';

export default {
  title: 'Micro Componentes/Value Counter',
  component: BmbValueCounterComponent,
  decorators: [],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbValueCounterComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbValueCounterComponent ],
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
    label: {
      name: 'Label',
      control: 'text',
      description: 'Label section content.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Properties',
      },
    },
    value: {
      name: 'Value',
      control: 'text',
      description: 'Value section content.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Properties',
      },
    },
    progress: {
      name: 'Progress',
      control: {
        type: 'text',
      },
      description: 'Progress value section content.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '' },
        category: 'Properties',
      },
    },
  },
  args: {
    label: 'Title',
    value: '$0.00',
    progress: 'primary',
  },
} as Meta<typeof BmbValueCounterComponent>;

type Story = StoryObj<BmbValueCounterComponent>;

export const Default: Story = {};

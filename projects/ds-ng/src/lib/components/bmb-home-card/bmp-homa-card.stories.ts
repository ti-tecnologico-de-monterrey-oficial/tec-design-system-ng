import type { Meta, StoryObj } from '@storybook/angular';
import { BmbHomeCardComponent } from './bmb-home-card.component';

export default {
  title: 'Micro Componentes/Home Card',
  component: BmbHomeCardComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbHomeCardComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbHomeCardComponent ],
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
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'Sets card title.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: { type: 'text' },
      description: 'Sets card subtitle',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'Sets the header icon.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    isMobile: {
      name: 'Is mobile',
      control: { type: 'boolean' },
      description:
        'Sets mobile state.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onClose: {
      name: 'On close',
      control: null,
      description: 'Emmit the close event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onBack: {
      name: 'On back',
      control: null,
      description: 'Emmit the back event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    isMobile: false,
  },
} as Meta<typeof BmbHomeCardComponent>;

type Story = StoryObj<BmbHomeCardComponent>;

export const Default: Story = {};

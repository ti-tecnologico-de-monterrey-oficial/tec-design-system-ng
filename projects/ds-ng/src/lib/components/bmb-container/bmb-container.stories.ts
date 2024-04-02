import type { Meta, StoryObj } from '@storybook/angular';
import { BmbContainerComponent } from './bmb-container.component';

export default {
  title: 'Container',
  component: BmbContainerComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbContainerComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbContainerComponent ],
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
    appearance: {
      name: 'Appearance',
      control: {
        type: 'radio',
      },
      options: [
        'primary-container',
        'primary-home',
        'primary-header',
        'secondary-container',
        'contrast-box-container',
        'button-container',
      ],
      table: {
        category: 'Properties',
        defaultValue: { summary: 'primary-container' },
        type: { summary: 'string' },
      },
      description:
        'The appearance of the container, affecting its visual style.',
    },
  },
  args: {
    appearance: 'primary-container',
  },
} as Meta<typeof BmbContainerComponent>;

type Story = StoryObj<BmbContainerComponent>;

export const Default: Story = {};

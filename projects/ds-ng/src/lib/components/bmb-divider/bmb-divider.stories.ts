import { Meta, StoryObj } from '@storybook/angular';
import { BmbDividerComponent } from './bmb-divider.component';

export default {
  title: 'Divider',
  component: BmbDividerComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbDividerComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbDividerComponent ],
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
    type: {
      name: 'Styles',
      control: {
        type: 'radio',
      },
      options: ['simple', 'dashed', 'dotted'],
      description:
        'The type of the divider, affecting its visual view. Is not neccesary to add the "simple" style.',
      table: {
        defaultValue: { summary: 'simple' },
        type: { summary: 'string' },
      },
    },
  },
  args: {
    type: 'simple',
  },
} as Meta<typeof BmbDividerComponent>;

type Story = StoryObj<BmbDividerComponent>;

export const Default: Story = {};

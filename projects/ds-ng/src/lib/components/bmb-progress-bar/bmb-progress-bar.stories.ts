import type { Meta, StoryObj } from '@storybook/angular';
import { BmbProgressBarComponent } from './bmb-progress-bar.component';

export default {
  title: 'Micro Componentes/Progress Bar',
  component: BmbProgressBarComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbProgressBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbProgressBarComponent ],
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
    progress: {
      name: 'Porcentaje',
      control: {
        type: 'number',
      },
      description: 'Set the percentage to show in the progress bar',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
      },
    },
  },
  args: {
    progress: 50,
  },
} as Meta<typeof BmbProgressBarComponent>;

type Story = StoryObj<BmbProgressBarComponent>;

export const Default: Story = {};

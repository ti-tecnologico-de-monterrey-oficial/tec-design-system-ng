import type { Meta, StoryObj } from '@storybook/angular';
import { BmbGradeValueComponent } from './bmb-grade-value.component';

export default {
  title: 'Micro Componentes/Grade Value',
  component: BmbGradeValueComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbGradeValueComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [],
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
      name: 'Type',
      control: {
        type: 'text',
      },
      description:
        'This indicates to the component is for a main grade or a partial grade',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'main-grade' },
      },
    },
    score: {
      name: 'Score',
      control: { type: 'number' },
      description: 'Is the number to show as the score',
      table: {
        category: 'Properties',
        defaultValue: { summary: 100 },
        type: { summary: 'number' },
      },
    },
  },
  args: {
    type: 'main-grade',
    score: 89,
  },
} as Meta<typeof BmbGradeValueComponent>;

type Story = StoryObj<BmbGradeValueComponent>;

export const Default: Story = {};

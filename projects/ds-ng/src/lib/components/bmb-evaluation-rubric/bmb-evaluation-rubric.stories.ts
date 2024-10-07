import type { Meta, StoryObj } from '@storybook/angular';
import { BmbEvaluationRubricComponent } from './bmb-evaluation-rubric.component';

export default {
  title: 'Macro Componentes/Rúbrica de evaluación',
  component: BmbEvaluationRubricComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbEvaluationRubricComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
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
    title: {
      name: 'Title',
      control: { type: 'text' },
      description: 'Sets the title of the component.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    icon: {
      name: 'Icon',
      control: { type: 'text' },
      description: 'Sets the icon displayed in the title of the component.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
        defaultValue: { summary: 'checklist_rtl' },
      },
    },
    rightIcon: {
      name: 'Right icon',
      control: { type: 'text' },
      description: 'Sets the right icon displayed in the close button.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
        defaultValue: { summary: 'close' },
      },
    },
    evaluationRubricList: {
      name: 'Evaluation rubric list',
      control: { type: 'object' },
      description: 'Sets the list of evaluation criteria.',
      table: {
        category: 'Properties',
        type: {
          summary:
            'IBmbEvaluationRubric[] (required), { criterion: string; tooltip: string; evaluation?: number;}',
        },
      },
    },
  },
  args: {
    title: 'Title',
    icon: 'checklist_rtl',
    rightIcon: 'close',
    evaluationRubricList: [
      {
        criterion: 'Criterio Primero',
        tooltip: 'Criterio Primero tooltip',
      },
      {
        criterion: 'Criterio Segundo',
        tooltip: 'Criterio Segundo tooltip',
      },
      {
        criterion: 'Tercer Criterio',
        tooltip: 'Tercer Criterio tooltip',
      },
      {
        criterion: 'Cuarto Criterio',
        tooltip: 'Cuarto Criterio tooltip',
      },
    ],
  },
} as Meta<typeof BmbEvaluationRubricComponent>;

type Story = StoryObj<BmbEvaluationRubricComponent>;

export const Default: Story = {};

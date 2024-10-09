import type { Meta, StoryObj } from '@storybook/angular';
import { BmbEvaluationRubricComponent } from './bmb-evaluation-rubric.component';

export default {
  title: 'Macro Componentes/Evaluation rubric',
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
    maxEval: {
      name: 'Maxim evaluation',
      control: { type: 'number' },
      description: 'Sets the maximum number of evaluations allowed.',
      table: {
        category: 'Properties',
        type: { summary: 'number (optional)' },
        defaultValue: { summary: 5 },
      },
    },
    summaryLabel: {
      name: 'Summary label',
      control: { type: 'text' },
      description: 'Sets the label displayed for the evaluation summary.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    commentEvalRubric: {
      name: 'Comment eval rubric',
      control: { type: 'object' },
      description: 'Sets the configuration for the comment section.',
      table: {
        category: 'Properties',
        type: {
          summary:
            ' Textarea input, IBmbCommentEvalRubric (required), { label: string; placeHolder: string; tooltip: string; icon?: string; errorMessage?: string; helperMessage?: string; appearance?: string; disabled?: boolean; isRequired?: boolean; showError?: boolean; showMaxTextLength?: boolean;}',
        },
      },
    },
    evalRubricButtons: {
      name: 'Evaluation rubric buttons',
      control: { type: 'object' },
      description: 'Sets the configuration for the evaluation buttons.',
      table: {
        category: 'Properties',
        type: {
          summary:
            'IBmbEvalRubricButtons (required), { rightLabel: string; rightIcon?: string; leftLabel: string; leftIcon?: string; }',
        },
      },
    },
  },
  args: {
    title: 'Rúbrica de evaluación',
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
    maxEval: 5,
    summaryLabel: 'Resumen',
    commentEvalRubric: {
      label: 'Observaciones (Optional)',
      placeHolder: 'Ingresa los puntos a mejorar del skill.',
      tooltip: 'Tool tip',
      showMaxTextLength: false,
    },
    evalRubricButtons: {
      rightLabel: 'Aprobar Skill',
      rightIcon: 'check',
      leftLabel: 'Rechazar Skill',
      leftIcon: 'close',
    },
  },
} as Meta<typeof BmbEvaluationRubricComponent>;

type Story = StoryObj<BmbEvaluationRubricComponent>;

export const Default: Story = {};

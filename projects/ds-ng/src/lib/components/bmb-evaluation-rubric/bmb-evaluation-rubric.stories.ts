import type { Meta, StoryObj } from '@storybook/angular';
import { BmbEvaluationRubricComponent } from './bmb-evaluation-rubric.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import { getOnClickParam } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Containers/Evaluation rubric',
  component: BmbEvaluationRubricComponent,
  parameters: {
    controls: {
      exclude: [
        'summary',
        'getButtonClass',
        'getEvalList',
        'getSelectedButtonClass',
        'handleClose',
        'handleEval',
      ],
    },
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'evaluation-rubric' })} `, 'https://bamboo.tec.mx/latest/componentes/evaluation-rubric/descripcion-general-hckFQwLB')}
${getBasicExampleBlock('BmbEvaluationRubricComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: {
      control: { type: 'text' },
      description: 'Sets the title of the component.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Sets the icon displayed in the title of the component.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
        defaultValue: { summary: 'checklist_rtl' },
      },
    },
    rightIcon: {
      control: { type: 'text' },
      description: 'Sets the right icon displayed in the close button.',
      table: {
        category: 'Properties',
        type: { summary: 'string (optional)' },
        defaultValue: { summary: 'close' },
      },
    },
    evaluationRubricList: {
      control: { type: 'object' },
      description: 'Sets the list of evaluation criteria.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: {
          summary: 'IBmbEvaluationRubric[] (required)',
          detail: `IBmbEvaluationRubric {
  criterion: string;
  tooltip: string;
  evaluation?: number;
}`,
        },
      },
    },
    maxEval: {
      control: { type: 'number' },
      description: 'Sets the maximum number of evaluations allowed.',
      table: {
        category: 'Properties',
        type: { summary: 'number (optional)' },
        defaultValue: { summary: 5 },
      },
    },
    summaryLabel: {
      control: { type: 'text' },
      description: 'Sets the label displayed for the evaluation summary.',
      table: {
        category: 'Properties',
        type: { summary: 'string (required)' },
      },
    },
    commentEvalRubric: {
      control: { type: 'object' },
      description: 'Sets the configuration for the comment section.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbCommentEvalRubric (required)',
          detail: `
IBmbCommentEvalRubric {
  label: string;
  placeHolder: string;
  tooltip: string;
  icon?: string;
  errorMessage?: string;
  helperMessage?: string;
  appearance?: IBmbInputAppearance;
  disabled?: boolean;
  isRequired?: boolean;
  showError?: boolean;
  showMaxTextLength?: boolean;
}

IBmbInputAppearance = 'main' | 'normal' | 'simple';
          `,
        },
      },
    },
    evalRubricButtons: {
      control: { type: 'object' },
      description: 'Sets the configuration for the evaluation buttons.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbEvalRubricButtons (required)',
          detail: `IBmbEvalRubricButtons {
  rightLabel: string;
  rightIcon?: string;
  leftLabel: string;
  leftIcon?: string;
}`,
        },
      },
    },
    onClose: getOnClickParam(getOnEvent('close (x)', 'onClose', 'void')),
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

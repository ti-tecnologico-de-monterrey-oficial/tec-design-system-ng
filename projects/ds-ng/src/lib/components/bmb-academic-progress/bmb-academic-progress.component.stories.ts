import { Meta, StoryObj } from '@storybook/angular';
import { BmbAcademicProgressComponent } from './bmb-academic-progress.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';

export default {
  title: 'Components/Visual labels/Academic progress',
  component: BmbAcademicProgressComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'metrics',
          'shouldShowMetric',
          'updateMetrics',
          'ngOnChanges',
          'ngOnInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('academic-progress')} to be provided clearly and quickly, with a focus on readability and visual hierarchy.`, 'https://bamboo.tec.mx/latest/componentes/academic-progress/descripcion-general-f8fNoijD')}
${getBasicExampleBlock('BmbAcademicProgressComponent')}
        `,
      },
    },
  },
  argTypes: {
    accredited: {
      control: {
        type: 'object',
      },
      description: 'Sets the value of accredited.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbNameValuePair (required)',
          detail: `IBmbNameValuePair {
  name: string;
  value: string | number | boolean;
}`,
        },
        defaultValue: { summary: '{}' },
      },
    },
    average: {
      control: {
        type: 'object',
      },
      description: 'Sets the value of average.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbNameValuePair (required)',
          detail: `IBmbNameValuePair {
  name: string;
  value: string | number | boolean;
}`,
        },
        defaultValue: { summary: '{}' },
      },
    },
    summary: {
      control: {
        type: 'object',
      },
      description: 'Sets the value of summary.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbNameValuePair (required)',
          detail: `IBmbNameValuePair {
  name: string;
  value: string | number | boolean;
}`,
        },
        defaultValue: { summary: '{}' },
      },
    },
  },
  args: {
    accredited: { name: 'Materias Acreditadas', value: 7 },
    average: { name: 'Promedio Semestre', value: 99 },
    summary: { name: 'Horas Servicio', value: 45 },
  },
} as Meta<typeof BmbAcademicProgressComponent>;

type Story = StoryObj<BmbAcademicProgressComponent>;

export const Default: Story = {};

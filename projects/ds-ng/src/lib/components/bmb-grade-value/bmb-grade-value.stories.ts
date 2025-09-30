import type { Meta, StoryObj } from '@storybook/angular';
import { BmbGradeValueComponent } from './bmb-grade-value.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { getAppearanceParam } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Visual labels/Grade value',
  component: BmbGradeValueComponent,
  parameters: {
    docs: {
      controls: { exclude: ['truncatedScore', ''] },
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'grade-value' })} to display grades in a simple way.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/grade-value/descripcion-general-3uKxUiLU' })}
${getBasicExampleBlock('BmbGradeValueComponent')}

        `,
      },
    },
  },
  argTypes: {
    appearanceContrast: getAppearanceParam(
      'grade value',
      ['default', 'primary', 'alternative'],
      'default',
    ),
    type: {
      control: {
        type: 'radio',
      },
      options: ['main-grade', 'partial-grade'],
      description: 'Sets the type of anatomy variation to display.',
      table: {
        category: 'Properties',
        type: {
          summary: 'IBmbGradeType',
          detail: "IBmbGradeType = 'main-grade' | 'partial-grade'",
        },
        defaultValue: { summary: 'main-grade' },
      },
    },
    score: {
      control: { type: 'text' },
      description:
        'Sets the number or text to display as score. The value can be a number or a string with a maximum of 4 characters.',
      table: {
        category: 'Properties',
        type: { summary: 'number or string' },
        defaultValue: { summary: 0 },
      },
    },
  },
  args: {
    appearanceContrast: 'default',
    type: 'main-grade',
    score: '89',
  },
} as Meta<typeof BmbGradeValueComponent>;

type Story = StoryObj<BmbGradeValueComponent>;

export const Default: Story = {
  name: "'main-grade' type example",
};

export const PartialGradeTypeExample = {
  name: "'partial-grade' type example",
  args: {
    type: 'partial-grade',
    score: '89',
  },
};

export const TextScoreExample = {
  name: 'Example text for score',
  args: {
    score: 'Cu',
  },
};

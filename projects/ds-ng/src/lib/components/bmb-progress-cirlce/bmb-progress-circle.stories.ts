import { Meta, StoryObj } from '@storybook/angular';
import { BmbProgressCircleComponent } from './bmb-progress-circle.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  DBmbGenericParamDesc,
  getDefaultValueControl,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

const IMPORTANT_DESCRIPTION = `<br/><br/>${RELEVANT_TITLE.important} The gray fill path (fillPathStatus) does not work for the full state (fullFillPathStatus).`;
export default {
  title: 'Components/Status indicators/Progress circle',
  component: BmbProgressCircleComponent,
  parameters: {
    docs: {
      controls: {
        exclude: [
          'applyOptions',
          'draw',
          'getFillPathStatus',
          'getRelativeY',
          'isFullColored',
          'polarToCartesian',
          'render',
          'shouldShowProgressPath',
          'shouldShowValueLabel',
          'ngOnChanges',
          'ngOnInit',
          '_lastPercent',
          'options',
          'responsive',
          'svg',
          'showRestBackground',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'progress-circle' })} visually indicates the status of a definite amount of work completed.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/progress-circle/descripcion-general-M5Xm37iL' })}
${getBasicExampleBlock('BmbProgressCircleComponent')}
        `,
      },
    },
  },
  argTypes: {
    valueLabel: getPropertyParamDesc(
      'value label',
      'text',
      '""',
      '<br/><br/>The value label will be displayed in the center of the progress circle.',
    ),
    fullFillPathStatus: getPropertyParamDesc(
      'full state',
      'boolean',
      false,
      `<br/><br/>The progress circle will display in a full state and the percentage path and value content will be hidden.
${IMPORTANT_DESCRIPTION}`,
    ),
    showValueLabel: {
      control: {
        type: 'boolean',
      },
      description: 'Displays the value label when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
    percent: {
      control: {
        type: 'number',
      },
      description: 'Sets the percentage of progress to be displayed.',
      table: {
        category: 'Properties',
        type: { summary: 'number' },
        defaultValue: getDefaultValueControl(0),
      },
    },
    title: getPropertyParamDesc(
      'progress circle',
      'text',
      '""',
      `
<br/><br/>Considerations for displaying text on one or more lines:
- Use a string to display the title on a single line.
- Use a string array to display the title on more than one line.
`,
    ),
    showTitle: {
      control: {
        type: 'boolean',
      },
      description: 'Displays the title when true.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: getDefaultValueControl(false),
      },
    },
    fillPathStatus: {
      control: {
        type: 'select',
      },
      options: ['gray', 'success', 'error', 'warning'],
      description: `
Sets the color of the path that fills the circle.
${IMPORTANT_DESCRIPTION}
      `,
      table: {
        category: 'Properties',
        type: { summary: 'BmbProgressCirclePathStatus' },
        defaultValue: getDefaultValueControl('success'),
      },
    },
    showBackground: DBmbGenericParamDesc.deprecated,
  },
  args: {
    fullFillPathStatus: false,
    percent: 85,
    title: ['Total a pagar', 'este mes'],
    showTitle: false,
    valueLabel: '$10000',
    showValueLabel: false,
    fillPathStatus: 'success',
  },
} as Meta<typeof BmbProgressCircleComponent>;

type Story = StoryObj<BmbProgressCircleComponent>;

export const Default = {};

export const WithValueLabel: Story = {
  args: {
    showValueLabel: true,
  },
};

export const WithTitle: Story = {
  args: {
    showTitle: true,
    title: ['Total a pagar', 'este mes'],
  },
};

export const WithBackground: Story = {
  args: {
    fillPathStatus: 'error',
    percent: 0,
  },
};

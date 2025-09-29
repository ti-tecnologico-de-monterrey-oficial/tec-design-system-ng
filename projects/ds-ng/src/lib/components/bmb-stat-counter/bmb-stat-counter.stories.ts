import { Meta, StoryObj } from '@storybook/angular';
import { BmbStatCounterComponent } from './bmb-stat-counter.component';
import {
  getBasicExampleBlock,
  getFormatName,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  IBmbOnEvent,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';
import { getOnClickParam } from '../../utils/doc/parameterDescriptions';
import * as stepProgressBarStory from '../bmb-step-progress-bar/bmb-step-progress-bar.stories';

const onStepEvent: IBmbOnEvent = getOnEvent('step number', 'onStepPress');
export default {
  title: 'Dev tools/Stat counter',
  component: BmbStatCounterComponent,
  parameters: {
    docs: {
      controls: {
        exclude: ['getStepsArray', 'onStepClicked'],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'stat-counter', type: 'element' })} the progress of steps to be displayed.<br/><br/>
${RELEVANT_TITLE_LEVEL[0]}This item may be discontinued, use is recommended [${stepProgressBarStory.default.title}](/docs/${getFormatName(stepProgressBarStory.default.title!, /(\/)|( )/g, '-').toLocaleLowerCase()}--documentation).`,
  'https://bamboo.tec.mx/latest/dev-tools/coleccion-de-componentes-uC69aq75',
)}
${getBasicExampleBlock('BmbStatCounterComponent')}
        `,
      },
    },
  },
  argTypes: {
    activeStep: {
      control: {
        type: 'number',
      },
      description: 'Refers to the step that is active.',
      table: {
        type: { summary: 'number' },
      },
    },
    totalSteps: {
      control: {
        type: 'number',
      },
      description: 'Number of steps that the counter will show.',
      table: {
        type: { summary: 'number' },
      },
    },
    onStepPress: getOnClickParam(onStepEvent, '. Emits the stat index'),
  },
  args: {
    totalSteps: 5,
    activeStep: 3,
  },
} as Meta<typeof BmbStatCounterComponent>;

type Story = StoryObj<BmbStatCounterComponent>;

export const Default: Story = {};

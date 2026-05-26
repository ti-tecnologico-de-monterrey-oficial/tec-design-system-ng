import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbStepProgressBarComponent } from './bmb-step-progress-bar.component';
import { CommonModule } from '@angular/common';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { DBmbStepProgressBar } from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Status indicators/Step progress bar',
  component: BmbStepProgressBarComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'stepTemplates',
          'handleStepClicked',
          'handleStepPressed',
          'abort',
          'destroyRef',
          'isMobileOrTablet',
          'labelCompleteTruncated',
          'labelIncompleteTruncated',
          'labelStepsTruncated',
          'maxChars',
          'mql',
          'truncate',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'step-progress-bar' })} implement an indicator of the current step in a sequence of steps that represent a process.`, { generalDocLink: 'https://bamboo.tec.mx/latest/components/step-progress-bar/descripcion-general-xebEHoek' })}
${getBasicExampleBlock('BmbStepProgressBarComponent')}
        `,
      },
    },
  },
  argTypes: {
    activeStep: DBmbStepProgressBar.activeStep,
    totalSteps: DBmbStepProgressBar.totalSteps,
    size: DBmbStepProgressBar.size,
    freeze: DBmbStepProgressBar.freeze,
    type: DBmbStepProgressBar.type,
    labelSteps: DBmbStepProgressBar.labelSteps,
    labelComplete: DBmbStepProgressBar.labelComplete,
    labelIncomplete: DBmbStepProgressBar.labelIncomplete,
    onStepPress: DBmbStepProgressBar.onStepPress,
    onStepPanelPress: DBmbStepProgressBar.onStepPanelPress,
  },
  args: {
    totalSteps: 5,
    activeStep: 3,
    size: 'default',
    freeze: false,
    type: 'vertical',
    labelSteps: [
      '¡Orden de compra aprobada!',
      '¡Orden de compra aprobada!',
      '¡Orden de compra aprobada!',
      '¡Orden de compra aprobada!',
      '¡Orden de compra aprobada!',
    ],
    labelComplete: 'Completo',
    labelIncomplete: 'Pendiente',
  },
} as Meta<typeof BmbStepProgressBarComponent>;

type Story = StoryObj<BmbStepProgressBarComponent>;

export const Default: Story = {};

export const Vertical: Story = {
  name: 'Vertical',
  render: (args: any) => ({
    template: `
        <bmb-step-progress-bar ${attributes(args)} />
    `,
  }),
};

export const Horizontal: Story = {
  name: 'Horizontal',
  args: {
    type: 'horizontal',
  },
  render: (args: any) => ({
    template: `
        <bmb-step-progress-bar ${attributes(args)} />
    `,
  }),
};

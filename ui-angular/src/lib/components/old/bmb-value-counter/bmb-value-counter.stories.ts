import { Meta, StoryObj } from '@storybook/angular';
import { BmbValueCounterComponent } from './bmb-value-counter.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  DBmbProgressBar,
  getLabelParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Visual labels/Value counter',
  component: BmbValueCounterComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'value-counter' })} to display progress considering a fraction of a total value.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/value-counter/descripcion-general-9QAWIHwf' })}
${getBasicExampleBlock('BmbValueCounterComponent')}

        `,
      },
    },
  },
  argTypes: {
    label: getLabelParamDesc('left'),
    value: getLabelParamDesc('right', 'total value'),
    progress: getLabelParamDesc('right', 'progress value'),
    textFormat: DBmbProgressBar.textFormat,
  },
  args: {
    label: 'Title',
    value: '1000',
    progress: '560',

    textFormat: (value: string, total: string) => `$${value}/$${total}MXN`,
  },
} as Meta<typeof BmbValueCounterComponent>;

type Story = StoryObj<BmbValueCounterComponent>;

export const Default: Story = {};

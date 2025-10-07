import { Meta, StoryObj } from '@storybook/angular';
import { BmbLegendComponent } from './bmb-legend.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  getAppearanceParam,
  getLabelParamDesc,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Visual labels/Legend',
  component: BmbLegendComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'legend' })} to show a correlation between data or values and their representation.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/legend/descripcion-general-23itzHxE' })}
${getBasicExampleBlock('BmbLegendComponent')}
        `,
      },
    },
  },
  argTypes: {
    label: getLabelParamDesc('top'),
    value: getLabelParamDesc('bottom', 'value'),
    indicatorAppearance: getAppearanceParam(
      'legend',
      ['normal', 'strong', 'success', 'info', 'warning', 'error', 'brand'],
      'normal',
    ),
  },
  args: {
    label: 'Title',
    value: '$0.00',
    indicatorAppearance: 'normal',
  },
} as Meta<typeof BmbLegendComponent>;

type Story = StoryObj<BmbLegendComponent>;

export const Default: Story = {};

export const Brand: Story = {
  args: {
    label: 'Title',
    value: '$0.00',
    indicatorAppearance: 'brand',
  },
};

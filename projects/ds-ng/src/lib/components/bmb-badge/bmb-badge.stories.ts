import type { Meta, StoryObj } from '@storybook/angular';
import { BmbBadgeComponent } from './bmb-badge.component';
import { IBbmBgAppearance } from '../bmb-advertisement-card/types';
import {
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../utils/doc/utils';
import {
  getAppearanceParam,
  getDefaultValueDesc,
  getPropertyParamDesc,
  getWidthIncreaseDesc,
} from '../../utils/doc/parameterDescriptions';

const defaultAppearanceValue: string = 'normal';

const appearanceOptions: IBbmBgAppearance[] = [
  'normal',
  'strong',
  'success',
  'info',
  'warning',
  'error',
  'brand',
  'alert',
  'disabled',
  'mitec_blue',
  'mitec_red',
  'mitec_green',
  'mitec_orange',
  'mitec_purple',
  'creative_violet',
  'creative_indigo',
  'creative_emerald',
  'creative_licorice',
  'creative_darkteal',
  'creative_peach',
  'creative_sepia',
  'creative_softred',
  'creative_wattle',
  'creative_shipcove',
  'creative_plantation',
  'creative_rum',
  'creative_hibiscus',
  'creative_ripelemon',
];

export default {
  title: 'Components/Visual labels/Badge',
  component: BmbBadgeComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription('badge')} to highlight information in small indicators.`, 'https://bamboo.tec.mx/latest/componentes/badge/descripcion-general-dqHBPuku')}
${getArchitectureSection(`<section class="bmb_badge"> <!-- conditional classes bmb_badge-{appearance} bmb_badge-container ->
  <span class="bmb_badge-bullet"></span>
  <span class="bmb_badge-content"></span>
</section>`)}
${getBasicExampleBlock('BmbBadgeComponent')}
        `,
      },
    },
  },
  argTypes: {
    text: getPropertyParamDesc(
      'badge',
      'text',
      '""',
      '<br/><br/>'.concat(getWidthIncreaseDesc('badge')),
    ),
    appearance: getAppearanceParam(
      'badge',
      appearanceOptions,
      defaultAppearanceValue,
      `<br/><br/>${getDefaultValueDesc(defaultAppearanceValue)}<br/><br/>Background appearance is deprecated.`,
    ),
    container: getPropertyParamDesc(
      'container',
      'boolean',
      true,
      ' When false, show a bullet.',
    ),
  },
  args: {
    text: 'Badge text',
    appearance: defaultAppearanceValue,
    container: true,
  },
} as Meta<typeof BmbBadgeComponent>;

type Story = StoryObj<BmbBadgeComponent>;

export const Default: Story = {};

export const Bullet = {
  args: {
    container: false,
  },
};

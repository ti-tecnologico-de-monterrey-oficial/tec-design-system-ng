import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
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
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';

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
  decorators: [
    moduleMetadata({
      imports: [BmbDividerComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'badge' })} to highlight information in small indicators.`, { generalDocLink: 'https://bamboo.tec.mx/latest/componentes/badge/descripcion-general-dqHBPuku' })}
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
    text: getPropertyParamDesc('badge', {
      additionalDescription: '<br/><br/>'.concat(getWidthIncreaseDesc('badge')),
    }),
    appearance: getAppearanceParam(
      'badge',
      appearanceOptions,
      defaultAppearanceValue,
      `<br/><br/>${getDefaultValueDesc(defaultAppearanceValue)}<br/><br/>Background appearance is deprecated.`,
    ),
    container: getPropertyParamDesc('container', {
      controlType: 'boolean',
      defaultSummary: true,
      additionalDescription: ' When false, show a bullet.',
    }),
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

export const AllColors = {
  render: () => ({
    template: `
      <div style="display: flex; flex-direction: row; gap: 12px; flex-wrap: wrap;">
        <bmb-badge
          *ngFor="let appearance of appearances"
          [appearance]="appearance"
          [text]="appearance"
        >
        </bmb-badge>
      </div>
      <bmb-divider></bmb-divider>
      <div style="display: flex; flex-direction: row; gap: 12px; flex-wrap: wrap;">
        <bmb-badge
          *ngFor="let appearance of appearances"
          [appearance]="appearance"
          [text]="appearance"
          [container]="false"
        >
        </bmb-badge>
      </div>
    `,
    props: {
      appearances: appearanceOptions,
    },
  }),
};

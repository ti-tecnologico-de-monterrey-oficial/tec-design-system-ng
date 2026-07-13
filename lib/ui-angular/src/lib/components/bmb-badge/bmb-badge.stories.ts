import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { BmbBadgeComponent } from './bmb-badge.component';
import {
  BlockquoteType,
  getAlertBlockquote,
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../../../../../doc/utils/utils';
import {
  getAppearanceParam,
  getPropertyParamDesc,
  getWidthIncreaseDesc,
} from '../../../../../../doc/utils/parameterDescriptions';
import { BmbDividerComponent } from '../bmb-divider/bmb-divider.component';
import { BMB_BADGE_COLOR_LIST } from '../../../../../../types/foundations/colors/color-type';

const defaultAppearanceValue: string = 'normal';

const appearanceOptions = [...BMB_BADGE_COLOR_LIST, 'disabled', 'success', 'warning', 'mitec_red'];

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
${getSpecialSpecifications(
  `
${getAlertBlockquote(
  `Follow name colors are deprecated:
 - 'strong',
 - 'success',
 - 'info',
 - 'warning',
 - 'error',
 - 'brand',
 - 'alert',
 - 'background',
 - 'mitec_blue',
 - 'mitec_red',
 - 'mitec_green',
 - 'mitec_orange',
 - 'mitec_purple',
 - 'creative_violet',
 - 'creative_indigo',
 - 'creative_emerald',
 - 'creative_licorice',
 - 'creative_darkteal',
 - 'creative_peach',
 - 'creative_sepia',
 - 'creative_softred',
 - 'creative_wattle',
 - 'creative_shipcove',
 - 'creative_plantation',
 - 'creative_rum',
 - 'creative_hibiscus',
 - 'creative_ripelemon',
<br/><br/>Please do not use them because they will be removed in future versions.`,
  {
    title: '###'.concat(RELEVANT_TITLE.deprecated),
    blockquoteType: BlockquoteType.warning,
    isRelevantTitle: true,
  },
)}
>
### Configuration
Add the **BmbNotificationService** to your App providers:
\`\`\`typescript
providers: [
  provideRouter(routes),
  importProvidersFrom([BmbNotificationService, ...]),
],\`\`\`
###Show notifications
Add the **BmbPushNotificationComponent** at the bottom of your **app.component.html**.
`,
  { showAdditionalBlockquote: true },
)}
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
      getAlertBlockquote(
        `***${defaultAppearanceValue}*** is the default value.`,
        {
          title: RELEVANT_TITLE.configuration,
          blockquoteType: BlockquoteType.note,
        },
      ),
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
        @for (appearance of appearances; track $index) {
          <bmb-badge
            [appearance]="appearance"
            [text]="appearance"
          />
        }
      </div>
      <bmb-divider />
      <div style="display: flex; flex-direction: row; gap: 12px; flex-wrap: wrap;">
        @for (appearance of appearances; track $index) {
          <bmb-badge
            [appearance]="appearance"
            [text]="appearance"
            [container]="false"
          />
        }
      </div>
    `,
    props: {
      appearances: appearanceOptions,
    },
  }),
};

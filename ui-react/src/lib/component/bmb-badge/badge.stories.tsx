import type { Meta, StoryObj } from '@storybook/react-vite';
import { BMB_BADGE_COLOR_LIST } from '../../_shared/types/foundations/colors/color-type';
import { BmbBadge } from './index';
import {
  BlockquoteType,
  getAlertBlockquote,
  getArchitectureSection,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '@docs/utils/utils';

const appearances = [...BMB_BADGE_COLOR_LIST, 'disabled', 'normal'];

const meta = {
  title: 'Components/Visual labels/Badge',
  component: BmbBadge,
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
  `Follow name colors are LTS:
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
    title: '###'.concat(RELEVANT_TITLE.lts),
    blockquoteType: BlockquoteType.note,
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
${getBasicExampleBlock('BmbBadge')}
        `,
      },
    },
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Sets the label displayed in the badge.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    appearance: {
      control: 'select',
      options: appearances,
      description: 'Sets the badge color appearance.',
      table: {
        category: 'Properties',
        type: { summary: 'badge color | disabled | normal' },
        defaultValue: { summary: 'normal' },
      },
    },
    container: {
      control: 'boolean',
      description: 'When false, displays the badge in its bullet-style presentation.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
  },
  args: {
    text: 'Badge text',
    appearance: 'normal',
    container: true,
  },
} satisfies Meta<typeof BmbBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bullet: Story = {
  args: { container: false },
};

export const AllAppearances: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <div>
        <p>Container</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {appearances.map((appearance) => (
            <BmbBadge
              key={`container-${appearance}`}
              {...args}
              appearance={appearance}
              text={appearance}
              container
            />
          ))}
        </div>
      </div>
      <div>
        <p>Bullet</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {appearances.map((appearance) => (
            <BmbBadge
              key={`bullet-${appearance}`}
              {...args}
              appearance={appearance}
              text={appearance}
              container={false}
            />
          ))}
        </div>
      </div>
    </div>
  ),
  parameters: {
    controls: { disable: true },
  },
};

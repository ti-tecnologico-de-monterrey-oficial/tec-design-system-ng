import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { BmbHitoCardComponent } from './bmb-hito-card.component';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Components/Containers/Hito card',
  component: BmbHitoCardComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `
          <div style="height: 8rem">
            ${story}
          </div>`;
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'appearanceBadge',
          'formatBadgeText',
          'getClassList',
          'getHitoIconClass',
          'handleEventChange',
          '',
          '',
          '',
          '',
        ],
      },
      description: {
        component: `
${getGeneralDescription({ content: `${getGeneralComponentDescription({ name: 'hito-card' })} to highlight an important stage in a project, process or timeline in a content card.`, generalDocLink: 'https://bamboo.tec.mx/latest/componentes/hito-card/descripcion-general-rau61m3C' })}
${getBasicExampleBlock('BmbHitoCardComponent')}
        `,
      },
    },
  },
  argTypes: {
    icon: DBmbIconParamDesc.icon,
    title: {
      control: { type: 'text' },
      description: 'Sets the title text of the card.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    id: {
      control: { type: 'text' },
      description:
        'Sets the id for the card, this value is send to the parent on the `handleClick` output.',

      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string | number' },
      },
    },
    short_description: {
      control: { type: 'text' },
      description: 'Sets the short description text.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: { summary: 'string' },
      },
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['pending', 'done', 'active', 'under_review', 'canceled'],
      description: 'Sets the type for the badge.',
      table: {
        category: 'Properties',
        defaultValue: { summary: '' },
        type: {
          summary: 'ITimelineEventType | IBmbTimelineCustomEvent',
          detail: `
ITimelineEvent {
  id: number | string;
  start: string;
  end: string;
  description: string;
  short_description: string;
  type: ITimelineEventType | IBmbTimelineCustomEvent;
  related_to?: string[];
  decision?: string;
  title: string;
  image: string;
  picture_profile?: string;
  diff?: number;
  startEvent?: DateTime;
  endEvent?: DateTime;
  originalStart?: DateTime;
  user_first_name?: string;
  user_last_name?: string;
  user_email?: string;
  tags?: string[];
  icon?: string;
}

ITimelineEventType =
  | 'pending'
  | 'done'
  | 'active'
  | 'under_review'
  | 'canceled'

IBmbTimelineCustomEvent {
  text: string;
  type: IBbmBgAppearance;
}

IBbmBgAppearance =
  | 'normal'
  | 'strong'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'brand'
  | 'alert'
  | 'background'
  | 'disabled'
  | 'mitec_blue'
  | 'mitec_red'
  | 'mitec_green'
  | 'mitec_orange'
  | 'mitec_light_green'
  | 'mitec_purple'
  | 'creative_violet'
  | 'creative_indigo'
  | 'creative_emerald'
  | 'creative_licorice'
  | 'creative_darkteal'
  | 'creative_peach'
  | 'creative_sepia'
  | 'creative_softred'
  | 'creative_wattle'
  | 'creative_shipcove'
  | 'creative_plantation'
  | 'creative_rum'
  | 'creative_hibiscus'
  | 'creative_ripelemon'
          `,
        },
      },
    },
    sub_content: {
      control: { type: 'text' },
      description: 'Sets the text content at the right.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    enable_bullet: {
      control: { type: 'boolean' },
      description: 'Shows a bullet element at the right when true.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    is_active: {
      control: { type: 'boolean' },
      description:
        'Enables the active state. Change the color of the bullet to indicate the selected hito card.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isCompact: {
      control: { type: 'boolean' },
      description: 'Reduces the padding of the card.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    alternative_appearance: {
      control: { type: 'boolean' },
      description: 'Enables alternative appearance for the hito card.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    handleClick: getOnEventParam(
      getOnEvent('', 'handleClick', 'string | number'),
      'after the hito card is clicked.',
      'other',
    ),
  },
  args: {
    icon: 'home',
    title: 'Hito card title',
    id: 'card',
    short_description: 'Short description',
    type: 'active',
    sub_content: 'Sub content',
    enable_bullet: false,
    is_active: false,
    isCompact: false,
    handleClick: () => {
      console.log('handleClick');
    },
  },
} as Meta<typeof BmbHitoCardComponent>;

type Story = StoryObj<BmbHitoCardComponent>;

export const Default: Story = {
  name: 'Example of active type',
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const PendingExample = {
  name: 'Example of pending type',
  args: {
    type: 'pending',
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const DoneExample = {
  name: 'Example of done type',
  args: {
    type: 'done',
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const UnderReviewExample = {
  name: 'Example of under review type',
  args: {
    type: 'under_review',
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const CanceledExample = {
  name: 'Example of canceled type',
  args: {
    type: 'canceled',
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const CompactExample = {
  name: 'Compact version example',
  args: {
    isCompact: true,
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const EnableBulletExample = {
  name: 'Example of enable bullet',
  args: {
    enable_bullet: true,
  },
  render: (args: any) => ({
    template: `
      <div style="padding: 1.5rem">
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

export const ActiveExample = {
  name: 'Active example',
  args: {
    is_active: true,
    enable_bullet: true,
  },
  render: (args: any) => ({
    template: `
      <div>
        <bmb-hito-card
          ${attributes(args)}
        />
      </div>
    `,
  }),
};

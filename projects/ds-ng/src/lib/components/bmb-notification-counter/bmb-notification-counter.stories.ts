import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { BmbNotificationCounterComponent } from './bmb-notification-counter.component';
import {
  getBasicExampleBlock,
  getGeneralDescription,
  getPageStructureForFoundationStories,
  getSpecialSpecifications,
  RELEVANT_TITLE_LEVEL,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getAppearanceParam,
} from '../../utils/doc/parameterDescriptions';

export default {
  title: 'Internals/Notification counter',
  component: BmbNotificationCounterComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `
            <div class="bmb_margin-l">
              ${story}
            </div>`;
    }),
  ],
  parameters: {
    docs: {
      page: () => getPageStructureForFoundationStories(),
      description: {
        component: `
${getGeneralDescription(
  `***Notification counter*** is a visual indicator that reports the accumulated notifications.`,
  'https://bamboo.tec.mx/latest/foundations/icon/notification-counter-iKqGw1Ww-iKqGw1Ww',
  true,
)}
${getSpecialSpecifications(
  `###${RELEVANT_TITLE_LEVEL[0]}
>
Please consider that the fixed height of the ***Notification counter*** is 12 px,
such that the sizes assigned to the elements in relation to it must be considered,
in this way there will be visual harmony between the elements.
`,
  true,
)}
${getBasicExampleBlock('BmbIconComponent', '', '', true)}
        `,
      },
    },
  },
  argTypes: {
    counter: DBmbIconParamDesc.iconDotNotification,
    appearance: getAppearanceParam('Notification counter', [
      'notification',
      'plain',
      'notification',
    ]),
  },
  args: {
    counter: 7,
    appearance: 'notification',
  },
} as Meta<typeof BmbNotificationCounterComponent>;

type Story = StoryObj<BmbNotificationCounterComponent>;

export const Default: Story = {};

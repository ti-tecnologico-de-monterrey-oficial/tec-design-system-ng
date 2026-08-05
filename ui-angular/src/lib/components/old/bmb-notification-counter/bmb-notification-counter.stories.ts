import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
import { BmbNotificationCounterComponent } from './bmb-notification-counter.component';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralDescription,
  getPageStructureForFoundationStories,
  getSpecialSpecifications,
  RELEVANT_TITLE,
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
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/foundations/icon/notification-counter-iKqGw1Ww-iKqGw1Ww',
    isSubStory: true,
  },
)}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    `
Please consider that the fixed height of the ***Notification counter*** is 12 px,
such that the sizes assigned to the elements in relation to it must be considered,
in this way there will be visual harmony between the elements.
`,
    {
      title: '###'.concat(RELEVANT_TITLE.important),
      blockquoteType: BlockquoteType.important,
    },
  )}`,
  { isSubStory: true, showAdditionalBlockquote: true },
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

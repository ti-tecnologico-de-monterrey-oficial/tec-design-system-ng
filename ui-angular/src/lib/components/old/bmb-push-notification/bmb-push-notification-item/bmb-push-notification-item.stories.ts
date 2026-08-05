import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbPushNotificationItemComponent } from './bmb-push-notification-item.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../../utils/doc/utils';
import {
  BMB_CREATIVE_COLOR_LIST,
  BMB_MITEC_COLOR_LIST,
  BMB_SEMANTIC_COLOR_LIST,
} from '../../../types/foundations/colors/color-type';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';

const variants: string[] = [
    ...BMB_MITEC_COLOR_LIST,
    'black-primary',
    'neon-primary',
    ...BMB_CREATIVE_COLOR_LIST,
  ],
  fullVariants: string[] = [
    ...BMB_SEMANTIC_COLOR_LIST,
    'black-primary',
    'blue-tec',
    ...BMB_CREATIVE_COLOR_LIST,
  ];
export default {
  title: 'Internals/Notification item',
  component: BmbPushNotificationItemComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbDividerComponent],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'getAppIcon',
          'getAppName',
          'getContent',
          'getIconClasses',
          'getNotificationClasses',
          'handleAction',
          'handleClose',
          'handleDontAskAgain',
          'handleExpandEvent',
          'isNotificationTemplate',
          'dontAskAgain',
          'isExpanded',
          'isValidForFullVariant',
          'isValidVariant',
        ],
      },
      description: {
        component: `
        ${getGeneralDescription(`${getGeneralComponentDescription({ name: 'push-notification' })} use notifications.`, { generalDocLink: 'https://bamboo.tec.mx/latest/components/push-notification/descripcion-general-neloJm9o' })}
        ${getBasicExampleBlock('BmbPushNotificationItemComponent')}
                `,
      },
    },
  },
  argTypes: {
    notification: {
      name: 'Notification',
      control: {
        type: 'object',
      },
      description: 'The notification to display.',
      table: {
        category: 'Properties',
        type: {
          summary: 'INotification',
          required: true,
        },
      },
    },
    onClose: {
      name: 'On Close',
      control: null,
      description: 'Event emitted when the notification is closed.',
      table: {
        category: 'Events',
        type: {
          summary: 'void',
        },
      },
    },
  },

  args: {
    notification: {
      title: 'Notification title',
      message: 'Notification message',
      type: 'creative-use-rum',
      isFullColor: false,
    },
  },
} as Meta<typeof BmbPushNotificationItemComponent>;

type Story = StoryObj<BmbPushNotificationItemComponent>;

export const Default: Story = {};

export const Variants = {
  render: () => ({
    template: `
<div style="
  display: flex;
  flex-direction: row;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
  "
>
  @for (variant of variants; track $index) {
    <bmb-push-notification-item
      style="width: 45%;"
      [notification]="{
        title: variant,
        message: 'Notification message',
        type: variant,
      }"
    />
  }

  <bmb-divider style="width: 100%;"/>

  @for (fullVariant of fullVariants; track $index) {
    <bmb-push-notification-item
      style="width: 45%;"
      [notification]="{
        title: fullVariant,
        subTitle: 'Notification subtitle',
        type: fullVariant,
        isFullColor: true
      }"
    />
  }
</div>
    `,
    props: {
      variants: variants,
      fullVariants: fullVariants,
    },
  }),
  parameters: {
    docs: {
      canvas: {
        sourceState: 'none',
      },
    },
  },
};

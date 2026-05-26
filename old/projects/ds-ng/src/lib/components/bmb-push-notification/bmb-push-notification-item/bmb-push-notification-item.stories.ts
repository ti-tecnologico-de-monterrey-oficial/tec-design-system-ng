import { Meta, StoryObj } from '@storybook/angular';
import { BmbPushNotificationItemComponent } from './bmb-push-notification-item.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
} from '../../../utils/doc/utils';

export default {
  title: 'Internals/Notification item',
  component: BmbPushNotificationItemComponent,
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

import { Component, input } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbNotificationService } from '../../services/notification.service';
import { BmbPushNotificationComponent } from './bmb-push-notification.component';
import { NotificationType } from './types';
import {
  attributes,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
} from '../../utils/doc/utils';
import {
  DBmbIconParamDesc,
  getDefaultValueControl,
  getAppearanceParam,
  getOnEventParam,
  getPropertyParamDesc,
} from '../../utils/doc/parameterDescriptions';

const TITLE_PROPERTY_DESCRIPTION = getPropertyParamDesc('notification');
@Component({
  standalone: true,
  imports: [BmbPushNotificationComponent, BmbButtonDirective],
  selector: 'storybook-toast-wrapper',
  template: `
    <div style="height: 500px">
      <button
        bmbButton
        appearance="primary"
        icon="home"
        (click)="addNotificationFnc()"
      >
        Add notification
      </button>
      <bmb-push-notification />
    </div>
  `,
})
class StorybookToastWrapperComponent {
  title = input('');
  subtitle = input('');
  content = input('');
  icon = input('');
  type = input<NotificationType>('tec');
  isFullColor = input(false);
  delay = input(5000);
  date = input('');
  appName = input('');
  appIcon = input('');
  media = input('');
  userName = input('');
  userAvatar = input('');
  userMail = input('');

  enableDontAskAgain() {
    console.log("Don't ask again");
  }

  constructor(private notificationSignal: BmbNotificationService) {}

  addNotificationFnc() {
    console.log(typeof this.delay());

    this.notificationSignal.addNotification({
      title: this.title(),
      subTitle: this.subtitle(),
      content: this.content(),
      icon: this.icon(),
      type: this.type(),
      dontAskAgainEvent: this.enableDontAskAgain,
      isFullColor: this.isFullColor(),
      delay: this.delay(),
      date: this.date(),
      appName: this.appName(),
      appIcon: this.appIcon(),
      media: this.media(),
      userName: this.userName(),
      userAvatar: this.userAvatar(),
      userMail: this.userMail(),
    });
  }
}

export default {
  title: 'Components/Status indicators/Push notification',
  component: BmbPushNotificationComponent,
  decorators: [
    moduleMetadata({
      imports: [
        StorybookToastWrapperComponent,
        BmbPushNotificationComponent,
        BmbIconComponent,
        BmbButtonDirective,
      ],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      controls: { exclude: ['closeNotification', 'getNotifications'] },
      description: {
        component: `
${getGeneralDescription(`${getGeneralComponentDescription({ name: 'push-notification' })} to easily configure notifications to display in the apps.`, 'https://bamboo.tec.mx/latest/componentes/push-notification/descripcion-general-neloJm9o')}
${getSpecialSpecifications(` ### Configuration
Add the **BmbNotificationService** to your App providers:
\`\`\`typescript
providers: [
  provideRouter(routes),
  importProvidersFrom([BmbNotificationService, ...]),
],\`\`\`
###Show notifications
Add the **BmbPushNotificationComponent** at the bottom of your **app.component.html**.
`)}
${getBasicExampleBlock('BmbPushNotificationComponent')}
        `,
      },
    },
  },
  argTypes: {
    title: TITLE_PROPERTY_DESCRIPTION,
    subtitle: {
      ...TITLE_PROPERTY_DESCRIPTION,
      description: TITLE_PROPERTY_DESCRIPTION.description.replace(
        'title',
        'subtitle',
      ),
    },
    content: {
      control: {
        type: 'text',
      },
      description: 'Sets the notification content.',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string, Template Reference' },
      },
    },
    icon: {
      ...DBmbIconParamDesc.icon,
      description: DBmbIconParamDesc.icon.description.concat(
        '<br/><br/>The notification icon.',
      ),
    },
    type: getAppearanceParam('notification', [
      'tec',
      'success',
      'info',
      'neutral',
      'event',
      'error',
      'warning',
      'black',
      'creative_violet',
      'creative_indigo',
      'creative_emerald',
      'creative_licorice',
      'creative_darkteal',
      'creative_orange',
      'creative_peach',
      'creative_sepia',
      'creative_softred',
      'creative_wattle',
      'creative_shipcove',
      'creative_plantation',
      'creative_rum',
      'creative_hibiscus',
      'creative_ripelemon',
    ]),
    enableDontAskAgain: getOnEventParam(
      getOnEvent('', 'dontAskAgainEvent', 'string'),
      "when the checkbox is clicked, emits the id of the notification.<br/><br/> Useful for enabling the **Don't ask again** flag.",
      'other',
    ),
    actions: getOnEventParam(
      getOnEvent('', 'actions', 'INotificationAction[]'),
      `list of actions and their events to display.
    [{
      title: string;
      type?: IButtonAppearance;
      icon?: string;
      subTitle?: string;
        content?: string;
        isFullColor: boolean;
        id?: string;
    }]

    IButtonAppearance =
    | 'primary'
    | 'secondary-filled'
    | 'secondary-outlined'
    | 'destructive'
    | 'transparent';
          `,
      'other',
    ),
    isFullColor: getPropertyParamDesc(
      'full color to the notification',
      'boolean',
      false,
    ),
    delay: {
      control: { type: 'number' },
      description: '',
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl('5000'),
        type: { summary: 'number' },
      },
    },
    date: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
      description: `Sets a label with a date or **number days**.
  It will be displayed at the top left.`,
    },
    appName: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl('mitec.com'),
        type: { summary: 'string' },
      },
      description:
        'Sets the **App name**, it will be display at the top of the notification.',
    },
    appIcon: {
      control: {
        type: 'text',
      },
      description:
        'Sets the app logo name will be display at the top of the notification.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: getDefaultValueControl(),
      },
    },
    media: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
      description:
        'Sets the image of the notification, will be display at the bottom of the notification.',
    },
    userName: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
      description:
        'Sets the user name label, in order to enable the user section this field is required as `userAvatar`.',
    },
    userAvatar: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
      description:
        'Sets the user avatar, and in order to enable the user section this filed is required as `userName`.',
    },
    userMail: {
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        defaultValue: getDefaultValueControl(),
        type: { summary: 'string' },
      },
      description:
        'Sets the user email for the user section, and in order to enable the user section this filed is required as `userName` and `userName`.',
    },
  },
  args: {
    title: 'Notification Title',
    subtitle: 'Notification Subtitle',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    icon: 'info',
    type: 'tec',
    isFullColor: false,
    delay: 5000,
    date: '1 day',
    appName: 'mitec.com',
    appIcon: 'assets/images/tec-logo-mob.svg',
    media:
      'https://preview.redd.it/zfohxnf8t3pa1.jpg?width=1024&format=pjpg&auto=webp&v=enabled&s=0f660e0a56476991ee3b97f2885d8c010fec5b97',
    userName: 'Some Placeholder Name',
    userAvatar:
      'https://www.yugatech.com/wp-content/uploads/2020/09/Facebook-Avatar.jpg',
    userMail: 'some.placeholder.name@domian.com',
  },
} as Meta<typeof BmbPushNotificationComponent>;

export const Default: StoryFn<typeof StorybookToastWrapperComponent> = (
  args,
) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-toast-wrapper ${attributes(args)}></storybook-toast-wrapper>
      <!-- Start copying from here -->
      <div class="actions">
      <button
        bmbButton
        appearance="primary"
        icon="home"
        (click)="openModalComponent()"
      >Add notification</button>
      <bmb-push-notification />
      `,
  };
};

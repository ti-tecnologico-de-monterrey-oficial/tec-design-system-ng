import { Component, input } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbNotificationService } from '../../services/notification.service';
import { BmbPushNotificationComponent } from './bmb-push-notification.component';
import { NotificationType } from './types';

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
    alert("Don't ask again");
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
  title: 'Macro Componentes/Push notification',
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
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

##Configuration
Add the \`BmbNotificationService\` to your App providers:

\`\`\`providers: [
  provideRouter(routes),
  importProvidersFrom([BmbNotificationService, ...]),
],\`\`\`

##Show notifications
Add the \`BmbPushNotificationComponent\` at the bottom of your **app.component.html**

\`\`\`typescript
import { BmbPushNotificationComponent, NotificationType, INotificationAction, NotificationType } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbPushNotificationComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    title: {
      name: 'Title',
      control: {
        type: 'text',
      },
      description: 'Set the notification title.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    subtitle: {
      name: 'Subtitle',
      control: {
        type: 'text',
      },
      description: 'Set the notification subtitle.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    content: {
      name: 'Content',
      control: {
        type: 'text',
      },
      description: 'Set the notification content.',
      table: {
        category: 'Properties',
        type: { summary: ['string', 'Template Reference'] },
      },
    },
    icon: {
      name: 'Icon',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description: 'Set the notification icon.',
    },
    type: {
      name: 'Type',
      control: {
        type: 'select',
      },
      options: [
        'tec',
        'success',
        'info',
        'neutral',
        'event',
        'error',
        'warning',
        'black',
      ],
      table: {
        category: 'Properties',
        defaultValue: { summary: 'tec' },
        type: { summary: 'NotificationType' },
      },
      description: 'Set the noticication color schema.',
    },
    enableDontAskAgain: {
      name: "Enable don't ask again",
      control: null,
      description:
        'Enable the option to check the property "Don don\'t ask again", once the user click on the checkbox the function is trigger.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    actions: {
      name: 'Actions',
      control: null,
      description:
        'List of actions and their events to display `[{ title, action, type?,  icon? }]`',
      table: {
        category: 'Events',
        type: { summary: 'INotificationAction' },
      },
    },
    isFullColor: {
      name: 'Full color',
      control: { type: 'boolean' },
      description:
        'Set the Notification virtualization type, Full color is a short notification type, a side effect of enable this option hide the next properties: ',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    delay: {
      name: 'Delay',
      control: { type: 'number' },
      description: 'Delay',
      table: {
        category: 'Properties',
        defaultValue: { summary: '5000' },
        type: { summary: 'number' },
      },
    },
    date: {
      name: 'Date',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description: 'Set a leyend with a date or days to left.',
    },
    appName: {
      name: 'App name',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'mitec.com' },
        type: { summary: 'string' },
      },
      description: 'Set the App name at the top of the notification.',
    },
    appIcon: {
      name: 'App icon',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        defaultValue: { summary: 'assets/images/tec-logo-mob.svg' },
        type: { summary: 'string' },
      },
      description: 'Set the App name at the top of the notification.',
    },
    media: {
      name: 'Media',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description: 'Set an image at the bottom of the notification.',
    },
    userName: {
      name: 'User name',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description:
        'Set the user name label, and in order to enable the user section this filed is required as `userAvatar`.',
    },
    userAvatar: {
      name: 'User avatar',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description:
        'Set the user avatar, and in order to enable the user section this filed is required as `userName`.',
    },
    userMail: {
      name: 'User email',
      control: {
        type: 'text',
      },
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      description:
        'Set the user email for the user section, and in order to enable the user section this filed is required as `userName and `userName`.',
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

function attributes(object: { [key: string]: any }): string {
  return Object.entries(object)
    .filter(([key]) => key !== 'text')
    .map(([key, value]) => {
      if (key === 'isFullColor' || key === 'delay') {
        return `[${key}]="${value}"`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');
}

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

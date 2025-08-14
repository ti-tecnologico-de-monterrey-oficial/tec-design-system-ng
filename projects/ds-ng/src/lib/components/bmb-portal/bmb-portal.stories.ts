import { Component, input } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbButtonDirective } from '../../directives/bmb-button/button.directive';
import { BmbNotificationService } from '../../services/notification.service';
import { BmbPushNotificationItemComponent } from '../bmb-push-notification/bmb-push-notification-item/bmb-push-notification-item.component';
import {
  BmbToastComponent,
  BmbToastAppearance,
} from '../bmb-toast/bmb-toast.component';
import { NotificationType } from '../bmb-push-notification/types';
import { BmbPortalComponent } from './bmb-portal.component';
import { attributes, RELEVANT_TITLE_LEVEL } from '../../utils/doc/utils';

@Component({
  standalone: true,
  imports: [
    BmbPushNotificationItemComponent,
    BmbButtonDirective,
    BmbPortalComponent,
    BmbToastComponent,
  ],
  selector: 'storybook-toast-wrapper',
  template: `
    <div class="bmb_main-container" style="height: 500px">
      <button
        bmbButton
        appearance="primary"
        icon="home"
        (click)="addNotificationFnc()"
      >
        Add notification
      </button>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
        officia illum id. Libero exercitationem quis fugiat perspiciatis itaque
        perferendis enim voluptatibus, temporibus, officia aut consequuntur
        similique ea accusantium non doloribus.
      </p>
      <p>
        Voluptate possimus cupiditate rerum, soluta debitis consectetur amet
        vero quia, odio perspiciatis unde saepe, architecto repellat. Iste
        veniam eum facilis, nemo, aspernatur voluptatum deleniti dolores
        consequatur dignissimos sit autem non.
      </p>
      <p>
        Mollitia pariatur unde neque quaerat consequatur doloremque
        reprehenderit, excepturi, voluptatum hic accusantium magni natus.
        Exercitationem ab rem dicta quaerat culpa, atque impedit accusamus,
        nulla eveniet totam aut temporibus quo. Perspiciatis.
      </p>
      <p>
        Voluptate, architecto eligendi. Ipsam sint mollitia esse commodi
        inventore perferendis, alias suscipit repellat. Corrupti culpa
        doloremque rerum et. Odit, accusantium quis vero aspernatur quibusdam
        minima non assumenda aut eos! Dolor.
      </p>
      <p>
        Illo dolorem doloribus atque nihil dolorum fugit explicabo recusandae
        dolor quos aliquid, eligendi nemo sunt sequi nisi voluptas distinctio
        quam, aspernatur consequuntur obcaecati ducimus. Vitae nulla recusandae
        explicabo nobis corporis!
      </p>
      <p>
        Dicta magnam laboriosam, praesentium at adipisci saepe aliquid beatae
        ea, quam vitae aut quo soluta omnis, consequuntur necessitatibus.
        Obcaecati impedit quod temporibus molestiae sapiente voluptatum nostrum
        laudantium placeat aliquam quia.
      </p>
      <p>
        Optio repellendus, illo dicta tempore, aliquid atque numquam
        perspiciatis, in maiores harum recusandae velit iste corrupti iure aut
        corporis. Enim accusantium doloribus ipsum! Quidem, repellat quod odio
        eius expedita a.
      </p>
      <p>
        Quaerat incidunt aut eligendi obcaecati libero voluptatibus minus magni
        eius voluptatum est, accusamus corporis, repellendus cupiditate
        deserunt, tempore temporibus! Deleniti perspiciatis veniam molestias
        laboriosam ipsam repellat minima vitae odio repudiandae.
      </p>
      <p>
        Totam, iure possimus ipsum dolores dignissimos atque vitae unde odit,
        magni distinctio quam laudantium commodi debitis magnam aspernatur
        accusamus. Totam ut consequatur, veritatis ipsum quasi itaque officia
        quos aliquid consectetur.
      </p>
      <p>
        Eligendi, vero praesentium, nostrum, alias inventore voluptatem iusto
        distinctio ullam recusandae cumque id consequuntur aperiam. Voluptate
        fugit autem ipsam! Amet cum id ab explicabo obcaecati pariatur fugit
        repudiandae ullam deserunt!
      </p>
    </div>
    <bmb-portal />
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
  component = input<'toast' | 'notification' | 'notice-card'>('notification');
  appearance = input<BmbToastAppearance>('neutral');
  position = input<
    | 'top-left'
    | 'top-right'
    | 'top-center'
    | 'bottom-left'
    | 'bottom-right'
    | 'bottom-center'
  >('top-right');
  description = input<{
    pageOne?: 'lorem imspus';
    pageTwo?: 'Lorem imsunpsmdsad ';
  }>;
  buttonText = input('');
  link = input('');

  enableDontAskAgain() {
    alert("Don't ask again");
  }

  constructor(private notificationSignal: BmbNotificationService) {}

  getNogificationLenght() {
    return this.notificationSignal.getNotificationList().length;
  }

  addNotificationFnc() {
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
      component: this.component(),
      appearance: this.appearance(),
      position: this.position(),
      buttonText: this.buttonText(),
      link: this.link(),
    });
  }
}

export default {
  title: 'Dev tools/Portal',
  component: BmbPushNotificationItemComponent,
  decorators: [
    moduleMetadata({
      imports: [
        StorybookToastWrapperComponent,
        BmbPushNotificationItemComponent,
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

\`\`\`javascript
providers: [
  provideRouter(routes),
  importProvidersFrom([BmbNotificationService, ...]),
],
\`\`\`

##Notification service methods

###Add notification

\`\`\`typescript
addNotification(notification: INotification);
\`\`\`

This function returns an ID which can be used to delete the notification or check the notification state.

###Delete notification

\`\`\`typescript
deleteNotification(id: string);
\`\`\`

This function deletes a notification by its ID.

###Get notification list

\`\`\`typescript
getNotificationList(): INotification[];
\`\`\`

This function returns the current notification list.

##Show notifications
Add the \`BmbPortalComponent\` at the bottom of your **app.component.html**.

If you need to reproduce sticky behavior on your notifications, you can add the bmb_main-container class to your app container in the **app.component.html** file as shown below.

> ${RELEVANT_TITLE_LEVEL[1]} If you show many notifications at the same time, the browser may display two scrolls bars.

\`\`\`html
<div class="bmb_main-container">
  <my-app></my-app>
</div>
<bmb-portal></bmb-portal>
\`\`\`

\`\`\`typescript
import { BmbPortalComponent, NotificationType, INotificationAction, NotificationType } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbPortalComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
class MyComponent {

  constructor(private notificationSignal: BmbNotificationService) {}

  addNotificationFnc() {
    this.notificationSignal.addNotification({
      // Notification properties
    });
  }
}
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
    component: {
      name: 'Component',
      control: {
        type: 'select',
      },
      options: ['toast', 'notification', 'notice-card'],
      table: {
        category: 'Properties',
        type: { summary: 'notification | toast' },
        defaultValue: { summary: 'notification' },
      },
      description: 'Set the component type to render.',
    },
    appearance: {
      name: 'Appearance',
      control: {
        type: 'select',
      },
      options: [
        'neutral',
        'primary',
        'warning',
        'error',
        'event',
        'successful',
        'reminder',
      ],
      table: {
        category: 'Properties',
        type: { summary: 'BmbToastAppearance' },
        defaultValue: { summary: 'neutral' },
      },
      description:
        'Set the appearance of the component. only valid for `toast` component.',
    },
    position: {
      name: 'Position',
      control: {
        type: 'select',
      },
      options: [
        'top-left',
        'top-center',
        'top-right',
        'bottom-left',
        'bottom-center',
        'bottom-right',
      ],
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: 'top-right' },
      },
      description: 'Set the position of the notification.',
    },
    description: {
      name: 'Description',
      control: {
        type: 'object',
      },
      description:
        'Set the description of the notice card, this is an object with two pages, each page is a string.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbCardNoticeDescription' },
        defaultValue: { summary: '' },
      },
    },
    buttonText: {
      name: 'Button text',
      control: {
        type: 'text',
      },
      description: 'Set the button text of the notice card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
    link: {
      name: 'Link',
      control: {
        type: 'text',
      },
      description: 'Set the link of the notice card.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
        defaultValue: { summary: '' },
      },
    },
  },
  args: {
    title: 'Notification Title',
    subtitle: 'Notification Subtitle',
    content: {
      pageOne: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pageTwo:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    },
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
    component: 'notification',
    appearance: 'neutral',
    position: 'top-right',
    buttonText: 'Ir',
    link: 'https://www.youtube.com',
  },
} as Meta<typeof BmbPushNotificationItemComponent>;

export const Default: StoryFn<typeof StorybookToastWrapperComponent> = (
  args,
) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-toast-wrapper
        ${attributes(args)}
      ></storybook-toast-wrapper>
      <!-- Start copying from here -->
      <div class="actions">
        <button
          bmbButton
          appearance="primary"
          icon="home"
          (click)="openModalComponent()"
        >Add notification</button>
        <bmb-portal />
      </div>
      `,
  };
};

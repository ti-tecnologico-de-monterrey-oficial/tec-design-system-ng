import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbPushNotificationItemComponent } from './bmb-push-notification-item.component';

export default {
  title: 'Internal/Notification item',
  component: BmbPushNotificationItemComponent,
  decorators: [
    moduleMetadata({
      imports: [BmbPushNotificationItemComponent],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { Component, ChangeDetectorRef } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { BmbPushNotificationItemComponent, BmbButtonDirective } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-component',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    BmbButtonDirective,
    BmbPushNotificationItemComponent,
  ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`
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
      type: 'creative_rum',
      isFullColor: false,
    },
  },
} as Meta<typeof BmbPushNotificationItemComponent>;

type Story = StoryObj<BmbPushNotificationItemComponent>;

export const Default: Story = {};

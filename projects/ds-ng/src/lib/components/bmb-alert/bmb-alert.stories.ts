import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { BmbAlertComponent } from './bmb-alert.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

export default {
  title: 'Alert',
  component: BmbAlertComponent,
  decorators: [
    moduleMetadata({
      declarations: [BmbIconComponent],
    }),
  ],
  argTypes: {
    text: {
      name: 'Text',
      control: {
        type: 'text',
      },
      description: 'The text of the alert.',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      name: 'Type',
      control: {
        type: 'radio',
      },
      options: [
        'neutral',
        'primary',
        'successful',
        'warning',
        'error',
        'event',
      ],
      description: 'The type of the alert, visual changes.',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    text: 'Your alert text here',
    type: 'neutral',
  },
} as Meta<typeof BmbAlertComponent>;

type Story = StoryObj<BmbAlertComponent>;

export const Default: Story = {};

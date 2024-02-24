import type { Meta, StoryObj } from '@storybook/angular';
import { BmbInputComponent } from './bmb-input.component';

export default {
  title: 'Input',
  component: BmbInputComponent,
  argTypes: {
    icon: {
        name: 'Icon',
        control: {
          type: 'text',
        },
        description:
          'The name of the icon. See Material Icons.',
        table: {
          type: { summary: 'string' },
        },
    },
    errorMessage: {
        name: 'Error Message',
        control: {
          type: 'text',
        },
        description:
          'The text show an error message or can be used as a helper text.',
        table: {
          type: { summary: 'string' },
        },
    },
    isRequired: {
        name: 'Required',
        control: { type: 'boolean' },
        description:
          'When set to true, The input border color turns to red. By default, it is false, and you do not need to explicitly set it.',
        table: {
          defaultValue: { summary: 'false' },
          type: { summary: 'boolean' },
        },
    },
    placeholder: {
      name: 'Placeholder',
      control: {
        type: 'text',
      },
      description:
        'The text of the placeholder for the input.',
      table: {
        type: { summary: 'string' },
      },
    },
    isDisabled: {
        name: 'Disabled',
        control: { type: 'boolean' },
        description:
          'When set to true, The input disabled. By default, it is false, and you do not need to explicitly set it.',
        table: {
          defaultValue: { summary: 'false' },
          type: { summary: 'boolean' },
        },
    },
    label: {
        name: 'Label',
        control: {
          type: 'text',
        },
        description:
          'The text show an text as a label can be used to make an input form.',
        table: {
          type: { summary: 'string' },
        },
    },
    appearance: {
        name: 'Appearance',
        control: {
            type: 'radio',
        },
        options:[
            'main',
            'normal',
            'simple',
        ],
        description: 'The style of the input',
        table: {
            type: { summary: 'string' },
        },
    },
  },
  args: {
    icon: 'user',
    errorMessage: 'Helper',
    isRequired: false,
    placeholder: 'Placeholder',
    isDisabled: false,
    label: 'Input Label',
    appearance: 'normal'
  },
} as Meta<typeof BmbInputComponent>;

type Story = StoryObj<BmbInputComponent>;

export const Default: Story = {};
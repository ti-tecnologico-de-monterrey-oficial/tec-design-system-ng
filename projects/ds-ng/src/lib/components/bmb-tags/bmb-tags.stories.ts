import type { Meta, StoryObj } from '@storybook/angular';
import { BmbTagComponent } from './bmb-tags.component';

export default {
  title: 'Micro Componentes/Tag',
  component: BmbTagComponent,
  argTypes: {
    text: {
      name: 'Text',
      control: {
        type: 'text',
      },
      description:
        'The text of the Tag. The width will increase depending on the length of the text.',
      table: {
        type: { summary: 'string' },
      },
    },
    grouped: {
      name: 'Grouped',
      control: { type: 'boolean' },
      description:
        'When set to true, it groups multiple badges into a parent element. By default, it is false, and you do not need to explicitly set it. The badge should always have a parent element.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    dissmisable: {
      name: 'Dissmisable',
      control: { type: 'boolean' },
      description:
        'When set to true, a close icon appears, when is clicked the tag is remove from the DOM. By default, it is false, and you do not need to explicitly set it. The badge should always have a parent element.',
      table: {
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
  },
  args: {
    text: 'Badge text',
    grouped: false,
    dissmisable: false,
  },
} as Meta<typeof BmbTagComponent>;

type Story = StoryObj<BmbTagComponent>;

export const Default: Story = {};

import type { Meta, StoryObj } from '@storybook/angular';
import { BmbBotIconComponent } from './bmb-bot-icon.component';
import type { BmbBotIconName } from '../../_shared/types/components/bot-icon';

interface BotIconStoryArgs {
  iconName: BmbBotIconName;
}

const meta = {
  title: 'Components/Icons/Bot icon',
  component: BmbBotIconComponent,
  parameters: {
    docs: {
      description: {
        component:
          'Displays a Bamboo bot icon from a built-in identifier or an SVG file name.',
      },
    },
  },
  argTypes: {
    iconName: {
      control: 'select',
      options: [
        'bot_tecStandar',
        'bot_chatGPT',
        'bot_tecGPT',
        'bot_tecSchool',
        'bot_tecTech',
        'bot_tecSport',
        'bot_tecPhone',
        'bot_health',
        'bot_tecScience',
        'anthropic',
        'meta',
        'xai',
        'google',
        'empty',
      ],
      description: 'Built-in icon identifier or SVG file name.',
      table: {
        type: { summary: 'BmbBotIconName' },
        category: 'Properties',
      },
    },
  },
  args: {
    iconName: 'bot_tecGPT',
  },
} satisfies Meta<BotIconStoryArgs>;

export default meta;
type Story = StoryObj<BotIconStoryArgs>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    iconName: 'empty',
  },
};

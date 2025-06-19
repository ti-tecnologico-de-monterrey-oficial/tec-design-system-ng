import { type Meta, type StoryObj } from '@storybook/angular';
import { BmbChatBubblesComponent } from './bmb-chat-bubbles.component';
import { storiesLayoutVertical } from '../../utils/bambooLayout';

export default {
  title: 'Components/Containers/AI Chat bubble',
  component: BmbChatBubblesComponent,
  decorators: [storiesLayoutVertical],
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbChatBubblesComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
// optional you can customize the bot list from:
// import { defaultBotList, IBotType } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbChatBubblesComponent ],
  templateUrl: './component.html',
  styleUrl: './component.scss',
})
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
  argTypes: {
    iconBot: {
      name: 'Icon Bot',
      control: { type: 'text' },
      description: 'Use the url or the path for the icon bot',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    message: {
      name: 'Message',
      control: { type: 'object' },
      description:
        'Set the information requiered for the chat bubble, includes the text, type of the text, image for the user etc.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbChatMessage' },
        defaultValue: {
          summary: {
            isUserMessage: false,
            type: 'text',
            content: {
              text: ' Lorem ipsum dolor sit amet,  consectetur adipiscing elit. Ut justo.',
            },
            time: '2025-03-27T15:48:33.065Z',
          },
        },
      },
    },
    gptBot: {
      name: 'GPT Bot',
      control: { type: 'boolean' },
      description: 'Set if the icon of Gpt will be used in the component.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    gptIcons: {
      name: 'GPT Icons',
      control: { type: 'boolean' },
      description:
        'Set the extra icons, these icons are only for the response from the bot, not for the user.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isThinking: {
      name: 'Is Thinking',
      control: { type: 'boolean' },
      description:
        'If this property is set as true, the componet show an animation as if it were thinking.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onRepeatRequest: {
      name: 'On Repeat Request',
      control: null,
      description: 'Emmit the event to repeat te request',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onVoice: {
      name: 'On Voice',
      control: null,
      description: 'Emmit the Voice event when the button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onCopy: {
      name: 'On Copy',
      control: null,
      description:
        'Emmit the copy event to copy the content of the chat bubble, the event only returns a signal to indicates the click event.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onLike: {
      name: 'On Like',
      control: null,
      description: 'Emmit the event when the like button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onDislike: {
      name: 'On Dislike',
      control: null,
      description: 'Emmit the event when the dislike button is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    message: {
      isUserMessage: false,
      userProfile: 'https://picsum.photos/id/64/200/300',
      type: 'text',
      content: {
        text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo.',
      },
      time: new Date(),
    },
    gptIcons: false,
    onRepeatRequest: () => {
      window.alert('Repeat request Button');
    },
    onVoice: () => {
      window.alert('Play Voice Button');
    },
    onCopy: () => {
      window.alert('Copy Button');
    },
    onLike: () => {
      window.alert('Like Button');
    },
    onDislike: () => {
      window.alert('Dislike Button');
    },
  },
} as Meta<typeof BmbChatBubblesComponent>;

type Story = StoryObj<BmbChatBubblesComponent>;

export const Default: Story = {};

export const UserMsg: Story = {
  args: {
    message: {
      isUserMessage: true,
      userProfile: 'https://picsum.photos/id/64/200/300',
      type: 'text',
      content: {
        text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo.',
      },
      time: new Date(),
    },
  },
  ...Default,
};

export const ChatGpt: Story = {
  args: {
    message: {
      isUserMessage: false,
      type: 'text',
      content: {
        text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo.',
      },
      time: new Date(),
    },
    gptIcons: true,
    gptBot: true,
  },
  ...Default,
};

export const LinkResponse: Story = {
  args: {
    message: {
      isUserMessage: false,
      type: 'link',
      content: {
        text: 'Link de prueba',
        link: 'https://www.youtube.com',
      },
      time: new Date(),
    },
    gptIcons: true,
    gptBot: true,
  },
  ...Default,
};

export const TextAndImage: Story = {
  args: {
    message: {
      isUserMessage: false,
      type: 'mixed',
      content: {
        text: 'Lorem insup',
        imageUrl: 'https://picsum.photos/id/64/200/300',
      },
      time: new Date(),
    },
  },
  ...Default,
};

export const Thinking: Story = {
  args: {
    message: {
      isUserMessage: false,
      type: 'mixed',
      content: {
        text: 'Lorem insup',
        imageUrl: 'https://picsum.photos/id/64/200/300',
      },
      time: new Date(),
    },
    gptIcons: false,
    isThinking: true,
  },
  ...Default,
};

import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { BmbChatBubblesComponent } from './bmb-chat-bubbles.component';
import {
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getOnEvent,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import {
  getOnClickParam,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';
import { RouterTestingModule } from '@angular/router/testing';

const IMPORTANT_DESCRIPTION: string = `${RELEVANT_TITLE.important}
The event only returns a signal to indicates the click event.
`;
const getOnClickAndImportantParam = (
  elementName: string,
  additionalDescription: string,
) =>
  getOnClickParam(
    getOnEvent(elementName, additionalDescription),
    `<br/><br/>${IMPORTANT_DESCRIPTION}`,
  );

export default {
  title: 'Components/Containers/AI Chat bubble',
  component: BmbChatBubblesComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'handleCopyContent',
          'handleDislike',
          'handleLike',
          'handleRepeat',
          'handleVoice',
          'gptActiveIcons',
          'iconBotDefault',
        ],
      },
      description: {
        component: `
${getGeneralDescription(
  `${getGeneralComponentDescription({ name: 'chat-bubble' })} displays chat messages with user images, icons, and interactive actions such as repeat, voice, copy, like, and dislike.
It supports [AI icons](https://bamboo.tec.mx/latest/componentes/ai-chat-bar/ai-icons-PPp7SNig), and allows configuration of available [***AI Chat bar***](/docs/components-inputs-ai-chat-bar--documentation) actions.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/ai-chat-bubble/descripcion-general-kum7HyJA',
  },
)}
${getSpecialSpecifications(`### ${IMPORTANT_DESCRIPTION}`)}
${getBasicExampleBlock('BmbChatBubblesComponent')}
        `,
      },
    },
  },
  argTypes: {
    iconBot: {
      control: { type: 'text' },
      description: 'Use the url or the path for the icon bot',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    message: {
      control: { type: 'object' },
      description:
        'Sets the information required for the chat bubble, includes the text, type of the text, image for the user etc.',
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
      control: { type: 'boolean' },
      description: 'Sets if the icon of Gpt will be used in the component.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    gptIcons: {
      control: { type: 'boolean' },
      description:
        'Sets the extra icons, these icons are only for the response from the bot, not for the user.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    isThinking: {
      control: { type: 'boolean' },
      description:
        'If this property is set as true, the component show an animation as if it were thinking.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onRepeatRequest: getOnEventParam(
      getOnEvent('repeat the request', 'onRepeatRequest'),
      'when the request needs to be repeated.',
      'other',
    ),
    onVoice: getOnClickAndImportantParam('voice', 'onVoice'),
    onCopy: getOnClickAndImportantParam('copy', 'onCopy'),
    onLike: getOnClickAndImportantParam('like', 'onLike'),
    onDislike: getOnClickAndImportantParam('onDislike', 'onDislike'),
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
      console.log('Repeat request Button');
    },
    onVoice: () => {
      console.log('Play Voice Button');
    },
    onCopy: () => {
      console.log('Copy Button');
    },
    onLike: () => {
      console.log('Like Button');
    },
    onDislike: () => {
      console.log('Dislike Button');
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

export const OptionsTemplate: Story = {
  args: {
    message: {
      isUserMessage: false,
      type: 'options',
      content: {
        text: '¿Cómo te puedo ayudar?',
        options: [
          {
            title: 'Option 1',
            target: '_blank',
            link: 'https://www.google.com.mx/maps/preview',
          },
          {
            title: 'Option 2',
            link: 'calendar',
          },
          {
            title: 'Option 3',
            link: 'home',
          },
          {
            title: 'Option 4',
            link: 'dropdown',
          },
        ],
      },
      time: new Date(),
    },
    gptIcons: true,
    gptBot: true,
  },
  ...Default,
};

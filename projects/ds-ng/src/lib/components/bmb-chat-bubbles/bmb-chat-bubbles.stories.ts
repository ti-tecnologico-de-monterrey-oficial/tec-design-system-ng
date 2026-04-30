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
  DBmbGenericParamDesc,
  getOnClickParam,
  getOnEventParam,
} from '../../utils/doc/parameterDescriptions';
import { RouterTestingModule } from '@angular/router/testing';
import { IBmbChatActionEvent } from './types';

const DEPRECATED_DESC = `
⛔ Deprecated  
This property will not be maintainable. This will be removed in future versions.  
Use "onAction" instead.
`;

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
          // deprecated API
          'handleCopyContent',
          'handleDislike',
          'handleLike',
          'handleRepeat',
          'handleVoice',
          'iconBotDefault',

          // internal logic
          'gptActiveIcons',
          'handleAction',
          'actions',
          'iconsState',
          'buildState',
          'toggleFeedback',
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
        'Defines the message displayed in the chat bubble, including id, content, type (text, image, link, etc.), and metadata such as time and user.',
      table: {
        category: 'Properties',
        type: { summary: 'IBmbChatMessage' },
        defaultValue: {
          summary: {
            id: 'msg-1',
            isUserMessage: false,
            type: 'text',
            content: {
              text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo.',
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
        'Enables the action icons (repeat, voice, copy, like, dislike) for bot messages.',
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
    onRepeatRequest: {
      ...getOnEventParam(
        getOnEvent('repeat the request', 'onRepeatRequest'),
        `Triggers when the user requests to repeat the message.

${DEPRECATED_DESC}`,
        'other',
      ),
    },

    onVoice: {
      ...getOnEventParam(
        getOnEvent('voice', 'onVoice'),
        `Triggers the voice playback action when the user clicks the icon.

${DEPRECATED_DESC}`,
        'other',
      ),
    },

    onCopy: {
      ...getOnEventParam(
        getOnEvent('copy', 'onCopy'),
        `Triggers the copy action when the user clicks the icon.

${DEPRECATED_DESC}`,
        'other',
      ),
    },

    onLike: {
      ...getOnEventParam(
        getOnEvent('like', 'onLike'),
        `Triggers the like action when the user clicks the icon.

${DEPRECATED_DESC}`,
        'other',
      ),
    },

    onDislike: {
      ...getOnEventParam(
        getOnEvent('dislike', 'onDislike'),
        `Triggers the dislike action when the user clicks the icon.

${DEPRECATED_DESC}`,
        'other',
      ),
    },
    onAction: getOnEventParam(
      getOnEvent('chat action', 'onAction'),
      'Returns the action performed, the messageId and the full message object.',
      'other',
    ),
  },
  args: {
    message: {
      id: 'msg-1',
      isUserMessage: false,
      userProfile: 'https://picsum.photos/id/64/200/300',
      type: 'text',
      content: {
        text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo.',
      },
      time: new Date(),
    },
    gptIcons: false,
  },
} as Meta<typeof BmbChatBubblesComponent>;

type Story = StoryObj<BmbChatBubblesComponent>;

export const Default: Story = {};

export const UserMsg: Story = {
  args: {
    message: {
      id: '2',
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
  parameters: {
    controls: {
      exclude: [
        'onAction',
        'onRepeatRequest',
        'onVoice',
        'onCopy',
        'onLike',
        'onDislike',
      ],
    },
  },
};

export const ChatGpt: Story = {
  args: {
    message: {
      id: '3',
      isUserMessage: false,
      type: 'text',
      content: {
        text: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut justo.',
      },
      time: new Date(),
    },
    gptIcons: true,
    gptBot: true,
    // 👇 deprecated handlers
    onRepeatRequest: () => console.log('Repeat'),
    onVoice: () => console.log('Voice'),
    onCopy: () => console.log('Copy'),
    onLike: () => console.log('Like'),
    onDislike: () => console.log('Dislike'),
  },
  ...Default,
  parameters: {
    controls: {
      exclude: ['onAction'],
    },
  },
};

export const LinkResponse: Story = {
  args: {
    message: {
      id: '4',
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
    // 👇 deprecated handlers
    onRepeatRequest: () => console.log('Repeat'),
    onVoice: () => console.log('Voice'),
    onCopy: () => console.log('Copy'),
    onLike: () => console.log('Like'),
    onDislike: () => console.log('Dislike'),
  },
  ...Default,
  parameters: {
    controls: {
      exclude: ['onAction'],
    },
  },
};

export const TextAndImage: Story = {
  args: {
    message: {
      id: '5',
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
  parameters: {
    controls: {
      exclude: [
        'onAction',
        'onRepeatRequest',
        'onVoice',
        'onCopy',
        'onLike',
        'onDislike',
      ],
    },
  },
};

export const Thinking: Story = {
  args: {
    message: {
      id: '6',
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
  parameters: {
    controls: {
      exclude: [
        'onAction',
        'onRepeatRequest',
        'onVoice',
        'onCopy',
        'onLike',
        'onDislike',
      ],
    },
  },
};

export const OptionsTemplate: Story = {
  args: {
    message: {
      id: '1',
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
    // 👇 deprecated handlers
    onRepeatRequest: () => console.log('Repeat'),
    onVoice: () => console.log('Voice'),
    onCopy: () => console.log('Copy'),
    onLike: () => console.log('Like'),
    onDislike: () => console.log('Dislike'),
  },
  ...Default,
  parameters: {
    controls: {
      exclude: ['onAction'],
    },
  },
};

export const ChatUsingOnAction: Story = {
  args: {
    message: {
      id: '3',
      isUserMessage: false,
      type: 'text',
      content: {
        text: 'Lorem ipsum...',
      },
      time: new Date(),
    },
    gptIcons: true,
    gptBot: true,
    onAction: (e: IBmbChatActionEvent) => {
      console.log('🔥 ACTION:', e.action);
      console.log('📌 MESSAGE ID:', e.messageId);
      console.log('📦 MESSAGE:', e.message);
      console.log('🖱 EVENT:', e.event);
    },
  },
  ...Default,
  parameters: {
    controls: {
      exclude: ['onRepeatRequest', 'onVoice', 'onCopy', 'onLike', 'onDislike'],
    },
  },
};

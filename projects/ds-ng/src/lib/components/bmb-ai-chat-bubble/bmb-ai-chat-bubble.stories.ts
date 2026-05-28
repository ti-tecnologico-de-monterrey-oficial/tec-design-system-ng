import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { RouterTestingModule } from '@angular/router/testing';

import { BmbAiChatBubbleComponent } from './bmb-ai-chat-bubble.component';
import { CommonModule } from '@angular/common';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';

const GET_ACTION_DESCRIPTION: string = `
${getAlertBlockquote(
  `The \`getAction\` event emits an object containing the triggered action, the related message information, and the native browser event.
>
Example:
\`{ action: "dislike", messageId: "1", message: Object, nativeEvent: Object }\`
`,
  {
    title: RELEVANT_TITLE.configuration,
    blockquoteType: BlockquoteType.important,
  },
)}
`,
  SUPPORTED_MESSAGES_TYPE: string = `
Supported message types include:
- text messages
- images
- mixed
- links
- selectable options
- custom templates<br/><br/>`;

export default {
  title: 'Components/Containers/AI Chat Bubble',
  component: BmbAiChatBubbleComponent,
  tags: ['!autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterTestingModule],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          // internal logic
          'bubbleClasses',
          'enableFeedback',
          'loading',
          'onAction',
        ],
      },
      description: {
        component: `
    ${getGeneralDescription(
      `${getGeneralComponentDescription({ name: 'ai-chat-bubble' })} is used to render user and assistant chat messages with support for interactive actions and multiple content types. It supports [AI icons](https://bamboo.tec.mx/latest/componentes/ai-chat-bar/ai-icons-PPp7SNig), and allows configuration of available [***AI Chat bar***](/docs/components-inputs-ai-chat-bar--documentation) actions.`,
      {
        generalDocLink:
          'https://bamboo.tec.mx/latest/componentes/ai-chat-bubble/descripcion-general-kum7HyJA',
      },
    )}
    ${getSpecialSpecifications(
      `### ${GET_ACTION_DESCRIPTION}
>${SUPPORTED_MESSAGES_TYPE}
>
Additional features include:
- thinking/loading states
- action interactions such as repeat, voice, copy, like, and dislike
- customizable user and assistant icons
`,
      { showAdditionalBlockquote: true },
    )}
${getBasicExampleBlock('BmbAiChatBubbleComponent')}
  `,
      },
    },
  },
  argTypes: {
    botIcon: {
      control: 'text',
      description: 'Bot icon token used for assistant messages.',
      table: {
        category: 'Properties',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'bot_tecStandar',
        },
      },
    },
    testId: {
      control: 'text',
      description: 'Testing identifier used for automation selectors.',
      table: {
        category: 'Properties',
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'chat-bubble',
        },
      },
    },
    message: {
      control: 'object',
      description: `
Chat message rendered inside the bubble.

${SUPPORTED_MESSAGES_TYPE}
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'BmbChatMessage',
        },
      },
    },
    isThinking: {
      control: 'boolean',
      description: 'Displays typing/loading animation state.',
      table: {
        category: 'Properties',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },

    showActions: {
      control: 'boolean',
      description: `
Displays chat action buttons.

Available actions:
- repeat
- voice
- copy
- like
- dislike
      `,
      table: {
        category: 'Properties',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },

    getAction: {
      control: false,
      description: GET_ACTION_DESCRIPTION,
      table: {
        category: 'Events',
        type: {
          summary: 'BmbChatActionEvent',
        },
      },
    },
  },
  args: {
    botIcon: 'bot_tecStandar',
    testId: 'chat-bubble',
    isThinking: false,
    showActions: true,
    message: {
      id: '1',
      type: 'text',
      timestamp: new Date(),
      isUser: false,
      content: {
        text: 'Hello! How can I help you today?',
      },
    },
  },
} as Meta<BmbAiChatBubbleComponent>;

type Story = StoryObj<BmbAiChatBubbleComponent>;

export const Default: Story = {};

export const UserMessage: Story = {
  args: {
    showActions: false,

    message: {
      id: '2',
      type: 'text',
      timestamp: new Date(),
      isUser: true,
      userProfile: 'https://picsum.photos/id/64/200/300',
      content: {
        text: 'I need help with Angular signals.',
      },
    },
  },
};

export const Thinking: Story = {
  args: {
    isThinking: true,

    message: {
      id: '3',
      type: 'text',
      timestamp: new Date(),
      isUser: false,
      content: {
        text: '',
      },
    },
  },
};

export const Options: Story = {
  args: {
    message: {
      id: '5',
      type: 'options',
      timestamp: new Date(),
      isUser: false,
      content: {
        text: 'Choose one option:',
        options: [
          {
            id: '1',
            label: 'Retry',
          },
          {
            id: '2',
            label: 'Documentation',
            href: 'https://angular.dev',
            target: '_blank',
          },
        ],
      },
    },
  },
};

export const TextMessage: Story = {
  args: {
    message: {
      id: '6',
      type: 'text',
      timestamp: new Date(),
      isUser: false,
      content: {
        text: `
Angular Signals provide a reactive primitive for managing state
without relying on RxJS subscriptions for simple scenarios.
        `,
      },
    },
  },
};

export const LinkMessage: Story = {
  args: {
    message: {
      id: '7',
      type: 'link',
      timestamp: new Date(),
      isUser: false,
      content: {
        text: 'Open Angular documentation',
        href: 'https://angular.dev',
        target: '_blank',
      },
    },
  },
};

export const ImageMessage: Story = {
  args: {
    message: {
      id: '8',
      type: 'image',
      timestamp: new Date(),
      isUser: false,
      content: {
        imageUrl: 'https://picsum.photos/600/400',
        alt: 'Generated AI image',
      },
    },
  },
};

export const MixedMessage: Story = {
  args: {
    message: {
      id: '9',
      type: 'mixed',
      timestamp: new Date(),
      isUser: false,
      content: {
        text: 'Here is the generated image based on your request.',
        imageUrl: 'https://picsum.photos/600/400',
      },
    },
  },
};

export const ChatGPTMessage: Story = {
  args: {
    showActions: true,

    message: {
      id: '10',
      type: 'text',
      timestamp: new Date(),
      isUser: false,
      content: {
        text: `
You can migrate your Angular application to Signals gradually.
A common approach is starting with local component state before
moving shared services.
        `,
      },
    },
  },
};

export const TemplateMessage: Story = {
  render: () => ({
    template: `
      <ng-template #customTemplate>
        <div
          style="
            padding:16px;
            border-radius:12px;
            background:#f5f5f5;
            display:flex;
            flex-direction:column;
            gap:8px;
          "
        >
          <strong>Custom Template Content</strong>

          <span>
            This content is rendered using
            an Angular TemplateRef.
          </span>

          <button
            style="
              width:fit-content;
              padding:8px 12px;
              border:none;
              border-radius:8px;
              cursor:pointer;
            "
          >
            Action
          </button>
        </div>
      </ng-template>

      <bmb-ai-chat-bubble
        [message]="{
          id: '11',
          type: 'template',
          timestamp: timestamp,
          isUser: false,
          content: {
            template: customTemplate
          }
        }"
      />
    `,

    props: {
      timestamp: new Date(),
    },
  }),
};

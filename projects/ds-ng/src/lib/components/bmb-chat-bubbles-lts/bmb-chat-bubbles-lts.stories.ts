import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

import { RouterTestingModule } from '@angular/router/testing';

import { BmbChatBubblesLtsComponent } from './bmb-chat-bubbles-lts.component';

export default {
  title: 'Components/Containers/AI Chat Bubble LTS',
  component: BmbChatBubblesLtsComponent,
  decorators: [
    moduleMetadata({
      imports: [RouterTestingModule],
    }),
  ],
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

  argTypes: {
    botIcon: {
      control: 'text',
      description: 'Bot icon token used for assistant messages.',
      table: {
        category: 'Inputs',
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
        category: 'Inputs',
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

Supported message types:
- text
- image
- mixed
- link
- options
- template
      `,
      table: {
        category: 'Inputs',
        type: {
          summary: 'BmbChatMessage',
        },
      },
    },

    isThinking: {
      control: 'boolean',
      description: 'Displays typing/loading animation state.',
      table: {
        category: 'Inputs',
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
        category: 'Inputs',
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'true',
        },
      },
    },

    action: {
      action: 'actionTriggered',
      description: `
Emits whenever a chat action is triggered.

Example payload:

{
  action: 'copy',
  messageId: '1',
  message,
  nativeEvent
}
      `,
      table: {
        category: 'Outputs',
        type: {
          summary: 'BmbChatActionEvent',
        },
      },
    },
  },

  parameters: {
    docs: {
      description: {
        component: `
AI chat bubble component used to render user and assistant messages.

Supports:
- text messages
- images
- links
- selectable options
- custom templates
- thinking/loading states
- action interactions
        `,
      },
      controls: {
        exclude: [
          // internal logic
          'bubbleClasses',
          'enableFeedback',
          'loading',
          'onAction',
        ],
      },
    },
  },
} as Meta<BmbChatBubblesLtsComponent>;

type Story = StoryObj<BmbChatBubblesLtsComponent>;

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

      <bmb-chat-bubbles-lts
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

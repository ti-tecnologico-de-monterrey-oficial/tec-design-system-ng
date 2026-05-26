import { Component, input } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '../../utils/doc/utils';
import { CommonModule } from '@angular/common';
import { BmbTopBarComponent } from '../../components/bmb-top-bar/bmb-top-bar.component';
import { BmbSidebarComponent } from '../../components/bmb-sidebar/bmb-sidebar.component';
import { BmbHomeCardChatComponent } from '../../components/bmb-home-card-chat/bmb-home-card-chat.component';
import { IBmbChatActionEvent, IBmbChatMessage } from '../../types';

const CHAT_BEHAVIOR_DOC = `
### 💡 Dynamic Message Behavior

The chat bubble behavior is now dynamically resolved based on each message.

- **gptIcons**: Automatically enabled for bot messages.
- **gptBot**: Applied only when the message is not from the user.
- **isThinking**: Applied only to the last bot message when loading state is active.

This ensures a more realistic chat experience without requiring manual configuration.

#### Example behavior:
- User message → no icons
- Bot message → shows actions (like, copy, etc.)
- Last bot message while loading → shows thinking animation
`;

const HTMLtemplate: string = `<div class="bmb_template-single-home-card">
<bmb-top-bar
  [userInformation]="{
    name: 'Santiago Hernández',
    image: 'https://picsum.photos/id/64/200/300',
    role: 'Alumno'
  }"
  [mitec]="true"
  [appName]="'TecTest'"
  [appSubTitle]="'Sub title'"
  [lang]="'es'"
/>
<main class="bmb_template-single-home-card-main">
  <bmb-home-card-chat
    [leftIcon]="args().leftIcon"
    [bgIconAppearance]="args().bgIconAppearance"
    [componentTitle]="args().componentTitle"
    [subtitle]="args().subtitle"
    [placeholder]="args().placeholder"
    [messagesHistory]="args().messages"
    [botList]="args().botList"
    [isMobile]="args().isMobile"
    [testId]="args().testId"
    [mode]="args().mode"
    [currentBot]="args().currentBot"
    [isLoading]="args().isLoading"
    (getBubbleAction)="args().getBubbleAction?.($event)"
    (getSendMessage)="args().getSendMessage?.($event)"
    (getClose)="args().getClose?.()"
    (getBack)="args().getBack?.()"
    (getExpand)="args().getExpand?.($event)"
    (getNewChat)="args().getNewChat?.($event)"
  >
  </bmb-home-card-chat>
  </main>
</div>
<bmb-sidebar
  [elements]="[
    [
      {
        id: 2,
        icon: 'task',
        title: 'Agregar firmantes',
        link: 'https://www.youtube.com/watch?v=beh56CrNRsQ'
      }
    ]
  ]"
  [componentTitle]="'Navegacion para mobiles'"
    />`;
@Component({
  standalone: true,
  imports: [
    BmbTopBarComponent,
    BmbSidebarComponent,
    BmbHomeCardChatComponent,
    CommonModule,
  ],
  selector: 'storybook-modal-wrapper',
  template: HTMLtemplate,
})
class StorybookModalWrapperComponent {
  args = input<any>();
}

export default {
  title: 'Components/Containers/AI Chat card',
  component: BmbTopBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        StorybookModalWrapperComponent,
        BmbTopBarComponent,
        BmbHomeCardChatComponent,
      ],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [
          'alertButtonClick',
          'backToHomeClick',
          'helpButtonClick',
          'roleButtonClick',
          'searchButtonClick',
          'userProfileClick',
          'alertNotification',
          'appName',
          'appPowered',
          'appSubTitle',
          'image',
          'imageDefault',
          'imageMitecDefault',
          'lang',
          'mobileImage',
          'mobileImageDefault',
          'mobileImageMitecDefault',
          'showAnimation',
          'userInformation',
          'allowSidebarForMobile',
          'mitec',
          'showHelpButton',
          'showRoleButton',
          'showSearchButton',
          'getNoMobileResolutionSize',
          'handleAlertClick',
          'handleBackToHome',
          'handleHelpButtonClick',
          'handleRoleChange',
          'handleSearchChange',
          'handleUserClick',
          'ngOnInit',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`Below you will find an example of the instructions for building the **AI Chat card**.`)}
${CHAT_BEHAVIOR_DOC}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    `When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.
`,
    { title: RELEVANT_TITLE.warning, blockquoteType: BlockquoteType.important },
  )}`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock(
  `
  BmbTopBarComponent,
  BmbSidebarComponent,
  BmbHomeCardChatComponent
  `,
  '',
  ` // ===== STATE =====
  mode: 'compact' | 'chat' | 'expanded' = 'compact';

  currentBot: IBotType = {
    name: 'TecBot',
    icon: 'bot_tecStandar',
  };

  isLoading = false;

  // ===== CONTENT =====
  componentTitle = 'Asistente TECbot';
  subtitle = 'Asistente TECbot';
  placeholder = 'Escribe un mensaje...';

  // ===== APPEARANCE =====
  leftIcon = 'chevron_left';
  bgIconAppearance = 'gray-charade-500';
  isMobile = false;
  testId = 'chat-bubble';

  // ===== DATA =====
  botList: IBotType[] = [
    {
      name: 'TecBot',
      icon: 'bot_tecStandar',
    },
    {
      name: 'SupportBot',
      icon: 'support_agent',
    },
  ];

  messages: IBmbChatMessage[] = [
    {
      id: '1',
      type: 'text',
      content: { text: 'Hola, ¿cómo estás?' },
      isUserMessage: false,
      time: new Date(),
    },
    {
      id: '2',
      type: 'text',
      content: { text: 'Hola, quiero ayuda' },
      isUserMessage: true,
      userProfile: 'https://i.pravatar.cc/150?img=3',
      time: new Date(),
    },
    {
      id: '3',
      type: 'mixed',
      content: {
        text: 'Mira esta imagen 👇',
        imageUrl: 'https://picsum.photos/300/200',
      },
      isUserMessage: false,
      time: new Date(),
    },
    {
      id: '4',
      type: 'link',
      content: {
        text: 'Ir a Google',
        link: 'https://www.google.com',
      },
      isUserMessage: false,
      time: new Date(),
    },
    {
      id: '5',
      type: 'options',
      content: {
        text: '¿Qué quieres hacer?',
        options: [
          {
            title: 'Ver calendario',
            link: 'calendar',
            onButton: () => console.log('📅 Calendar clicked'),
          },
          {
            title: 'Ir a inicio',
            link: 'home',
          },
        ],
      },
      isUserMessage: false,
      time: new Date(),
    },
  ];

  // ===== EVENTS =====
  handleBubbleAction(event: IBmbChatActionEvent) {
    console.log('🔥 Bubble Action:', event);
  }

  handleSendMessage(message: string) {
    console.log('📩 Message sent:', message);
  }

  handleClose() {
    console.log('❌ Chat closed');
  }

  handleBack() {
    console.log('⬅️ Back clicked');
  }

  handleExpand() {
    console.log('🔍 Expanded');
  }

  handleNewChat() {
    console.log('🆕 New chat started');
  };`,
)}
\`\`\`html
${HTMLtemplate}
\`\`\`typescript
`,
      },
    },
  },
  argTypes: {
    // ===== STATE =====
    mode: {
      control: { type: 'select' },
      options: ['compact', 'chat', 'expanded'],
      description: `
Controls how the chat is rendered.

- **compact**: Shows only the floating bot icon
- **chat**: Opens the chat inside a modal
- **expanded**: Renders the chat inline
    `,
      table: {
        category: 'State',
        type: { summary: `'compact' | 'chat' | 'expanded'` },
        defaultValue: { summary: 'chat' },
      },
    },

    currentBot: {
      control: { type: 'object' },
      description: `
Sets the active bot for the chat.

This is a **model signal**, so it can be used as:
- \`[(currentBot)]="currentBot"\`
- \`(currentBotChange)="handleCurrentBotChange($event)"\`
    `,
      table: {
        category: 'State',
        type: { summary: 'IBotType' },
        defaultValue: {
          summary: `{ name: 'TecBot', icon: 'bot_tecStandar' }`,
        },
      },
    },

    isLoading: {
      control: 'boolean',
      description: `
Controls the loading state of the chat.

When enabled, the last bot message will display a "thinking" animation.
    `,
      table: {
        category: 'State',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // ===== CONTENT =====
    componentTitle: {
      control: 'text',
      description: `Main title displayed in the chat header.`,
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },

    subtitle: {
      control: 'text',
      description: `Secondary text displayed below the title.`,
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },

    placeholder: {
      control: 'text',
      description: `Placeholder text shown in the chat input field.`,
      table: {
        category: 'Content',
        type: { summary: 'string' },
      },
    },

    // ===== DATA =====
    messages: {
      control: 'object',
      description: `
Defines the chat conversation.

Each item represents a message and determines how it is rendered:

- **text** → simple message
- **mixed** → text + image
- **link** → clickable link
- **options** → button list
- **template** → custom content
  `,
      table: {
        category: 'Data',
        type: {
          summary: 'IBmbChatMessage[]',
          detail: `
import { IBmbChatMessage } from '../../types';

type IBmbChatMessage = {
  id: string;
  userProfile?: string;
  isUserMessage: boolean;
  type: 'text' | 'mixed' | 'image' | 'link' | 'options' | 'template';
  content: {
    text?: string;
    imageUrl?: string;
    link?: string;
    options?: {
      title: string;
      target?: string;
      link?: string;
      onButton?: () => void;
    }[];
    template?: TemplateRef<any>;
  };
  time: Date;
};
      `,
        },
      },
    },

    botList: {
      control: 'object',
      description: `
List of available bots that can be selected in the chat.
    `,
      table: {
        category: 'Data',
        type: {
          summary: 'IBotType[]',
          detail: `
import { IBotType } from '../../components/bmb-chat-bar/types';

type IBotType = {
  name: string;
  icon: string;
};
    `,
        },
      },
    },

    // ===== APPEARANCE =====
    leftIcon: {
      control: 'text',
      description: `Icon displayed on the left side of the header.`,
      table: {
        category: 'Appearance',
        type: { summary: 'string' },
      },
    },

    bgIconAppearance: {
      control: 'text',
      description: `Background color token used for the bot icon.`,
      table: {
        category: 'Appearance',
        type: { summary: 'IBmbColor' },
      },
    },

    isMobile: {
      control: 'boolean',
      description: `Forces mobile layout behavior.`,
      table: {
        category: 'Layout',
        type: { summary: 'boolean' },
      },
    },

    testId: {
      control: 'text',
      description: `Base test id used for automation and testing selectors.`,
      table: {
        category: 'Testing',
        type: { summary: 'string' },
      },
    },

    // ===== EVENTS =====
    getBubbleAction: {
      action: 'bubbleAction',
      control: false,
      description: `
Emitted when a user interacts with a message action (copy, like, etc).

### Example usage:
\`\`\`ts
handleBubbleAction(event) {
  if (event.action === 'copy') {
    navigator.clipboard.writeText(event.message.content.text);
  }

  if (event.action === 'like') {
    console.log('Liked message:', event.messageId);
  }
}
\`\`\`
  `,
      table: {
        category: 'Events',
        type: {
          summary: 'IBmbChatActionEvent',
          detail: `
{
  action: 'copy' | 'like' | 'dislike' | 'repeat' | 'voice',
  messageId: string,
  message: IBmbChatMessage,
  event?: Event
}
      `,
        },
      },
    },

    getClose: {
      action: 'close',
      control: false,
      description: `
Triggered when the chat is closed.

### Example:
\`\`\`ts
handleClose() {
  console.log('Chat closed');
}
\`\`\`
  `,
      table: {
        category: 'Events',
        type: {
          summary: '() => void',
        },
      },
    },

    getBack: {
      action: 'back',
      control: false,
      description: `
Triggered when the back button is pressed.

### Example:
\`\`\`ts
handleBack() {
  console.log('Back clicked');
}
\`\`\`
  `,
      table: {
        category: 'Events',
        type: {
          summary: '() => void',
        },
      },
    },
    getExpand: {
      action: 'expand',
      control: false,
      description: `
Triggered when switching to expanded mode.

### Example:
\`\`\`ts
handleExpand() {
  console.log('Expanded chat view');
}
\`\`\`
  `,
      table: {
        category: 'Events',
        type: {
          summary: '(event: Event) => void',
        },
      },
    },

    getNewChat: {
      action: 'newChat',
      control: false,
      description: `
Triggered when starting a new conversation.

### Example:
\`\`\`ts
handleNewChat() {
  console.log('New chat started');
}
\`\`\`
  `,
      table: {
        category: 'Events',
        type: {
          summary: '(value: boolean) => void',
        },
      },
    },
  },
  args: {
    // ===== STATE =====
    mode: 'compact',

    currentBot: {
      name: 'TecBot',
      icon: 'bot_tecStandar',
    },

    isLoading: false,

    // ===== CONTENT =====
    componentTitle: 'Asistente TECbot',
    subtitle: 'Asistente TECbot',
    placeholder: 'Escribe un mensaje...',

    // ===== APPEARANCE =====
    leftIcon: 'chevron_left',
    bgIconAppearance: 'gray-charade-500',
    isMobile: false,
    testId: 'chat-bubble',

    // ===== DATA =====
    botList: [
      {
        name: 'TecBot',
        icon: 'bot_tecStandar',
      },
    ],

    messages: [
      {
        id: '1',
        type: 'text',
        content: { text: 'Hola, ¿cómo estás?' },
        isUserMessage: false,
        time: new Date(),
      },
      {
        id: '2',
        type: 'text',
        content: { text: 'Hola, quiero ayuda' },
        isUserMessage: true,
        time: new Date(),
      },
      {
        id: '3',
        type: 'text',
        content: { text: 'Claro, dime en qué puedo ayudarte' },
        isUserMessage: false,
        time: new Date(),
      },
    ],

    // ===== EVENTS =====
    getBubbleAction: (event: IBmbChatActionEvent) => {
      console.log('🔥 Bubble Action:', event);
    },

    getSendMessage: (message: string) => {
      console.log('📩 Send Message:', message);
    },

    getClose: () => {
      console.log('❌ Chat Closed');
    },

    getBack: () => {
      console.log('⬅️ Back Clicked');
    },

    getExpand: (event?: Event) => {
      console.log('🔍 Expand Clicked:', event);
    },

    getNewChat: (value: boolean) => {
      console.log('🆕 New Chat Triggered:', value);
    },
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return {
    props: { args },
    template: `<storybook-modal-wrapper [args]="args" />`,
  };
};

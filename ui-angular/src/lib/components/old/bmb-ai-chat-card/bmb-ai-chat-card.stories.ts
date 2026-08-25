/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, input } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralDescription,
  getSpecialSpecifications,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import { CommonModule } from '@angular/common';
import { BmbTopBarComponent } from '../bmb-top-bar/bmb-top-bar.component';
import { BmbSidebarComponent } from '../bmb-sidebar/bmb-sidebar.component';
import { BmbAIChatCardComponent } from './bmb-ai-chat-card.component';
import { BmbAiChatBubbleComponent } from '../bmb-ai-chat-bubble/bmb-ai-chat-bubble.component';

const HTMLtemplate = `<div class="bmb_template-single-home-card">
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
  <bmb-ai-chat-card
    [bgIconAppearance]="args().bgIconAppearance"
    [componentTitle]="args().componentTitle"
    [subtitle]="args().subtitle"
    [placeholder]="args().placeholder"
    [isMobile]="args().isMobile"
    [testId]="args().testId"
    [mode]="args().mode"
    [currentBot]="args().currentBot"
    [isLoading]="args().isLoading"
    [headerActions]="headerActions"
    (getSendMessage)="args().getSendMessage?.($event)"
    (getClose)="args().getClose?.()"
    (getBack)="args().getBack?.()"
    (getExpanded)="args().getExpanded?.($event)"
  >
    <bmb-ai-chat-bubble
      [botIcon]="'bot_tecStandar'"
      [testId]="'chat-bubble'"
      [message]="{
        id: '5', type: 'options', timestamp: '2026-08-25T01:28:13.313Z',
        isUser: false,
        content: {text: 'Choose one option:',
        options: [{id: '1', label: 'Option for conversational text-based prompts 1'}, {id: '2', label: 'Option for conversational text-based prompts 2'}, {id: '3', label: 'Option for conversational text-based prompts 3'}, {id: '4', label: 'Option for conversational text-based prompts 4'}, {id: '5', label: 'Option for conversational text-based prompts 5'}]}}"
        [isThinking]="false"
        [showActions]="true"
        (getAction)="getAction($event)"
        (getOptionClicked)="getOptionClicked($event)"
    />

    <bmb-ai-chat-bubble
      [botIcon]="'bot_tecStandar'"
      [testId]="'chat-bubble'"
      [message]="{
        id: '2',
        type: 'text',
        timestamp: '2026-08-25T01:25:05.172Z',
        isUser: true,
        userProfile: 'https://picsum.photos/id/64/200/300',
        content: {text: 'I need help with Angular signals.'},
      }"
      [isThinking]="false"
      [showActions]="false"
      (getAction)="getAction($event)"
      (getOptionClicked)="getOptionClicked($event)"
    />
  </bmb-ai-chat-card>
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
    BmbAIChatCardComponent,
    CommonModule,
    BmbAiChatBubbleComponent,
  ],
  selector: 'storybook-modal-wrapper',
  template: HTMLtemplate,
})
class StorybookModalWrapperComponent {
  args = input<any>();
  headerActions = [
    {
      icon: 'language_spanish',
      iconActiveToggle: 'language_us',
      isAccentColor: false,
      tooltipText: 'Language',
      action: () => {
        console.info('Language');
      },
    },
    {
      icon: 'info',
      tooltipText: 'Info',
      action: () => {
        console.info('Info');
      },
    },
    {
      icon: 'new_window',
      tooltipText: 'New chat',
      action: () => {
        console.info('New chat');
      },
    },
  ];
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
        BmbAIChatCardComponent,
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
          'getLogoClick',
          'getLogoLink',
          'getLogoTarget',
          'handleLogoClick',
        ],
      },
      description: {
        component: `
${getGeneralDescription(`Below you will find an example of the instructions for building the **AI Chat card**.`)}
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
  BmbAIChatCardComponent,
  BmbAiChatBubbleComponent,
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
  bgIconAppearance = 'gray-charade-500';
  isMobile = false;
  testId = 'ai-chat-bubble';
  headerActions = [
    {
      icon: 'language_spanish',
      iconActiveToggle: 'language_us',
      isAccentColor: false,
      tooltipText: 'Language',
      action: () => {
        console.info('Language');
      },
    },
    {
      icon: 'info',
      tooltipText: 'Info',
      action: () => {
        console.info('Info');
      },
    },
    {
      icon: 'new_window',
      tooltipText: 'New chat',
      action: () => {
        console.info('New chat');
      },
    },
  ];

  // ===== EVENTS =====
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
        category: 'Properties',
        type: { summary: `'compact' | 'chat' | 'expanded'` },
        defaultValue: { summary: 'expanded' },
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
        category: 'Properties',
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
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },

    // ===== CONTENT =====
    componentTitle: {
      control: 'text',
      description: `Main title displayed in the chat header.`,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },

    subtitle: {
      control: 'text',
      description: `Secondary text displayed below the title.`,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },

    placeholder: {
      control: 'text',
      description: `Placeholder text shown in the chat input field.`,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },

    bgIconAppearance: {
      control: 'text',
      description: `Background color token used for the bot icon.`,
      table: {
        category: 'Properties',
        type: { summary: 'IBmbColor' },
      },
    },

    isMobile: {
      control: 'boolean',
      description: `Forces mobile layout behavior.`,
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
      },
    },

    testId: {
      control: 'text',
      description: `Base test id used for automation and testing selectors.`,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    getSendMessage: {
      control: false,
      description:
        'Emmit when the user send a message or a bot has a new response',
      table: {
        category: 'Events',
        type: {
          summary: '(message) => void',
        },
      },
    },
    getClose: {
      action: 'close',
      control: false,
      description: `
Triggered when the chat is closed.

Example:
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

Example:
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
    getExpanded: {
      action: 'expand',
      control: false,
      description: `
Triggered when switching to expanded mode.

Example:
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
  },
  args: {
    mode: 'compact',

    currentBot: {
      name: 'TecBot',
      icon: 'bot_tecStandar',
    },

    isLoading: false,

    componentTitle: 'Asistente TECbot',
    subtitle: 'Asistente TECbot',
    placeholder: 'Escribe un mensaje...',

    bgIconAppearance: 'gray-charade-500',
    isMobile: false,
    testId: 'ai-chat-bubble',

    getSendMessage: (message: string) => {
      console.log('📩 Send Message:', message);
    },

    getClose: () => {
      console.log('❌ Chat Closed');
    },

    getBack: () => {
      console.log('⬅️ Back Clicked');
    },

    getExpanded: (event?: boolean) => {
      console.log('🔍 Expanded:', event);
    },
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return {
    props: { args },
    template: `<storybook-modal-wrapper [args]="args" />`,
  };
};

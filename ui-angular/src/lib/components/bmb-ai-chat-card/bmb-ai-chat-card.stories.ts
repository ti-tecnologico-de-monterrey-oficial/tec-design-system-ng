/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Meta,
  StoryObj,
  componentWrapperDecorator,
  moduleMetadata,
} from '@storybook/angular';
import {
  attributes,
  BlockquoteType,
  getAlertBlockquote,
  getBasicExampleBlock,
  getGeneralComponentDescription,
  getGeneralDescription,
  getSpecialSpecifications,
  getTechnicalDocReferences,
  RELEVANT_TITLE,
} from '@docs/utils/utils';
import { BmbTopBarComponent } from '../bmb-top-bar/bmb-top-bar.component';
import { BmbSidebarComponent } from '../bmb-sidebar/bmb-sidebar.component';
import {
  BMB_AI_CHAT_CARD_MODE_LIST,
  BmbAIChatCardComponent,
} from './bmb-ai-chat-card.component';
import { BmbAiChatBubbleComponent } from '../bmb-ai-chat-bubble/bmb-ai-chat-bubble.component';
import { BmbChatBarComponent } from '../bmb-chat-bar/bmb-chat-bar.component';
import {
  DBmbGenericParamDesc,
  DBmbHomeCardHeaderParamDesc,
  getAppearanceParam,
} from '@docs/utils/parameterDescriptions';
import * as homeCardHeaderStory from '../bmb-home-card/bmb-home-card-header/bmb-home-card-header.stories';
import * as aiChatBubbleStory from '../bmb-ai-chat-bubble/bmb-ai-chat-bubble.stories';
import * as aiChatBarStory from '../bmb-chat-bar/bmb-chat-bar.stories';

export default {
  title: 'Components/Containers/AI Chat card',
  component: BmbAIChatCardComponent,
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div class="bmb_template-single-home-card">
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
<div style="height: 500px;">
        ${story}
      </div>
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
    }),
    moduleMetadata({
      imports: [
        BmbTopBarComponent,
        BmbSidebarComponent,
        BmbAiChatBubbleComponent,
        BmbChatBarComponent,
      ],
    }),
  ],
  parameters: {
    docs: {
      controls: {
        exclude: [''],
      },
      description: {
        component: `
${getGeneralDescription(
  `
  ${getGeneralComponentDescription({
    name: 'ai-chat-card',
    alternativeDescription: ' ',
  })} to facilitate interaction between people and an artificial intelligence assistant within a contained and focused interface.`,
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/components/ai-chat-card/descripcion-general-lk9eaYRQ',
  },
)}
${getSpecialSpecifications(
  `${getAlertBlockquote(
    `When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.
`,
    { title: RELEVANT_TITLE.warning, blockquoteType: BlockquoteType.important },
  )}${getTechnicalDocReferences({
    references: [
      { title: homeCardHeaderStory.default.title! },
      { title: aiChatBubbleStory.default.title! },
      { title: aiChatBarStory.default.title! },
    ],
  })}`,
  { showAdditionalBlockquote: true },
)}
${getBasicExampleBlock(
  `BmbAIChatCardComponent,
  BmbAiChatBubbleComponent,
  BmbChatBarComponent
  `,
)}
`,
      },
    },
  },
  argTypes: {
    mode: getAppearanceParam('mode', BMB_AI_CHAT_CARD_MODE_LIST, 'expanded'),
    bgIconAppearance: DBmbHomeCardHeaderParamDesc.bgIconAppearance,
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
    testId: {
      control: 'text',
      description: `Base test id used for automation and testing selectors.`,
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
    },
    headerActions: DBmbGenericParamDesc.actionHeaders,
  },
  args: {
    mode: 'compact',
    bgIconAppearance: 'gray-charade-500',
    headerActions: [
      {
        icon: 'chat_add_on',
        tooltipText: 'New chat',
        action: () => {
          console.info('New chat');
        },
      },
    ],
  },
} as Meta<typeof BmbAIChatCardComponent>;

type Story = StoryObj<BmbAIChatCardComponent>;

export const Default: Story = {
  render: (args) => ({
    template: `
<bmb-ai-chat-card
  ${attributes(args)}
>

  <bmb-ai-chat-bubble
    [botIcon]="'bot_tecStandar'"
    [testId]="'chat-bubble'"
    [message]="{
      id: '2',
      type: 'text',
      timestamp: '2026-08-25T22:47:25.997Z',
      isUser: true,
      userProfile: 'https://picsum.photos/id/64/200/300',
      content: {text: 'I need help with Angular signals.'}
    }" [isThinking]="false"
    [showActions]="true"
    [userActions]="['copy']"
    (getAction)="getAction($event)"
    (getOptionClicked)="getOptionClicked($event)"
  />
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
      timestamp: '2026-08-25T22:47:25.997Z',
      isUser: true,
      userProfile: 'https://picsum.photos/id/64/200/300',
      content: {text: 'I need help with Angular signals.'}
    }" [isThinking]="false"
    [showActions]="true"
    [userActions]="['copy']"
    (getAction)="getAction($event)"
    (getOptionClicked)="getOptionClicked($event)"
  />
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

  <bmb-chat-bar
    [placeholder]="'Custom placeholder'"
    [botList]="[
      {name: 'TecBot', label: 'Tecbot Standard', icon: 'bot_tecStandar'},
      {name: 'ChatGPT', label: 'ChatGPT', icon: 'bot_chatGPT'},
      {name: 'TecGPT', label: 'TecGPT', icon: 'bot_tecGPT'},
      {name: 'Comment', label: 'Comment', icon: 'comment'},
      {name: 'New', label: 'New', icon: 'new'},
      {name: 'BotSchool', label: 'Tecbot school', icon: 'bot_tecSchool'},
      {name: 'BotTech', label: 'Tecbot tech', icon: 'bot_tecTech'},
      {name: 'BotSport', label: 'Tecbot sport', icon: 'bot_tecSport'},
      {name: 'BotPhone', label: 'Tecbot phone', icon: 'bot_tecPhone'},
      {name: 'BotMedic', label: 'Tecbot healt', icon: 'bot_health'},
      {name: 'BotScience', label: 'Tecbot science', icon: 'bot_tecScience'},
      {name: 'Empty', label: 'Empty', icon: 'empty'},
      {name: 'Anthropic', label: 'Anthropic', icon: 'anthropic'},
      {name: 'Meta', label: 'Meta', icon: 'meta'},
      {name: 'Xai', label: 'Xai', icon: 'xai'},
      {name: 'Google', label: 'Google', icon: 'google'}
    ]"
    [actionsList]="[]"
    [showEmoji]="false"
    [emojiIcon]="'mood'"
    [enableMicInput]="true"
    [currentBot]="{name: 'TecBot', icon: 'bot_tecStandar'}"
    [isLoading]="false"
  />

</bmb-ai-chat-card>

    `,
  }),
};

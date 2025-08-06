import { Meta, StoryObj } from '@storybook/angular';
import { BmbChatBarComponent } from './bmb-chat-bar.component';
import {
  getBasicExampleBlock,
  getGeneralDescription,
} from '../../utils/doc/utils';
import { DBmbInputParamDesc } from '../../utils/doc/parameterDescriptions';

const importComments = `// optional you can customize the bot list from:
// import { defaultBotList, IBotType } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
`;

export default {
  title: 'Components/Inputs/AI Chat bar',
  component: BmbChatBarComponent,
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  'This is an advanced tool designed to enhance the digital interaction experience powered by artificial intelligence.',
  'https://bamboo.tec.mx/latest/componentes/ai-chat-bar/descripcion-general-wixYrkmT',
)}
${getBasicExampleBlock('BmbChatBarComponent', importComments)}
        `,
      },
    },
    controls: {
      exclude: [
        'control',
        'dActionsList',
        'dBotList',
        'defaultPlaceholder',
        'files',
        'isDialogOpen',
        'onDragFiles',
        'openAddDialog',
        'showMicControls',
        'totalDots',
        'versionAddDialog',
        'windowHeight',
        'windowWidth',
        'close',
        'createImageThumbnail',
        'actionListPagination',
        'activeDot',
        'arrayThumbnail',
        'deleteFile',
        'handleAddDialog',
        'handleChangeBot',
        'handleDialog',
        'handleDotPress',
        'handleEmoji',
        'handleMic',
        'handlePaginate',
        'handleRecord',
        'handleSend',
        'handleStopMic',
        'onDragLeave',
        'onDragOver',
        'onDrop',
        'onFileSelect',
        'onResize',
        'autoResize',
        'handleKeyDown',
      ],
    },
  },
  argTypes: {
    placeholder: {
      ...DBmbInputParamDesc.placeholder,
      table: {
        ...DBmbInputParamDesc.placeholder.table,
        defaultValue: { summary: '¿Qué deseas encontrar hoy?' },
      },
    },
    botList: {
      control: { type: 'object' },
      description:
        'Sets the list of bot images for the bot configuration to show.',
      table: {
        category: 'Properties',
        type: { summary: 'IBotType[]' },
        defaultValue: { summary: 'defaultBotList<IBotType[]>' },
      },
    },
    actionsList: {
      control: { type: 'object' },
      description: `
Sets the action list.
Optionally you can customize the action list input. By default, the "Upload File Action" is enable in the component
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBotActions[]' },
        defaultValue: { summary: 'defaultActionList<IActions[]>' },
      },
    },
    currentBot: {
      control: { type: 'object' },
      description: `
Set the current bot to chat.

This is a model signal, so it is possible to use it as:
- [(currentBot)]="currentBot"
- (currentBotChange)="handleCurrentBotChange()
      `,
      table: {
        category: 'Properties',
        type: { summary: 'IBotType' },
        defaultValue: { summary: 'IBotType' },
      },
    },
    showEmoji: {
      control: { type: 'boolean' },
      description: 'Sets if the Emoji Button will be shown in the component.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    isLoading: {
      control: { type: 'boolean' },
      description: `
Sets loading state, put a loader icon and disable the send button.

This is a model signal, so it is possible to use it as:
- [(isLoading)]="isLoading"
- (isLoadingChange)="handleIsLoadingChange()
      `,
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onSendMessage: {
      control: null,
      description: 'Emits the send event, export the output value.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onSendFiles: {
      control: null,
      description: 'Emits the send event, export the files output.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onRecord: {
      control: null,
      description:
        'Emits the Record event, returns a true value when the user clicks the button of the microphone and returns a false value when the pause icon is clicked.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onEmoji: {
      control: null,
      description:
        'Emits the Emoji event, emits true value when the user clicks the button of the emoji.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    placeholder: 'Custom placeholder',
    isLoading: false,
    botList: [
      {
        name: 'TecBot',
        icon: '/assets/images/bot-icons/bot_tecStandar.svg',
      },
      {
        name: 'ChatGPT',
        icon: '/assets/images/bot-icons/bot_tecGPT.svg',
      },
      {
        name: 'Comment',
        icon: '/assets/images/bot-icons/comment.svg',
      },
      {
        name: 'New',
        icon: '/assets/images/bot-icons/new.svg',
      },
      {
        name: 'BotSchool',
        icon: '/assets/images/bot-icons/bot_tecSchool.svg',
      },
      {
        name: 'BotTech',
        icon: '/assets/images/bot-icons/bot_tecTech.svg',
      },
      {
        name: 'BotSport',
        icon: '/assets/images/bot-icons/bot_tecSport.svg',
      },
      {
        name: 'BotPhone',
        icon: '/assets/images/bot-icons/bot_tecPhone.svg',
      },
      {
        name: 'BotMedic',
        icon: '/assets/images/bot-icons/bot_health.svg',
      },
      {
        name: 'BotScience',
        icon: '/assets/images/bot-icons/bot_tecScience.svg',
      },
      {
        name: 'Backup',
        icon: '/assets/images/bot-icons/backup.svg',
      },
    ],
    currentBot: {
      name: 'TecBot',
      icon: '/assets/images/bot-icons/bot_tecStandar.svg',
    },
    showEmoji: false,
  },
} as Meta<typeof BmbChatBarComponent>;

type Story = StoryObj<BmbChatBarComponent>;

export const Default: Story = {};

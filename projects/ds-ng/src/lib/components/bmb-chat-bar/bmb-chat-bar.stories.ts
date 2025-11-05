import { componentWrapperDecorator, Meta, StoryObj } from '@storybook/angular';
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
  decorators: [
    componentWrapperDecorator((story: string) => {
      return `<div class="bmb_margin-xxl" style="marging-top: height: 14rem;">
        ${story}
      </div>`;
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `
${getGeneralDescription(
  'This is an advanced tool designed to enhance the digital interaction experience powered by artificial intelligence.',
  {
    generalDocLink:
      'https://bamboo.tec.mx/latest/componentes/ai-chat-bar/descripcion-general-wixYrkmT',
  },
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
        'botChunks',
        'modalID',
        'handleClickOutside',
        'handleMobileChangeBot',
        'chatBarTemplate',
        'mobileBotSelectorTemplate',
        'textareaRef',
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
    enableMicInput: {
      control: { type: 'boolean' },
      description: 'Enables the microphone input feature.',
      table: {
        category: 'Properties',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
  },
  args: {
    placeholder: 'Custom placeholder',
    isLoading: false,
    enableMicInput: false,
    actionsList: [
      {
        name: 'Adjuntar Archivo',
        icon: 'upload_file',
        action: () => {
          const input = document.getElementById(
            'inputFile',
          ) as HTMLInputElement;
          input?.click();
        },
      },
    ],
    botList: [
      {
        name: 'TecBot',
        label: 'Tecbot Standard',
        icon: 'bot_tecStandar',
      },
      { name: 'ChatGPT', label: 'ChatGPT', icon: 'bot_chatGPT' },
      {
        name: 'TecGPT',
        label: 'TecGPT',
        icon: 'bot_tecGPT',
      },
      { name: 'Comment', label: 'Comment', icon: 'comment' },
      { name: 'New', label: 'New', icon: 'new' },
      { name: 'BotSchool', label: 'Tecbot school', icon: 'bot_tecSchool' },
      { name: 'BotTech', label: 'Tecbot tech', icon: 'bot_tecTech' },
      { name: 'BotSport', label: 'Tecbot sport', icon: 'bot_tecSport' },
      { name: 'BotPhone', label: 'Tecbot phone', icon: 'bot_tecPhone' },
      { name: 'BotMedic', label: 'Tecbot healt', icon: 'bot_health' },
      { name: 'BotScience', label: 'Tecbot science', icon: 'bot_tecScience' },
      { name: 'Empty', label: 'Empty', icon: 'empty' },
      { name: 'Anthropic', label: 'Anthropic', icon: 'anthropic' },
      { name: 'Meta', label: 'Meta', icon: 'meta' },
      { name: 'Xai', label: 'Xai', icon: 'xai' },
      { name: 'Google', label: 'Google', icon: 'google' },
    ],
    currentBot: { name: 'TecBot', icon: 'bot_tecStandar' },
    showEmoji: false,
  },
} as Meta<typeof BmbChatBarComponent>;

type Story = StoryObj<BmbChatBarComponent>;

export const Default: Story = {};

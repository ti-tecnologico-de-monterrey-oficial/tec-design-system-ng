import type { Meta, StoryObj } from '@storybook/angular';
import { BmbChatBarComponent } from './bmb-chat-bar.component';

export default {
  title: 'Micro Componentes/Chat bar',
  component: BmbChatBarComponent,
  parameters: {
    docs: {
      description: {
        component: `
Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { BmbChatBarComponent } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
// optional you can customize the bot list from:
// import { defaultBotList, IBotType } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';

@Component({
  selector: 'component',
  standalone: true,
  imports: [ BmbChatBarComponent ],
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
    placeholder: {
      name: 'Placeholder',
      control: { type: 'text' },
      description: 'Optionally you can customize the placeholder input.',
      table: {
        category: 'Properties',
        type: { summary: 'string' },
      },
      defaultValue: { summary: '¿Qué deseas encontrar hoy?' },
    },
    botList: {
      name: 'Bot list',
      control: { type: 'object' },
      description: 'Optionally you can customize the bot list.',
      table: {
        category: 'Properties',
        type: { summary: 'IBotType[]' },
      },
      defaultValue: { summary: 'defaultBotList<IBotType[]>' },
    },
    defaultBot: {
      name: 'Default bot',
      control: { type: 'object' },
      description: 'Set the default bot to chat.',
      table: {
        category: 'Properties',
        type: { summary: 'IBotType' },
      },
      defaultValue: { summary: 'IBotType' },
    },
    isLoading: {
      name: 'Is loading',
      control: { type: 'boolean' },
      description:
        'Sets loading state, put a loader icon and disable the send button.',
      table: {
        category: 'Properties',
        defaultValue: { summary: 'false' },
        type: { summary: 'boolean' },
      },
    },
    onSendMessage: {
      name: 'On send message',
      control: null,
      description: 'Emmit the send event, export the input value.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
    onBotChange: {
      name: 'On bot change',
      control: null,
      description: 'Emmit the selected bot object <IBotType>.',
      table: {
        category: 'Events',
        type: { summary: 'function' },
      },
    },
  },
  args: {
    placeholder: 'Custom placeholder',
    botList: [
      {
        name: 'TecGPT',
        icon: '/assets/images/bot-icons/bot.png',
      },
      {
        name: 'ChatGPT',
        icon: '/assets/images/bot-icons/chat_gpt.svg',
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
        icon: '/assets/images/bot-icons/bot_school.svg',
      },
      {
        name: 'BotTech',
        icon: '/assets/images/bot-icons/bot_tech.svg',
      },
      {
        name: 'BotSport',
        icon: '/assets/images/bot-icons/bot_sport.svg',
      },
      {
        name: 'BotPhone',
        icon: '/assets/images/bot-icons/bot_phone.svg',
      },
      {
        name: 'BotMedic',
        icon: '/assets/images/bot-icons/bot_medic.svg',
      },
      {
        name: 'BotScience',
        icon: '/assets/images/bot-icons/bot_science.svg',
      },
      {
        name: 'Backup',
        icon: '/assets/images/bot-icons/backup.svg',
      },
    ],
    defaultBot: {
      name: 'TecGPT',
      icon: '/assets/images/bot-icons/bot.png',
    },
    isLoading: false,
  },
} as Meta<typeof BmbChatBarComponent>;

type Story = StoryObj<BmbChatBarComponent>;

export const Default: Story = {};

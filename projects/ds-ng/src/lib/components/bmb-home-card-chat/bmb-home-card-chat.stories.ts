import { Component, Input } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {
  attributes,
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
import {
  BmbHomeCardChatComponent,
} from '../../components/bmb-home-card-chat/bmb-home-card-chat.component';
import { IBmbChatMessage } from '../../types';
import { IBotType, IChatBarActions } from '../../components/bmb-chat-bar/types';

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
          leftIcon="chevron_left"
          bgIconAppearance="gray-charade-500"
          componentTitle="Asistente TECbot"
          contentPadding="none"
          subtitle="Assitente TECbot"
          [messagesHistory]="messages"
          [actionsList]="actionList"
          [mode]="mode"
          [(currentBot)]="currentBot"
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
  @Input() mode = 'compact';

  @Input() currentBot: IBotType = {
    name: 'TecBot',
    icon: 'bot_tecStandar',
  };

  messages: IBmbChatMessage[] = [
    {
      type: 'text',
      content: { text: 'Hola, ¿cómo estás? En que puedo ayudarte' },
      isUserMessage: false,
      time: new Date('2025-02-19T14:31:00'),
    },
    {
      type: 'text',
      content: {
        text: 'Hola, me gustaria un pequeño resumen de la festividad del dia de la bandera en México',
      },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: true,
      time: new Date('2025-02-19T14:32:00'),
    },
    {
      type: 'text',
      content: {
        text: 'El Día de la Bandera en México se celebra el 24 de febrero de cada año. Esta fecha conmemora la adopción de la bandera actual en 1821, tras la independencia del país. Es un día para rendir homenaje a los símbolos patrios y a la historia de México, destacando la importancia de la unidad y el orgullo nacional. En este día se realizan ceremonias cívicas y militares en todo el país.',
      },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: false,
      time: new Date('2025-02-19T14:33:00'),
    },
    {
      type: 'text',
      content: { text: 'Gracias.' },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: true,
      time: new Date('2025-02-19T14:34:00'),
    },
  ];

  actionList: IChatBarActions[] = [
    {
      name: 'other (example)',
      icon: 'quiz',
      action: () => {},
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
        BmbHomeCardChatComponent,
      ],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
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
  BmbHomeCardChatComponent
  `,
  '',
  ` messages: IBmbChatMessage[] = [
    {
      type: 'text',
      content: { text: 'Hola, ¿cómo estás? En que puedo ayudarte' },
      isUserMessage: false,
      time: new Date('2025-02-19T14:31:00'),
    },
    {
      type: 'text',
      content: {
        text: 'Hola, me gustaria un pequeño resumen de la festividad del dia de la bandera en México',
      },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: true,
      time: new Date('2025-02-19T14:32:00'),
    },
    {
      type: 'text',
      content: {
        text: 'El Día de la Bandera en México se celebra el 24 de febrero de cada año. Esta fecha conmemora la adopción de la bandera actual en 1821, tras la independencia del país. Es un día para rendir homenaje a los símbolos patrios y a la historia de México, destacando la importancia de la unidad y el orgullo nacional. En este día se realizan ceremonias cívicas y militares en todo el país.',
      },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: false,
      time: new Date('2025-02-19T14:33:00'),
    },
    {
      type: 'text',
      content: { text: 'Gracias.' },
      userProfile: 'https://picsum.photos/id/64/200/301',
      isUserMessage: true,
      time: new Date('2025-02-19T14:34:00'),
    },
  ];

  actionList: IChatBarActions[] = [
    {
      name: 'other (example)',
      icon: 'quiz',
      action: () => {},
    },
  ];`,
)}
\`\`\`html
${HTMLtemplate}
\`\`\`typescript
`,
      },
    },
  },
  argTypes: {
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
  },
  args: {
    mode: 'compact',
    currentBot: {
      name: 'TecBot',
      icon: 'bot_tecStandar',
    },
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-modal-wrapper ${attributes(args)} />
    `,
  };
};

import { Component } from '@angular/core';
import { Meta, StoryFn, moduleMetadata } from '@storybook/angular';
import {
  BmbTopBarComponent,
  BmbSidebarComponent,
  BmbHomeCardChatComponent,
  IBmbChatMessage,
} from '../../public-api';
import { attributes, RELEVANT_TITLE } from '../utils/doc/utils';

@Component({
  standalone: true,
  imports: [BmbTopBarComponent, BmbSidebarComponent, BmbHomeCardChatComponent],
  selector: 'storybook-modal-wrapper',
  template: `
    <div class="bmb_template-single-home-card">
      <bmb-top-bar
        [userInformation]="{
          name: 'Santiago Hernández',
          image: 'https://picsum.photos/id/64/200/300',
          role: 'Alumno'
        }"
        [mitec]="true"
        [hasLogoutButton]="false"
        [appName]="'TecTest'"
        [appSubTitle]="'Sub title'"
        [showLang]="false"
        [lang]="'es'"
      />
      <main class="bmb_template-single-home-card-main">
        <bmb-home-card-chat
          leftIcon="chevron_left"
          icon="bot_tecStandar"
          bgIconAppearance="charade-500"
          title="Asistente TECbot"
          contentPadding="none"
          subtitle="Assitente TECbot"
          [messagesHistory]="messages"
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
      [title]="'Navegacion para mobiles'"
    ></bmb-sidebar>
  `,
})
class StorybookModalWrapperComponent {
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
}

export default {
  title: 'Deprecated/Home chat card',
  component: BmbTopBarComponent,
  decorators: [
    moduleMetadata({
      imports: [StorybookModalWrapperComponent, BmbTopBarComponent],
      providers: [],
    }),
  ],
  parameters: {
    docs: {
      description: {
        component: `${RELEVANT_TITLE.note}When you click on fullscreen icon, in Storybook doesn’t look the best due to the many elements, but in your project, it should display correctly.

Below is an example of how you can use this component in TypeScript:

\`\`\`typescript
import { MatDialog } from '@angular/material/dialog';
import { BmbModalComponent, ModalDataConfig } from '@ti-tecnologico-de-monterrey-oficial/ds-ng';
@Component({
  selector: 'component',
  standalone: true,
  imports: [],
  templateUrl: '
        <bmb-top-bar
            [userInformation]="{
            name: 'Santiago Hernández',
            image: 'https://picsum.photos/id/64/200/300',
            role: 'Alumno',
            }"
            [mitec]="true"
            [hasLogoutButton]="false"
            [appName]="'TecTest'"
            [appSubTitle]="'Sub title'"
            [showLang]="false"
            [lang]="'es'"
        />
        <main class="bmb_template-single-home-card-main">
            <bmb-home-card-chat
                leftIcon="chevron_left"
                icon="bot_tecStandar"
                bgIconAppearance="charade-500"
                title="Asistente TECbot"
                contentPadding="none"
                subtitle="Assitente TECbot"
                [messagesHistory]="messages"
            >
            </bmb-home-card-chat>
        </main>
        <bmb-sidebar
            [elements]="[
                [
                {
                    id: 2,
                    icon: 'task',
                    title: 'Agregar firmantes',
                    link: 'https://www.youtube.com/watch?v=beh56CrNRsQ',
                },
                ],
            ]"
            [title]="'Navegacion para mobiles'"
        ></bmb-sidebar>
  ',
  styleUrl: './component.scss',
})
export class Component {
}
\`\`\`

Below is an example of how you can use this component in HTML:
        `,
      },
    },
  },
} as Meta;

export const Default: StoryFn = (args) => {
  return {
    props: args,
    template: `
      <!-- Instruction to users: This component is used for internal Storybook logic and should not be copied -->
      <storybook-modal-wrapper ${attributes(args)}></storybook-modal-wrapper>
    `,
  };
};

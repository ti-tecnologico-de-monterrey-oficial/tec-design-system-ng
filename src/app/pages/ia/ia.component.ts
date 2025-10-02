import {
  ChangeDetectionStrategy,
  Component,
  model,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbChatBarComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbCardComponent,
  BmbCardContentComponent,
  IChatBarActions,
  IBmbChatMessage,
  BmbChatBubblesComponent,
} from '../../../../projects/ds-ng/src/public-api';
import { CommonModule } from '@angular/common';

interface ImessageList {
  iconBot: string;
  message: IBmbChatMessage;
  gptBot: boolean;
  gptIcons: boolean;
  isThinking: boolean;
}

@Component({
  selector: 'bmb-ia',
  standalone: true,
  imports: [
    BmbChatBarComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    CommonModule,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbChatBubblesComponent,
  ],
  templateUrl: './ia.component.html',
  styleUrl: './ia.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IaComponent {
  botList = [
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
  ];

  actionsList: IChatBarActions[] = [
    {
      name: 'Adjuntar archivo',
      icon: 'attach_file',
      action: () => {
        console.log('Adjuntar archivo');
      },
    },
  ];

  isLoading = model<boolean>(false);
  isThinking = signal<boolean>(false);

  messageList = signal<ImessageList[]>([]);

  placeholderMessage: IBmbChatMessage = {
    isUserMessage: false,
    type: 'text',
    content: { text: '' },
    time: new Date(),
  };

  botMessageTemplates: { text: ImessageList } = {
    text: {
      iconBot: '/assets/images/bot-icons/chat_gpt.svg',
      message: {
        isUserMessage: false,
        type: 'text',
        content: {
          text: 'Hola, soy ChatGPT. ¿En qué puedo ayudarte hoy?',
        },
        time: new Date(),
        userProfile: 'https://picsum.photos/id/64/200/300',
      },
      gptBot: true,
      gptIcons: true,
      isThinking: false,
    },
  };

  handleSendMessage(event: string) {
    console.log('Mensaje enviado:', event);

    this.buildChatBubble(event);
  }

  handleSendFiles(event: File[]) {
    console.log('Archivos enviados:', event);
    this.buildFileChatBubble(event);
  }

  handleRecord(event: boolean) {
    console.log('Grabando:', event);
    this.isLoading.set(false);
  }

  handleEmoji(event: boolean) {
    console.log('Emoji seleccionado:', event);
    this.isLoading.set(false);
  }

  buildFileChatBubble(files: File[]) {
    console.log(files);

    // this.messageList.update((messages) => [
    //   ...messages,
    //   {
    //     iconBot: '/assets/images/bot-icons/chat_gpt.svg',
    //     message: {
    //       isUserMessage: true,
    //       type: 'mixed',
    //       content: {
    //         text: event,
    //       },
    //       time: new Date(),
    //       userProfile: 'https://picsum.photos/id/64/200/300',
    //     },
    //     gptBot: true,
    //     gptIcons: false,
    //     isThinking: false,
    //   },
    // ]);
  }

  buildChatBubble(event: string) {
    this.isThinking.set(true);
    this.messageList.update((messages) => [
      ...messages,
      {
        iconBot: '/assets/images/bot-icons/chat_gpt.svg',
        message: {
          isUserMessage: true,
          type: 'text',
          content: {
            text: event,
          },
          time: new Date(),
          userProfile: 'https://picsum.photos/id/64/200/300',
        },
        gptBot: true,
        gptIcons: false,
        isThinking: false,
      },
    ]);

    setTimeout(() => {
      this.isLoading.set(false);
      this.isThinking.set(false);
      this.messageList.update((messages) => [
        ...messages,
        this.botMessageTemplates.text,
      ]);
    }, 2000);
  }
}

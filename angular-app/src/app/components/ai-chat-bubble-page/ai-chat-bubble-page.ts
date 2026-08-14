import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  BmbChatBubblesComponent,
  type IBmbChatActionEvent,
  type IBmbChatMessage,
} from 'ui-angular';

@Component({
  selector: 'app-ai-chat-bubble-page',
  imports: [BmbChatBubblesComponent],
  templateUrl: './ai-chat-bubble-page.html',
  styleUrl: './ai-chat-bubble-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatBubblePage {
  readonly userCopyEnabled = signal(true);
  readonly conversationEvent = signal('Sin interacciones');
  readonly conversation: IBmbChatMessage[] = [
    {
      id: 'assistant-welcome',
      isUserMessage: false,
      type: 'text',
      content: { text: '¡Hola! ¿En qué puedo ayudarte hoy?' },
      time: new Date(),
    },
    {
      id: 'user-short',
      isUserMessage: true,
      userProfile: 'assets/images/placeholders/user-icon-test.svg',
      type: 'text',
      content: { text: 'Explícame Angular Signals.' },
      time: new Date(),
    },
    {
      id: 'assistant-explanation',
      isUserMessage: false,
      type: 'text',
      content: {
        text: 'Los Signals son valores reactivos que notifican a Angular cuando cambian.',
      },
      time: new Date(),
    },
    {
      id: 'user-long',
      isUserMessage: true,
      userProfile: 'assets/images/placeholders/user-icon-test.svg',
      type: 'text',
      content: {
        text: '¿Puedes mostrarme un ejemplo más completo donde un signal almacene una lista y un computed obtenga el total de elementos?',
      },
      time: new Date(),
    },
  ];

  handleConversationAction(event: IBmbChatActionEvent): void {
    this.conversationEvent.set(`${event.action} · mensaje ${event.messageId}`);
  }
}

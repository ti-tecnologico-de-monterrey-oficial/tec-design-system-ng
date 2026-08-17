import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  BmbChatBubblesComponent,
  type IBmbChatActionEvent,
  type IBmbChatMessage,
} from 'ui-angular';
import { CHAT_USER_IMAGE_OPTIONS } from './chat-user-image-options';

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
  readonly userImageOptions = CHAT_USER_IMAGE_OPTIONS;
  readonly selectedUserImage = signal(CHAT_USER_IMAGE_OPTIONS[0].value);
  private readonly baseConversation: IBmbChatMessage[] = [
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
      type: 'text',
      content: {
        text: '¿Puedes mostrarme un ejemplo más completo donde un signal almacene una lista y un computed obtenga el total de elementos?',
      },
      time: new Date(),
    },
  ];

  readonly conversation = computed<IBmbChatMessage[]>(() =>
    this.baseConversation.map((message) =>
      message.isUserMessage
        ? { ...message, userProfile: this.selectedUserImage() }
        : message,
    ),
  );

  selectUserImage(event: Event): void {
    this.selectedUserImage.set((event.target as HTMLSelectElement).value);
  }

  handleConversationAction(event: IBmbChatActionEvent): void {
    this.conversationEvent.set(`${event.action} · mensaje ${event.messageId}`);
  }
}

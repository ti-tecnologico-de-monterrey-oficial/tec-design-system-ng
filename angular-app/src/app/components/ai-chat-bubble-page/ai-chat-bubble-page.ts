import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  BmbAiChatBubbleComponent,
  type BmbChatActionEvent,
  type BmbChatMessage,
} from 'ui-angular';
import { CHAT_USER_IMAGE_OPTIONS } from './chat-user-image-options';

@Component({
  selector: 'app-ai-chat-bubble-page',
  imports: [BmbAiChatBubbleComponent],
  templateUrl: './ai-chat-bubble-page.html',
  styleUrl: './ai-chat-bubble-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatBubblePage {
  readonly userCopyEnabled = signal(true);
  readonly conversationEvent = signal('Sin interacciones');
  readonly userImageOptions = CHAT_USER_IMAGE_OPTIONS;
  readonly selectedUserImage = signal(CHAT_USER_IMAGE_OPTIONS[0].value);
  private readonly baseConversation: BmbChatMessage[] = [
    {
      id: 'assistant-welcome',
      isUser: false,
      type: 'text',
      content: { text: '¡Hola! ¿En qué puedo ayudarte hoy?' },
      timestamp: new Date(),
    },
    {
      id: 'user-short',
      isUser: true,
      type: 'text',
      content: { text: 'Explícame Angular Signals.' },
      timestamp: new Date(),
    },
    {
      id: 'assistant-explanation',
      isUser: false,
      type: 'text',
      content: {
        text: 'Los Signals son valores reactivos que notifican a Angular cuando cambian.',
      },
      timestamp: new Date(),
    },
    {
      id: 'user-long',
      isUser: true,
      type: 'text',
      content: {
        text: '¿Puedes mostrarme un ejemplo más completo donde un signal almacene una lista y un computed obtenga el total de elementos?',
      },
      timestamp: new Date(),
    },
  ];

  readonly conversation = computed<BmbChatMessage[]>(() =>
    this.baseConversation.map((message) =>
      message.isUser
        ? { ...message, userProfile: this.selectedUserImage() }
        : message,
    ),
  );

  selectUserImage(event: Event): void {
    this.selectedUserImage.set((event.target as HTMLSelectElement).value);
  }

  handleConversationAction(event: BmbChatActionEvent): void {
    this.conversationEvent.set(`${event.action} · mensaje ${event.messageId}`);
  }
}

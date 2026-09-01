import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  BmbAiChatBubbleComponent,
  type BmbChatAction,
  type BmbChatActionEvent,
  type BmbChatMessage,
  type BmbChatMessageEditedEvent,
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
  readonly userEditEnabled = signal(true);
  readonly conversationEvent = signal('Sin interacciones');
  readonly userImageOptions = CHAT_USER_IMAGE_OPTIONS;
  readonly selectedUserImage = signal(CHAT_USER_IMAGE_OPTIONS[0].value);
  private readonly baseConversation = signal<BmbChatMessage[]>([
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
  ]);

  readonly userActions = computed<BmbChatAction[]>(() => {
    const actions: BmbChatAction[] = [];
    if (this.userCopyEnabled()) actions.push('copy');
    if (this.userEditEnabled()) actions.push('edit');
    return actions;
  });

  readonly conversation = computed<BmbChatMessage[]>(() =>
    this.baseConversation().map((message) =>
      message.isUser
        ? { ...message, userProfile: this.selectedUserImage() }
        : message,
    ),
  );

  selectUserImage(event: Event): void {
    this.selectedUserImage.set((event.target as HTMLSelectElement).value);
  }

  handleConversationAction(event: BmbChatActionEvent): void {
    console.info('BmbAiChatBubble getAction:', event);
    this.conversationEvent.set(`${event.action} · mensaje ${event.messageId}`);
  }

  handleMessageEditCancelled(message: BmbChatMessage): void {
    console.info('BmbAiChatBubble messageEditCancelled:', message);
    this.conversationEvent.set(`edición cancelada · mensaje ${message.id}`);
  }

  handleMessageEdited(event: BmbChatMessageEditedEvent): void {
    console.info('BmbAiChatBubble messageEdited:', event);
    this.baseConversation.update((messages) => {
      const messageIndex = messages.findIndex(
        ({ id }) => id === event.previousMessage.id,
      );

      if (messageIndex === -1) return messages;

      return [...messages.slice(0, messageIndex), event.editedMessage];
    });

    this.conversationEvent.set(`editado · mensaje ${event.previousMessage.id}`);
  }
}

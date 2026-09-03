import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  BmbAiChatBubbleComponent,
  BmbTabsComponent,
  type BmbChatAction,
  type BmbChatActionEvent,
  type BmbChatMessage,
  type BmbChatMessageEditedEvent,
  type IBmbChatOptionEvent,
  type IBmbTab,
} from 'ui-angular';
import { CHAT_USER_IMAGE_OPTIONS } from './chat-user-image-options';

@Component({
  selector: 'app-ai-chat-bubble-page',
  imports: [BmbAiChatBubbleComponent, BmbTabsComponent],
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

  readonly tabs: IBmbTab[] = [
    { id: 1, title: 'Texto', isActive: true },
    { id: 2, title: 'Imágenes y mixto' },
    { id: 3, title: 'Opciones y enlaces' },
    { id: 4, title: 'Estados y errores' },
    { id: 5, title: 'Acciones deshabilitadas' },
  ];
  readonly activeTabId = signal<number>(1);

  handleTabSelected(tab: IBmbTab): void {
    this.activeTabId.set(tab.id);
  }

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

  private readonly mediaConversation = signal<BmbChatMessage[]>([
    {
      id: 'assistant-image',
      isUser: false,
      type: 'image',
      content: {
        imageUrl:
          'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600',
        alt: 'Diagrama de arquitectura',
      },
      timestamp: new Date(),
    },
    {
      id: 'user-mixed',
      isUser: true,
      type: 'mixed',
      content: {
        text: '¿Puedes revisar este diagrama y explicarme el flujo?',
        imageUrl:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600',
      },
      timestamp: new Date(),
    },
  ]);

  readonly mediaMessages = computed<BmbChatMessage[]>(() =>
    this.mediaConversation().map((message) =>
      message.isUser
        ? { ...message, userProfile: this.selectedUserImage() }
        : message,
    ),
  );

  private readonly optionsConversation = signal<BmbChatMessage[]>([
    {
      id: 'assistant-link',
      isUser: false,
      type: 'link',
      content: {
        text: 'Consulta la documentación oficial de Angular Signals.',
        href: 'https://angular.dev/guide/signals',
        target: '_blank',
      },
      timestamp: new Date(),
    },
    {
      id: 'assistant-options',
      isUser: false,
      type: 'options',
      content: {
        text: '¿Sobre qué tema te gustaría profundizar?',
        options: [
          { id: 'signals', label: 'Signals' },
          { id: 'rxjs', label: 'RxJS' },
          { id: 'ssr', label: 'Server-Side Rendering' },
        ],
      },
      timestamp: new Date(),
    },
  ]);

  readonly optionsMessages = computed<BmbChatMessage[]>(() =>
    this.optionsConversation().map((message) =>
      message.isUser
        ? { ...message, userProfile: this.selectedUserImage() }
        : message,
    ),
  );

  private readonly statusConversation = signal<BmbChatMessage[]>([
    {
      id: 'user-sending',
      isUser: true,
      type: 'text',
      status: 'sending',
      content: { text: 'Enviando pregunta sobre el estado del servidor...' },
      timestamp: new Date(),
    },
    {
      id: 'user-sent',
      isUser: true,
      type: 'text',
      status: 'sent',
      content: { text: '¿Cómo va el despliegue?' },
      timestamp: new Date(),
    },
    {
      id: 'assistant-error',
      isUser: false,
      type: 'text',
      status: 'error',
      content: { text: 'No fue posible obtener una respuesta. Intenta de nuevo.' },
      timestamp: new Date(),
    },
  ]);

  readonly statusMessages = computed<BmbChatMessage[]>(() =>
    this.statusConversation().map((message) =>
      message.isUser
        ? { ...message, userProfile: this.selectedUserImage() }
        : message,
    ),
  );

  readonly disabledActionsMessages = computed<BmbChatMessage[]>(() =>
    this.conversation(),
  );

  selectUserImage(event: Event): void {
    this.selectedUserImage.set((event.target as HTMLSelectElement).value);
  }

  handleConversationAction(event: BmbChatActionEvent): void {
    console.info('BmbAiChatBubble getAction:', event);
    this.conversationEvent.set(`${event.action} · mensaje ${event.messageId}`);
  }

  handleOptionSelected(event: IBmbChatOptionEvent): void {
    console.info('BmbAiChatBubble getOptionClicked:', event);
    this.conversationEvent.set(`opción seleccionada · ${event.option.label}`);
  }

  handleImageLoadError(): void {
    this.conversationEvent.set('Error al cargar la imagen');
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

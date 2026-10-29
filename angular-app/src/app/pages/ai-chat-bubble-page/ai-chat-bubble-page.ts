import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
  TemplateRef,
  viewChild,
} from '@angular/core';
import {
  BmbAiChatBubbleComponent,
  BmbDropdownComponent,
  BmbInputComponent,
  type BmbChatAction,
  type BmbChatActionEvent as BmbChatActionEventGeneric,
  type BmbChatMessage as BmbChatMessageGeneric,
  type BmbChatMessageEditedEvent,
  type BmbChatMessageType,
  type BmbChatStatus,
  type BmbUploadFileRequestEvent,
  type IBmbChatOptionEvent,
} from 'ui-angular';

type BmbChatMessage = BmbChatMessageGeneric<TemplateRef<unknown>>;
type BmbChatActionEvent = BmbChatActionEventGeneric<TemplateRef<unknown>>;
import { CHAT_USER_IMAGE_OPTIONS } from './chat-user-image-options';

@Component({
  selector: 'app-ai-chat-bubble-page',
  imports: [BmbAiChatBubbleComponent, BmbDropdownComponent, BmbInputComponent],
  templateUrl: './ai-chat-bubble-page.html',
  styleUrl: './ai-chat-bubble-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiChatBubblePage {
  readonly messageTypes: { name: string; value: BmbChatMessageType }[] = [
    { name: 'BmbTextMessage', value: 'text' },
    { name: 'BmbImageMessage', value: 'image' },
    { name: 'BmbMixedMessage', value: 'mixed' },
    { name: 'BmbLinkMessage', value: 'link' },
    { name: 'BmbOptionsMessage', value: 'options' },
    { name: 'BmbUploadFileMessage', value: 'upload-file' },
    { name: 'BmbTemplateMessage', value: 'template' },
  ];
  readonly selectedMessageType = signal<BmbChatMessageType>('text');
  readonly isUser = signal(false);
  readonly showActions = signal(true);
  readonly isThinking = signal(false);
  readonly userCopyEnabled = signal(true);
  readonly userEditEnabled = signal(true);
  readonly status = signal<BmbChatStatus>('sent');
  readonly like = signal(false);
  readonly dislike = signal(false);
  readonly botIcon = signal('bot_tecStandar');
  readonly conversationEvent = signal('Sin interacciones');
  readonly userImageOptions = CHAT_USER_IMAGE_OPTIONS;
  readonly selectedUserImage = signal(CHAT_USER_IMAGE_OPTIONS[0].value);
  readonly text = signal('¡Hola! ¿En qué puedo ayudarte hoy?');
  readonly imageUrl = signal(
    'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600',
  );
  readonly imageAlt = signal('Diagrama de arquitectura');
  readonly href = signal('https://angular.dev/guide/signals');
  readonly openInNewTab = signal(true);
  readonly optionLabels = signal('Signals\nRxJS\nServer-Side Rendering');
  readonly fileName = signal('nombre de archivo de servicio');
  readonly buttonLabel = signal('');
  readonly uploadText = signal('');
  readonly cancelKeyword = signal('');
  readonly acceptedFormats = signal('.pdf,.doc,.xml');
  readonly maxFileSize = signal<number | undefined>(10);
  readonly additionalRequirements = signal('El documento debe ser legible.');
  private readonly timestamp = new Date();
  private readonly customTemplate = viewChild<TemplateRef<unknown>>(
    'customMessageTemplate',
  );

  readonly actions = computed<BmbChatAction[]>(() => {
    if (!this.isUser()) return ['repeat', 'voice', 'copy', 'like', 'dislike'];
    const actions: BmbChatAction[] = [];
    if (this.userCopyEnabled()) actions.push('copy');
    if (this.userEditEnabled()) actions.push('edit');
    return actions;
  });

  readonly message = computed<BmbChatMessage<TemplateRef<unknown>> | undefined>(
    () => {
      const base = {
        id: `preview-${this.selectedMessageType()}`,
        isUser: this.isUser(),
        userProfile: this.selectedUserImage(),
        timestamp: this.timestamp,
        status: this.status(),
        like: this.like(),
        dislike: this.dislike(),
      };
      switch (this.selectedMessageType()) {
        case 'text':
          return { ...base, type: 'text', content: { text: this.text() } };
        case 'image':
          return {
            ...base,
            type: 'image',
            content: { imageUrl: this.imageUrl(), alt: this.imageAlt() },
          };
        case 'mixed':
          return {
            ...base,
            type: 'mixed',
            content: { text: this.text(), imageUrl: this.imageUrl() },
          };
        case 'link':
          return {
            ...base,
            type: 'link',
            content: {
              text: this.text(),
              href: this.href(),
              target: this.openInNewTab() ? '_blank' : '_self',
            },
          };
        case 'options':
          return {
            ...base,
            type: 'options',
            content: {
              text: this.text(),
              options: this.lines(this.optionLabels()).map((label, index) => ({
                id: `option-${index}`,
                label,
              })),
            },
          };
        case 'upload-file':
          return {
            ...base,
            type: 'upload-file',
            content: {
              fileName: this.fileName(),
              text: this.uploadText() || undefined,
              buttonLabel: this.buttonLabel() || undefined,
              cancelKeyword: this.cancelKeyword() || undefined,

              acceptedFormats: this.acceptedFormats()
                .split(',')
                .filter(Boolean),
              maxFileSize: this.maxFileSize(),
              additionalRequirements: this.lines(this.additionalRequirements()),
            },
          };
        case 'template': {
          const template = this.customTemplate();
          return template
            ? { ...base, type: 'template', content: { template } }
            : undefined;
        }
      }
    },
  );

  selectMessageType(value: unknown): void {
    const option = this.messageTypes.find((item) => item.value === value);
    if (!option) {
      throw new Error(`Unknown chat message type: ${String(value)}`);
    }
    this.selectedMessageType.set(option.value);
    this.conversationEvent.set('Sin interacciones');
  }

  handleUploadFileRequested(event: BmbUploadFileRequestEvent): void {
    this.conversationEvent.set(
      `uploadFileRequested · mensaje ${event.messageId} · ${event.message.content.fileName}`,
    );
  }

  handleConversationAction(event: BmbChatActionEvent): void {
    this.conversationEvent.set(`${event.action} · mensaje ${event.messageId}`);
  }

  handleOptionSelected(event: IBmbChatOptionEvent): void {
    this.conversationEvent.set(`opción seleccionada · ${event.option.label}`);
  }

  handleImageLoadError(): void {
    this.conversationEvent.set('Error al cargar la imagen');
  }

  handleMessageEditCancelled(message: BmbChatMessage): void {
    this.conversationEvent.set(`edición cancelada · mensaje ${message.id}`);
  }

  handleMessageEdited(event: BmbChatMessageEditedEvent): void {
    this.text.set(event.editedMessage.content.text);
    this.conversationEvent.set(`editado · mensaje ${event.previousMessage.id}`);
  }

  private lines(value: string): string[] {
    return value
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
  }
}

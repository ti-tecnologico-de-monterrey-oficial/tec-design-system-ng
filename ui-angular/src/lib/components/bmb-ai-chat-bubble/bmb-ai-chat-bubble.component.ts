import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  OnDestroy,
  output,
  signal,
  ViewChild,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import {
  BmbChatActionEvent,
  BmbChatAction,
  BmbChatCopyState,
  BmbChatMessage,
  BmbChatMessageEditedEvent,
  BmbTextMessage,
  IBmbChatOptionEvent,
} from './types';
import { ChatActionsComponent } from './bmb-chat-actions/bmb-chat-actions.component';
import { TextMessageComponent } from './bmb-message-renderers/bmb-text-message/bmb-text-message.component';
import { ImageMessageComponent } from './bmb-message-renderers/bmb-image-message/bmb-image-message.component';
import { MixedMessageComponent } from './bmb-message-renderers/bmb-mixed-message/bmb-mixed-message.component';
import { LinkMessageComponent } from './bmb-message-renderers/bmb-link-message/bmb-link-message.component';
import { OptionsMessageComponent } from './bmb-message-renderers/bmb-options-message/bmb-options-message.component';
import { TemplateMessageComponent } from './bmb-message-renderers/bmb-template-message/bmb-template-message.component';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { BmbChatEditorComponent } from '../bmb-chat-editor/bmb-chat-editor.component';

export * from './types';

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

@Component({
  selector: 'bmb-ai-chat-bubble',
  standalone: true,
  imports: [
    CommonModule,
    ChatActionsComponent,
    TextMessageComponent,
    ImageMessageComponent,
    MixedMessageComponent,
    LinkMessageComponent,
    OptionsMessageComponent,
    TemplateMessageComponent,
    BmbUserImageComponent,
    BmbIconComponent,
    BmbBotIconComponent,
    BmbChatEditorComponent,
  ],
  templateUrl: './bmb-ai-chat-bubble.component.html',
  styleUrl: './bmb-ai-chat-bubble.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAiChatBubbleComponent implements OnDestroy {
  /**
   * Bot icon token used for assistant messages.
   */
  readonly botIcon = input('bot_tecStandar');

  /**
   * Testing identifier used for automation and e2e selectors.
   */
  testId = input<string>('chat-bubble');

  /**
   * Chat message contract.
   */
  readonly message = input.required<BmbChatMessage>();

  /**
   * Loading visual state.
   */
  readonly isThinking = input(false);

  /**
   * Enables action buttons.
   */
  readonly showActions = input(true);

  /** Actions displayed for user messages. */
  readonly userActions = input<BmbChatAction[]>(['copy']);

  readonly copyState = signal<BmbChatCopyState>('idle');
  readonly isEditing = signal(false);

  @ViewChild('messageContent')
  private messageContent?: ElementRef<HTMLElement>;

  private copyStateTimer?: ReturnType<typeof setTimeout>;

  /**
   * Emits action events.
   */
  readonly getAction = output<BmbChatActionEvent>();
  readonly messageEdited = output<BmbChatMessageEditedEvent>();
  readonly messageEditCancelled = output<BmbChatMessage>();
  getOptionClicked = output<IBmbChatOptionEvent>();

  /**
   * Emits image not found events.
   */
  readonly imageNotFoundError = output<void>();

  /**
   * Bubble dynamic classes.
   */
  readonly bubbleClasses = computed(() => ({
    'bmb_ai-chat-bubble-user': this.message().isUser,
    'bmb_ai-chat-bubble-bot': !this.message().isUser,
    'bmb_ai-chat-bubble-thinking': this.isThinking(),
    'bmb_ai-chat-bubble-editing': this.isEditing(),
  }));

  protected async onAction(event: BmbChatActionEvent): Promise<void> {
    if (event.action === 'copy') {
      if (this.copyState() !== 'idle') return;

      await this.copyMessageContent(event);
      return;
    }

    if (
      event.action === 'edit' &&
      event.message.isUser &&
      event.message.type === 'text'
    ) {
      this.isEditing.set(true);
    }

    this.getAction.emit(event);
  }

  protected cancelEdit(): void {
    this.isEditing.set(false);
    this.messageEditCancelled.emit(this.message());
  }

  protected saveEdit(text: string): void {
    const previousMessage = this.message();
    if (!previousMessage.isUser || previousMessage.type !== 'text') return;

    const editedMessage: BmbTextMessage = {
      ...previousMessage,
      content: { text },
    };

    this.isEditing.set(false);
    this.messageEdited.emit({ previousMessage, editedMessage });
  }

  protected handleOptionClick(event: IBmbChatOptionEvent): void {
    this.getOptionClicked.emit(event);
  }

  ngOnDestroy(): void {
    if (this.copyStateTimer) clearTimeout(this.copyStateTimer);
  }

  private async copyMessageContent(event: BmbChatActionEvent): Promise<void> {
    this.copyState.set('pending');

    try {
      const plainText = this.buildPlainText();
      const html = this.messageContent?.nativeElement.innerHTML.trim();
      await this.writeToClipboard(plainText, html || undefined);
      this.setTemporaryCopyState('success');
    } catch {
      this.setTemporaryCopyState('error');
    } finally {
      this.getAction.emit(event);
    }
  }

  private buildPlainText(): string {
    const message = this.message();

    switch (message.type) {
      case 'text':
      case 'mixed':
        return message.content.text.trim();
      case 'image':
        return (message.content.alt ?? '').trim();
      case 'link':
        return [message.content.text, message.content.href]
          .filter(Boolean)
          .join('\n\n')
          .trim();
      case 'options': {
        const options = message.content.options
          .map((option) =>
            [`- ${option.label}`, option.href].filter(Boolean).join('\n'),
          )
          .join('\n');
        return [message.content.text, options]
          .filter(Boolean)
          .join('\n\n')
          .trim();
      }
      case 'template':
        return this.messageContent?.nativeElement.innerText.trim() ?? '';
    }
  }

  private async writeToClipboard(
    plainText: string,
    html?: string,
  ): Promise<void> {
    if (!navigator.clipboard) {
      throw new Error('Clipboard API is unavailable');
    }

    if (
      html &&
      typeof ClipboardItem !== 'undefined' &&
      typeof navigator.clipboard.write === 'function'
    ) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/plain': new Blob([plainText], { type: 'text/plain' }),
            'text/html': new Blob([html], { type: 'text/html' }),
          }),
        ]);
        return;
      } catch {
        // Fall through to plain text for browsers that reject rich content.
      }
    }

    await navigator.clipboard.writeText(plainText);
  }

  private setTemporaryCopyState(state: 'success' | 'error'): void {
    this.copyState.set(state);
    if (this.copyStateTimer) clearTimeout(this.copyStateTimer);

    this.copyStateTimer = setTimeout(() => {
      this.copyState.set('idle');
      this.copyStateTimer = undefined;
    }, 3000);
  }
}

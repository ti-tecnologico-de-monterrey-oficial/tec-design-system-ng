import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  effect,
  HostListener,
  input,
  model,
  OnDestroy,
  output,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  IBmbChatMessage,
  IBmbChatGptIcons,
  IBmbChatActionEvent,
  TChatAction,
  BmbChatGptIconInput,
  IBmbChatGptIconState,
  BmbChatUserActionConfig,
} from './types';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { BmbContainerButtonComponent } from '../bmb-container-button/bmb-container-button.component';
import { BmbTranslationsService } from '../../services/translations/translations.service';

export interface IBmbChatBubblesActions {
  key: TChatAction;
  icon: string;
  label: string;
}

@Component({
  selector: 'bmb-chat-bubble',
  standalone: true,
  imports: [
    BmbUserImageComponent,
    CommonModule,
    BmbBotIconComponent,
    BmbIconComponent,
    BmbTextLinkComponent,
    BmbContainerButtonComponent,
  ],
  templateUrl: './bmb-chat-bubbles.component.html',
  styleUrl: './bmb-chat-bubbles.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbChatBubblesComponent implements OnDestroy {
  iconBot = input<string>('bot_tecStandar');
  message = input.required<IBmbChatMessage>();
  gptBot = input<boolean>(false);
  gptIcons = input<boolean>(false);
  isThinking = input<boolean>(false);
  testId = input<string>('chat-bubble');
  userActiveIcons = input<BmbChatUserActionConfig>({
    copy: { visible: true },
  });
  isSelected = signal(false);
  copyState = signal<'idle' | 'pending' | 'success' | 'error'>('idle');

  @ViewChild('messageContent')
  private messageContent?: ElementRef<HTMLElement>;

  private copyStateTimer?: ReturnType<typeof setTimeout>;
  actions = input<IBmbChatBubblesActions[]>([
    {
      key: 'repeat',
      icon: 'repeat',
      label: this.translationService.translate('chat_bubbles.repeat'),
    },
    {
      key: 'voice',
      icon: 'record_voice_over',
      label: this.translationService.translate('chat_bubbles.voice'),
    },
    {
      key: 'copy',
      icon: 'content_copy',
      label: this.translationService.translate('chat_bubbles.copy'),
    },
    {
      key: 'like',
      icon: 'thumb_up',
      label: this.translationService.translate('chat_bubbles.like'),
    },
    {
      key: 'dislike',
      icon: 'thumb_down',
      label: this.translationService.translate('chat_bubbles.dislike'),
    },
  ]);

  userActions = computed<IBmbChatBubblesActions[]>(() => {
    const copyAction = this.actions().find(
      (action) => action.key === 'copy',
    ) ?? {
      key: 'copy',
      icon: 'content_copy',
      label: this.translationService.translate('chat_bubbles.copy'),
    };

    return [copyAction].filter((action) =>
      this.isUserActionVisible(action.key),
    );
  });

  iconBotDefault = computed(() =>
    this.gptBot() ? 'bot_chatGPT' : this.iconBot(),
  );

  /** @deprecated Use getAction instead */
  onRepeatRequest = output<Event>();

  /** @deprecated Use getAction instead */
  onVoice = output<Event>();

  /** @deprecated Use getAction instead */
  onCopy = output<Event>();

  /** @deprecated Use getAction instead */
  onLike = output<Event>();

  /** @deprecated Use getAction instead */
  onDislike = output<Event>();

  gptActiveIcons = input<{
    repeat: BmbChatGptIconInput;
    voice: BmbChatGptIconInput;
    copy: BmbChatGptIconInput;
    like: BmbChatGptIconInput;
    dislike: BmbChatGptIconInput;
  }>({
    repeat: { visible: true },
    voice: { visible: true },
    copy: { visible: true },
    like: { visible: true },
    dislike: { visible: true },
  });

  getAction = output<IBmbChatActionEvent>();
  iconsState = model<IBmbChatGptIcons>(this.buildState());

  private normalize(icon: BmbChatGptIconInput): IBmbChatGptIconState {
    if (typeof icon === 'boolean') {
      return { visible: icon, active: false };
    }

    return {
      visible: icon.visible,
      active: icon.active ?? false,
    };
  }

  private buildState(): IBmbChatGptIcons {
    const config = this.gptActiveIcons();

    return {
      repeat: this.normalize(config.repeat),
      voice: this.normalize(config.voice),
      copy: this.normalize(config.copy),
      like: this.normalize(config.like),
      dislike: this.normalize(config.dislike),
    };
  }

  constructor(
    private translationService: BmbTranslationsService,
    private elementRef: ElementRef<HTMLElement>,
  ) {
    effect(
      () => {
        this.iconsState.set(this.buildState());
      },
      { allowSignalWrites: true },
    );
  }

  /** @deprecated */
  handleLike(event: Event) {
    this.toggleFeedback('like');
    this.onLike.emit(event);
  }

  /** @deprecated */
  handleDislike(event: Event) {
    this.toggleFeedback('dislike');
    this.onDislike.emit(event);
  }

  /** @deprecated */
  handleCopyContent(event: Event) {
    this.onCopy.emit(event);
  }

  /** @deprecated */
  handleVoice(event: Event) {
    this.onVoice.emit(event);
  }

  /** @deprecated */
  handleRepeat(event: Event) {
    this.onRepeatRequest.emit(event);
  }

  private isFeedbackAction(action: TChatAction): action is 'like' | 'dislike' {
    return action === 'like' || action === 'dislike';
  }

  handleAction(action: TChatAction, event: Event) {
    event.preventDefault();

    if (action === 'copy' && this.copyState() !== 'idle') return;

    if (this.isFeedbackAction(action)) {
      this.toggleFeedback(action);
    }

    switch (action) {
      case 'repeat':
        this.onRepeatRequest.emit(event);
        break;
      case 'voice':
        this.onVoice.emit(event);
        break;
      case 'copy':
        void this.copyMessageContent(event);
        break;
      case 'like':
        this.onLike.emit(event);
        break;
      case 'dislike':
        this.onDislike.emit(event);
        break;
    }

    if (action !== 'copy') this.emitAction(action, event);
  }

  getActionIcon(action: TChatAction, defaultIcon: string): string {
    if (action !== 'copy') return defaultIcon;
    if (this.copyState() === 'success') return 'check';
    if (this.copyState() === 'error') return 'close';
    return defaultIcon;
  }

  isUserActionVisible(action: TChatAction): boolean {
    const config = this.userActiveIcons()[action];
    return config ? this.normalize(config).visible : false;
  }

  selectMessage(): void {
    this.isSelected.set(true);
  }

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: Event): void {
    const target = event.target;
    this.isSelected.set(
      target instanceof Node && this.elementRef.nativeElement.contains(target),
    );
  }

  ngOnDestroy(): void {
    if (this.copyStateTimer) clearTimeout(this.copyStateTimer);
  }

  private async copyMessageContent(event: Event): Promise<void> {
    this.copyState.set('pending');

    try {
      const text = this.buildPlainText();
      if (!text) throw new Error('The message has no copyable content');

      await this.writeToClipboard(text, this.buildHtml());
      this.setTemporaryCopyState('success');
    } catch {
      this.setTemporaryCopyState('error');
    } finally {
      this.onCopy.emit(event);
      this.emitAction('copy', event);
    }
  }

  private buildPlainText(): string {
    const { content, type } = this.message();

    if (type === 'template') {
      return this.messageContent?.nativeElement.textContent?.trim() ?? '';
    }

    const parts: string[] = [];
    if (content.text?.trim()) parts.push(content.text);
    if (type === 'link' && content.link?.trim()) parts.push(content.link);

    if (type === 'options') {
      const options = content.options
        ?.map((option) => {
          const title = option.title?.trim();
          const link = option.link?.trim();
          if (!title) return '';
          return link ? `- ${title}\n  ${link}` : `- ${title}`;
        })
        .filter(Boolean);

      if (options?.length) parts.push(options.join('\n'));
    }

    return parts.join('\n\n').trim();
  }

  private buildHtml(): string | undefined {
    const element = this.messageContent?.nativeElement;
    return element?.textContent?.trim() ? element.innerHTML : undefined;
  }

  private async writeToClipboard(text: string, html?: string): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      throw new Error('Clipboard API is not available');
    }

    if (
      html &&
      typeof ClipboardItem !== 'undefined' &&
      typeof navigator.clipboard.write === 'function'
    ) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/plain': new Blob([text], { type: 'text/plain' }),
            'text/html': new Blob([html], { type: 'text/html' }),
          }),
        ]);
        return;
      } catch {
        throw new Error('Error al copiar contenido de mensaje');
      }
    }

    await navigator.clipboard.writeText(text);
  }

  private setTemporaryCopyState(state: 'success' | 'error'): void {
    this.copyState.set(state);
    if (this.copyStateTimer) clearTimeout(this.copyStateTimer);

    this.copyStateTimer = setTimeout(() => {
      this.copyState.set('idle');
      this.copyStateTimer = undefined;
    }, 3000);
  }

  private emitAction(action: TChatAction, event: Event): void {
    this.getAction.emit({
      action,
      messageId: this.message().id,
      message: this.message(),
      event,
    });
  }

  toggleFeedback(type: 'like' | 'dislike') {
    this.iconsState.update((state) => ({
      ...state,
      like: {
        ...state.like,
        active: type === 'like' ? !state.like.active : false,
      },
      dislike: {
        ...state.dislike,
        active: type === 'dislike' ? !state.dislike.active : false,
      },
    }));
  }
}

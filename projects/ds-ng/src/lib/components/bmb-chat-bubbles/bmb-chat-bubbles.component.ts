import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  model,
  output,
  ViewEncapsulation,
} from '@angular/core';
import {
  IBmbChatMessage,
  IBmbChatGptIcons,
  IBmbChatActionEvent,
  TChatAction,
  BmbChatGptIconInput,
  IBmbChatGptIconState,
} from './types';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { BmbContainerButtonComponent } from '../bmb-container-button/bmb-container-button.component';
import { BmbTranslationsService } from '../../services/translations/translations.service';

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
export class BmbChatBubblesComponent {
  iconBot = input<string>('bot_tecStandar');
  message = input.required<IBmbChatMessage>();
  gptBot = input<boolean>(false);
  gptIcons = input<boolean>(false);
  isThinking = input<boolean>(false);
  testId = input<string>('chat-bubble');

  actions = computed(() => [
    {
      key: 'repeat' as TChatAction,
      icon: 'repeat',
      label: this.translationService.translate('chat_bubbles.repeat'),
    },
    {
      key: 'voice' as TChatAction,
      icon: 'record_voice_over',
      label: this.translationService.translate('chat_bubbles.voice'),
    },
    {
      key: 'copy' as TChatAction,
      icon: 'content_copy',
      label: this.translationService.translate('chat_bubbles.copy'),
    },
    {
      key: 'like' as TChatAction,
      icon: 'thumb_up',
      label: this.translationService.translate('chat_bubbles.like'),
    },
    {
      key: 'dislike' as TChatAction,
      icon: 'thumb_down',
      label: this.translationService.translate('chat_bubbles.dislike'),
    },
  ]);

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

  constructor(private translationService: BmbTranslationsService) {
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
        this.onCopy.emit(event);
        break;
      case 'like':
        this.onLike.emit(event);
        break;
      case 'dislike':
        this.onDislike.emit(event);
        break;
    }

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

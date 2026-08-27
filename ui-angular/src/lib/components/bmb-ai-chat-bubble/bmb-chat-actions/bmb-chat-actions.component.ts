import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbChatAction,
  BmbChatActionConfig,
  BmbChatActionEvent,
  BmbChatCopyState,
  BmbChatMessage,
} from '../types';
import { BmbIconComponent } from '../../old/bmb-icon/bmb-icon.component';
import { BmbTranslationsService } from '../../../services/translations/translations.service';

@Component({
  selector: 'bmb-chat-actions',
  standalone: true,
  imports: [CommonModule, BmbIconComponent],
  templateUrl: './bmb-chat-actions.component.html',
  styleUrl: './bmb-chat-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatActionsComponent {
  readonly message = input.required<BmbChatMessage>();
  readonly actions = input<BmbChatAction[] | null>(null);
  readonly copyState = input<BmbChatCopyState>('idle');
  private readonly translationService = inject(BmbTranslationsService);
  constructor() {
    effect(
      () => {
        const message = this.message();

        this.internalActions.update((actions) =>
          actions.map((action) => {
            if (action.action === 'like') {
              return {
                ...action,
                active: message.like ?? false,
              };
            }

            if (action.action === 'dislike') {
              return {
                ...action,
                active: message.dislike ?? false,
              };
            }

            return action;
          }),
        );
      },
      { allowSignalWrites: true },
    );
  }
  /**
   * Configurable actions.
   */
  readonly internalActions = signal<BmbChatActionConfig[]>([
    {
      action: 'repeat',
      icon: 'repeat',
      label: this.translationService.translate('chat_bubbles.repeat'),
    },
    {
      action: 'voice',
      icon: 'record_voice_over',
      label: this.translationService.translate('chat_bubbles.voice'),
    },
    {
      action: 'copy',
      icon: 'content_copy',
      label: this.translationService.translate('chat_bubbles.copy'),
    },
    {
      action: 'like',
      icon: 'thumb_up',
      label: this.translationService.translate('chat_bubbles.like'),
      active: false,
    },
    {
      action: 'dislike',
      icon: 'thumb_down',
      label: this.translationService.translate('chat_bubbles.dislike'),
      active: false,
    },
  ]);

  /**
   * Visible actions.
   */
  readonly visibleActions = computed(() =>
    this.internalActions().filter(
      (action) =>
        action.visible !== false &&
        (this.actions() === null || this.actions()!.includes(action.action)),
    ),
  );

  /**
   * Emits selected action.
   */
  readonly actionTriggered = output<BmbChatActionEvent>();

  protected triggerAction(action: BmbChatAction, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (action === 'copy' && this.copyState() !== 'idle') return;

    if (action === 'like' || action === 'dislike') {
      this.internalActions.update((actions) =>
        actions.map((item) => {
          if (item.action === 'like' || item.action === 'dislike') {
            if (item.action === action) {
              return {
                ...item,
                active: !item.active,
              };
            }

            return {
              ...item,
              active: false,
            };
          }

          return item;
        }),
      );
    }

    this.actionTriggered.emit({
      action,
      messageId: this.message().id,
      message: this.message(),
      nativeEvent: event,
    });
  }

  protected getActionIcon(action: BmbChatActionConfig): string {
    if (action.action !== 'copy') return action.icon;
    if (this.copyState() === 'success') return 'check';
    if (this.copyState() === 'error') return 'close';
    return action.icon;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BmbChatAction,
  BmbChatActionConfig,
  BmbChatActionEvent as BmbChatActionEventGeneric,
  BmbChatCopyState,
  BmbChatMessage as BmbChatMessageGeneric,
} from '../../../_shared/types';
import {
  AI_CHAT_ACTIONS_DEFAULT_CONFIG,
  filterVisibleChatActions,
  getChatActionIcon,
  toggleChatActionState,
  updateChatActionsLikeState,
} from '../../../_shared/logic/components/chat-actions';

type BmbChatMessage = BmbChatMessageGeneric<TemplateRef<unknown>>;
type BmbChatActionEvent = BmbChatActionEventGeneric<TemplateRef<unknown>>;
import { BmbActionIconComponent } from '../../bmb-action-icon/bmb-action-icon.component';
import { TranslatePipe } from '../../../pipes/translations';

@Component({
  selector: 'bmb-chat-actions',
  standalone: true,
  imports: [CommonModule, BmbActionIconComponent, TranslatePipe],
  templateUrl: './bmb-chat-actions.component.html',
  styleUrl: './bmb-chat-actions.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatActionsComponent {
  readonly message = input.required<BmbChatMessage>();
  readonly actions = input<BmbChatAction[] | null>(null);
  readonly copyState = input<BmbChatCopyState>('idle');

  constructor() {
    effect(() => {
      const message = this.message();

      this.internalActions.update((actions) =>
        updateChatActionsLikeState(
          actions,
          message.like ?? false,
          message.dislike ?? false,
        ),
      );
    });
  }
  /**
   * Configurable actions.
   */
  readonly internalActions = signal<BmbChatActionConfig[]>(
    AI_CHAT_ACTIONS_DEFAULT_CONFIG,
  );

  /**
   * Visible actions.
   */
  readonly visibleActions = computed(() =>
    filterVisibleChatActions(this.internalActions(), this.actions()),
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
        toggleChatActionState(actions, action),
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
    return getChatActionIcon(action, this.copyState());
  }
}

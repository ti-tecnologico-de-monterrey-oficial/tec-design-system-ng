import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { BmbChatActionEvent, BmbChatMessage } from './types';
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
  ],
  templateUrl: './bmb-ai-chat-bubble.component.html',
  styleUrl: './bmb-ai-chat-bubble.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAiChatBubbleComponent {
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

  /**
   * Emits action events.
   */
  readonly getAction = output<BmbChatActionEvent>();

  /**
   * Bubble dynamic classes.
   */
  readonly bubbleClasses = computed(() => ({
    'bmb-ai-chat-bubble-user': this.message().isUser,
    'bmb-ai-chat-bubble-bot': !this.message().isUser,
    'bmb-ai-chat-bubble-thinking': this.isThinking(),
  }));

  protected onAction(event: BmbChatActionEvent) {
    this.getAction.emit(event);
  }
}

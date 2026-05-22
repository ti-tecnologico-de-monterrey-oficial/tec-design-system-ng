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
  selector: 'bmb-chat-bubbles-lts',
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
  templateUrl: './bmb-chat-bubbles-lts.component.html',
  styleUrl: './bmb-chat-bubbles-lts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbChatBubblesLtsComponent {
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
  readonly action = output<BmbChatActionEvent>();

  /**
   * Bubble dynamic classes.
   */
  readonly bubbleClasses = computed(() => ({
    'bmb-chat-bubbles-lts-user': this.message().isUser,
    'bmb-chat-bubbles-lts-bot': !this.message().isUser,
    'bmb-chat-bubbles-lts-thinking': this.isThinking(),
  }));

  protected onAction(event: BmbChatActionEvent) {
    this.action.emit(event);
  }
}

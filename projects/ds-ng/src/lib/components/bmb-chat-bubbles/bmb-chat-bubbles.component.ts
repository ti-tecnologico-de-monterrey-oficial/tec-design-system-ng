import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbChatMessage, IBmbChatGptIcons } from './types';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { BmbContainerButtonComponent } from '../bmb-container-button/bmb-container-button.component';

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

  iconBotDefault = computed(() =>
    this.gptBot() ? 'bot_chatGPT' : this.iconBot(),
  );

  gptActiveIcons = input<IBmbChatGptIcons>({
    repeat: true,
    voice: true,
    copy: true,
    like: true,
    dislike: true,
  });

  onRepeatRequest = output<MouseEvent | KeyboardEvent>();
  onVoice = output<MouseEvent | KeyboardEvent>();
  onCopy = output<MouseEvent | KeyboardEvent>();
  onLike = output<MouseEvent | KeyboardEvent>();
  onDislike = output<MouseEvent | KeyboardEvent>();

  handleRepeat(event: MouseEvent | KeyboardEvent) {
    this.onRepeatRequest.emit(event);
  }

  handleVoice(event: MouseEvent | KeyboardEvent) {
    this.onVoice.emit(event);
  }

  handleCopyContent(event: MouseEvent | KeyboardEvent) {
    this.onCopy.emit(event);
  }

  handleLike(event: MouseEvent | KeyboardEvent) {
    this.onLike.emit(event);
  }

  handleDislike(event: MouseEvent | KeyboardEvent) {
    this.onDislike.emit(event);
  }
}

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

  onRepeatRequest = output<Event>();
  onVoice = output<Event>();
  onCopy = output<Event>();
  onLike = output<Event>();
  onDislike = output<Event>();

  handleRepeat(event: Event) {
    this.onRepeatRequest.emit(event);
  }

  handleVoice(event: Event) {
    this.onVoice.emit(event);
  }

  handleCopyContent(event: Event) {
    this.onCopy.emit(event);
  }

  handleLike(event: Event) {
    this.onLike.emit(event);
  }

  handleDislike(event: Event) {
    this.onDislike.emit(event);
  }
}

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

@Component({
  selector: 'bmb-chat-bubble',
  standalone: true,
  imports: [
    BmbUserImageComponent,
    CommonModule,
    BmbIconComponent,
    BmbTextLinkComponent,
  ],
  templateUrl: './bmb-chat-bubbles.component.html',
  styleUrl: './bmb-chat-bubbles.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbChatBubblesComponent {
  iconBot = input<string>('/assets/images/bot-icons/bot_tecStandar.svg');
  message = input.required<IBmbChatMessage>();
  gptBot = input<boolean>(false);
  gptIcons = input<boolean>(false);
  isThinking = input<boolean>(false);

  iconBotDefault = computed(() =>
    this.gptBot() ? '/assets/images/bot-icons/chat_gpt.svg' : this.iconBot(),
  );

  gptActiveIcons = input<IBmbChatGptIcons>({
    repeat: true,
    voice: true,
    copy: true,
    like: true,
    dislike: true,
  });

  onRepeatRequest = output<void>();
  onVoice = output<void>();
  onCopy = output<void>();
  onLike = output<void>();
  onDislike = output<void>();

  handleRepeat() {
    this.onRepeatRequest.emit();
  }

  handleVoice() {
    this.onVoice.emit();
  }

  handleCopyContent() {
    this.onCopy.emit();
  }

  handleLike() {
    this.onLike.emit();
  }

  handleDislike() {
    this.onDislike.emit();
  }
}

import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { IBmbChatMessage, IBmbBubblePosition } from './types';
import { BmbUserImageComponent } from '../bmb-user-image/bmb-user-image.component';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-chat-bubble',
  standalone: true,
  imports: [BmbUserImageComponent, CommonModule, BmbIconComponent],
  templateUrl: './bmb-chat-bubbles.component.html',
  styleUrl: './bmb-chat-bubbles.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbChatBubblesComponent {
  
  iconBot = input<string>('/assets/images/bot-icons/bot_tecStandar.svg')
  bubblePosition = input<IBmbBubblePosition>('top')
  message = input.required<IBmbChatMessage>();
  loading = input<boolean>(false);
  showExtraIcons = input<boolean>(false);

  constructor() {}

}

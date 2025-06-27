import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  OnInit,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import {
  BmbChatBarComponent,
  IBotType,
} from '../bmb-chat-bar/bmb-chat-bar.component';
import { IBmbColor } from '../../types/colors';
import { IBmbChatMessage } from '../bmb-chat-bubbles/types';
import { BmbChatBubblesComponent } from '../bmb-chat-bubbles/bmb-chat-bubbles.component';

@Component({
  selector: 'bmb-home-card-chat',
  standalone: true,
  imports: [BmbHomeCardComponent, BmbChatBarComponent, BmbChatBubblesComponent],
  templateUrl: './bmb-home-card-chat.component.html',
  styleUrl: './bmb-home-card-chat.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardChatComponent {
  title = input<string>('Asistente TecBot');
  subtitle = input<string>('Chat');
  icon = input<string>('smart_toy');
  isMobile = input<boolean>();
  placeholder = input<string>();
  botList = input<IBotType[]>();
  leftIcon = input<string>('chevron_left');
  bgIconAppearance = input<IBmbColor>('charade-500');
  messagesHistory = input.required<IBmbChatMessage[]>();

  currentBot = model<IBotType>();
  isLoading = model<boolean>(false);

  onClose = output();
  onBack = output();
  onSendMessage = output<string>();

  handleClose(): void {
    this.onClose.emit();
  }

  handleBack(): void {
    this.onBack.emit();
  }

  handleSend(message: string): void {
    this.onSendMessage.emit(message);
  }
}

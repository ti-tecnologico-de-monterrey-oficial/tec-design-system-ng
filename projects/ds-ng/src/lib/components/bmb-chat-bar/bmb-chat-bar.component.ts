import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IBotType } from './types';
import { defaultBotList } from './bot_list';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export { defaultBotList } from './bot_list';
export { IBotType } from './types';

@Component({
  selector: 'bmb-chat-bar',
  standalone: true,
  imports: [BmbIconComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './bmb-chat-bar.component.html',
  styleUrl: './bmb-chat-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbChatBarComponent {
  @Input() placeholder: string = '¿Qué deseas encontrar hoy?';
  @Input() botList: IBotType[] = defaultBotList;
  @Input() defaultBot: IBotType = {
    name: 'TecGPT',
    icon: '/assets/images/bot-icons/bot.png',
  };
  @Input() isLoading: boolean = false;

  @Output() onSendMessage: EventEmitter<string> = new EventEmitter<string>();
  @Output() onBotChange: EventEmitter<IBotType> = new EventEmitter<IBotType>();

  control = new FormControl();
  isDialogOpen = false;
  currentBot: IBotType = this.defaultBot;

  handleSend() {
    this.onSendMessage.emit(this.control.value);
    this.control.reset();
  }

  handleChangeBot(bot: IBotType) {
    this.currentBot = bot;
    this.isDialogOpen = false;
    this.onBotChange.emit(bot);
  }

  handleDialog() {
    this.isDialogOpen = !this.isDialogOpen;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
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
  placeholder = input<string>();
  botList = input<IBotType[]>();

  currentBot = model<IBotType>();
  isLoading = model<boolean>();

  onSendMessage = output<string>();

  control = new FormControl();
  isDialogOpen: boolean = false;
  defaultPlaceholder = computed(() => this.placeholder() ?? '¿Qué deseas encontrar hoy?');
  dBotList = computed(() => this.botList() ?? defaultBotList);

  ngOnInit(): void {
    this.currentBot.update((bot: IBotType = {
      name: 'TecGPT',
      icon: '/assets/images/bot-icons/bot.png',
    }): IBotType => bot);
  }

  handleSend() {
    this.onSendMessage.emit(this.control.value);
    this.isLoading.update( value => !value );
    this.control.reset();
  }

  handleChangeBot(bot: IBotType) {
    this.isDialogOpen = false;
    this.currentBot.set(bot);
  }

  handleDialog() {
    this.isDialogOpen = !this.isDialogOpen;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  BmbChatBarComponent,
  defaultBotList,
  type IBotType,
  type IChatBarActions,
} from 'ui-angular';

@Component({
  selector: 'app-chat-bar-page',
  imports: [BmbChatBarComponent],
  templateUrl: './chat-bar-page.html',
  styleUrl: './chat-bar-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatBarPage {
  readonly showEmoji = signal(false);
  readonly enableMicInput = signal(false);
  readonly disableChangeBot = signal(false);
  readonly disabledInput = signal(false);
  readonly isLoading = signal(false);
  readonly isBotSpeaking = signal(false);
  readonly disabledBotSpeaking = signal(false);
  readonly showFileAction = signal(false);
  readonly emptyBotList = signal(false);
  readonly placeholder = signal('Escribe un mensaje...');
  readonly emojiIcon = signal('mood');
  readonly botList = computed(() =>
    this.emptyBotList() ? [] : defaultBotList,
  );
  readonly actionsList = computed<IChatBarActions[]>(() =>
    this.showFileAction()
      ? [
          {
            name: 'Adjuntar archivo',
            label: 'Adjuntar archivo',
            icon: 'upload_file',
            action: () => {
              document.getElementById('inputFile')?.click();
            },
          },
        ]
      : [],
  );
  readonly currentBot = signal<IBotType | undefined>(undefined);
  readonly lastEvent = signal('Sin interacciones');

  updatePlaceholder(event: Event): void {
    this.placeholder.set((event.target as HTMLInputElement).value);
  }

  updateEmojiIcon(event: Event): void {
    this.emojiIcon.set((event.target as HTMLInputElement).value);
  }

  handleSendMessage(message: string): void {
    this.lastEvent.set(`onSendMessage: ${message}`);
  }

  handleSendFiles(files: File[]): void {
    this.lastEvent.set(`onSendFiles: ${files.map((file) => file.name).join(', ')}`);
  }

  handleRecord(recording: boolean): void {
    this.lastEvent.set(`onRecord: ${recording}`);
  }

  handleEmoji(open: boolean): void {
    this.lastEvent.set(`onEmoji: ${open}`);
  }

  handleCurrentBotChange(bot: IBotType | undefined): void {
    this.currentBot.set(bot);
    this.lastEvent.set(`currentBot: ${bot?.name ?? 'ninguno'}`);
  }
}

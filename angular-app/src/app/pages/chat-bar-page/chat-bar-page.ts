import { Component, signal } from '@angular/core';
import { type IBotType } from 'ui-angular';
import { PropertyPlayground } from '../migration/property-playground/property-playground';

@Component({
  selector: 'app-chat-bar-page',
  imports: [PropertyPlayground],
  templateUrl: './chat-bar-page.html',
  styles: [':host { display: block; min-height: 0; }'],
})
export class ChatBarPage {
  readonly showEmoji = signal(false);
  readonly enableMicInput = signal(false);
  readonly disableChangeBot = signal(false);
  readonly disabledInput = signal(false);
  readonly isLoading = signal(false);
  readonly currentBot = signal<IBotType | undefined>(undefined);
  readonly lastEvent = signal('Sin interacciones');

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

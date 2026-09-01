import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BmbBotIconComponent } from 'ui-angular';
import type { BmbBotIconName, BmbBotIconPreset } from 'ui-angular';

interface BotIconColorOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-bot-icon-page',
  imports: [BmbBotIconComponent],
  templateUrl: './bot-icon-page.html',
  styleUrl: './bot-icon-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BotIconPage {
  readonly presets: BmbBotIconPreset[] = [
    'bot_tecStandar',
    'bot_chatGPT',
    'bot_tecGPT',
    'bot_tecSchool',
    'bot_tecTech',
    'bot_tecSport',
    'bot_tecPhone',
    'bot_health',
    'bot_tecScience',
    'anthropic',
    'meta',
    'xai',
    'google',
    'empty',
  ];
  readonly colorOptions: BotIconColorOption[] = [
    { label: 'Blanco', value: '#ffffff' },
    { label: 'Azul Bamboo', value: '#0057b8' },
    { label: 'Negro', value: '#000000' },
    { label: 'Verde', value: '#16a34a' },
    { label: 'Rojo', value: '#dc2626' },
  ];
  readonly iconName = signal<BmbBotIconName>('bot_tecGPT');
  readonly iconColor = signal('#ffffff');

  setIconName(iconName: string): void {
    this.iconName.set(iconName);
  }

  setIconColor(color: string): void {
    this.iconColor.set(color);
  }
}

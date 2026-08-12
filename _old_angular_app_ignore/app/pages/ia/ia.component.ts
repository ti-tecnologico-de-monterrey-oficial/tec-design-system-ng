import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  BmbChatBarComponent,
  BmbVerticalLayoutDirective,
  BmbVerticalLayoutItemDirective,
  BmbCardComponent,
  BmbCardContentComponent,
  IChatBarActions,
} from '../../../../projects/ds-ng/src/public-api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-ia',
  standalone: true,
  imports: [
    BmbChatBarComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    CommonModule,
    BmbCardComponent,
    BmbCardContentComponent,
  ],
  templateUrl: './ia.component.html',
  styleUrl: './ia.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IaComponent {
  botList = [
    {
      name: 'TecBot',
      label: 'Tecbot Standard',
      icon: 'bot_tecStandar',
    },
    { name: 'ChatGPT', label: 'ChatGPT', icon: 'bot_chatGPT' },
    {
      name: 'TecGPT',
      label: 'TecGPT',
      icon: 'bot_tecGPT',
    },
    { name: 'Comment', label: 'Comment', icon: 'comment' },
    { name: 'New', label: 'New', icon: 'new' },
    { name: 'BotSchool', label: 'Tecbot school', icon: 'bot_tecSchool' },
    { name: 'BotTech', label: 'Tecbot tech', icon: 'bot_tecTech' },
    { name: 'BotSport', label: 'Tecbot sport', icon: 'bot_tecSport' },
    { name: 'BotPhone', label: 'Tecbot phone', icon: 'bot_tecPhone' },
    { name: 'BotMedic', label: 'Tecbot healt', icon: 'bot_health' },
    { name: 'BotScience', label: 'Tecbot science', icon: 'bot_tecScience' },
    { name: 'Empty', label: 'Empty', icon: 'empty' },
    { name: 'Anthropic', label: 'Anthropic', icon: 'anthropic' },
    { name: 'Meta', label: 'Meta', icon: 'meta' },
    { name: 'Xai', label: 'Xai', icon: 'xai' },
    { name: 'Google', label: 'Google', icon: 'google' },
  ];

  actionsList: IChatBarActions[] = [
    {
      name: 'Adjuntar archivo',
      label: 'Adjuntar archivo',
      icon: 'attach_file',
      action: () => {
        console.log('Adjuntar archivo');
      },
    },
  ];
}

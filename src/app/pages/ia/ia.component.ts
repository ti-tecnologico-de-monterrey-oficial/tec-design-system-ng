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
      icon: '/assets/images/bot-icons/bot_tecStandar.svg',
    },
    {
      name: 'ChatGPT',
      icon: '/assets/images/bot-icons/bot_tecGPT.svg',
    },
    {
      name: 'Comment',
      icon: '/assets/images/bot-icons/comment.svg',
    },
    {
      name: 'New',
      icon: '/assets/images/bot-icons/new.svg',
    },
    {
      name: 'BotSchool',
      icon: '/assets/images/bot-icons/bot_tecSchool.svg',
    },
    {
      name: 'BotTech',
      icon: '/assets/images/bot-icons/bot_tecTech.svg',
    },
    {
      name: 'BotSport',
      icon: '/assets/images/bot-icons/bot_tecSport.svg',
    },
    {
      name: 'BotPhone',
      icon: '/assets/images/bot-icons/bot_tecPhone.svg',
    },
    {
      name: 'BotMedic',
      icon: '/assets/images/bot-icons/bot_health.svg',
    },
    {
      name: 'BotScience',
      icon: '/assets/images/bot-icons/bot_tecScience.svg',
    },
    {
      name: 'Backup',
      icon: '/assets/images/bot-icons/backup.svg',
    },
  ];

  actionsList: IChatBarActions[] = [
    {
      name: 'Adjuntar archivo',
      icon: 'attach_file',
      action: () => {
        console.log('Adjuntar archivo');
      },
    },
  ];
}

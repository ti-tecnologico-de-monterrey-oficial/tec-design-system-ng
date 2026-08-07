import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import {
  BmbChatBarComponent,
  defaultBotList,
  IBotType,
  IChatBarActions,
} from '../bmb-chat-bar/bmb-chat-bar.component';
import { IBmbColor } from '@shared/types/colors';
import {
  IBmbChatActionEvent,
  IBmbChatMessage,
  TChatAction,
} from '../bmb-chat-bubbles/types';
import {
  BmbChatBubblesComponent,
  IBmbChatBubblesActions,
} from '../bmb-chat-bubbles/bmb-chat-bubbles.component';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbProjectionContentService } from '../../../services/old/projection/projection.service';
import { CommonModule } from '@angular/common';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { IBmbActionHeader } from '@shared/types';
import { BmbActionMenuComponent } from '../bmb-action-menu/bmb-action-menu.component';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';
import { BmbTranslationsService } from '../../../services/translations/translations.service';

export type IBmbHomeCardChatMode = 'compact' | 'chat' | 'expanded';

@Component({
  selector: 'bmb-home-card-chat',
  standalone: true,
  imports: [
    CommonModule,
    BmbHomeCardComponent,
    BmbChatBarComponent,
    BmbChatBubblesComponent,
    TranslatePipe,
    BmbActionIconComponent,
    BmbBotIconComponent,
    BmbActionMenuComponent,
    BmbItemComponent,
  ],
  templateUrl: './bmb-home-card-chat.component.html',
  styleUrl: './bmb-home-card-chat.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardChatComponent {
  subtitle = input<string>();
  isMobile = input<boolean>(false);
  placeholder = input<string>('');
  botList = input<IBotType[]>(defaultBotList);
  leftIcon = input<string>('chevron_left');
  bgIconAppearance = input<IBmbColor>('gray-charade-500');
  messagesHistory = input.required<IBmbChatMessage[]>();
  actionsList = input<IChatBarActions[]>([]);
  componentTitle = input<string>('');
  testId = input<string>('chat-bubble');
  botActions = input<TChatAction[]>([
    'copy',
    'dislike',
    'like',
    'repeat',
    'voice',
  ]);

  title = input<string>(''); // deprecated

  currentBot = model<IBotType>({
    name: 'TecBot',
    label: 'Tecbot Standard',
    icon: 'bot_tecStandar',
  });
  isLoading = model<boolean>(false);
  mode = model<'compact' | 'chat' | 'expanded'>('expanded');

  getBubbleAction = output<IBmbChatActionEvent>();
  getClose = output();
  getBack = output();
  getSendMessage = output<string>();
  getNewChat = output<boolean>();
  getExpand = output<any>();

  private translationService = inject(BmbTranslationsService);
  private contentProjected: BmbProjectionContentService = inject(BmbProjectionContentService);

  parsedBotActions = computed<IBmbChatBubblesActions[]>(() => {
    const newActions = this.botActions();
    return newActions.map((action) => {
      switch (action) {
        case 'repeat':
          return {
            key: 'repeat',
            icon: 'repeat',
            label: this.translationService.translate('chat_bubbles.repeat'),
          };
        case 'voice':
          return {
            key: 'voice',
            icon: 'record_voice_over',
            label: this.translationService.translate('chat_bubbles.voice'),
          };
        case 'copy':
          return {
            key: 'copy',
            icon: 'content_copy',
            label: this.translationService.translate('chat_bubbles.copy'),
          };
        case 'like':
          return {
            key: 'like',
            icon: 'thumb_up',
            label: this.translationService.translate('chat_bubbles.like'),
          };
        case 'dislike':
          return {
            key: 'dislike',
            icon: 'thumb_down',
            label: this.translationService.translate('chat_bubbles.dislike'),
          };
        default:
          throw new Error('Action name not supported');
      }
    });
  });

  @ViewChild('contentTemplate') contentTemplate!: TemplateRef<any>;
  @ViewChild('chatBarActionsTemplate', { static: true })
  chatBarTemplate!: TemplateRef<any>;
  private chatCardChatId = 'chatCardChat';

  chatActionHeaders = computed<IBmbActionHeader[]>(() => {
    if (this.mode() !== 'chat') {
      return [];
    }

    return [
      {
        icon: 'more_vert',
        action: () => this.handleAddDialog(event),
      },
    ];
  });

  constructor() {
    effect(
      () => {
        if (this.mode() === 'chat') {
          if (!this.isChatCardOpen()) {
            this.contentProjected.openContent({
              id: this.chatCardChatId,
              content: this.contentTemplate,
              dialogClass: ['bmb_chat-card-chat'],
              focusOnOpen: true,
            });
          }
        } else {
          if (this.isChatCardOpen()) {
            this.contentProjected.closeContent(this.chatCardChatId);
          }
        }
      },
      { allowSignalWrites: true },
    );
  }

  handleChat(event?: Event): void {
    if (this.isChatCardOpen()) {
      this.contentProjected.closeContent(this.chatCardChatId);
      this.closeChat();
    }

    this.getExpand.emit(event);
  }

  handleClose(): void {
    if (this.isChatCardOpen()) {
      this.contentProjected.closeContent(this.chatCardChatId);
      this.closeChat();
    }

    this.getClose.emit();
  }

  handleBack(): void {
    this.getBack.emit();
  }

  handleSend(message: string): void {
    this.getSendMessage.emit(message);
  }

  openChatFromCompact(): void {
    this.mode.set('chat');

    if (this.isChatCardOpen()) {
      return;
    }

    this.contentProjected.openContent({
      id: this.chatCardChatId,
      content: this.contentTemplate,
      dialogClass: ['bmb_chat-card-chat'],
      focusOnOpen: true,
    });
  }

  closeChat(): void {
    if (!this.isChatCardOpen()) {
      this.mode.set('compact');
      return;
    }

    this.contentProjected.closeContent(this.chatCardChatId);

    queueMicrotask(() => {
      this.mode.set('compact');
    });
  }

  handleAddDialog(event?: Event): void {
    const dialogId = 'chatBarActionsDialog';

    if (this.contentProjected.isContentOpen(dialogId)) {
      return;
    }

    const data = {
      id: dialogId,
      content: this.chatBarTemplate,
      targetRef: event?.target as HTMLHtmlElement,
      focusOnOpen: true,
      showBackdrop: false,
    };
    this.contentProjected.openContent(data);
  }

  isChatCardOpen(): boolean {
    return this.contentProjected.isContentOpen(this.chatCardChatId);
  }

  handleExpand(): void {
    this.contentProjected.closeContent();
    this.mode.set('expanded');
  }

  handleNewText(): void {
    this.getNewChat.emit(true);
  }

  resolveGptIcons(message: IBmbChatMessage): boolean {
    return !message.isUserMessage;
  }

  resolveGptBot(message: IBmbChatMessage): boolean {
    return !message.isUserMessage;
  }

  resolveThinking(message: IBmbChatMessage, index: number): boolean {
    const isLast = index === this.messagesHistory().length - 1;

    return !message.isUserMessage && this.isLoading() && isLast;
  }

  resolveTestId(message: IBmbChatMessage, index: number): string {
    return `${this.testId()}-bubble-${message.id ?? index}`;
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
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
import { IBmbColor } from '../../types/colors';
import { IBmbChatMessage } from '../bmb-chat-bubbles/types';
import { BmbChatBubblesComponent } from '../bmb-chat-bubbles/bmb-chat-bubbles.component';
import { TranslatePipe } from '../../pipes/translations';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { CommonModule } from '@angular/common';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { IBmbActionHeader } from '../../types';
import { BmbActionMenuComponent } from '../bmb-action-menu/bmb-action-menu.component';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';

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

  title = input<string>(''); // deprecated

  currentBot = model<IBotType>({
    name: 'TecBot',
    label: 'Tecbot Standard',
    icon: 'bot_tecStandar',
  });
  isLoading = model<boolean>(false);
  mode = model<'compact' | 'chat' | 'expanded'>('expanded');

  getClose = output();
  getBack = output();
  getSendMessage = output<string>();
  getNewChat = output<boolean>();
  getExpand = output<any>();

  @ViewChild('contentTemplate') contentTemplate!: TemplateRef<any>;
  @ViewChild('chatBarActionsTemplate', { static: true })
  chatBarTemplate!: TemplateRef<any>;
  private chatCardChatId: string = 'chatCardChat';

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

  constructor(private contentProjected: BmbProjectionContentService) {
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
}

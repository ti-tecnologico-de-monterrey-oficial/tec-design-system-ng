import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  input,
  model,
  output,
  signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import {
  BmbChatBarComponent,
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
import { IBmbActionHeader, IDropdownItem } from '../../types';
import { BmbActionMenuComponent } from '../bmb-action-menu/bmb-action-menu.component';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';
import { BmbDropdownContentComponent } from '../utils/bmb-dropdown-content/bmb-dropdown-content.component';

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
  @ViewChild('contentTemplate') contentTemplate!: TemplateRef<any>;
  @ViewChild('chatBarActionsTemplate', { static: true })
  chatBarTemplate!: TemplateRef<any>;
  // @ViewChild('contentDiv', { static: true }) contentRef!: ElementRef<any>;

  title = input<string>();
  subtitle = input<string>();
  icon = input<string>('smart_toy');
  isMobile = input<boolean>(false);
  placeholder = input<string>('');
  botList = input<IBotType[]>([]);
  leftIcon = input<string>('chevron_left');
  bgIconAppearance = input<IBmbColor>('gray-charade-500');
  messagesHistory = input.required<IBmbChatMessage[]>();
  actionsList = input<IChatBarActions[]>([]);

  currentBot = model<IBotType>();
  isLoading = model<boolean>(false);
  mode = model<'compact' | 'chat' | 'expanded'>('expanded');

  onClose = output();
  onBack = output();
  onSendMessage = output<string>();
  onNewChat = output<boolean>();

  private chatCardChatId: string = 'chatCardChat';
  isExpanded = signal<boolean>(false);

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
            this.isExpanded.set(this.isChatCardOpen());
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

  handleChat(): void {
    if (this.isChatCardOpen()) {
      this.contentProjected.closeContent(this.chatCardChatId);
      this.closeChat();
      this.onClose.emit();
    }
  }

  handleClose(): void {
    if (this.isChatCardOpen()) {
      this.contentProjected.closeContent(this.chatCardChatId);
      this.closeChat();
    }

    this.onClose.emit();
  }

  handleBack(): void {
    this.onBack.emit();
  }

  handleSend(message: string): void {
    this.onSendMessage.emit(message);
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
    console.info('handleAddDialog', event);

    if (this.contentProjected.isContentOpen(dialogId)) {
      return;
    }

    const data = {
      id: dialogId,
      content: this.chatBarTemplate,
      targetRef: event?.target as HTMLHtmlElement,
      // outputContext: {
      //   clickedItem: () => {
      //     this.contentProjected.closeContent(dialogId);
      //   },
      // },
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
    this.onNewChat.emit(true);
  }
}

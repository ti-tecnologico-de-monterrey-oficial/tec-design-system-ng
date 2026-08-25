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
} from '../bmb-chat-bar/bmb-chat-bar.component';
import { IBmbColor } from '../../../_shared/types/colors';

import { TranslatePipe } from '../../../pipes/translations';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbProjectionContentService } from '../../../services/old/projection/projection.service';
import { CommonModule } from '@angular/common';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { IBmbActionHeader } from '../../../_shared/types';
import { BmbAiChatBubbleComponent } from '../bmb-ai-chat-bubble/bmb-ai-chat-bubble.component';

export type IBmbHomeCardChatMode = 'compact' | 'chat' | 'expanded';

@Component({
  selector: 'bmb-ai-chat-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbHomeCardComponent,
    BmbChatBarComponent,
    TranslatePipe,
    BmbActionIconComponent,
    BmbBotIconComponent,
    BmbAiChatBubbleComponent,
  ],
  templateUrl: './bmb-ai-chat-card.component.html',
  styleUrl: './bmb-ai-chat-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAIChatCardComponent {
  subtitle = input<string>();
  isMobile = input<boolean>(false);
  placeholder = input<string>('');
  bgIconAppearance = input<IBmbColor>('gray-charade-500');
  componentTitle = input<string>('');
  testId = input<string>('ai-chat-bubble');
  headerActions = input<IBmbActionHeader[]>([]);

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
  getExpanded = output<boolean>();

  private contentProjected: BmbProjectionContentService = inject(
    BmbProjectionContentService,
  );

  botList: IBotType[] = defaultBotList;

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

  handleChat(): void {
    if (this.isChatCardOpen()) {
      this.contentProjected.closeContent(this.chatCardChatId);
      this.closeChat();
    }

    this.getExpanded.emit(this.isChatCardOpen());
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
}

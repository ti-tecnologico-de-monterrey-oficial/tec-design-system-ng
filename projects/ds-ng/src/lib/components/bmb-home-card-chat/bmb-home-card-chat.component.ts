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
  IBotType,
  IChatBarActions,
} from '../bmb-chat-bar/bmb-chat-bar.component';
import { IBmbColor } from '../../types/colors';
import { IBmbChatMessage } from '../bmb-chat-bubbles/types';
import { BmbChatBubblesComponent } from '../bmb-chat-bubbles/bmb-chat-bubbles.component';
import { TranslatePipe } from '../../pipes/translations';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../services/projection/projection.service';
import { CommonModule } from '@angular/common';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { IBmbActionHeader } from '../../types';

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
  ],
  templateUrl: './bmb-home-card-chat.component.html',
  styleUrl: './bmb-home-card-chat.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHomeCardChatComponent {
  @ViewChild('contentTemplate') contentTemplate!: TemplateRef<any>;

  title = input<string>();
  subtitle = input<string>();
  icon = input<string>('smart_toy');
  isMobile = input<boolean>(false);
  placeholder = input<string>('');
  botList = input<IBotType[]>([]);
  leftIcon = input<string>('chevron_left');
  bgIconAppearance = input<IBmbColor>('charade-500');
  messagesHistory = input.required<IBmbChatMessage[]>();
  mode = model<'compact' | 'chat' | 'expanded'>('expanded');

  actionsList = input<IChatBarActions[]>([]);

  currentBot = model<IBotType>();
  isLoading = model<boolean>(false);

  onClose = output();
  onBack = output();
  onSendMessage = output<string>();

  showHeaderRightButton = computed(() => this.mode() !== 'chat');

  chatActionHeaders = computed<IBmbActionHeader[]>(() => {
    if (this.mode() !== 'chat') {
      return [];
    }

    return [
      {
        icon: 'zoom_in_map',
        isToggleActive: false,
        iconActiveToggle: 'close',
        action: () => this.closeChat(),
      },
    ];
  });

  constructor(private contentProjected: BmbProjectionContentService) {
    const CHAT_ID = 'chatCardChat';

    effect(
      () => {
        const currentMode = this.mode();
        const isChatOpen = this.contentProjected.isDialogOpen(CHAT_ID);
        if (currentMode === 'chat' && !isChatOpen) {
          this.contentProjected.openContent({
            id: CHAT_ID,
            content: this.contentTemplate,
            dialogClass: ['bmb_chat-card-chat'],
            focusOnOpen: true,
          });
        }
        if (currentMode !== 'chat' && isChatOpen) {
          this.contentProjected.closeContent(CHAT_ID);
        }
      },
      { allowSignalWrites: true },
    );
  }

  handleClose(): void {
    this.onClose.emit();
  }

  handleBack(): void {
    this.onBack.emit();
  }

  handleSend(message: string): void {
    this.onSendMessage.emit(message);
  }

  openChatFromCompact(): void {
    const dialogId = 'chatCardChat';

    this.mode.set('chat');

    if (this.contentProjected.isDialogOpen(dialogId)) {
      return;
    }

    this.contentProjected.openContent({
      id: dialogId,
      content: this.contentTemplate,
      dialogClass: ['bmb_chat-card-chat'],
      focusOnOpen: true,
    });
  }

  closeChat(): void {
    const dialogId = 'chatCardChat';

    if (!this.contentProjected.isDialogOpen(dialogId)) {
      this.mode.set('compact');
      return;
    }

    this.contentProjected.closeContent(dialogId);

    queueMicrotask(() => {
      this.mode.set('compact');
    });
  }
}

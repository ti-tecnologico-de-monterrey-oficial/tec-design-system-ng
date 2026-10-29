import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  inject,
  input,
  model,
  OnDestroy,
  TemplateRef,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { BmbHomeCardComponent } from '../bmb-home-card/bmb-home-card.component';
import {
  BmbChatBarComponent,
  IBotType,
} from '../bmb-chat-bar/bmb-chat-bar.component';
import { IBmbColor } from '../../_shared/types/colors';

import { TranslatePipe } from '../../pipes/translations';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { CommonModule } from '@angular/common';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { IBmbActionHeader } from '../../_shared/types';
import { getUUID } from '../../_shared/logic/utils';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import {
  IBMB_AI_CHAT_CARD_MODE,
  IBmbAIChatCardMode,
} from '../../_shared/types/components/ai-chat-card';
import {
  getNextAIChatCardMode,
  isChatAIChatCardMode,
  isCompactAIChatCardMode,
  isConversationDisabledAIChatCardMode,
  isConversationEnabledAIChatCardMode,
  isExpandedAIChatCardMode,
} from '../../_shared/logic/components/ai-chat-card';

@Component({
  selector: 'bmb-ai-chat-card',
  standalone: true,
  imports: [
    CommonModule,
    BmbHomeCardComponent,
    TranslatePipe,
    BmbActionIconComponent,
    BmbBotIconComponent,
  ],
  templateUrl: './bmb-ai-chat-card.component.html',
  styleUrl: './bmb-ai-chat-card.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbAIChatCardComponent implements AfterViewInit, OnDestroy {
  private readonly translationService = inject(BmbTranslationsService);

  bgIconAppearance = input<IBmbColor>('gray-charade-500');
  componentTitle = input<string>('');
  subtitle = input<string>();
  headerActions = input<IBmbActionHeader[]>([]);
  testId = input<string>(`ai_chat_card_test_${getUUID()}`);
  currentBot = model<IBotType>({
    name: 'TecBot',
    label: this.translationService.translate('chat_bar.default_bot_label'),
    icon: 'bot_tecStandar',
  });

  mode = model<IBmbAIChatCardMode>(IBMB_AI_CHAT_CARD_MODE.COMPACT);

  private contentProjected: BmbProjectionContentService = inject(
    BmbProjectionContentService,
  );

  private aiChatContent = viewChild<TemplateRef<any>>('aiChatContent');
  private aiChatBubblesContainer = viewChild<ElementRef<HTMLElement>>(
    'aiChatBubblesContainer',
  );
  private aiChatBubblesObserver?: MutationObserver;
  private aiChatBarContainer =
    viewChild<ElementRef<HTMLElement>>('aiChatBarContainer');

  private aiChatBar = contentChildren(BmbChatBarComponent);
  protected isOneChatBar = computed(() => this.aiChatBar().length === 1);
  protected headerActionList = computed(() =>
    isChatAIChatCardMode(this.mode())
      ? [
          {
            icon: 'minimize',
            tooltipText:
              this.translationService.translate('home_card.collapse'),
            action: () => this.handleMinimize(),
          },
          ...this.headerActions(),
        ]
      : [],
  );

  private aiChatId = 'ai_chat_bar_actions_dialog';
  /**  Preserves the mode to return to when collapsing the chat.*/
  private lastConversationDisabledMode: IBmbAIChatCardMode =
    IBMB_AI_CHAT_CARD_MODE.COMPACT;

  ngAfterViewInit(): void {
    const _length = this.aiChatBar().length;

    if (_length !== 1) {
      console.error(
        `Remember that there must be exactly one bmb-chat-bar; ${_length} were found. The component will not render.`,
      );
    }
  }

  ngOnDestroy(): void {
    this.aiChatBubblesObserver?.disconnect();
  }

  private scrollBubblesToBottom(): void {
    const container = this.aiChatBubblesContainer()?.nativeElement;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  }

  private observeBubblesContainer(container: HTMLElement): void {
    this.aiChatBubblesObserver?.disconnect();
    this.aiChatBubblesObserver = new MutationObserver(() =>
      this.scrollBubblesToBottom(),
    );
    this.aiChatBubblesObserver.observe(container, {
      childList: true,
      subtree: true,
    });
  }

  private focusChatBarInput(): void {
    const container = this.aiChatBarContainer()?.nativeElement;
    const input = container?.querySelector<HTMLElement>(
      'input, textarea, [contenteditable="true"]',
    );
    input?.focus();
  }

  constructor() {
    effect(() => {
      /**Handle - Track last mode when is invisible or compact to restore it */
      if (isConversationDisabledAIChatCardMode(this.mode())) {
        this.lastConversationDisabledMode = this.mode();
      }
    });

    effect(() => {
      /**Handle - Auto-scroll "AI chat bubbles" to bottom on new content */
      const container = this.aiChatBubblesContainer()?.nativeElement;

      if (container) {
        this.observeBubblesContainer(container);
        this.scrollBubblesToBottom();
      } else {
        this.aiChatBubblesObserver?.disconnect();
      }
    });

    effect(() => {
      /**Handle - Focus "AI chat bar" input when the bar container becomes available */
      const container = this.aiChatBarContainer()?.nativeElement;

      if (container && isConversationEnabledAIChatCardMode(this.mode())) {
        queueMicrotask(() => this.focusChatBarInput());
      }
    });

    effect(() => {
      /**Handle - Content projection  */
      const content = this.aiChatContent();

      if (isChatAIChatCardMode(this.mode())) {
        if (!content) return;
        if (!this.contentProjected.isContentOpen(this.aiChatId)) {
          this.contentProjected.openContent({
            id: this.aiChatId,
            showBackdrop: false,
            content,
            dialogClass: ['bmb_ai-chat-card-dialog'],
            focusOnOpen: true,
            afterCloseContent: () => {
              if (isChatAIChatCardMode(this.mode())) {
                this.mode.set(this.lastConversationDisabledMode);
              }
            },
          });
        }
      } else if (this.contentProjected.isContentOpen(this.aiChatId)) {
        this.contentProjected.closeContent(this.aiChatId);
      }
    });
  }

  protected openChat(): void {
    this.mode.set(IBMB_AI_CHAT_CARD_MODE.CHAT);
  }

  protected handleExpand(): void {
    this.mode.set(IBMB_AI_CHAT_CARD_MODE.EXPANDED);
  }

  protected handleMinimize(): void {
    this.mode.set(this.lastConversationDisabledMode);
  }

  protected handleExpandOrContract(): void {
    this.mode.update((value) => {
      return getNextAIChatCardMode(value);
    });
  }

  protected isCompactMode(): boolean {
    return isCompactAIChatCardMode(this.mode());
  }

  protected isExpandedMode(): boolean {
    return isExpandedAIChatCardMode(this.mode());
  }
}

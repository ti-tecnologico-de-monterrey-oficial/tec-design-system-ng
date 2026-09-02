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
import { BmbProjectionContentService } from '../../services/old/projection/projection.service';
import { CommonModule } from '@angular/common';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { IBmbActionHeader } from '../../_shared/types';
import { getUUID } from '../../_shared/logic/utils';
import { BmbTranslationsService } from '../../services/translations/translations.service';

export const BMB_AI_CHAT_CARD_MODE_LIST: string[] = [
  'compact',
  'chat',
  'expanded',
  'invisible',
] as const;

export type IBmbAIChatCardMode = (typeof BMB_AI_CHAT_CARD_MODE_LIST)[number];

/*
 * TODO: This component is marked as "old" and its decommissioning is planned for future updates.
 */

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
  bgIconAppearance = input<IBmbColor>('gray-charade-500');
  componentTitle = input<string>('');
  subtitle = input<string>();
  headerActions = input<IBmbActionHeader[]>([]);
  testId = input<string>(`ai_chat_card_test_${getUUID()}`);
  currentBot = model<IBotType>({
    name: 'TecBot',
    label: 'Tecbot Standard',
    icon: 'bot_tecStandar',
  });

  mode = model<IBmbAIChatCardMode>('expanded');

  private contentProjected: BmbProjectionContentService = inject(
    BmbProjectionContentService,
  );
  private readonly translationService = inject(BmbTranslationsService);

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
    this.mode() === 'chat'
      ? [
          {
            icon: 'zoom_out_map',
            tooltipText: this.translationService.translate('home_card.expand'),
            action: () => this.handleExpand(),
          },
          ...this.headerActions(),
        ]
      : [],
  );

  private aiChatId = 'ai_chat_bar_actions_dialog';
  /**  Preserves the mode to return to when collapsing the chat.*/
  private lastNonChatMode: IBmbAIChatCardMode = 'expanded';

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
      /**Handle - Track last non-'chat' mode so contract can restore it */
      const mode = this.mode();

      if (mode !== 'chat') {
        this.lastNonChatMode = mode;
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
      const mode = this.mode();

      if (container && (mode === 'chat' || mode === 'expanded')) {
        queueMicrotask(() => this.focusChatBarInput());
      }
    });

    effect(() => {
      /**Handle - Content projection  */
      const content = this.aiChatContent();
      const mode = this.mode();

      if (mode === 'chat') {
        if (!content) return;

        this.contentProjected.openContent({
          id: this.aiChatId,
          content,
          dialogClass: ['bmb_ai-chat-card-dialog'],
          focusOnOpen: true,
        });
      } else if (
        mode === 'compact' ||
        mode === 'expanded' ||
        mode === 'invisible'
      ) {
        if (this.contentProjected.isContentOpen(this.aiChatId)) {
          this.contentProjected.closeContent(this.aiChatId);
        }
      }
    });
  }

  protected openChat(): void {
    this.mode.set('chat');
  }

  protected handleExpand(): void {
    this.mode.set('expanded');
  }

  protected handleExpandOrContract(): void {
    this.mode.update((value) => {
      if (value === 'compact' || value === 'invisible') return 'chat';
      if (value === 'chat') {
        return this.lastNonChatMode === 'invisible' ? 'invisible' : 'compact';
      }
      if (value === 'expanded') return 'chat';
      return 'expanded';
    });
  }
}

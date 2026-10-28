import { CommonModule } from '@angular/common';
import type { OnInit } from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
  signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  getChatBarTextareaHeight,
  shouldSendChatBarMessage,
} from '../../_shared/logic/components/chat-bar';
import { defaultBotList } from '../../_shared/logic/components/chat-bar-defaults';
import type { IBmbNativeModal } from '../../_shared/types';
import type {
  IBotType,
  IChatBarActions,
} from '../../_shared/types/components/chat-bar';
import { ClickOutsideDirective } from '../../directives/click-outside/clickoutside.directive';
import { TranslatePipe } from '../../pipes/translations';
import { BmbNativeModalService } from '../../services/old/modal/native-modal.service';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../services/old/projection/projection.service';
import { BmbTranslationsService } from '../../services/translations/translations.service';
import { BmbFileAttachmentPicker } from '../bmb-file-attachment-picker/bmb-file-attachment-picker.component';
import {
  BmbChatAttachmentsService,
  provideBmbChatAttachments,
} from '../../services/chat-attachments/chat-attachments.service';
import type { BmbChatAttachmentResult } from '../../services/chat-attachments/chat-attachments.service';
import { getUUID } from '../../_shared/logic/utils';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbActionMenuComponent } from '../bmb-action-menu/bmb-action-menu.component';
import { BmbBotIconComponent } from '../bmb-bot-icon/bmb-bot-icon.component';
import { BmbDotPaginatorComponent } from '../bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';

export { defaultActionList, defaultBotList } from '../../_shared/logic/components/chat-bar-defaults';
export type { IBotType, IChatBarActions } from '../../_shared/types/components/chat-bar';

@Component({
  selector: 'bmb-chat-bar',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    BmbBotIconComponent,
    BmbIconComponent,
    BmbDotPaginatorComponent,
    BmbActionIconComponent,
    ClickOutsideDirective,
    BmbActionMenuComponent,
    BmbItemComponent,
    TranslatePipe,
    BmbFileAttachmentPicker,
  ],
  templateUrl: './bmb-chat-bar.component.html',
  styleUrl: './bmb-chat-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideBmbChatAttachments()],
})
export class BmbChatBarComponent implements OnInit {
  placeholder = input<string>('');
  botList = input<IBotType[]>(defaultBotList);
  actionsList = input<IChatBarActions[]>([]);
  showEmoji = input<boolean>(false);
  emojiIcon = input<string>('');
  enableMicInput = input<boolean>(false);
  disableChangeBot = input<boolean>(false);
  acceptedExtensions = input<string[]>();
  maxFileSize = input<number>(2);
  disabledInput = model<boolean>(false);
  files = model<File[]>([]);

  currentBot = model<IBotType>();
  isLoading = model<boolean>(false);
  isBotSpeaking = model<boolean>(false);
  disabledBotSpeaking = model<boolean>(false);

  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onSendMessage = output<string>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onSendFiles = output<File[]>();
  readonly attachmentResult = output<BmbChatAttachmentResult>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onRecord = output<boolean>();
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  onEmoji = output<boolean>();

  control = new FormControl();
  isDialogOpen = signal<boolean>(false);
  showMicControls = false;
  onDragFiles = false;
  botChunks = computed(() => {
    const chunks: IBotType[][] = [];
    for (let i = 0; i < (this.botList()?.length ?? 0); i += 6) {
      chunks.push(this.botList()?.slice(i, i + 6) ?? []);
    }
    return chunks;
  });
  totalDots = computed(() => this.botChunks()?.length ?? 0);
  activeDot = 0;
  actionListPagination: any[] = [];
  modalID = signal<string | null>(null);

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('chatBarTemplate') chatBarTemplate!: TemplateRef<unknown>;
  @ViewChild('mobileBotSelectorTemplate')
  mobileBotSelectorTemplate!: TemplateRef<unknown>;

  private readonly contentProjected: BmbProjectionContentService = inject(
    BmbProjectionContentService,
  );
  private readonly nativeModalService: BmbNativeModalService = inject(
    BmbNativeModalService,
  );
  private readonly translationsService = inject(BmbTranslationsService);
  private readonly attachments = inject(BmbChatAttachmentsService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly attachmentSourceId = getUUID();
  protected readonly fileResult = computed(() =>
    this.attachments.result(this.attachmentSourceId),
  );

  protected readonly _disabledInput = computed<boolean>(
    () => this.isLoading() || this.disabledInput(),
  );

  private readonly _syncDisabledState = effect(() => {
    if (this._disabledInput()) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
  });

  ngOnInit(): void {
    this.destroyRef.onDestroy(
      this.attachments.registerDraft(
        {
          read: () => this.files(),
          write: (files) => this.files.set(files),
          rules: () => ({
            acceptedFormats: this.acceptedExtensions(),
            maxFileSize: this.maxFileSize(),
          }),
        },
        this.attachmentSourceId,
      ),
    );
    this.currentBot.update(
      (
        bot: IBotType = {
          name: 'TecBot',
          label: this.translationsService.translate('chat_bar.default_bot_label'),
          icon: 'bot_tecStandar',
        },
      ): IBotType => bot,
    );
  }

  handleSend(): void {
    this.onSendMessage.emit(this.control.value);
    if (this.files().length > 0) {
      this.onSendFiles.emit(this.files());
    }
    this.isLoading.update((value) => !value);
    this.control.reset();
    this.attachments.clear(this.attachmentSourceId);
    this.textareaRef.nativeElement.style.height = 'calc(1lh + 2rem)';
  }

  handleChangeBot(bot: IBotType): void {
    this.isDialogOpen.set(false);
    this.currentBot.set(bot);
  }

  handleMobileChangeBot(bot: IBotType): void {
    this.nativeModalService.closeModal(this.modalID() as string);
    this.modalID.set(null);
    this.currentBot.set(bot);
  }

  handleDialog(): void {
    if ((this.botList()?.length ?? 0) > 0) {
      if (window.innerWidth > 1000) {
        this.isDialogOpen.update((value) => !value);
      } else {
        const data: IBmbNativeModal = {
          content: this.mobileBotSelectorTemplate,
          size: 'small',
          title: this.translationsService.translate('chat_bar.select_bot'),
        };

        this.modalID.set(this.nativeModalService.openModal(data));
      }
    }
  }

  handleMic(): void {
    this.showMicControls = !this.showMicControls;
    this.onRecord.emit(true);
  }

  handleStopMic(): void {
    this.showMicControls = !this.showMicControls;
    this.onRecord.emit(false);
  }

  handleAddDialog(event: MouseEvent | KeyboardEvent): void {
    const data: IBmbProjectionContent = {
      content: this.chatBarTemplate,
      targetRef: event.target as HTMLElement,
      fixSizeToRef: false,
    };

    this.contentProjected.openContent(data);
  }

  handleFilesSelected(): void {
    this.contentProjected.closeContent();
  }

  handleAttachmentChanges(files: File[]): void {
    const result = this.attachments.select(
      files,
      {
        acceptedFormats: this.acceptedExtensions(),
        maxFileSize: this.maxFileSize(),
      },
      this.attachmentSourceId,
      true,
    );
    this.attachmentResult.emit(result);
  }

  handleDotPress(index: number): void {
    this.activeDot = index;
  }

  handleEmoji(): void {
    this.onEmoji.emit(true);
  }

  handleRecord(): void {
    this.onRecord.emit(true);
  }

  handleClickOutside(): void {
    this.isDialogOpen.set(false);
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (shouldSendChatBarMessage(event.key, event.shiftKey)) {
      event.preventDefault();
      this.handleSend();
    }
  }

  autoResize(): void {
    const textarea = this.textareaRef.nativeElement;

    textarea.style.height = 'auto';

    textarea.style.height = getChatBarTextareaHeight(textarea.scrollHeight);
  }

  handleDisableBotSpeaking(): void {
    this.isBotSpeaking.set(false);
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  model,
  output,
  signal,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IBotType, IChatBarActions } from './types';
import { defaultBotList } from './bot_list';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbDotPaginatorComponent } from '../bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import { BmbActionMenuComponent } from '../bmb-action-menu/bmb-action-menu.component';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';
import { BmbNativeModalService } from '../../services/modal/native-modal.service';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../services/projection/projection.service';
import { IBmbNativeModal } from '../bmb-modal/bmb-modal.interface';
import { TranslatePipe } from '../../pipes/translations';

export { defaultBotList, defaultActionList } from './bot_list';
export { IBotType, IChatBarActions } from './types';

@Component({
  selector: 'bmb-chat-bar',
  standalone: true,
  imports: [
    BmbIconComponent,
    ReactiveFormsModule,
    CommonModule,
    BmbDotPaginatorComponent,
    BmbActionIconComponent,
    ClickOutsideDirective,
    BmbActionMenuComponent,
    BmbItemComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-chat-bar.component.html',
  styleUrl: './bmb-chat-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbChatBarComponent {
  placeholder = input<string>('');
  botList = input<IBotType[]>(defaultBotList);
  actionsList = input<IChatBarActions[]>([]);
  showEmoji = input<boolean>(false);
  enableMicInput = input<boolean>(false);

  currentBot = model<IBotType>();
  isLoading = model<boolean>(false);

  onSendMessage = output<string>();
  onSendFiles = output<File[]>();
  onRecord = output<boolean>();
  onEmoji = output<boolean>();

  files: File[] = [];
  control = new FormControl();
  isDialogOpen = signal<boolean>(false);
  showMicControls: boolean = false;
  onDragFiles: boolean = false;
  arrayThumbnail: string[] = [];
  botChunks = computed(() => {
    const chunks: IBotType[][] = [];
    for (let i = 0; i < (this.botList()?.length ?? 0); i += 6) {
      chunks.push(this.botList()?.slice(i, i + 6) ?? []);
    }
    return chunks;
  });
  totalDots = computed(() => this.botChunks()?.length ?? 0);
  activeDot: number = 0;
  actionListPagination: any[] = [];
  modalID = signal<string | null>(null);

  windowWidth: number = window.innerWidth;
  windowHeight: number = window.innerHeight;

  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('chatBarTemplate') chatBarTemplate!: TemplateRef<unknown>;
  @ViewChild('mobileBotSelectorTemplate')
  mobileBotSelectorTemplate!: TemplateRef<unknown>;

  constructor(
    private contentProjected: BmbProjectionContentService,
    private nativeModalService: BmbNativeModalService,
  ) {}

  ngOnInit(): void {
    this.currentBot.update(
      (
        bot: IBotType = {
          name: 'TecBot',
          label: 'Tecbot Standard',
          icon: 'bot_tecStandar',
        },
      ): IBotType => bot,
    );
  }

  handleSend(): void {
    this.onSendMessage.emit(this.control.value);
    if (this.files.length > 0) {
      this.onSendFiles.emit(this.files);
    }
    this.isLoading.update((value) => !value);
    this.control.reset();
    this.files = [];
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
          title: 'Selecciona un bot',
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
    };

    this.contentProjected.openContent(data);
  }

  onDrop(event: any): void {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;

    for (let i = 0; i < droppedFiles.length; i++) {
      if (droppedFiles[i].type.startsWith('image/')) {
        this.createImageThumbnail(droppedFiles[i]);
      } else {
        this.arrayThumbnail?.push('');
      }
      this.files.push(droppedFiles[i]);
    }
    this.onDragFiles = false;
  }

  onFileSelect(event: any): void {
    const selectedFiles = event.target.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      if (selectedFiles[i].type.startsWith('image/')) {
        this.createImageThumbnail(selectedFiles[i]);
      } else {
        this.arrayThumbnail?.push('');
      }
      this.files.push(selectedFiles[i]);
    }
    this.contentProjected.closeContent();
  }

  onDragOver(event: any): void {
    event.preventDefault();
    this.onDragFiles = true;
  }

  onDragLeave(event: any): void {
    event.preventDefault();
    this.onDragFiles = false;
  }

  createImageThumbnail(file: File): void {
    const reader = new FileReader();
    this.arrayThumbnail?.push(URL.createObjectURL(file));
    reader.readAsDataURL(file);
  }

  deleteFile(index: number): void {
    this.files.splice(index, 1);
    this.arrayThumbnail.splice(index, 1);
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
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.handleSend();
    }
  }

  autoResize(): void {
    const textarea = this.textareaRef.nativeElement;
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}

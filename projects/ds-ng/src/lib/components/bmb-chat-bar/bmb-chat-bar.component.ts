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
import { IBotType, IChatBarActions, IChatBarEvent } from './types';
import { defaultActionList, defaultBotList } from './bot_list';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbDotPaginatorComponent } from '../bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import { BmbActionMenuComponent } from '../bmb-action-menu/bmb-action-menu.component';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';
import { BmbNativeModalService } from '../../services/native-modal.service';
import {
  BmbProjectionContentService,
  IBmbProjectionContent,
} from '../../services/projection.service';
import { IBmbNativeModal } from '../bmb-modal/bmb-modal.interface';

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
  enableAttachments = input<boolean>(true);
  enableMicInput = input<boolean>(false);
  currentBot = model<IBotType>();
  isLoading = model<boolean>(false);
  maxAudioDuration = input<number>(300);

  onSendMessage = output<string>(); // deprecated
  onSendFiles = output<File[]>(); // deprecated
  onRecord = output<boolean>(); // deprecated
  onEmoji = output<boolean>(); // deprecated

  onSubmitMessage = output<IChatBarEvent>();

  files: File[] = [];
  control = new FormControl();
  isDialogOpen = signal<boolean>(false);
  defaultPlaceholder = computed(
    () => this.placeholder() ?? '¿Qué deseas encontrar hoy?',
  );
  botActionList = computed(() => {
    if(this.enableAttachments()) {
      return [...this.actionsList(), ...defaultActionList];
    }
    return this.actionsList();
  });
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
  mediaRecorder: MediaRecorder | null = null;
  chunks: Blob[] = [];
  stream: MediaStream | null = null;
  isRecording = signal<boolean>(false);
  isPaused = false;
  timeElapsed = 0;
  timer: any = null;

  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;
  @ViewChild('chatBarTemplate') chatBarTemplate!: TemplateRef<unknown>;
  @ViewChild('mobileBotSelectorTemplate')
  mobileBotSelectorTemplate!: TemplateRef<unknown>;

  constructor(
    private contentProjected: BmbProjectionContentService,
    private nativeModalService: BmbNativeModalService,
  ) {
    effect(() => {
      if (this.isLoading()) {
        console.log('Loading...');
      } else {
        console.log('Not loading');
      }
    });
  }

  ngOnInit(): void {
    this.currentBot.update(
      (
        bot: IBotType = {
          name: 'TecBot',
          icon: '/assets/images/bot-icons/bot_tecStandar.svg',
        },
      ): IBotType => bot,
    );
  }

  handleSend(): void {
    // this.isLoading.update((value) => !value);
    // this.onSendMessage.emit(this.control.value);
    // if (this.files.length > 0) {
    //   this.onSendFiles.emit(this.files);
    // }
    // this.control.reset();
    // this.files = [];
    // this.textareaRef.nativeElement.style.height = 'calc(1lh + 2rem)';
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

  handleAddDialog(event: MouseEvent | KeyboardEvent): void {
    const data: IBmbProjectionContent = {
      content: this.chatBarTemplate,
      targetRef: event.target as HTMLElement,
      showBackdrop: false,
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
    // this.onEmoji.emit(true);
  }

  handleRecord(): void {
    // this.onRecord.emit(true);
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

  async startRecording(): Promise<void> {
    if (this.isRecording()) return;

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.chunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.chunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = () => {
        this.stopTimer();
        const blob = new Blob(this.chunks, { type: 'audio/webm' });
        const tempUrl = URL.createObjectURL(blob);

        console.log('Audio grabado:', blob, tempUrl);

        this.onSubmitMessage.emit({
          recording: blob,
          recordingUrl: tempUrl,
          hasEmojiReaction: false,
         });

        this.cleanup();
      };

      // Iniciar grabación
      this.mediaRecorder.start();
      this.isRecording.set(true);
      this.startTimer();
    } catch (error) {
      console.error('Error al acceder al micrófono:', error);
      alert('No se pudo acceder al micrófono. Verifica los permisos.');
    }
  }

  stopRecording(): void {
    if (!this.isRecording || !this.mediaRecorder) return;

    this.mediaRecorder.stop();
    this.isRecording.set(false);
    this.isPaused = false;
  }

  private startTimer(): void {
    this.timeElapsed = 0;
    this.timer = setInterval(() => {
      this.timeElapsed += 1000;
      if (this.timeElapsed >= this.maxAudioDuration() * 1000) {
        this.stopRecording();
      }
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
    this.chunks = [];
  }

  ngOnDestroy(): void {
    this.stopTimer();
    this.cleanup();
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.timeElapsed / 60000);
    const seconds = Math.floor((this.timeElapsed % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
}

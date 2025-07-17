import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  input,
  model,
  output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { IBotType, IChatBarActions } from './types';
import { defaultActionList, defaultBotList } from './bot_list';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbDotPaginatorComponent } from '../bmb-dot-paginator/bmb-dot-paginator.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';

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
  ],
  templateUrl: './bmb-chat-bar.component.html',
  styleUrl: './bmb-chat-bar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbChatBarComponent {
  placeholder = input<string>();
  botList = input<IBotType[]>();
  actionsList = input<IChatBarActions[]>();
  showEmoji = input<boolean>(false);

  currentBot = model<IBotType>();
  isLoading = model<boolean>(false);

  onSendMessage = output<string>();
  onSendFiles = output<File[]>();
  onRecord = output<boolean>();
  onEmoji = output<boolean>();

  files: File[] = [];
  control = new FormControl();
  isDialogOpen: boolean = false;
  openAddDialog: boolean = false;
  defaultPlaceholder = computed(
    () => this.placeholder() ?? '¿Qué deseas encontrar hoy?',
  );
  dBotList = computed(() => this.botList() ?? defaultBotList);
  dActionsList = computed(() =>
    this.actionsList()
      ? defaultActionList.concat(this.actionsList()!)
      : defaultActionList,
  );
  showMicControls: boolean = false;
  onDragFiles: boolean = false;
  arrayThumbnail: string[] = [];
  totalDots = computed(() => Math.round(this.dActionsList().length / 6));
  activeDot: number = 0;
  actionListPagination: any[] = [];
  versionAddDialog: 'mobile' | 'web' = 'web';

  windowWidth: number = window.innerWidth;
  windowHeight: number = window.innerHeight;

  @ViewChild('textareaRef') textareaRef!: ElementRef<HTMLTextAreaElement>;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.versionAddDialog = window.innerWidth < 480 ? 'mobile' : 'web';
  }

  ngOnInit(): void {
    this.versionAddDialog = window.innerWidth < 480 ? 'mobile' : 'web';
    this.currentBot.update(
      (
        bot: IBotType = {
          name: 'TecBot',
          icon: '/assets/images/bot-icons/bot_tecStandar.svg',
        },
      ): IBotType => bot,
    );
    this.handlePaginate(this.dActionsList(), this.activeDot);
  }

  handleSend(): void {
    this.onSendMessage.emit(this.control.value);
    if (this.files.length > 0) {
      this.onSendFiles.emit(this.files);
    }
    this.isLoading.update((value) => !value);
    this.control.reset();
    this.files = [];
  }

  handleChangeBot(bot: IBotType): void {
    this.isDialogOpen = false;
    this.currentBot.set(bot);
  }

  handleDialog(): void {
    this.isDialogOpen = !this.isDialogOpen;
  }

  handleMic(): void {
    this.showMicControls = !this.showMicControls;
    this.onRecord.emit(true);
  }

  handleStopMic(): void {
    this.showMicControls = !this.showMicControls;
    this.onRecord.emit(false);
  }

  handleAddDialog(): void {
    this.openAddDialog = !this.openAddDialog;
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
    this.openAddDialog = false;
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

  handlePaginate(items: any[], page: number): void {
    const startIndex = page * 6;
    this.actionListPagination = items.slice(startIndex, startIndex + 6);
  }

  handleDotPress(index: number): void {
    this.handlePaginate(this.dActionsList(), index);
  }

  close(): void {
    this.openAddDialog = false;
  }

  handleEmoji(): void {
    this.onEmoji.emit(true);
  }

  handleRecord(): void {
    this.onRecord.emit(true);
  }

  clickOutside(): void {
    this.openAddDialog = false;
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

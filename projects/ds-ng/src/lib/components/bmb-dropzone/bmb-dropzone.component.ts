import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';
import { BmbProgressBarComponent } from '../bmb-progress-bar/bmb-progress-bar.component';
import { getUUID } from '../../utils/utils';
import { IBmbContrast } from '../../types/colors';
import { TranslatePipe } from '../../pipes/translations';
import { BmbVerticalLayoutDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../directives/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';

interface FileData {
  name: string;
  size: number;
  base64?: string;
  error?: boolean;
  errorType?: 'format' | 'size' | null;
}

interface IBmbFileValidation {
  isValidFormat: boolean;
  isValidSize: boolean;
}

@Component({
  selector: 'bmb-dropzone',
  standalone: true,
  imports: [
    CommonModule,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbIconComponent,
    BmbTextLinkComponent,
    BmbProgressBarComponent,
    TranslatePipe,
  ],
  providers: [TranslatePipe],
  templateUrl: './bmb-dropzone.component.html',
  styleUrl: './bmb-dropzone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropzoneComponent {
  appearanceContrast = input<IBmbContrast>('default');
  acceptedExtensions = input.required<string[]>();
  dropInstruction = input<string>();
  dropLabel = input<string>();
  errorMessage = input<string>();
  errorMessageFormat = input<string>();
  errorMessageSize = input<string>();
  fileDataList: FileData[] = [];
  fileSize = input<number>(2);
  formatFilesLabel = input<string>();
  linkFilesSupported = input<string>('');
  linkLabel = input<string>();
  mainIcon = input<string>('image');
  multiple = input<boolean>(false);
  name = input<string>(getUUID());
  progress = input<Record<string, number> | number>({});

  newFile = output<File | File[]>();
  fileRemoved = output<string>();

  translatePipe = inject(TranslatePipe);
  validFile: boolean = true;
  input?: HTMLInputElement;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['progress'] ||
      changes['acceptedExtensions'] ||
      changes['fileSize']
    ) {
      this.cdr.detectChanges();
    }
  }

  getDropZoneClass(): string[] {
    const classList = [];

    if (this.isInvalidFileOnly()) {
      classList.push('bmb_drop-zone-container-error');
    } else {
      if (
        this.fileDataList.length > 0 &&
        !!this.fileDataList[0].name &&
        this.fileDataList.some(
          (file: FileData) => this.getProgress(file.name) < 100,
        )
      ) {
        classList.push('bmb_drop-zone-container-uploading-file');
      }

      if (this.appearanceContrast() === 'primary') {
        classList.push('bmb-drop-zone-container-primary');
      }

      if (this.appearanceContrast() === 'alternative') {
        classList.push('bmb-drop-zone-container-alternative');
      }
    }

    return classList;
  }

  getAvatarIcon(fileName: string, isError: boolean): string {
    if (isError) return 'upload_file';
    if (this.validFile && this.getProgress(fileName) === 100) return 'task';

    return 'progress_activity';
  }

  getTitle(file: FileData): string {
    if (file.error) {
      if (file.errorType === 'format') {
        return (
          this.errorMessageFormat() ||
          this.translatePipe.transform('dropzone.error_message_format')
        );
      } else if (file.errorType === 'size') {
        return `${
          this.errorMessageSize() ||
          this.translatePipe.transform('dropzone.error_message_size')
        }${file.size.toFixed(2)} MB`;
      }
    }
    return file.name;
  }

  getFormatProgress(value: string, total: string): string {
    return `${value}%/${total}%`;
  }

  public onFileSelected(event: Event) {
    this.input = event.target as HTMLInputElement;
    if (!!this.input.files?.[0]) {
      const files = this.input.files;
      if (files && !!files.length) {
        this.getFileAndValidate(this.multiple() ? Array.from(files) : files[0]);
      }
    }
  }

  private isValidFileType(fileType: string, fileName: string): boolean {
    if (
      this.acceptedExtensions().some((element: string) => element.includes('/'))
    ) {
      const types = this.acceptedExtensions().filter((element: string) =>
        element.endsWith('/*'),
      );
      if (
        !!types.length &&
        types.some(
          (element: string) =>
            element.substring(0, element.length - 2) ===
            fileType.substring(0, element.length - 2),
        )
      ) {
        return true;
      } else {
        if (this.acceptedExtensions().includes(fileType)) return true;
      }
    }

    if (
      this.acceptedExtensions().includes(
        fileName.substring(fileName.lastIndexOf('.') + 1),
      )
    )
      return true;

    return false;
  }

  private getFileSizeInMB(fileSize: number): number {
    return fileSize / 1048576;
  }

  private isValidFileSize(fileSize: number): boolean {
    return this.getFileSizeInMB(fileSize) <= this.fileSize();
  }

  private isFileDuplicate(fileName: string): boolean {
    return this.fileDataList.some((existing) => existing.name === fileName);
  }

  private getFileAndValidate(file: File | File[]): void {
    const filesArray = Array.isArray(file) ? file : [file];
    const validFiles: File[] = [];

    if (!this.multiple()) {
      this.fileDataList = [];
    }

    for (const singleFile of filesArray) {
      if (this.isFileDuplicate(singleFile.name)) {
        continue;
      }

      const fileValidation: IBmbFileValidation = {
        isValidFormat: this.isValidFileType(singleFile.type, singleFile.name),
        isValidSize: this.isValidFileSize(singleFile.size),
      };
      const fileData: FileData = {
        name: singleFile.name,
        size: this.getFileSizeInMB(singleFile.size),
        error: !fileValidation.isValidFormat || !fileValidation.isValidSize,
        errorType: !fileValidation.isValidFormat ? 'format' : 'size',
      };

      this.fileDataList.push(fileData);
      if (fileValidation.isValidFormat && fileValidation.isValidSize)
        validFiles.push(singleFile);
    }

    if (!!validFiles.length) {
      this.newFile.emit(this.multiple() ? validFiles : validFiles[0]);
    } else {
      this.onErrorFile();
    }
  }

  public removeFile(fileName: string): void {
    this.fileDataList = this.fileDataList.filter(
      (file) => file.name !== fileName,
    );

    const hasFormatErrorsOnly = this.fileDataList.some(
      (file) => file.error && file.errorType === 'format',
    );

    this.validFile = this.fileDataList.length > 0 && !hasFormatErrorsOnly;

    if (this.fileDataList.length === 0 && this.input) {
      this.input.value = '';
    }

    this.fileRemoved.emit(fileName);
  }

  private onErrorFile(): void {
    this.input && (this.input.value = '');
    this.validFile = false;
  }

  dragOver(event: DragEvent) {
    this.validFile = true;
    event.preventDefault();
    event.stopPropagation();
    const dropzoneElement = event.currentTarget as HTMLElement;
    dropzoneElement.classList.add('bmb_drop-zone-container-uploading-file');
  }

  dragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzoneElement = event.currentTarget as HTMLElement;
    dropzoneElement.classList.remove('bmb_drop-zone-container-uploading-file');
  }

  drop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzoneElement = event.currentTarget as HTMLElement;
    dropzoneElement.classList.add('bmb-drop-zone');
    dropzoneElement.classList.remove('bmb_drop-zone-container-uploading-file');

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.getFileAndValidate(this.multiple() ? Array.from(files) : files[0]);
    }
  }

  getProgress(fileName: string): number {
    const progress = this.progress();
    if (typeof progress === 'number') return progress;
    return progress?.[fileName] ?? 0;
  }

  isInvalidFileOnly(): boolean {
    return this.fileDataList.some(
      (file) => file.error && file.errorType === 'format',
    );
  }

  public reset(): void {
    this.fileDataList = [];
    this.validFile = true;
    if (this.input) {
      this.input.value = '';
    }
    this.cdr.detectChanges();
  }
}

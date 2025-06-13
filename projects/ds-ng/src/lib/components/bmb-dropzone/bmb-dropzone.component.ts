import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';
import {
  BmbCardComponent,
  BmbCardContentComponent,
} from '../bmb-card/bmb-card.component';
import { BmbProgressBarComponent } from '../bmb-progress-bar/bmb-progress-bar.component';
interface FileData {
  name: string;
  size: number;
  base64?: string;
  error?: boolean;
  errorType?: 'format' | 'size' | null;
}

@Component({
  selector: 'bmb-dropzone',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbTextLinkComponent,
    BmbCardComponent,
    BmbCardContentComponent,
    BmbProgressBarComponent,
  ],
  templateUrl: './bmb-dropzone.component.html',
  styleUrl: './bmb-dropzone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropzoneComponent {
  acceptedExtensions = input.required<string[]>();
  dropInstruction = input<string>('Arrastra tus archivos aquí o');
  dropLabel = input<string>('selecciona tus archivos');
  errorMessage = input<string>('Archivo no compatible');
  errorMessageFormat = input<string>('Formato no soportado');
  errorMessageSize = input<string>('El archivo supera el tamaño permitido');
  fileDataList: FileData[] = [];
  fileSize = input<number>(2);
  formatFilesLabel = input<string>('Especificación de formatos y peso');
  linkFilesSupported = input<string>('');
  linkLabel = input<string>(
    'Ver más información de formatos de archivo aceptados.',
  );
  mainIcon = input<string>('image');
  multiple = input<boolean>(false);
  name = input<string>('bmbFileInput');
  progress = input<Record<string, number> | number>({});

  newFile = output<File | File[]>();
  fileRemoved = output<string>();

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

  public onFileSelected(event: Event) {
    this.input = event.target as HTMLInputElement;
    if (this.input.files?.[0]) {
      const files = this.input.files;
      if (files && files.length > 0) {
        this.getFileAndValidate(this.multiple() ? Array.from(files) : files[0]);
      }
    }
  }

  private getFileAndValidate(file: File | File[]): void {
    const filesArray = Array.isArray(file) ? file : [file];
    const validFiles: File[] = [];

    if (!this.multiple()) {
      this.fileDataList = [];
    }

    for (const singleFile of filesArray) {
      const fileExtension = singleFile.name.split('.').at(-1);
      const isValidFileType = this.acceptedExtensions().includes(
        fileExtension ?? '',
      );
      const fileSizeInMB = singleFile.size / 1048576;
      const isValidSize = fileSizeInMB <= this.fileSize();

      const alreadyExists = this.fileDataList.some(
        (existing) => existing.name === singleFile.name,
      );

      if (alreadyExists) {
        continue;
      }

      if (isValidFileType && isValidSize) {
        const fileData: FileData = {
          name: singleFile.name,
          size: fileSizeInMB,
          error: false,
          errorType: null,
        };

        this.fileDataList.push(fileData);
        validFiles.push(singleFile);
      } else {
        this.fileDataList.push({
          name: singleFile.name,
          size: fileSizeInMB,
          error: true,
          errorType: !isValidFileType ? 'format' : 'size',
        });
      }
    }

    this.validFile = validFiles.length > 0;

    if (this.validFile) {
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

  onDragOver(event: DragEvent) {
    this.validFile = true;
    event.preventDefault();
    event.stopPropagation();
    const dropzoneElement = event.currentTarget as HTMLElement;
    dropzoneElement.classList.add('bmb-drop-zone-drag-over');
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzoneElement = event.currentTarget as HTMLElement;
    dropzoneElement.classList.remove('bmb-drop-zone-drag-over');
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzoneElement = event.currentTarget as HTMLElement;
    dropzoneElement.classList.add('bmb-drop-zone');
    dropzoneElement.classList.remove('bmb-drop-zone-drag-over');

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

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
import { BmbCardComponent, BmbCardContentComponent } from '../bmb-card/bmb-card.component';
import { BmbProgressBarComponent } from '../bmb-progress-bar/bmb-progress-bar.component';
interface FileData {
  name: string;
  size: number;
  base64?: string;
}

export type IBmbFileUploadStatus = 'success' | 'error' | 'loading' | 'none';

@Component({
  selector: 'bmb-dropzone',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, BmbTextLinkComponent, BmbCardComponent, BmbCardContentComponent, BmbProgressBarComponent],
  templateUrl: './bmb-dropzone.component.html',
  styleUrl: './bmb-dropzone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropzoneComponent {
  progress = input<number>();
  acceptedExtensions = input.required<string[]>();
  formatFilesLabel = input<string>('Especificación de formatos y peso');
  linkFilesSupported = input<string>('');
  linkLabel = input<string>('Ver más información de formatos de archivo aceptados.');
  name = input<string>('bmbFileInput');
  errorMessage = input<string>('Archivo no compatible');
  fileSize = input<number>(2);
  uploadStatus = input<IBmbFileUploadStatus>('none');

  newFile = output<File>();

  validFile: boolean = true;
  input?: HTMLInputElement;
  fileData: FileData = {} as FileData;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['progress'] ||
      changes['acceptedExtensions'] ||
      changes['fileSize'] ||
      changes['uploadStatus']
    ) {
      console.log('changes', changes);

      this.cdr.detectChanges();
    }
  }

  public onFileSelected(event: Event) {
    this.input = event.target as HTMLInputElement;
    if (this.input.files?.[0]) {
      const file: File = this.input.files[0];
      this.getFileAndValidate(file);
    }
  }

  private getFileAndValidate(file: File): void {
    this.fileData = {} as File;
    const fileExtension = file.name.split('.').at(-1);
    const isValidFileType = this.acceptedExtensions().includes(fileExtension ?? '');
    const fileSizeInMB = file.size / 1048576;
    const isValidSize = fileSizeInMB <= this.fileSize();

    if (isValidFileType && isValidSize) {
      this.validFile = true;
      this.newFile.emit(file);
      this.fileData.name = file.name;
      this.fileData.size = fileSizeInMB;
    } else {
      this.onErrorFile();
    }
  }

  public removeFile(): void {
    this.fileData = {} as File;
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
      const file = files[0];
      this.getFileAndValidate(file);
    }
  }

  getIconByStatus(): string {
    switch (this.uploadStatus()) {
      case 'success':
        return 'task';
      case 'error':
        return 'upload_file';
      case 'loading':
        return 'progress_activity';
      default:
        return 'progress_activity';
    }
  }

  getIconAnimation(): string[] {
    const classList = ['bmb-drop-zone-list-files-icon'];
    if  (this.uploadStatus() === 'loading') {
      classList.push('bmb-drop-zone-list-files-icon-spin');
    }

    return classList
  }
}

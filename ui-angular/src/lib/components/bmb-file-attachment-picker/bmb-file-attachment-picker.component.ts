import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  model,
  output,
  viewChild,
} from '@angular/core';
import { BmbActionContainerComponent } from '../bmb-action-container/bmb-action-container.component';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { TranslatePipe } from '../../pipes/translations';
import { getDropzoneAcceptAttribute } from '../../_shared/logic/components/dropzone';

@Component({
  selector: 'bmb-file-attachment-picker',
  standalone: true,
  imports: [BmbActionContainerComponent, BmbLayoutItemDirective, TranslatePipe],
  templateUrl: './bmb-file-attachment-picker.component.html',
  styleUrl: './bmb-file-attachment-picker.component.scss',
  host: {
    '(drop)': 'onDrop($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbFileAttachmentPicker {
  files = model<File[]>([]);
  onDragFiles = model<boolean>(false);
  inputId = input<string>();
  acceptedExtensions = input<string[]>();

  filesSelected = output<File[]>();

  private readonly fileInput =
    viewChild.required<ElementRef<HTMLInputElement>>('fileInput');

  openFilePicker(): void {
    this.fileInput().nativeElement.click();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.addFiles(event.dataTransfer?.files);
    this.onDragFiles.set(false);
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    const selectedFiles = Array.from(input.files ?? []);
    this.addFiles(input.files);
    input.value = '';
    this.filesSelected.emit(selectedFiles);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.onDragFiles.set(true);
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.onDragFiles.set(false);
  }

  deleteFile(index: number): void {
    this.files.update((files) =>
      files.filter((_, fileIndex) => fileIndex !== index),
    );
  }

  private addFiles(files: FileList | null | undefined): void {
    if (files?.length) {
      this.files.update((currentFiles) => [
        ...currentFiles,
        ...Array.from(files),
      ]);
    }
  }

  protected getAcceptAttribute(): string {
    return getDropzoneAcceptAttribute(this.acceptedExtensions() || []);
  }
}

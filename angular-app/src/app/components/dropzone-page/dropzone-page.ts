import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewChild,
  signal,
} from '@angular/core';
import { BmbDropzoneComponent } from 'ui-angular';

@Component({
  selector: 'app-dropzone-page',
  imports: [BmbDropzoneComponent],
  templateUrl: './dropzone-page.html',
  styleUrl: './dropzone-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropzonePage implements OnDestroy {
  readonly acceptedExtensions = signal<string[]>(['png', 'jpg', 'jpeg']);
  readonly fileSize = signal<number>(5); // MB
  readonly multiple = signal<boolean>(false);
  readonly allowDuplicateFiles = signal<boolean>(false);
  readonly formatFilesLabel = signal<string | undefined>(undefined);
  readonly simulatedUploadEnabled = signal<boolean>(false);
  readonly progress = signal<Record<string, number>>({});

  private readonly uploadIntervals = new Map<
    string,
    ReturnType<typeof setInterval>
  >();

  @ViewChild(BmbDropzoneComponent)
  dropzone?: BmbDropzoneComponent;

  toggleMultiple() {
    this.multiple.set(!this.multiple());
  }

  resetDropzone() {
    if (this.simulatedUploadEnabled()) {
      this.clearSimulatedUpload();
    }
    this.dropzone?.reset();
  }

  simulateUpload(files: File | File[]) {
    if (!this.simulatedUploadEnabled()) return;

    const incomingFiles = Array.isArray(files) ? files : [files];

    incomingFiles.forEach((file) => {
      this.stopUpload(file.name);
      this.progress.update((current) => ({ ...current, [file.name]: 0 }));

      let uploadedPercentage = 0;
      const interval = setInterval(() => {
        uploadedPercentage += 10;
        this.progress.update((current) => ({
          ...current,
          [file.name]: Math.min(uploadedPercentage, 100),
        }));

        if (uploadedPercentage >= 100) {
          this.stopUpload(file.name);
        }
      }, 300);

      this.uploadIntervals.set(file.name, interval);
    });
  }

  removeFileProgress(fileName: string) {
    if (!this.simulatedUploadEnabled()) return;

    this.stopUpload(fileName);
    this.progress.update((current) => {
      const updatedProgress = { ...current };
      delete updatedProgress[fileName];
      return updatedProgress;
    });
  }

  setAcceptedExtensions(value: string) {
    const parsed = value
      ? value
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    this.acceptedExtensions.set(parsed);
  }

  setFileSize(value: string) {
    const n = Number(value);
    this.fileSize.set(Number.isFinite(n) ? n : 0);
  }

  toggleSimulatedUpload(enabled: boolean) {
    this.simulatedUploadEnabled.set(enabled);
    if (!enabled) this.clearSimulatedUpload();
  }

  ngOnDestroy(): void {
    this.clearUploadIntervals();
  }

  private stopUpload(fileName: string) {
    const interval = this.uploadIntervals.get(fileName);
    if (interval) clearInterval(interval);
    this.uploadIntervals.delete(fileName);
  }

  private clearUploadIntervals() {
    this.uploadIntervals.forEach((interval) => clearInterval(interval));
    this.uploadIntervals.clear();
  }

  private clearSimulatedUpload() {
    this.clearUploadIntervals();
    this.progress.set({});
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  model,
  OnChanges,
  OnInit,
  output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTextLinkComponent } from '../bmb-text-link/bmb-text-link.component';
import { BmbProgressBarComponent } from '../bmb-progress-bar/bmb-progress-bar.component';
import { getUUID } from '../../../_shared/logic/utils';
import { IBmbContrast } from '../../../_shared/types/colors';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbVerticalLayoutDirective } from '../../../directives/old/bmb-layout/bmb-vertical-layout/bmb-vertical-layout.directive';
import { BmbVerticalLayoutItemDirective } from '../../../directives/old/bmb-layout/bmb-vertical-layout/bmb-vertical-layout-item.directive';
import { BmbTranslationsService } from '../../../services/translations/translations.service';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
} from '@angular/forms';
import {
  assignNewFormControl,
  handleValidity,
  newFormControlByType,
} from '../../../_shared/logic/formControl';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';

interface FileData {
  id: string;
  name: string;
  size: number;
  base64?: string;
  error?: boolean;
  errorType?: 'format' | 'size' | 'name' | null;
}

interface IBmbFileValidation {
  isValidFormat: boolean;
  isValidSize: boolean;
  isValidName: boolean;
}

@Component({
  selector: 'bmb-dropzone',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BmbInputValidatorComponent,
    BmbVerticalLayoutDirective,
    BmbVerticalLayoutItemDirective,
    BmbIconComponent,
    BmbTextLinkComponent,
    BmbProgressBarComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-dropzone.component.html',
  styleUrl: './bmb-dropzone.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropzoneComponent implements OnInit, OnChanges {
  appearanceContrast = input<IBmbContrast>('default');
  acceptedExtensions = input.required<string[]>();
  dropInstruction = input<string>();
  dropLabel = input<string>();
  errorMessage = input<string>(); //Deprecated
  errorMessageFormat = input<string>();
  errorMessageSize = input<string>();
  errorMessageInvalidName = input<string>();
  fileSize = input<number>(2);
  formatFilesLabel = input<string>();
  linkFilesSupported = input<string>('');
  linkLabel = input<string>();
  mainIcon = input<string>('image');
  multiple = input<boolean>(false);
  allowDuplicateFiles = input<boolean>(false);
  name = input<string>(getUUID());
  progress = input<Record<string, number> | number>({});
  inputId = input<string>(this.name());
  customValidation = input<ValidatorFn | ValidatorFn[]>();
  customErrorMessages = input<Record<string, string>>({});

  control = model<FormControl>(newFormControlByType('file', this.multiple()));

  newFile = output<File | File[]>();
  fileRemoved = output<string>();

  fileDataList: FileData[] = [];
  isControlNull = false;
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  translationService: BmbTranslationsService = inject(BmbTranslationsService);

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(
        assignNewFormControl(
          this.name(),
          this.control(),
          'file',
          this.multiple(),
        )!,
      );
      this.isControlNull = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['progress'] ||
      changes['acceptedExtensions'] ||
      changes['fileSize']
    ) {
      this.cdr.detectChanges();
    }
  }

  protected getDropZoneClass(): string[] {
    const classList = [];

    if (this.isErrorFiles()) {
      classList.push('bmb_drop-zone-container-error');
    } else {
      if (
        !!this.fileDataList.length &&
        this.fileDataList?.some((file: FileData) =>
          this.isUploadInProgress(file),
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

  protected get errorMessageLabels(): string[] {
    const messages: string[] = [];

    if (this.isFormatErrorFiles()) {
      messages.push(
        this.errorMessageFormat() ||
          this.translationService.translate('dropzone.error_message_format'),
      );
    }
    if (this.isSizeErrorFiles()) {
      messages.push(
        `${
          this.errorMessageSize() ||
          this.translationService.translate('dropzone.error_message_size')
        } ${this.fileSize()} MB`,
      );
    }
    if (this.isNameErrorFiles()) {
      messages.push(
        this.errorMessageInvalidName() ||
          this.translationService.translate(
            'dropzone.error_message_invalid_name',
          ),
      );
    }
    return messages.map((message) => `${message}*`);
  }

  protected get customErrorMessageLabels(): string[] {
    const errors = this.control()?.errors;
    const messages = this.customErrorMessages();

    if (!errors) return [];

    return Object.keys(errors)
      .filter((errorKey) => !!messages[errorKey])
      .map((errorKey) => messages[errorKey]);
  }

  protected get visibleErrorMessages(): string[] {
    return [...this.errorMessageLabels, ...this.customErrorMessageLabels];
  }

  protected getAvatarIcon(file: FileData): string {
    if (this.getProgress(file) === 100) return 'upload_file';
    if (file.error) return 'task';

    return 'progress_activity';
  }

  protected getFileName(file: FileData): string {
    return file.error ? file.name.concat('*') : file.name;
  }

  protected getFormatProgress(value: string, total: string): string {
    return `${value}%/${total}%`;
  }

  protected getFormatSize(_: any, total: string): string {
    return `${Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
    }).format(Number(total))}MB`;
  }

  protected getFormatSizeError(_: any, total: string): string {
    return `${Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
    }).format(Number(total))}MB*`;
  }

  protected getFileSizeInMB(fileSize: number): number {
    return fileSize / 1048576;
  }

  protected getProgress(file: FileData): number {
    const progress = this.progress();

    if (file.error) return 0;
    if (typeof progress === 'number') return progress;
    return progress?.[file.name] ?? 0;
  }

  protected get organizedFiles(): FileData[] {
    if (this.fileDataList.some((file: FileData) => file.error)) {
      return this.fileDataList.sort(
        (file1: FileData, file2: FileData) =>
          (Number(file1.error) - Number(file2.error)) * -1,
      );
    }

    return this.fileDataList;
  }

  private getFileAndValidate(file: File | File[]): void {
    const fileList = Array.isArray(file) ? file : [file];
    const validFiles: File[] = [];

    if (!this.multiple()) {
      this.fileDataList = [];
    }

    for (const singleFile of fileList) {
      if (
        !this.allowDuplicateFiles() &&
        this.isFileDuplicate(singleFile.name)
      ) {
        continue;
      }

      const fileValidation: IBmbFileValidation = {
        isValidFormat: this.isValidFileFormat(singleFile.type, singleFile.name),
        isValidSize: this.isValidFileSize(singleFile.size),
        isValidName: this.isValidFileName(singleFile.name),
      };
      const fileData: FileData = {
        id: getUUID(),
        name: singleFile.name,
        size: this.getFileSizeInMB(singleFile.size),
        error:
          !fileValidation.isValidFormat ||
          !fileValidation.isValidSize ||
          !fileValidation.isValidName,
        errorType: !fileValidation.isValidName
          ? 'name'
          : !fileValidation.isValidFormat
            ? 'format'
            : 'size',
      };

      this.fileDataList.push(fileData);
      if (
        fileValidation.isValidFormat &&
        fileValidation.isValidSize &&
        fileValidation.isValidName
      )
        validFiles.push(singleFile);
    }

    if (validFiles.length) {
      if (this.multiple()) {
        const newFileNames = validFiles.map((_file: File) => _file.name);
        const currentFileNames = Array.isArray(this.control().value)
          ? this.control().value.filter(Boolean)
          : [];

        this.control().patchValue(
          this.allowDuplicateFiles()
            ? [...currentFileNames, ...newFileNames]
            : newFileNames,
        );
        this.control().updateValueAndValidity();

        this.newFile.emit(validFiles);
      } else {
        const _file = validFiles[0];
        this.control().patchValue(_file.name);
        this.control().updateValueAndValidity();

        this.newFile.emit(_file);
      }
    }
  }

  private isValidFileFormat(fileType: string, fileName: string): boolean {
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

  protected isValidFileSize(fileSize: number): boolean {
    return this.getFileSizeInMB(fileSize) <= this.fileSize();
  }

  private isValidFileName(fileName: string): boolean {
    return /^[a-zA-Z0-9._-]+$/.test(fileName);
  }

  private isFileDuplicate(fileName: string): boolean {
    return this.fileDataList.some((existing) => existing.name === fileName);
  }

  protected isUploadInProgress(file: FileData) {
    return !file.error && this.getProgress(file) < 100;
  }

  protected isUploadCompleted(file: FileData) {
    return !file.error && this.getProgress(file) === 100;
  }

  protected isErrorFiles(): boolean {
    return (
      this.fileDataList.some((file) => file.error) ||
      !!this.customErrorMessageLabels.length
    );
  }

  private isFormatError(file: FileData): boolean {
    return (file.error && file.errorType === 'format') || false;
  }

  protected isFormatErrorFiles(): boolean {
    return this.fileDataList.some((file) => this.isFormatError(file));
  }

  private isSizeError(file: FileData): boolean {
    return (file.error && file.errorType === 'size') || false;
  }

  protected isSizeErrorFiles(): boolean {
    return this.fileDataList.some((file) => this.isSizeError(file));
  }

  protected isNameErrorFiles(): boolean {
    return this.fileDataList.some(
      (file) => file.error && file.errorType === 'name',
    );
  }

  protected handleDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzoneElement = event.currentTarget as HTMLElement;
    dropzoneElement.classList.add('bmb_drop-zone-container-uploading-file');
  }

  protected handleDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzoneElement = event?.currentTarget as HTMLElement;
    dropzoneElement.classList.remove('bmb_drop-zone-container-uploading-file');
  }

  protected handleDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const dropzoneElement = event?.currentTarget as HTMLElement;
    dropzoneElement.classList.add('bmb-drop-zone');
    dropzoneElement.classList.remove('bmb_drop-zone-container-uploading-file');

    const files = event.dataTransfer?.files;
    if (files && !!files.length) {
      this.getFileAndValidate(this.multiple() ? Array.from(files) : files[0]);
    }
  }

  protected handleFileSelected(event: Event) {
    const _input = event?.target as HTMLInputElement;

    if (_input?.files?.[0]) {
      const files = _input.files;
      if (files && !!files.length) {
        this.getFileAndValidate(this.multiple() ? Array.from(files) : files[0]);
      }
    }
    _input.value = '';
  }

  protected handleRemoveFile(file: FileData): void {
    this.fileDataList = this.fileDataList.filter(
      (existingFile) => existingFile.id !== file.id,
    );

    if (this.multiple()) {
      const fileNames = Array.from(this.control().value ?? []);
      const fileIndex = fileNames.indexOf(file.name);
      if (fileIndex >= 0) fileNames.splice(fileIndex, 1);
      this.control().patchValue(fileNames);
      this.control().updateValueAndValidity();
    } else {
      const _fileName = this.control().value;
      this.control().patchValue(_fileName === file.name ? null : _fileName);
      this.control().updateValueAndValidity();
    }

    this.fileRemoved.emit(file.name);
  }

  handleValidity(): void {
    handleValidity(this.control());
  }

  reset(): void {
    this.fileDataList = [];
    this.control().patchValue(this.multiple() ? [null] : null);
    this.cdr.detectChanges();
  }

  protected getAcceptAttribute(): string {
    return this.acceptedExtensions()
      .map((ext) => {
        const cleanExt = ext.trim().toLowerCase();

        if (cleanExt.includes('/')) return cleanExt;
        if (cleanExt.startsWith('.')) return cleanExt;

        return `.${cleanExt}`;
      })
      .join(',');
  }
}

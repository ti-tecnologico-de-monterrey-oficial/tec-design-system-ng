import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import type { OnChanges } from '@angular/core';
import type {
  BmbUploadFileMessage,
  BmbUploadFileRequestEvent,
} from '../../types';
import { BmbButtonDirective } from '../../../../directives/bmb-button/button.directive';
import { TranslatePipe } from '../../../../pipes/translations';
import {
  BmbChatAttachmentsService,
  provideBmbChatAttachments,
} from '../../../../services/chat-attachments/chat-attachments.service';
import type {
  BmbChatAttachmentError,
  BmbChatAttachmentResult,
} from '../../../../services/chat-attachments/chat-attachments.service';
import { BmbTranslationsService } from '../../../../services/translations/translations.service';
import { BmbIconComponent } from '../../../bmb-icon/bmb-icon.component';
import { BmbToastComponent } from '../../../bmb-toast/bmb-toast.component';
import { BmbFileAttachmentPicker } from '../../../bmb-file-attachment-picker/bmb-file-attachment-picker.component';

@Component({
  selector: 'bmb-upload-file-message',
  standalone: true,
  imports: [
    BmbButtonDirective,
    BmbIconComponent,
    BmbToastComponent,
    TranslatePipe,
    BmbFileAttachmentPicker,
  ],
  templateUrl: './bmb-upload-file-message.component.html',
  styleUrl: './bmb-upload-file-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideBmbChatAttachments()],
})
export class BmbUploadFileMessageComponent implements OnChanges {
  readonly message = input.required<BmbUploadFileMessage>();
  readonly uploadFileRequested = output<BmbUploadFileRequestEvent>();
  readonly filesSelected = output<File[]>();
  readonly attachmentResult = output<BmbChatAttachmentResult>();
  readonly retryUploadRequested = output<BmbUploadFileRequestEvent>();
  private readonly attachments = inject(BmbChatAttachmentsService);
  private readonly translations = inject(BmbTranslationsService);
  protected readonly result = computed(() =>
    this.attachments.result(this.message().id),
  );
  protected readonly errors = computed(() => {
    const external = this.message().content.error;
    return external ? [external] : (this.result()?.errors ?? []);
  });
  protected readonly interrupted = computed(() =>
    this.errors().some((error) => error.code === 'interrupted'),
  );

  private readonly fileAttachmentPicker = viewChild.required(
    BmbFileAttachmentPicker,
  );

  ngOnChanges(): void {
    this.attachments.validateRules(this.message().content);
  }

  protected errorDescription(error: BmbChatAttachmentError): string {
    const key = 'ai_chat_bubble.upload_file.';
    const description = this.translations.translate(
      key + 'error_' + error.code,
    );
    if (error.code === 'format') {
      return [
        this.translations.translate(key + 'format_prefix'),
        error.extension ?? error.fileName,
        description,
      ]
        .filter(Boolean)
        .join(' ');
    }
    const prefix = error.fileName ? `${error.fileName}: ` : '';
    const size =
      error.code === 'size'
        ? ` ${error.maxFileSize ?? this.message().content.maxFileSize ?? 2} MB.`
        : '';
    return `${prefix}${description}${size}`;
  }

  protected retryUpload(nativeEvent: Event): void {
    this.retryUploadRequested.emit({
      messageId: this.message().id,
      message: this.message(),
      nativeEvent,
    });
  }

  protected requestUpload(nativeEvent: Event): void {
    this.uploadFileRequested.emit({
      messageId: this.message().id,
      message: this.message(),
      nativeEvent,
    });
    this.fileAttachmentPicker().openFilePicker();
  }

  protected handleFilesSelected(files: File[]): void {
    if (!files.length) return;
    const result = this.attachments.select(
      files,
      this.message().content,
      this.message().id,
    );
    this.attachmentResult.emit(result);
    if (result.accepted.length) this.filesSelected.emit(result.accepted);
    this.fileAttachmentPicker().files.set([]);
  }
}

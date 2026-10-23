import {
  ChangeDetectionStrategy,
  Component,
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
import { buildErrorMessage } from '../../../../_shared/logic/utils';
import { BmbIconComponent } from '../../../bmb-icon/bmb-icon.component';
import { BmbFileAttachment } from '../../../bmb-file-attachment/bmb-file-attachment.component';

@Component({
  selector: 'bmb-upload-file-message',
  standalone: true,
  imports: [
    BmbButtonDirective,
    BmbIconComponent,
    TranslatePipe,
    BmbFileAttachment,
  ],
  templateUrl: './bmb-upload-file-message.component.html',
  styleUrl: './bmb-upload-file-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUploadFileMessageComponent implements OnChanges {
  readonly message = input.required<BmbUploadFileMessage>();
  readonly uploadFileRequested = output<BmbUploadFileRequestEvent>();
  readonly filesSelected = output<File[]>();

  private readonly fileAttachment = viewChild.required(BmbFileAttachment);

  ngOnChanges(): void {
    const extension = /^\.[a-z0-9]+(?:[._-][a-z0-9]+)*$/i;
    const mimeType =
      /^(?:application|audio|font|image|message|model|multipart|text|video)\/[a-z0-9][a-z0-9!#$&^_.+-]{0,126}$/i;
    const mediaWildcard = /^(?:audio|image|video)\/\*$/i;
    const invalidFormats = (
      this.message().content.acceptedFormats ?? []
    ).filter(
      (format) =>
        format !== format.trim() ||
        (!extension.test(format) &&
          !mimeType.test(format) &&
          !mediaWildcard.test(format)),
    );

    if (invalidFormats.length) {
      throw new Error(
        `The ${buildErrorMessage(['acceptedFormats'])} invalid. Use file extensions starting with "." or MIME types without parameters (for example, ".pdf", "application/pdf" or "image/*"). Invalid values: ${JSON.stringify(invalidFormats)}.`,
      );
    }
  }

  protected requestUpload(nativeEvent: Event): void {
    this.uploadFileRequested.emit({
      messageId: this.message().id,
      message: this.message(),
      nativeEvent,
    });
    this.fileAttachment().openFilePicker();
  }

  protected handleFilesSelected(files: File[]): void {
    if (!files.length) return;
    this.filesSelected.emit(files);
    this.fileAttachment().files.set([]);
  }
}

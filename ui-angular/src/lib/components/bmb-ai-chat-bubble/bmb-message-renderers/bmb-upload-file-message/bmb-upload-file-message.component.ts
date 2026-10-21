import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import type {
  BmbUploadFileMessage,
  BmbUploadFileRequestEvent,
} from '../../types';
import { BmbButtonDirective } from '../../../../directives/bmb-button/button.directive';
import { TranslatePipe } from '../../../../pipes/translations';

@Component({
  selector: 'bmb-upload-file-message',
  standalone: true,
  imports: [BmbButtonDirective, TranslatePipe],
  templateUrl: './bmb-upload-file-message.component.html',
  styleUrl: './bmb-upload-file-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbUploadFileMessageComponent {
  readonly message = input.required<BmbUploadFileMessage>();
  readonly uploadFileRequested = output<BmbUploadFileRequestEvent>();

  protected requestUpload(nativeEvent: Event): void {
    this.uploadFileRequested.emit({
      messageId: this.message().id,
      message: this.message(),
      nativeEvent,
    });
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbImageMessage } from '../../types';
import { handleImageNotFoundError } from '../../../../../_shared/logic/utils';

@Component({
  selector: 'bmb-image-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-image-message.component.html',
  styleUrl: './bmb-image-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageMessageComponent {
  readonly message = input.required<BmbImageMessage>();

  imageNotFoundError = output<void>();

  handleImageNotFoundError(imageName: string, event: Event): void {
    handleImageNotFoundError(imageName, event);
    this.imageNotFoundError.emit();
  }
}

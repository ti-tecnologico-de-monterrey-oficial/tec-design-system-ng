import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbMixedMessage } from '../../types';
import { handleImageNotFoundError } from '../../../../_shared/logic/utils';

@Component({
  selector: 'bmb-mixed-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-mixed-message.component.html',
  styleUrl: './bmb-mixed-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MixedMessageComponent {
  readonly message = input.required<BmbMixedMessage>();

  imageNotFoundError = output<void>();

  handleImageNotFoundError(imageName: string, event: Event): void {
    handleImageNotFoundError(imageName, event);
    this.imageNotFoundError.emit();
  }
}

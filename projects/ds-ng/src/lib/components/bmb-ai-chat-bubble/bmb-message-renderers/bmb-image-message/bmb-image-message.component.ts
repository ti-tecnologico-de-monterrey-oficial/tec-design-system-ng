import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbImageMessage } from '../../types';

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
}

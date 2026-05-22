import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbTextMessage } from '../../types';

@Component({
  selector: 'bmb-text-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-text-message.component.html',
  styleUrl: './bmb-text-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageComponent {
  readonly message = input.required<BmbTextMessage>();
}

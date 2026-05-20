import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbMixedMessage } from '../../types';

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
}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbTemplateMessage } from '../../types';

@Component({
  selector: 'bmb-template-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-template-message.component.html',
  styleUrl: './bmb-template-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateMessageComponent {
  readonly message = input.required<BmbTemplateMessage>();
}

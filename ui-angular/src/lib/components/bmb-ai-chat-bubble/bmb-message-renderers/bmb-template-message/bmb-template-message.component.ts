import {
  ChangeDetectionStrategy,
  Component,
  input,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbTemplateMessage as BmbTemplateMessageGeneric } from '../../../../_shared/types';

type BmbTemplateMessage = BmbTemplateMessageGeneric<TemplateRef<unknown>>;

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

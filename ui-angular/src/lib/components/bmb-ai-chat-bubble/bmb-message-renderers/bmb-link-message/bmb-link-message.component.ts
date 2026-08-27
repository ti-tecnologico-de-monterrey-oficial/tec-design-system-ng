import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbLinkMessage } from '../../types';
import { BmbTextLinkComponent } from '../../../bmb-text-link/bmb-text-link.component';

@Component({
  selector: 'bmb-link-message',
  standalone: true,
  imports: [CommonModule, BmbTextLinkComponent],
  templateUrl: './bmb-link-message.component.html',
  styleUrl: './bmb-link-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkMessageComponent {
  readonly message = input.required<BmbLinkMessage>();
}

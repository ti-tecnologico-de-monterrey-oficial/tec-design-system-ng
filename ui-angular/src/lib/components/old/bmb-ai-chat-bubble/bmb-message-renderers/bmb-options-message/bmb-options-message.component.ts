import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BmbOptionsMessage } from '../../types';
import { BmbContainerButtonComponent } from '../../../bmb-container-button/bmb-container-button.component';

@Component({
  selector: 'bmb-options-message',
  standalone: true,
  imports: [CommonModule, BmbContainerButtonComponent],
  templateUrl: './bmb-options-message.component.html',
  styleUrl: './bmb-options-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsMessageComponent {
  /**
   * Options message contract.
   */
  readonly message = input.required<BmbOptionsMessage>();
}

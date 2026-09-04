import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type IBmbGenericCardButtonAppearance = 'default' | 'alternative';

@Component({
  selector: 'bmb-generic-card-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bmb-generic-card-button.component.html',
  styleUrl: './bmb-generic-card-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbGenericCardButtonComponent {
  disabled = input<boolean>(false);
  selected = input<boolean>(false);
  appearance = input<IBmbGenericCardButtonAppearance>('default');

  cardClick = output<MouseEvent | KeyboardEvent>();

  handleClick(event: MouseEvent): void {
    if (this.disabled()) return;
    this.cardClick.emit(event);
  }

  handleKeydown(event: KeyboardEvent | Event): void {
    if (this.disabled() || !(event instanceof KeyboardEvent)) return;
    event.preventDefault();
    this.cardClick.emit(event);
  }
}

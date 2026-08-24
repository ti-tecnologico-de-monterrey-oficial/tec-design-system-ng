import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

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

  cardClick = output<MouseEvent | KeyboardEvent>();

  handleClick(event: MouseEvent): void {
    if (this.disabled()) return;
    this.cardClick.emit(event);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (this.disabled()) return;
    event.preventDefault();
    this.cardClick.emit(event);
  }
}

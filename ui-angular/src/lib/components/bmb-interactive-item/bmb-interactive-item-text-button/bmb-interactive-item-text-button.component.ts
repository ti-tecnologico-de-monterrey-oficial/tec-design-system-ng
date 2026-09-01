import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbItemDefaultComponent } from '../../bmb-item/children';

@Component({
  selector: 'bmb-interactive-item-text-button',
  standalone: true,
  imports: [BmbItemDefaultComponent],
  templateUrl: './bmb-interactive-item-text-button.component.html',
  styleUrl: './bmb-interactive-item-text-button.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInteractiveItemTextButtonComponent {
  icon = input.required<string>();
  label = input.required<string>();
  value = input.required<string>();
  isDisabled = input<boolean>(false);

  getActionClick = output<MouseEvent>();

  protected handleActionClick(event: MouseEvent): void {
    this.getActionClick.emit(event);
  }
}

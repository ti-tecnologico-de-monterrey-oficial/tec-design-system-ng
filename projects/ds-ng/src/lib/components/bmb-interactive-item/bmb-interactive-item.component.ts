import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbItemComponent } from '../bmb-item/bmb-item.component';
@Component({
  selector: 'bmb-interactive-item',
  standalone: true,
  imports: [BmbItemComponent],
  templateUrl: './bmb-interactive-item.component.html',
  styleUrl: './bmb-interactive-item.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInteractiveItemComponent {
  icon = input.required<string>();
  label = input.required<string>();
  value = input.required<string>();

  getActionClick = output<MouseEvent>();

  protected handleActionClick(event: MouseEvent): void {
    this.getActionClick.emit(event);
  }
}

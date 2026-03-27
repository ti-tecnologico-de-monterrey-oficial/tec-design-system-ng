import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbItemComponent } from '../bmb-item.component';

@Component({
  selector: 'bmb-item-actions',
  standalone: true,
  imports: [BmbItemComponent],
  templateUrl: './bmb-item-actions.component.html',
  styleUrl: './bmb-item-actions.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbItemActionsComponent {
  icon = input<string>('');
  label = input.required<string>();

  getActionClick = output<MouseEvent>();

  protected handleActionClick(event: MouseEvent): void {
    this.getActionClick.emit(event);
  }
}

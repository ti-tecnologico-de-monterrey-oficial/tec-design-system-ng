import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbContainerButtonDefaultComponent } from '../../bmb-container-button/bmb-container-button-default/bmb-container-button-default.component';

@Component({
  selector: 'bmb-item-actions',
  standalone: true,
  imports: [BmbContainerButtonDefaultComponent],
  templateUrl: './bmb-item-actions.component.html',
  styleUrl: './bmb-item-actions.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbItemActionsComponent {
  icon = input<string>('');
  label = input.required<string>();
  isDisabled = input<boolean>(false);

  getActionClick = output<MouseEvent>();

  protected handleActionClick(event: MouseEvent): void {
    this.getActionClick.emit(event);
  }
}

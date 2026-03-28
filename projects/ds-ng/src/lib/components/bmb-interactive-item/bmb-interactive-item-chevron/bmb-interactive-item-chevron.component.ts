import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbContainerButtonDefaultComponent } from '../../bmb-container-button/bmb-container-button-default/bmb-container-button-default.component';

@Component({
  selector: 'bmb-interactive-item-chevron',
  standalone: true,
  imports: [BmbContainerButtonDefaultComponent],
  templateUrl: './bmb-interactive-item-chevron.component.html',
  styleUrl: './bmb-interactive-item-chevron.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInteractiveItemChevronComponent {
  itemTitle = input.required<string>();
  itemSubtitle = input.required<string>();
  isDisabled = input<boolean>(false);

  getActionClick = output<MouseEvent>();

  protected handleActionClick(event: MouseEvent): void {
    this.getActionClick.emit(event);
  }
}

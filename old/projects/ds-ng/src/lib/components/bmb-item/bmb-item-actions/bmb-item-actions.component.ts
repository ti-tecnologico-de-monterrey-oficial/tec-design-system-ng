import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { BmbLayoutDirective } from '../../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../../directives/bmb-layout/bmb-layout-item.directive';

@Component({
  selector: 'bmb-item-actions',
  standalone: true,
  imports: [BmbIconComponent, BmbLayoutDirective, BmbLayoutItemDirective],
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

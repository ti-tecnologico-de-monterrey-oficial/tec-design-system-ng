import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBmbActionHeader } from '../../../_shared/types/utils';
import { BmbNavigationBarComponent } from '../bmb-navigation-bar/bmb-navigation-bar.component';
import { IBmbActionIconEventType } from '../../../_shared/types/components/action-icon';

@Component({
  selector: 'bmb-header-actions',
  standalone: true,
  imports: [CommonModule, BmbNavigationBarComponent],
  templateUrl: './bmb-header-actions.component.html',
  styleUrls: ['./bmb-header-actions.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbHeaderActionsComponent {
  headerActions = input.required<IBmbActionHeader[]>();

  getActionClick = output<IBmbActionIconEventType>();

  protected handleAction(
    headerAction: IBmbActionHeader,
    event: IBmbActionIconEventType,
  ): void {
    headerAction.action();
    this.getActionClick.emit(event);
  }
}

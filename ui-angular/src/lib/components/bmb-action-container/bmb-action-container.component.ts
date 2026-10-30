import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input,
  output,
} from '@angular/core';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

@Component({
  selector: 'bmb-action-container',
  standalone: true,
  imports: [
    BmbLayoutDirective,
    BmbLayoutItemDirective,
    BmbIconComponent,
    BmbActionIconComponent,
  ],
  templateUrl: './bmb-action-container.component.html',
  styleUrl: './bmb-action-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbActionContainerComponent {
  avatarIcon = input<string>('');
  actionIcon = input<string>('');
  actionIdElement = input<string>('action_container_action');
  showStatusIcon = input<boolean>(false);
  isError = input<boolean>(false);

  actionClick = output<MouseEvent>();

  handleClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.actionClick.emit(event);
  }
}

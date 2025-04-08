import {
  Component,
  input,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbTargetLink } from '../../types';
import { BmbDropdownMenuContentComponent } from './bmb-dropdown-menu-content/bmb-dropdown-menu-content.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';

export interface IDropdownItem {
  icon: string;
  text: string;
  url?: string;
  target?: IBmbTargetLink;
  action?: () => void;
}

@Component({
  selector: 'bmb-dropdown-menu',
  standalone: true,
  templateUrl: './bmb-dropdown-menu.component.html',
  styleUrls: ['./bmb-dropdown-menu.component.scss'],
  imports: [BmbDropdownMenuContentComponent, BmbActionIconComponent, ClickOutsideDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropdownMenuComponent {
  items = input<IDropdownItem[]>([]);
  isOpen = signal<boolean>(false);

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  closeDropdown() {
    this.isOpen.set(false);
  }
}

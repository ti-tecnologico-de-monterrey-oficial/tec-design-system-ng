import {
  Component,
  input,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { BmbDropdownContentComponent } from '../utils/bmb-dropdown-content/bmb-dropdown-content.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import { IDropdownItem } from '../../types';

@Component({
  selector: 'bmb-dropdown-menu',
  standalone: true,
  templateUrl: './bmb-dropdown-menu.component.html',
  styleUrls: ['./bmb-dropdown-menu.component.scss'],
  imports: [
    BmbDropdownContentComponent,
    BmbActionIconComponent,
    ClickOutsideDirective,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropdownMenuComponent {
  items = input<IDropdownItem[]>([]);

  isOpen = signal<boolean>(false);

  openDropdown() {
    this.isOpen.set(true);
  }

  closeDropdown() {
    this.isOpen.set(false);
  }
}

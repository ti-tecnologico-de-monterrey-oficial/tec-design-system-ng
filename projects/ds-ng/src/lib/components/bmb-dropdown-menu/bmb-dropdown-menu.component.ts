import {
  Component,
  input,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { IBmbTargetLink } from '../../types';
import { BmbButtonDirective } from '../../directives/button.directive';
import { BmbDropdownMenuContentComponent } from './bmb-dropdown-menu-content/bmb-dropdown-menu-content.component';

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
  imports: [BmbButtonDirective, BmbDropdownMenuContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropdownMenuComponent {
  items = input<IDropdownItem[]>([]);
  isOpen = signal<boolean>(false);

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }
}

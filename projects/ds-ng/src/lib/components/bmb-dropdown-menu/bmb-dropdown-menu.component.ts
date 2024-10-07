import {
  Component,
  input,
  signal,
  ChangeDetectionStrategy,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { isExternalLink } from '../../utils/utils';

export interface IDropdownItem {
  icon: string;
  text: string;
  url?: string;
  target?: string;
  action?: () => void;
}

@Component({
  selector: 'bmb-dropdown-menu',
  standalone: true,
  templateUrl: './bmb-dropdown-menu.component.html',
  styleUrls: ['./bmb-dropdown-menu.component.scss'],
  imports: [CommonModule, BmbIconComponent, RouterModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropdownMenuComponent {
  items = input<IDropdownItem[]>([]);
  isOpen = signal<boolean>(false);

  toggleDropdown() {
    this.isOpen.set(!this.isOpen());
  }

  isExternalLink(link: string): boolean {
    if (link) {
      return isExternalLink(link);
    }

    return false;
  }
}

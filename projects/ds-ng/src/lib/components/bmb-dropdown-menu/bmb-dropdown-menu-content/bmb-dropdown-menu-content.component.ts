import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { IDropdownItem } from '../bmb-dropdown-menu.component';
import { BmbCheckExternalLinkButtonComponent } from '../../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';

@Component({
  selector: 'bmb-dropdown-menu-content',
  standalone: true,
  imports: [BmbCheckExternalLinkButtonComponent, BmbIconComponent],
  templateUrl: './bmb-dropdown-menu-content.component.html',
  styleUrl: './bmb-dropdown-menu-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDropdownMenuContentComponent {
  items = input<IDropdownItem[]>([]);
  isOpen = model<boolean>(false);

  handleDropdown(item: IDropdownItem) {
    this.isOpen.update((value) => !value);
    if (item?.action) item.action();
  }
}

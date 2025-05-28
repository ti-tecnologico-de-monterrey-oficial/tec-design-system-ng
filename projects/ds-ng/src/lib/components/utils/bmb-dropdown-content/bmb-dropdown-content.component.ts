import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import { BmbCheckExternalLinkButtonComponent } from '../../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { IDropdownItem } from '../../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'bmb-dropdown-content',
  standalone: true,
  imports: [
    CommonModule,
    BmbCheckExternalLinkButtonComponent,
    BmbIconComponent,
  ],
  templateUrl: './bmb-dropdown-content.component.html',
  styleUrl: './bmb-dropdown-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDropdownContentComponent {
  selectedOption = input<string | string[]>(); //Internal

  items = model<IDropdownItem[]>([]);
  isOpen = model<boolean>(false);

  isSelected(item: string): boolean {
    if (typeof this.selectedOption() === 'string')
      return item === this.selectedOption();

    return this.selectedOption()?.includes(item) || false;
  }

  handleDropdown(item: IDropdownItem) {
    this.isOpen.update((value) => !value);
    if (item?.action) item.action();
  }
}

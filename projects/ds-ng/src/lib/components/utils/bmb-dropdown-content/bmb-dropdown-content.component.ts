import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  signal,
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
  isKeyboardEvent = model<boolean>(false); //Internal
  enableFilter = input<boolean>(false);

  isOpen = model<boolean>(false); //remove this

  filteredItems = computed<IDropdownItem[]>(() => {
    if (this.enableFilter() && this.filterString() !== '') {
      return this.items().filter((item) => {
        return item.text.toLocaleLowerCase().includes(this.filterString()) ||
          item.value?.toLocaleLowerCase().includes(this.filterString()) ||
          item.selectedText?.toLocaleLowerCase().includes(this.filterString());
      });
    }

    return this.items();
  });
  filterString = signal<string>('');

  filterList(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.toLowerCase();
    this.filterString.set(filterValue);
  }

  isSelected(item: string): boolean {
    if (typeof this.selectedOption() === 'string')
      return item === this.selectedOption();

    return this.selectedOption()?.includes(item) || false;
  }

  handleDropdown(item: IDropdownItem) {
    if (item?.action) item.action();
  }
}

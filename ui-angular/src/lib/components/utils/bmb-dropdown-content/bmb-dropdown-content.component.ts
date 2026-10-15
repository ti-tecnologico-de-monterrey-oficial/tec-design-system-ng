/*eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  model,
  output,
  signal,
  ViewEncapsulation,
  effect,
} from '@angular/core';
import { BmbCheckExternalLinkButtonComponent } from '../../bmb-check-external-link-button/bmb-check-external-link-button.component';
import { BmbIconComponent } from '../../bmb-icon/bmb-icon.component';
import { IDropdownItem } from '../../../_shared/types/index';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../../pipes/translations';
import { BmbDividerComponent } from '../../bmb-divider/bmb-divider.component';
import {
  getFilteredDropdownItems,
  getNextDropdownSelectionState,
  isDropdownAllSelected,
  isDropdownIndeterminate,
  isDropdownItemSelected,
} from '../../../_shared/logic/components/dropdown-content';

@Component({
  selector: 'bmb-dropdown-content',
  standalone: true,
  imports: [
    CommonModule,
    BmbCheckExternalLinkButtonComponent,
    BmbIconComponent,
    BmbDividerComponent,
    TranslatePipe,
  ],
  templateUrl: './bmb-dropdown-content.component.html',
  styleUrl: './bmb-dropdown-content.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbDropdownContentComponent {
  selectedOption = input<string | string[]>([]); //Internal
  items = model<IDropdownItem[]>([]);
  isKeyboardEvent = model<boolean>(false); //Internal
  enableFilter = input<boolean>(false);
  customFilterFunction = input<
    ((item: IDropdownItem, filter: string) => boolean) | null
  >(null);
  isMultiSelect = input<boolean>(false);

  clickedItem = output<IDropdownItem>();

  isOpen = model<boolean>(false); //remove this

  filteredItems = computed<IDropdownItem[]>(() =>
    getFilteredDropdownItems(
      this.items(),
      this.enableFilter(),
      this.filterString(),
      this.customFilterFunction(),
    ),
  );
  isIndeterminate = computed(() =>
    isDropdownIndeterminate(this.items().length, this.selectionState()),
  );
  isAllSelected = computed(() =>
    isDropdownAllSelected(this.items().length, this.selectionState()),
  );
  selectionState = signal<string[] | string>([]);
  filterString = signal<string>('');

  constructor() {
    effect(
      () => {
        this.selectionState.set(this.selectedOption());
      },
      { allowSignalWrites: true },
    );
  }

  filterList(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.toLowerCase();
    this.filterString.set(filterValue);
  }

  isSelected(item: string): boolean {
    return isDropdownItemSelected(this.selectionState(), item);
  }

  handleDropdown(item: IDropdownItem) {
    if (this.isMultiSelect()) {
      this.selectionState.update((value) =>
        getNextDropdownSelectionState(
          value,
          item.value!,
          this.isSelected(item.value!),
        ),
      );
    }
    if (item?.action) {
      item.action();
      this.clickedItem.emit(item);
    }
  }

  handleSelectedAll() {
    if (this.isAllSelected()) {
      this.selectionState.set([]);
      this.items().forEach((item) => {
        if (item?.action) {
          item.action();
          this.clickedItem.emit(item);
        }
      });
    } else {
      const allValues = this.items().map((item) => item.value!);
      const currentSelectedValues = [...this.selectionState()];
      this.selectionState.set(allValues);
      this.items().forEach((item) => {
        const hasSelection = currentSelectedValues.includes(item.value!);
        if (!hasSelection) {
          if (item?.action) {
            item.action();
            this.clickedItem.emit(item);
          }
        }
      });
    }
  }
}

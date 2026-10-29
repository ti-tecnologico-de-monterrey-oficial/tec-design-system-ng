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
  readonly testId = input<string>('dropdown-content-item-button');
  readonly selectedOption = input<string | string[]>([]); //Internal
  readonly items = model<IDropdownItem[]>([]);
  readonly isKeyboardEvent = model<boolean>(false); //Internal
  readonly enableFilter = input<boolean>(false);
  readonly customFilterFunction = input<
    ((item: IDropdownItem, filter: string) => boolean) | null
  >(null);
  readonly isMultiSelect = input<boolean>(false);

  readonly clickedItem = output<IDropdownItem>();

  readonly isOpen = model<boolean>(false); //remove this

  readonly filteredItems = computed<IDropdownItem[]>(() =>
    getFilteredDropdownItems(
      this.items(),
      this.enableFilter(),
      this.filterString(),
      this.customFilterFunction(),
    ),
  );
  private readonly selectedFilteredItems = computed(() =>
    this.filteredItems().filter((item) => this.isSelected(item.value!)),
  );
  readonly isIndeterminate = computed(
    () =>
      this.selectedFilteredItems().length > 0 &&
      this.selectedFilteredItems().length < this.filteredItems().length,
  );
  readonly isAllSelected = computed(
    () =>
      this.filteredItems().length > 0 &&
      this.selectedFilteredItems().length === this.filteredItems().length,
  );
  readonly selectionState = signal<string[] | string>([]);
  readonly filterString = signal<string>('');

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
    if (!this.isMultiSelect()) return;
    const deselect = this.isAllSelected();
    const changedItems = this.filteredItems().filter(
      (item) => this.isSelected(item.value!) === deselect,
    );
    changedItems.forEach((item) => this.handleDropdown(item));
  }
}

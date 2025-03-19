import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
  forwardRef,
  input,
  output,
} from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';

export interface IBmbDropdownItem {
  name: string;
  value: string;
  icon: string;
  id?: string;
}

@Component({
  selector: 'bmb-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    ReactiveFormsModule,
    ClickOutsideDirective,
    BmbCheckboxComponent,
  ],
  templateUrl: './bmb-dropdown.component.html',
  styleUrl: './bmb-dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BmbDropdownComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BmbDropdownComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropdownComponent implements OnInit, OnChanges {
  required = input<boolean>();
  showIcon = input<boolean>(false);
  placeholder = input<string>('');
  icon = input<string>('');
  options = input<string[] | IBmbDropdownItem[]>([]);
  helperText = input<string>('');
  control = input<FormControl>(new FormControl());
  disabled = input<boolean>(false);
  label = input<string>();
  preferredOptions = input<string[]>([]);
  isMultiSelect = input<boolean>(false);
  selectedValuesSet: Set<string> = new Set();

  onValueChange = output<any>();

  isFocus: boolean = false;
  selectedIndexOption?: number | string;
  selectedOption?: any;
  inputControl = new FormControl();

  uid: string = Date.now().toString(36) + (Math.floor(Math.random() * 90) + 10);
  filterControl = new FormControl();
  filteredData: string[] = [];

  value: string = '';
  openSelect: boolean = false;
  parsedOptions: IBmbDropdownItem[] = [];

  ngOnInit() {
    this.control().valueChanges.subscribe(() => this.updateDisplay());

    const value = this.control().value;
    if (this.isMultiSelect() && Array.isArray(value)) {
      this.inputControl.setValue(
        value.map((val) => this.getItem(val).name).join(', '),
      );
    } else {
      const dDItem = this.options().find((item: string | IBmbDropdownItem) => {
        if (typeof item === 'string') return item === value;
        return item.value === value;
      });
      const name = typeof dDItem === 'string' ? dDItem : dDItem?.name;
      this.inputControl.setValue(name);
    }

    this.parsedOptions = this.options().map((item) => this.getItem(item));
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parsedOptions = this.options().map((item) => this.getItem(item));
  }

  updateDisplay() {
    const value = this.control().value;

    if (this.isMultiSelect()) {
      if (Array.isArray(value) && value.length > 0) {
        this.inputControl.setValue(
          value.map((val) => this.getItem(val).name).join(', '),
        );
      } else {
        this.inputControl.setValue('');
      }
    } else {
      const dDItem = this.options().find((item: string | IBmbDropdownItem) => {
        if (typeof item === 'string') return item === value;
        return item.value === value;
      });
      const name = typeof dDItem === 'string' ? dDItem : dDItem?.name;
      this.inputControl.setValue(name || '');
    }
  }

  closeDialog() {
    this.openSelect = false;
  }

  handleItemClick(event: IBmbDropdownItem): void {
    if (this.isMultiSelect()) {
      let selectedValues = this.control().value || [];

      if (!Array.isArray(selectedValues)) {
        selectedValues = [];
      }

      const formattedItem = this.formatItem(event);

      if (
        selectedValues.some((item: any) => item.value === formattedItem.value)
      ) {
        selectedValues = selectedValues.filter(
          (item: any) => item.value !== formattedItem.value,
        );
      } else {
        selectedValues.push(formattedItem);
      }

      this.control().setValue(selectedValues);
      this.onValueChange.emit(selectedValues);
      this.updateDisplay();
    } else {
      this.onValueChange.emit(event);
      this.selectedIndexOption = event.value;
      this.selectedOption = event.value;
      this.control().setValue(event.value);
      this.isFocus = !this.isFocus;
      this.openSelect = false;
      this.updateDisplay();
    }
  }

  openDialog(event: any): void {
    if (
      !this.disabled() &&
      (event.target.classList.contains('bmb_dropdown-input-wrapper') ||
        event.target.classList.contains('bmb_dropdown-field-input') ||
        event.target.classList.contains('bmb_dropdown-field-chips') ||
        event.target.classList.contains('bmb_dropdown-field-chip') ||
        event.target.classList.contains('bmb_dropdown-field-open') ||
        event.target.classList.contains('material-symbols-outlined'))
    ) {
      this.openSelect = !this.openSelect;
      this.isFocus = !this.isFocus;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (
      ['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) >
      -1
    ) {
      if (!this.openSelect) {
        this.openDialog(event);
      }

      if (!this.options!.length) {
        event.preventDefault();
        return;
      }
    }
  }

  onKeySelect(
    event: KeyboardEvent,
    item?: IBmbDropdownItem,
    selectAll = false,
  ) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();

      if (selectAll) {
        this.toggleSelectAll();
      } else if (item) {
        this.handleItemClick(item);
      }
    }
  }

  handleChevronClick() {
    this.openSelect = !this.openSelect;
    this.isFocus = !this.isFocus;
  }

  getDialogStatus() {
    return this.openSelect;
  }

  getItem(item: unknown): IBmbDropdownItem {
    if (typeof item === 'string')
      return { name: item, value: item, icon: this.icon() || '' };
    return item as IBmbDropdownItem;
  }

  getPreferredOptions(): IBmbDropdownItem[] {
    const preferred = this.preferredOptions().map(
      (item) =>
        this.parsedOptions.find((option) => option.value === item) ||
        this.getItem(item),
    );

    return [...new Set([...preferred, ...this.parsedOptions])];
  }

  removeSelected(value: string) {
    let selectedValues = this.control().value || [];
    if (!Array.isArray(selectedValues)) {
      selectedValues = [];
    }

    this.control().setValue(selectedValues.filter((val: any) => val !== value));
    this.onValueChange.emit(this.control().value);
    this.updateDisplay();
  }

  toggleSelectAll(): void {
    const allValues = this.parsedOptions.map((item) => this.formatItem(item));

    let selectedValues = this.control().value || [];
    if (!Array.isArray(selectedValues)) {
      selectedValues = [];
    }

    const isCurrentlyAllSelected = selectedValues.length === allValues.length;

    if (isCurrentlyAllSelected) {
      selectedValues = [];
    } else {
      const selectedSet = new Set(
        selectedValues.map((item: any) => item.value),
      );
      selectedValues = [
        ...selectedValues,
        ...allValues.filter((item) => !selectedSet.has(item.value)),
      ];
    }

    this.control().setValue(selectedValues, { emitEvent: true });
    this.onValueChange.emit(this.control().value);
    this.updateDisplay();
  }

  formatItem(item: IBmbDropdownItem): IBmbDropdownItem {
    return {
      name: item.name,
      value: item.value,
      icon: item.icon,
      id: item.name.toLowerCase().replace(/\s+/g, '_'),
    };
  }

  isItemSelected(item: IBmbDropdownItem): boolean {
    return this.control().value?.some((val: any) => val.value === item.value);
  }
}

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
  ChangeDetectorRef,
  output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import { BmbCheckboxComponent } from '../bmb-checkbox/bmb-checkbox.component';

export interface IBmbDropdownItem {
  name: string;
  value: string;
  icon?: string;
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
export class BmbDropdownComponent
  implements OnInit, OnChanges, ControlValueAccessor, Validator
{
  required = input<boolean>();
  showIcon = input<boolean>(false);
  placeholder = input<string>('');
  icon = input<string>('');
  options = input<string[] | IBmbDropdownItem[]>([]);
  helperText = input<string>('');
  control = input<FormControl>(new FormControl());
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
  disabled = input<boolean>(false);
  openSelect: boolean = false;
  parsedOptions: IBmbDropdownItem[] = [];

  onChange: (value: any) => void = () => {};
  onTouched: () => void = () => {};

  constructor(private cdr: ChangeDetectorRef) {}

  writeValue(value: any): void {
    if (!value) {
      return;
    }

    this.value = value;
    if (this.control() && this.control().setValue) {
      this.control().setValue(value, { emitEvent: false });
    }
    this.updateDisplay();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  ngOnInit() {
    this.updateDisplay();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.parsedOptions = this.options().map((item) => this.getItem(item));
  }

  updateDisplay() {
    let value = this.control().value;
    if (this.isMultiSelect()) {
      this.isItemSelected(value);
      if (!Array.isArray(value)) {
        value = value ? [value] : [];
        this.control().setValue(value, { emitEvent: false });
      }
      this.control().setValue(value);
    } else {
      const dDItem = (this.options() as IBmbDropdownItem[]).find(
        (item) => item.value === value?.value,
      );
      const name = dDItem?.name || '';
      this.inputControl.setValue(name, { emitEvent: false });
      this.selectedOption = name || null;
    }

    this.cdr.detectChanges();
    this.onChange(this.value);
  }

  handleItemClick(event: IBmbDropdownItem): void {
    if (this.isMultiSelect()) {
      let selectedValues = this.control().value || [];

      if (!Array.isArray(selectedValues)) {
        selectedValues = [];
      }
      if (selectedValues.some((item: any) => item.value === event.value)) {
        selectedValues = selectedValues.filter(
          (item: any) => item.value !== event.value,
        );
      } else {
        selectedValues.push(event);
      }

      this.control().setValue(selectedValues);
      this.onValueChange.emit(selectedValues);
    } else {
      this.inputControl.setValue(event.value, { emitEvent: false });
      this.onValueChange.emit(event);
      this.selectedIndexOption = event.value;
      this.selectedOption = event.value;
      this.control().setValue(event.value);
      this.isFocus = !this.isFocus;
      this.openSelect = false;
    }
  }

  getPreferredOptions(): IBmbDropdownItem[] {
    const preferred = this.preferredOptions().map(
      (item) =>
        this.parsedOptions.find((option) => option.value === item) ||
        this.getItem(item),
    );

    return [...new Set([...preferred, ...this.parsedOptions])];
  }

  // Keyboards events
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

  // Dialog actions to open and close
  handleChevronClick() {
    this.openSelect = !this.openSelect;
    this.isFocus = !this.isFocus;
  }

  getDialogStatus() {
    return this.openSelect;
  }

  closeDialog() {
    this.openSelect = false;
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

  // Multiselect actions
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
    const allValues = this.parsedOptions.map((item) => item);
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

  isItemSelected(item: IBmbDropdownItem): boolean {
    const value = this.control().value;
    if (!value) return false;

    if (Array.isArray(value))
      return value.some((val) => val.value === item.value);

    if (typeof value === 'object' && value.value)
      return value.value === item.value;

    return false;
  }

  getItem(item: string | IBmbDropdownItem): IBmbDropdownItem {
    if (typeof item === 'string') {
      const foundItem = (this.options() as IBmbDropdownItem[]).find(
        (opt) => opt.value === item,
      );

      return (
        foundItem || {
          name: item,
          value: item,
          icon: 'bolt',
          id: item.toLowerCase().replace(/\s+/g, '_'),
        }
      );
    }

    return item;
  }

  // Validation error control
  validate(control: AbstractControl): ValidationErrors | null {
    if (
      this.required() &&
      (this.value === null ||
        this.value === undefined ||
        this.value.length === 0)
    ) {
      return { required: true };
    }
    return null;
  }
}

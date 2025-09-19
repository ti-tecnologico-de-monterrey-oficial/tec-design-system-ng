import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  input,
  output,
  model,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import {
  convertListToSelectList,
  getSelectedValues,
  getValidInitialValues,
} from '../../utils/dropdown';
import {
  IBmbInputError,
  IBmbInputTooltipPosition,
} from '../bmb-input/bmb-input.component';
import { BmbDropdownContentComponent } from '../utils/bmb-dropdown-content/bmb-dropdown-content.component';
import { IDropdownItem } from '../../types';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';
import { startWith } from 'rxjs';
import { getUUID } from '../../utils/utils';
import {
  assignNewFormControl,
  handleValidity,
  newFormControlByType,
  showError,
} from '../../utils/formControl';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';

export interface IBmbDropdownItem {
  name: string;
  value: string;
  selectedText?: string; //internal
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
    BmbInputValidatorComponent,
    BmbInputContentComponent,
    BmbDropdownContentComponent,
  ],
  templateUrl: './bmb-dropdown.component.html',
  styleUrl: './bmb-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropdownComponent implements OnInit, OnChanges {
  required = input<boolean>(false);
  showIcon = input<boolean>(false);
  placeholder = input<string>('');
  icon = input<string>('');
  options = input<string[] | IBmbDropdownItem[]>([]);
  helperText = input<string>('');
  errorMessage = input<string | IBmbInputError>('');
  label = input<string>('');
  name = input<string>(getUUID());
  preferredOptions = input<string[]>([]);
  isMultiSelect = input<boolean>(false);
  tooltip = input<string>('');
  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  });
  disabled = input<boolean>(false);
  value = input<string | string[]>('');
  isFilterable = input<boolean>(false);
  inputId = input<string>(this.name());
  customValidation = input<ValidatorFn>();

  control = model<FormControl>(newFormControlByType());

  onValueChange = output<any>();
  onFocus = output<boolean>();

  uuid: string = getUUID();
  isOpen: boolean = false;
  items: IDropdownItem[] = [];
  selectionControl: FormControl = new FormControl(new FormControl());
  selectedIcon: string = '';
  isKeyboardEvent: boolean = false;
  isControlNull: boolean = false;
  filteredOptions: IDropdownItem[] = [];
  selectedItem: IDropdownItem | null = null;

  ngOnInit() {
    if (!this.control()) {
      this.control.set(assignNewFormControl(this.name(), this.control())!);
      this.isControlNull = true;
    }

    if (this.disabled()) this.selectionControl.disable();
    else this.selectionControl.enable();

    if (!this.isMultiSelect() && Array.isArray(this.control()?.value)) {
      this.control().setValue('');
    }

    this.control()
      ?.valueChanges.pipe(startWith(this.getValidInitialValues()))
      .subscribe((value) => {
        this.setSelectionControl(value);
      });

    this.filteredOptions = [...this.items];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control() !== null) {
      if (changes['options']) {
        this.initOptions(changes['options'].currentValue);
        this.control().setValue(this.getValidInitialValues());
      }
    }
  }

  initOptions(list: string[] | IBmbDropdownItem[]): void {
    const newItems = convertListToSelectList(
      list,
      this.icon(),
      this.showIcon(),
    );

    this.items = newItems.map((element: IDropdownItem) => {
      return {
        ...element,
        icon: !this.isMultiSelect() && this.showIcon() ? element.icon! : '',
        action: () => {
          this.setSelectedValue(element);
        },
      } as IDropdownItem;
    });

    if (!!this.preferredOptions().length) {
      const preferredItems: IDropdownItem[] = this.items.filter((element) =>
        this.preferredOptions().includes(element.value!),
      );

      this.items = [...new Set([...preferredItems, ...this.items])];
    }

    this.filteredOptions = [...this.items];
  }

  handleFocus(value: boolean): void {
    this.onFocus.emit(value);
  }

  getUUID(name: string): string {
    return `${name}_${this.name()}_${this.uuid}`;
  }

  getIcon(): string {
    if (!this.isMultiSelect() && this.showIcon())
      return this.selectedIcon || this.icon();
    return '';
  }

  getValidInitialValues(): string | string[] {
    return getValidInitialValues(
      this.control().value,
      this.value(),
      this.options(),
      this.isMultiSelect(),
    );
  }

  setSelectionControl(controlValue: string | string[]): void {
    if (!!controlValue) {
      if (this.isMultiSelect()) {
        const selectedItems = this.items.filter(({ value }) =>
          controlValue.includes(value!),
        );

        this.selectionControl.setValue(
          selectedItems.map((element) => ` ${element.selectedText}`),
        );
        return;
      }

      const item = this.items.find(({ value }) => value === controlValue);
      if (!!item) {
        this.selectionControl.setValue(item?.selectedText);
        if (this.showIcon()) this.selectedIcon = item.icon;
        this.selectedItem = item;
      }
      return;
    }

    this.selectionControl.setValue('');
    if (this.showIcon()) this.selectedIcon = this.icon();
  }

  selectOptionWithKey(value: string): IDropdownItem[] {
    if (!value) return this.items;

    return this.items.filter((item) =>
      item?.selectedText?.toLowerCase().includes(value.toLowerCase()),
    );
  }

  setSelectedValue(element: IDropdownItem): void {
    if (this.isMultiSelect()) {
      this.control().setValue(
        getSelectedValues(this.control().value, element.value!),
      );
    } else this.control().setValue(element.value!);

    this.onValueChange.emit(this.control().value);
  }

  openList(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) this.isKeyboardEvent = false;
  }

  closeList(): void {
    this.isOpen = false;
    this.isKeyboardEvent = false;
    if (this.isFilterable() && !this.isMultiSelect()) {
      this.selectionControl.setValue(this.selectedItem?.selectedText || '');
    }
  }

  // Keyboards events
  onKeyDown(event: KeyboardEvent) {
    const keyboards = [' ', 'ArrowDown', 'Down'];
    const regexCode = /^[a-zA-Z0-9\-\.\, ]{1}$/gm;

    if (keyboards.includes(event.key)) {
      if (!this.isOpen) {
        this.isKeyboardEvent = true;
        this.openList();
      }

      if (!this.options().length && !this.isFilterable()) {
        event.preventDefault();
        return;
      }
    }

    if (this.isFilterable() && !this.isMultiSelect()) {
      let value = this.selectionControl.value || '';

      if (!this.isOpen) this.openList();
      if (regexCode.test(event.key)) {
        value += event.key;
      }
      if (event.key === 'Backspace') {
        value = value.slice(0, -1);
      }

      this.filteredOptions = this.selectOptionWithKey(value);
    }
  }

  handleValidity(): void {
    handleValidity(this.control());
  }

  get shouldShowError(): boolean {
    return showError(this.control());
  }
}

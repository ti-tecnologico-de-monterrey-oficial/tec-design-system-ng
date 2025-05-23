import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  input,
  output,
  model,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import { getUUID } from '../../utils/utils';
import { BmbInputValidationComponent } from '../bmb-input/bmb-input-validation/bmb-input-validation.component';
import {
  IBmbInputError,
  IBmbInputTooltipPosition,
} from '../bmb-input/bmb-input.component';
import { BmbInputValidationService } from '../bmb-input/bmb-input-validation/bmb-input-validation.service';
import { BmbDropdownContentComponent } from '../utils/bmb-dropdown-content/bmb-dropdown-content.component';
import { IBmbDropdownItemSelection } from '../../types';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';

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
    BmbInputValidationComponent,
    BmbDropdownContentComponent,
    BmbInputContentComponent,
  ],
  templateUrl: './bmb-dropdown.component.html',
  styleUrl: './bmb-dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbDropdownComponent implements OnInit {
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

  control = model<FormControl>();

  onValueChange = output<any>();

  isOpen: boolean = false;
  items: IBmbDropdownItemSelection[] = [];
  selectionControl: FormControl = new FormControl();
  selectedIcon: string = '';

  constructor(private ivs: BmbInputValidationService) {}

  ngOnInit() {
    if (!this.isMultiSelect() && Array.isArray(this.control()?.value)) {
      this.control()?.setValue(null);
    }

    this.items = this.options().map((element) => {
      if (typeof element === 'string') {
        return {
          idItem: element,
          icon: !this.isMultiSelect() && this.showIcon() ? this.icon() : '',
          text: element,
          value: element,
          checked: this.isSelectedValue(element, this.getValue()),
          action: () => {
            this._setSelectedValue(element);
          },
        };
      } else {
        return {
          idItem: element.id,
          icon: !this.isMultiSelect() && this.showIcon() ? element.icon! : '',
          text: element.name,
          value: element.value,
          checked: this.isSelectedValue(element, this.getValue()),
          action: () => {
            this.setSelectedValue(element);
          },
        };
      }
    });

    if (this.preferredOptions().length) {
      const preferredItems: IBmbDropdownItemSelection[] = this.items.filter(
        (element) => this.preferredOptions().includes(element.value!),
      );
      this.items = [...new Set([...preferredItems, ...this.items])];
    }

    this.setSelectionControl();
  }

  getUUID(): string {
    return getUUID();
  }

  getIcon(): string {
    if (!this.isMultiSelect() && this.showIcon())
      return this.selectedIcon || this.icon();
    return '';
  }

  setSelectionControl(): void {
    const selectedItems: IBmbDropdownItemSelection[] = this.items.filter(
      (element) => element.checked,
    );

    if (!!selectedItems && selectedItems.length) {
      if (selectedItems.length) {
        this.selectionControl.setValue(
          selectedItems.map((element) => ` ${element.text}`),
        );
        return;
      }

      this.selectionControl.setValue(selectedItems[0].text);
      this.selectedIcon = selectedItems[0].icon;
    }
  }

  getValue(): string | string[] {
    return this.control()?.value || this.value();
  }

  getValueControl(): string | string[] {
    const value = this.getValue();

    if (!this.isMultiSelect() && Array.isArray(value)) return '';

    return value;
  }

  isSelectedValue(
    item: IBmbDropdownItem | string,
    value: string | string[],
  ): boolean {
    if (!!value) {
      if (typeof value !== 'string' && this.isMultiSelect()) {
        if (typeof item !== 'string')
          return value.some((element: string) => item.value === element);
        return value.some((element: string) => element === item);
      }
      if (typeof item !== 'string') return item.value === value;

      return item === value;
    }

    return false;
  }

  openList(): void {
    this.isOpen = !this.isOpen;
  }

  closeList(): void {
    this.isOpen = false;
  }

  _setSelectedValue(value: string): void {
    this.getFormControl().setValue(value);
    this.selectionControl.setValue(value);
    this.selectedIcon = this.icon();
    this.onValueChange.emit(value);
  }

  setSelectedValue(element: IBmbDropdownItem): void {
    const value = this.isMultiSelect()
      ? [...this.getFormControl().value, element.value]
      : element.value;
    this.getFormControl().setValue(value);
    this.setSelectionControl();
    this.selectedIcon = element.icon!;
    this.onValueChange.emit(value);
  }

  // Keyboards events
  onKeyDown(event: KeyboardEvent) {
    const keyboards = [' ', 'ArrowDown', 'Down'];

    if (keyboards.includes(event.key)) {
      if (!this.isOpen) this.openList();

      if (!this.options().length) {
        event.preventDefault();
        return;
      }
    }
  }

  handleValidity(): void {
    const control: FormControl = this.getFormControl();
    control.updateValueAndValidity();
    control.markAsTouched();
  }

  get shouldShowError(): boolean {
    return this.ivs.showError(this.name());
  }

  getFormControl(): FormControl {
    return this.ivs.getFormControlByName(this.name());
  }
}

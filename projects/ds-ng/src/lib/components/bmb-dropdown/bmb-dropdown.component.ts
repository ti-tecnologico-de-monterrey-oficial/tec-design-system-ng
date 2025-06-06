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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import {
  convertListToSelectList,
  getSelectedValues,
  getUUID,
  getValidInitialValues,
  showError,
} from '../../utils/utils';
import { BmbInputValidationComponent } from '../bmb-input/bmb-input-validation/bmb-input-validation.component';
import {
  IBmbInputError,
  IBmbInputTooltipPosition,
} from '../bmb-input/bmb-input.component';
import { BmbInputValidationService } from '../bmb-input/bmb-input-validation/bmb-input-validation.service';
import { BmbDropdownContentComponent } from '../utils/bmb-dropdown-content/bmb-dropdown-content.component';
import { IDropdownItem } from '../../types';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';
import { startWith } from 'rxjs';

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
    BmbInputValidationComponent,
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

  control = model<FormControl>(new FormControl());

  onValueChange = output<any>();
  onFocus = output<boolean>();

  uuid: string = getUUID();
  isOpen: boolean = false;
  items: IDropdownItem[] = [];
  selectionControl: FormControl = new FormControl(new FormControl());
  selectedIcon: string = '';
  isKeyboardEvent: boolean = false;

  constructor(private ivs: BmbInputValidationService) {}

  ngOnInit() {
    if (!this.isMultiSelect() && Array.isArray(this.control()?.value)) {
      this.control().setValue('');
    }

    this.getFormControl()
      .valueChanges.pipe(startWith(this.getValidInitialValues()))
      .subscribe((value) => {
        this.setSelectionControl(value);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['options']) {
      this.initOptions(changes['options'].currentValue);
      this.setValue(this.getValidInitialValues());
    }
  }

  initOptions(list: string[] | IBmbDropdownItem[]): void {
    this.items = convertListToSelectList(list, this.icon(), this.showIcon());

    this.items = this.items.map((element: IDropdownItem) => {
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
      this.control().value || this.value(),
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
      }
      return;
    }

    this.selectionControl.setValue('');
    if (this.showIcon()) this.selectedIcon = this.icon();
  }

  setSelectedValue(element: IDropdownItem): void {
    if (this.isMultiSelect()) {
      this.setValue(
        getSelectedValues(this.getFormControl().value, element.value!),
      );
    } else this.setValue(element.value!);

    this.onValueChange.emit(this.getFormControl().value);
  }

  openList(): void {
    this.isOpen = !this.isOpen;
    if (!this.isOpen) this.isKeyboardEvent = false;
  }

  closeList(): void {
    this.isOpen = false;
    this.isKeyboardEvent = false;
  }

  // Keyboards events
  onKeyDown(event: KeyboardEvent) {
    const keyboards = [' ', 'ArrowDown', 'Down'];

    if (keyboards.includes(event.key)) {
      if (!this.isOpen) {
        this.isKeyboardEvent = true;
        this.openList();
      }

      if (!this.options().length) {
        event.preventDefault();
        return;
      }
    }
  }

  setValue(value: string | string[]): void {
    this.ivs.getFormControlByName(this.name())?.setValue(value);
  }

  handleValidity(): void {
    this.ivs.handleValidity(this.name());
  }

  get shouldShowError(): boolean {
    return this.ivs.showError(this.name());
  }

  getFormControl(): FormControl {
    return this.ivs.getFormControlByName(this.name()) || this.control();
  }
}

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
  computed,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
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
import { BmbProjectionContentService } from '../../services/projection/projection.service';
import { BmbLayoutDirective } from '../../directives/bmb-layout/bmb-layout.directive';
import { BmbLayoutItemDirective } from '../../directives/bmb-layout/bmb-layout-item.directive';
import { BmbTagComponent } from '../bmb-tags/bmb-tags.component';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

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
    BmbActionIconComponent,
    ReactiveFormsModule,
    BmbInputValidatorComponent,
    BmbInputContentComponent,
    BmbTagComponent,
    BmbLayoutDirective,
    BmbLayoutItemDirective,
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
  customFilterFunction = input<
    ((item: IDropdownItem, filter: string) => boolean) | null
  >(null);

  control = model<FormControl>(newFormControlByType());

  onValueChange = output<any>();
  onFocus = output<boolean>();

  uuid: string = getUUID();
  isModalOpen = model<boolean>(false);
  selectionControl: FormControl = new FormControl(new FormControl());
  selectedIcon: string = '';
  isKeyboardEvent: boolean = false;
  isControlNull: boolean = false;
  parsedOptions = computed(() => this.initOptions(this.options()));
  selectedItem: IDropdownItem | null = null;

  @ViewChild('contentDiv', { static: true }) contentRef!: ElementRef<any>;

  constructor(
    private readonly projectionService: BmbProjectionContentService,
  ) {}

  ngOnInit() {
    if (!this.control()) {
      this.control.set(assignNewFormControl(this.name(), this.control())!);
      this.isControlNull = true;
    }

    if (!this.isMultiSelect() && Array.isArray(this.control()?.value)) {
      this.control().setValue('');
    }

    this.control()
      ?.valueChanges.pipe(startWith(this.getValidInitialValues()))
      .subscribe((value) => {
        this.setSelectionControl(value);
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.control() !== null) {
      if (changes['options']) {
        this.control().setValue(this.getValidInitialValues());
      }
    }
  }

  initOptions(list: string[] | IBmbDropdownItem[]): IDropdownItem[] {
    const newItems = convertListToSelectList(
      list,
      this.icon(),
      this.showIcon(),
    );

    let parsedItems = newItems.map((element: IDropdownItem) => {
      return {
        ...element,
        icon: !this.isMultiSelect() && this.showIcon() ? element.icon! : '',
        showIndicator: this.isMultiSelect(),
        action: () => {
          this.setSelectedValue(element);
          this.projectionService.closeContent();
        },
      } as IDropdownItem;
    });

    if (!!this.preferredOptions().length) {
      const preferredItems: IDropdownItem[] = parsedItems.filter((element) =>
        this.preferredOptions().includes(element.value!),
      );

      parsedItems = [...new Set([...preferredItems, ...parsedItems])];
    }

    return parsedItems;
  }

  handleFocus(value: boolean): void {
    this.onFocus.emit(value);
    if (!this.isFilterable()) {
      this.openList();
    }
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
        const selectedItems = this.parsedOptions().filter(({ value }) =>
          controlValue.includes(value!),
        );

        this.selectionControl.setValue(selectedItems[0]?.selectedText);
        return;
      }

      const item = this.parsedOptions().find(
        ({ value }) => value === controlValue,
      );
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

  setSelectedValue(element: IDropdownItem): void {
    if (this.isMultiSelect()) {
      this.control().setValue(
        getSelectedValues(this.control().value, element.value!),
      );
    } else this.control().setValue(element.value!);

    this.onValueChange.emit(this.control().value);
  }

  openList(): void {
    const data = {
      content: BmbDropdownContentComponent,
      targetRef: this.contentRef?.nativeElement,
      fixSizeToRef: true,
      showBackdrop: false,
      inputContext: {
        selectedOption: this.control().value,
        items: this.parsedOptions(),
        isKeyboardEvent: this.isKeyboardEvent,
        enableFilter: !this.isMultiSelect() && this.isFilterable(),
        customFilterFunction: this.isMultiSelect()
          ? null
          : this.customFilterFunction(),
        isMultiSelect: this.isMultiSelect(),
      },
      // outputContext: {
      //   getSelectedAll: () => {
      //     this.handleClearSelectedOptions();
      //   },
      // },
      focusOnOpen: true,
    };
    this.projectionService.openContent(data);
  }

  // Keyboards events
  onKeyDown(event: KeyboardEvent) {
    const keyboards = [' ', 'ArrowDown', 'Down'];

    if (keyboards.includes(event.key)) {
      this.openList();
    }
  }

  handleValidity(): void {
    handleValidity(this.control());
  }

  get shouldShowError(): boolean {
    return showError(this.control());
  }

  handleClearSelectedOptions(): void {
    this.control().setValue(this.isMultiSelect() ? [] : '');
  }

  handleChangeValue(event: HTMLInputElement): void {
    if (event === null) {
      this.handleClearSelectedOptions();
    }
  }

  get isSelectedLengthAtLeastOne(): boolean {
    return this.control().value?.length || 0;
  }

  get selectedOptionCounter(): number {
    return !this.isSelectedLengthAtLeastOne
      ? 0
      : this.control().value?.length - 1;
  }

  get tagValue(): string {
    return `+${this.selectedOptionCounter}`;
  }
}

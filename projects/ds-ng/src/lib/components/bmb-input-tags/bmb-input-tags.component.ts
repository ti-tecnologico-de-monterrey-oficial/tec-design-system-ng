import { BmbTagComponent } from './../bmb-tags/bmb-tags.component';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  ViewEncapsulation,
  OnInit,
  output,
  model,
  signal,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IBmbDropdownItem } from '../bmb-dropdown/bmb-dropdown.component';
import {
  IBmbInputError,
  IBmbInputTooltipPosition,
} from '../bmb-input/bmb-input.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import { debounceTime } from 'rxjs';
import {
  convertListToSelectList,
  filteredValue,
  getSelectedValues,
  getUUID,
  getValidInitialValues,
} from '../../utils/utils';
import { BmbInputValidationComponent } from '../bmb-input/bmb-input-validation/bmb-input-validation.component';
import { BmbInputValidationService } from '../bmb-input/bmb-input-validation/bmb-input-validation.service';
import { BmbDropdownContentComponent } from '../utils/bmb-dropdown-content/bmb-dropdown-content.component';
import { IDropdownItem } from '../../types';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';

@Component({
  selector: 'bmb-input-tags',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideDirective,
    BmbTagComponent,
    BmbInputValidationComponent,
    BmbInputContentComponent,
    BmbDropdownContentComponent,
  ],
  templateUrl: './bmb-input-tags.component.html',
  styleUrl: './bmb-input-tags.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class BmbInputTagsComponent implements OnInit, AfterViewInit, OnChanges {
  errorMessage = input<string | IBmbInputError>('');
  tooltip = input<string>('');
  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  });
  label = input<string>('');
  placeholder = input<string>('');
  isRequired = input<boolean>(false);
  helperMessage = input<string>('');
  disabled = input<boolean>(false);
  maxSelectedItems = input<number>(); //Deprecated
  name = input<string>(getUUID());
  value = input<string | string[]>('');
  showError = input<boolean>(false);

  tagOptions = model<string[] | IBmbDropdownItem[]>([]);
  control = model<FormControl>(new FormControl());

  onKeyDown = output<KeyboardEvent>();
  onChange = output<string[]>();

  uuid: string = getUUID();
  showDropdown: boolean = false;
  selectedTags: IDropdownItem[] = [];
  filteredOptions: IDropdownItem[] = [];
  filterControl = new FormControl();
  items: IDropdownItem[] = [];
  isFocused = signal<boolean>(false);

  constructor(
    private cdr: ChangeDetectorRef,
    private ivs: BmbInputValidationService,
  ) {}

  ngOnInit(): void {
    this.filterControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filteredOptions = filteredValue(value, this.items);
        this.cdr.detectChanges();
      });
  }

  ngAfterViewInit(): void {
    this.getFormControl().valueChanges.subscribe((value) => {
      this.setSelectedTags(value || []);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tagOptions']) {
      this.initOptions(changes['tagOptions'].currentValue);
      this.getFormControl()?.setValue(this.getValidInitialValues());
    }
  }

  initOptions(list: string[] | IBmbDropdownItem[]): void {
    this.items = convertListToSelectList(list);
    this.items = this.items.map((element: IDropdownItem) => {
      return {
        ...element,
        action: () => {
          this.setSelectedValue(element);
        },
      } as IDropdownItem;
    });

    this.setSelectedTags(this.getValidInitialValues());

    this.filteredOptions = [...this.items];
  }

  getUUID(name: string): string {
    return `${name}_${this.name()}_${this.uuid}`;
  }

  getValidInitialValues(): string[] {
    const initialValue: string[] | string = getValidInitialValues(
      this.control().value || this.value(),
      this.tagOptions(),
      true,
    );

    return Array.isArray(initialValue) ? initialValue : [];
  }

  setSelectedValue(element: IDropdownItem): void {
    this.getFormControl().setValue(
      getSelectedValues(this.getFormControl().value, element.value!),
    );
    this.filterControl.setValue('');
    this.onChange.emit(this.getFormControl().value);
  }

  setSelectedTags(controlValue: string[]): void {
    this.selectedTags = this.items.filter(({ value }) =>
      controlValue.includes(value!),
    );
  }

  removeTag(tag: IDropdownItem) {
    this.setSelectedValue(tag);
  }

  openList() {
    this.showDropdown = true;
  }

  closeList() {
    this.showDropdown = false;
  }

  selectOptionWithKey(value: string): void {
    if (!!value) {
      const selectedLength: number = this.filteredOptions.length;

      if (!!selectedLength) {
        this.setSelectedValue(this.filteredOptions[0]);
      } else {
        this.addOption(value);
        this.setSelectedValue(
          this.filteredOptions[this.filteredOptions.length - 1],
        );
      }
    }
  }

  addOption(value: string): void {
    if (typeof this.tagOptions()[0] === 'string') {
      const newTagOptions: string[] = [
        ...(this.tagOptions() as string[]),
        value,
      ];
      this.tagOptions.set([...new Set(newTagOptions)]);
    } else {
      const newOption: IBmbDropdownItem = {
        name: value,
        value,
        selectedText: value,
        id: getUUID(),
      };
      const newList: IBmbDropdownItem[] = [
        ...(this.tagOptions() as IBmbDropdownItem[]),
        newOption,
      ];
      this.tagOptions.set([...new Set(newList)]);
    }

    this.initOptions(this.tagOptions());
  }

  handleKeyDown(event: KeyboardEvent) {
    const keyboardValuesToOpenDialog = [' ', 'ArrowDown', 'Down'];
    const keyboardValuesToAddOption = [',', 'Enter'];

    if (keyboardValuesToOpenDialog.includes(event.key)) {
      if (!this.showDropdown) this.openList();

      if (!this.filteredOptions.length) {
        event.preventDefault();
        return;
      }
      return;
    }

    if (keyboardValuesToAddOption.includes(event.key)) {
      event.preventDefault();
      this.selectOptionWithKey(this.filterControl.value);
    }
  }

  handleFocus(value: boolean) {
    this.isFocused.set(value);
  }

  handleValidity(): void {
    this.ivs.handleValidity(this.name());
  }

  get shouldShowError(): boolean {
    return this.ivs.showError(this.name());
  }

  getFormControl(): FormControl {
    return this.ivs.getFormControlByName(this.name());
  }
}

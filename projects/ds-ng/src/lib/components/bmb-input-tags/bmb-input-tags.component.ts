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
  AfterViewInit,
  signal,
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
export class BmbInputTagsComponent implements OnInit, AfterViewInit {
  tagOptions = input<string[] | IBmbDropdownItem[]>([]);
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

  control = model<FormControl>(new FormControl());

  onKeyDown = output<KeyboardEvent>();
  onChange = output<string[]>();

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
    this.items = convertListToSelectList(this.tagOptions());
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

    this.filterControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filteredValue(value);
        this.cdr.detectChanges();
      });
  }

  ngAfterViewInit(): void {
    this.getFormControl().valueChanges.subscribe((value) => {
      this.setSelectedTags(value);
    });
  }

  getUUID(): string {
    return getUUID();
  }

  getValidInitialValues(): string[] {
    const initialValue: string[] | string = getValidInitialValues(
      this.control().value || this.value(),
      this.tagOptions(),
      true,
    );

    return Array.isArray(initialValue) ? initialValue : [];
  }

  filteredValue(value: string): void {
    if (!!value) {
      this.filteredOptions = this.items.filter((item: IDropdownItem) =>
        item.text.toLowerCase().includes(value.toLowerCase()),
      );
      return;
    }

    this.filteredOptions = [...this.items];
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

  handleKeyDown(event: KeyboardEvent) {
    const keyboards = [' ', 'ArrowDown', 'Down'];

    if (keyboards.includes(event.key)) {
      if (!this.showDropdown) this.openList();

      if (!this.filteredOptions.length) {
        event.preventDefault();
        return;
      }
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

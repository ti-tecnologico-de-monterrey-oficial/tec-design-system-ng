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
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';
import { IBmbDropdownItem } from '../bmb-dropdown/bmb-dropdown.component';
import {
  IBmbInputError,
  BmbInputComponent,
} from '../bmb-input/bmb-input.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'bmb-input-tags',
  standalone: true,
  imports: [
    CommonModule,
    BmbTooltipComponent,
    BmbInputComponent,
    ClickOutsideDirective,
    BmbTagComponent,
  ],
  templateUrl: './bmb-input-tags.component.html',
  styleUrl: './bmb-input-tags.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
})
export class BmbInputTagsComponent implements OnInit {
  control = input<FormControl>(new FormControl());
  tagOptions = input<string[] | IBmbDropdownItem[]>([]);
  errorMessage = input<string | IBmbInputError>('');
  tooltip = input<string>('');
  label = input<string>('');
  placeholder = input<string>('');
  isRequired = input<boolean>(false);
  helperMessage = input<string>('');
  disabled = input<boolean>(false);
  maxSelectedItems = input<number>();
  name = input<string>(window.crypto.randomUUID());
  showError = input<boolean>(false);

  onKeyDown = output<KeyboardEvent>();
  onChange = output<string[]>();

  showDropdown: boolean = false;
  shouldShowError: boolean = false;
  selectedTags: IBmbDropdownItem[] = [];
  filteredOptions: IBmbDropdownItem[] = [];
  filterControl = new FormControl();

  constructor(private cdr: ChangeDetectorRef) {}

  handleFocus() {
    this.showDropdown = true;
  }

  closeDialog() {
    this.showDropdown = false;
  }

  ngOnInit(): void {
    this.control().valueChanges.subscribe((value: string[]) => {
      this.updateErrorState();
      const formattedOptions = this.transFormOptions(this.tagOptions());
      this.selectedTags = formattedOptions.filter((item) =>
        value?.includes(item.value),
      );
      this.cdr.markForCheck();
    });

    this.filterControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filteredValue(value);
      });

    const formattedOptions = this.transFormOptions(this.tagOptions());
    this.filteredOptions = formattedOptions;

    const currentValues = this.control().value;
    if (Array.isArray(currentValues)) {
      this.selectedTags = formattedOptions.filter((item) =>
        currentValues.includes(item.value),
      );
    }
  }

  filteredValue(value: string): void {
    if (!value) {
      this.filteredOptions = this.transFormOptions(this.tagOptions());
      this.cdr.detectChanges();
      return;
    }

    const formattedOptions = this.transFormOptions(this.tagOptions());
    let filteredOptions: IBmbDropdownItem[] = formattedOptions.filter(
      (item: IBmbDropdownItem) =>
        item.name.toLowerCase().includes(value.toLowerCase()),
    );

    this.filteredOptions = filteredOptions;
    this.cdr.detectChanges();
  }

  transFormOptions(options: string[] | IBmbDropdownItem[]): IBmbDropdownItem[] {
    if (options.length === 0) return [];
    if (typeof options[0] === 'string') {
      return (options as string[]).map((item) => ({ name: item, value: item }));
    }

    return options as IBmbDropdownItem[];
  }

  updateErrorState(): void {
    this.shouldShowError =
      this.isRequired() &&
      this.control().invalid &&
      (this.control().touched || this.control().dirty);
  }

  getErrorMessage(): string {
    if (typeof this.errorMessage() === 'string') {
      return this.errorMessage().toString();
    }

    if (this.control()['errors'] !== null) {
      const errorType = this.control()['errors'];
      const error = this.errorMessage() as IBmbInputError;

      if (errorType?.['required'] && error.required) return error.required;
    }

    return '';
  }

  handleItemClick(item: IBmbDropdownItem) {
    this.selectedTags.push(item);
    const selectedTagsString = this.selectedTags.map((tag) => tag.value);
    this.control().setValue(selectedTagsString);
    this.onChange.emit(selectedTagsString);
    this.filterControl.setValue('');
  }

  handleItemKeyDown(event: KeyboardEvent, item: IBmbDropdownItem) {
    console.log('handleItemKeyDown', event, item);
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleItemClick(item);
      this.filterControl.setValue('');
      this.showDropdown = false;
    }
  }

  removeTag(tag: IBmbDropdownItem) {
    this.selectedTags = this.selectedTags.filter((t) => t.value !== tag.value);
    const selectedTagsString = this.selectedTags.map((tag) => tag.value);
    this.control().setValue(selectedTagsString);
  }

  checkIfIsSelected(item: IBmbDropdownItem): boolean {
    return !this.selectedTags.some((tag) => tag.value === item.value);
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const value = this.filterControl.value;
      if (value && this.checkIfIsSelected({ name: value, value })) {
        const newTag = { name: value, value };
        this.handleItemClick(newTag);
        this.filterControl.setValue('');
        this.showDropdown = false;
      }
    }
    // if (event.key === 'Backspace') {
    //   if (this.selectedTags.length > 0) {
    //     this.removeTag(this.selectedTags[this.selectedTags.length - 1]);
    //   }
    // }
  }
}

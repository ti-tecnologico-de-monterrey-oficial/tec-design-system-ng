import { BmbTagComponent } from './../bmb-tags/bmb-tags.component';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import {
  FormControl,
} from '@angular/forms';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';
import { IBmbDropdownItem } from '../bmb-dropdown/bmb-dropdown.component';
import { IBmbInputError, BmbInputComponent } from '../bmb-input/bmb-input.component';
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
  name = input<string>('');

  showError = input<boolean>(false); // deprecated

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
    this.control().valueChanges.subscribe(() => {
      this.updateErrorState();
    });

    this.filterControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filteredValue(value);
      });

    this.filteredOptions = this.transFormOptions(this.tagOptions());
  }

  filteredValue(value: string): void {
    const formattedOptions = this.transFormOptions(this.tagOptions());
    let filteredOptions: string[] | IBmbDropdownItem[] = formattedOptions.filter((item: IBmbDropdownItem) => item.name.toLowerCase().includes(value.toLowerCase()));

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
    this.control().setValue(selectedTagsString.toString());
  }

  checkIfIsSelected(item: IBmbDropdownItem): boolean {
    return !this.selectedTags.some((tag) => tag.value === item.value);
  }

  removeTag(tag: IBmbDropdownItem) {
    this.selectedTags = this.selectedTags.filter((t) => t.value !== tag.value);
    const selectedTagsString = this.selectedTags.map((tag) => tag.value);
    this.control().setValue(selectedTagsString.toString());
  }
}

import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  input,
  output,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { getUUID } from '../../utils/utils';
import { BmbDropdownContentComponent } from '../utils/bmb-dropdown-content/bmb-dropdown-content.component';
import { BmbInputContentComponent } from '../bmb-input/bmb-input-content/bmb-input-content.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';
import { IDropdownItem } from '../../types';
import { convertListToSelectList, filteredValue } from '../../utils/dropdown';

@Component({
  selector: 'bmb-search-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClickOutsideDirective,
    BmbInputContentComponent,
    BmbDropdownContentComponent,
  ],
  templateUrl: './bmb-search-input.component.html',
  styleUrl: './bmb-search-input.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbSearchInputComponent implements AfterViewInit, OnChanges {
  inputId = input<string>(getUUID());
  name = input<string>(getUUID());
  data = input<string[]>([]);
  isLoading = input<boolean>(false);
  isServerSideFilter = input<boolean>(false);
  placeholder = input<string>('');
  serverSideFilteredData = input<string[]>([]);

  onValueChange = output<string>();
  onServerSideFilterEvent = output<string>();
  onClearField = output<boolean>();

  value: string = '';
  filteredData: IDropdownItem[] = [];
  uid: string = getUUID();
  isDialogOpen: boolean = false;
  filterControl = new FormControl();
  items: IDropdownItem[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.filterControl.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.filteredData = filteredValue(value, this.items);
        this.cdr.detectChanges();
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['serverSideFilteredData'] && this.isServerSideFilter()) {
      this.initOptions(changes['serverSideFilteredData'].currentValue);
    } else {
      this.initOptions(this.data());
    }
    if (changes['serverSideFilteredData'] && changes['isLoading']) {
      this.isDialogOpen =
        changes['serverSideFilteredData']?.currentValue?.length ||
        changes['isLoading']?.currentValue;
    }

    if (changes['isLoading']) {
      if (changes['isLoading']?.currentValue) {
        this.filterControl.disable();
      } else {
        this.filterControl.enable();
      }
    }
  }

  initOptions(list: string[]): void {
    this.items = convertListToSelectList(list);
    this.items = this.items.map((element: IDropdownItem) => {
      return {
        ...element,
        action: () => {
          this.setSelectedValue(element);
        },
      } as IDropdownItem;
    });

    this.filteredData = [...this.items];
  }

  closeList() {
    this.isDialogOpen = false;
  }

  setSelectedValue(element: IDropdownItem): void {
    const value = element.value;
    this.filterControl.setValue(value);

    if (this.isServerSideFilter()) {
      this.onServerSideFilterEvent.emit(value!);
    } else {
      this.onValueChange.emit(value!);
    }
  }

  handleItemClick(): void {
    this.isDialogOpen = !this.isDialogOpen;
  }

  handleClearFilter(): void {
    this.onClearField.emit(true);
  }

  handleKeyDown(event: KeyboardEvent) {
    const keyboardValuesToOpenDialog = [' ', 'ArrowDown', 'Down'];
    const keyboardValuesToAddOption = ['Enter'];

    if (keyboardValuesToOpenDialog.includes(event.key)) {
      if (!this.isDialogOpen) this.handleItemClick();

      if (!this.filteredData.length) {
        event.preventDefault();
        return;
      }
      return;
    }

    if (keyboardValuesToAddOption.includes(event.key)) {
      event.preventDefault();
      if (!!this.filterControl.value) {
        const selectedLength: number = this.filteredData.length;

        if (!!selectedLength) {
          this.setSelectedValue(this.filteredData[0]);
        }
      }
      return;
    }
  }
}

import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
  forwardRef,
  input,
  output,
} from '@angular/core';
import {
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { ClickOutsideDirective } from '../../directives/utils/clickoutside.directive';

export interface IBmbDropdownItem {
  name: string;
  value: string;
  icon: string;
}

@Component({
  selector: 'bmb-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    ReactiveFormsModule,
    ClickOutsideDirective,
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
export class BmbDropdownComponent implements OnInit {
  required = input<boolean>();
  showIcon = input<boolean>(false);
  placeholder = input<string>('');
  icon = input<string>('');
  options = input<string[] | IBmbDropdownItem[]>([]);
  helperText = input<string>('');
  control = input<FormControl>(new FormControl());
  disabled = input<boolean>(false);
  label = input<string>();

  onValueChange = output<any>();

  isFocus: boolean = false;
  selectedIndexOption?: number;
  selectedOption?: any;
  inputControl = new FormControl();

  uid: string = Date.now().toString(36) + (Math.floor(Math.random() * 90) + 10);
  filterControl = new FormControl();
  filteredData: string[] = [];

  value: string = '';
  openSelect: boolean = false;

  ngOnInit() {
    const value = this.control().value;
    const dDItem = this.options().find((item: string | IBmbDropdownItem) => {
      if (typeof item === 'string') return item === value;
      return item.value === value;
    });
    const name = typeof dDItem === 'string' ? dDItem : dDItem?.name;
    this.inputControl.setValue(name);
  }

  closeDialog() {
    this.openSelect = false;
  }

  handleItemClick(
    event: IBmbDropdownItem,
    index: number,
    item: IBmbDropdownItem | string,
  ): void {
    this.onValueChange.emit(item);
    this.selectedIndexOption = index;
    this.selectedOption = event.value;
    this.control().setValue(event.value);
    this.isFocus = !this.isFocus;
    this.openSelect = false;
    this.inputControl.setValue(event.name);
  }

  openDialog(event: any): void {
    if (
      !this.disabled() &&
      (event.target.classList.contains('bmb_dropdown-input-wrapper') ||
        event.target.classList.contains('bmb_dropdown-field-input') ||
        event.target.classList.contains('bmb_dropdown-field-open') ||
        event.target.classList.contains('material-symbols-outlined'))
    ) {
      this.openSelect = !this.openSelect;
      this.isFocus = !this.isFocus;
    }
  }

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

  getDialogStatus() {
    return this.openSelect;
  }

  getItem(item: unknown): IBmbDropdownItem {
    if (typeof item === 'string')
      return { name: item, value: item, icon: this.icon() || '' };
    return item as IBmbDropdownItem;
  }
}

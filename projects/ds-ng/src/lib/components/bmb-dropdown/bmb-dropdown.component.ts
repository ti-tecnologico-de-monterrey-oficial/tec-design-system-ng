import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
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

export interface IBmbDropdownItem {
  name: string;
  value: string;
}

@Component({
  selector: 'bmb-dropdown',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, ReactiveFormsModule],
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
export class BmbDropdownComponent {
  required = input<boolean>();
  showIcon = input<boolean>(false);
  placeholder = input<string>('');
  icon = input<string>('');
  options = input<string[] | IBmbDropdownItem[]>([]);
  helperText = input<string>('');
  control?: FormControl | undefined;
  disabled = input<boolean>(false);
  label = input<string>();

  onValueChange = output<any>();

  isFocus: boolean = false;
  selectedIndexOption?: number;
  selectedOption?: any;

  uid: string = Date.now().toString(36) + (Math.floor(Math.random() * 90) + 10);
  filterControl = new FormControl();
  filteredData: string[] = [];

  value: string = '';
  openSelect: boolean = false;

  ngOnInit(): void {
    if (this.control === undefined) {
      this.control = new FormControl();
    }
  }

  handleItemClick(event: any, index: any): void {
    this.onValueChange.emit(event.value);
    this.selectedIndexOption = index;
    this.selectedOption = event.value;
    if (this.control) {
      this.control.setValue(event.name);
    }

    this.isFocus = !this.isFocus;
    this.openSelect = false;
  }

  openDialog() {
    this.openSelect = !this.openSelect;
    this.isFocus = !this.isFocus;
  }

  onParentClick() {
    if (this.openSelect) {
      this.isFocus = !this.isFocus;
    }
  }

  onKeyDown(event: KeyboardEvent) {
    if (
      ['Enter', ' ', 'ArrowDown', 'Down', 'ArrowUp', 'Up'].indexOf(event.key) >
      -1
    ) {
      if (!this.openSelect) {
        this.openDialog();
      }

      if (!this.options!.length) {
        event.preventDefault();
        return;
      }
    }
  }

  onChangeFn = (_: any) => {};

  onTouchedFn = () => {};

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  onTouched() {
    this.onTouchedFn();
  }

  onChange() {
    this.onChangeFn(this.value);
  }

  getItem(item: unknown): IBmbDropdownItem {
    if (typeof item === 'string') return { name: item, value: item };
    return item as IBmbDropdownItem;
  }
}

import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbLoaderComponent } from '../bmb-loader/bmb-loader.component';
import { BmbTagComponent } from '../bmb-tags/bmb-tags.component';

@Component({
  selector: 'bmb-dropdown',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    BmbLoaderComponent,
    ReactiveFormsModule,
    BmbTagComponent,
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
export class BmbDropdownComponent
  implements AfterViewInit, ControlValueAccessor, OnChanges, OnInit
{
  @Input() required?: boolean;
  @Input() showIcon?: boolean = false;
  @Input() placeholder?: string = '';
  @Input() icon?: string = '';
  @Input() options?: string[] = [];
  @Input() helperText?: string = '';
  @Input() formControl?: FormControl | undefined;
  @Input() disabled?: boolean = false;
  @Input() label?: string;
  @Input() type?: 'default' | 'autocomplete' = 'default';

  @Output() onValueChange: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('inputWrapper', { read: ElementRef, static: false })
  inputWrapper: ElementRef | undefined;

  @ViewChild('filterDropdown') filterField: ElementRef | null = null;

  @ViewChild('input', { static: false })
  input: NgModel | undefined;

  private childNodes: any = null;

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.childNodes?.contains(event.target)) {
      this.openSelect = false;
      this.isFocus = this.isFocus == false ? false : true;
    }
  }

  isFocus: boolean = false;
  selectedIndexOption?: number;
  selectedOption?: any;

  multipleOptions?: string[] = [];

  uid: string = Date.now().toString(36) + (Math.floor(Math.random() * 90) + 10);
  filterControl = new FormControl();
  filteredData: string[] = [];

  value: string = '';
  openSelect: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    if (this.formControl === undefined) {
      this.formControl = new FormControl();
    }
  }

  ngAfterViewInit(): void {
    this.childNodes = this.elementRef.nativeElement;
    if (this.disabled && this.formControl) {
      this.formControl.disable();
    } else if (this.disabled && !this.formControl) {
      this.input?.disabled;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formControl && changes?.['disabled'] !== undefined) {
      if (this.formControl.disabled !== changes?.['disabled']?.currentValue) {
        changes?.['disabled']?.currentValue
          ? this.formControl.disable()
          : this.formControl.enable();
      }
    }
  }

  handleItemClick(event: string, index: any): void {
    if (this.type == 'autocomplete') {
      let found = this.multipleOptions?.find((element) => element == event);
      if (found === undefined) {
        this.multipleOptions?.push(event);
        this.onValueChange.emit(this.multipleOptions);
        if (this.formControl) {
          this.formControl.setValue(this.multipleOptions);
        }
      }
    } else {
      this.onValueChange.emit(event);
      this.selectedIndexOption = index;
      this.selectedOption = event;
      if (this.formControl) {
        this.formControl.setValue(event);
      }
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

  deleteTag(index: number) {
    this.multipleOptions?.splice(index, 1);
    this.onValueChange.emit(this.multipleOptions);
    if (this.formControl) {
      this.formControl.setValue(this.multipleOptions);
    }
  }

  public onChangeFn = (_: any) => {};

  public onTouchedFn = () => {};

  public registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  public writeValue(obj: any): void {
    this.value = obj;
  }

  public onTouched() {
    this.onTouchedFn();
  }

  public onChange() {
    this.onChangeFn(this.value);
  }
}

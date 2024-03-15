import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  forwardRef,
  AfterViewInit,
  SimpleChanges,
  OnChanges,
  ChangeDetectorRef,
  ViewEncapsulation,
} from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  FormControl,
  NgModel,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
@Component({
  selector: 'bmb-input',
  styleUrl: './bmb-input.component.scss',
  templateUrl: './bmb-input.component.html',
  standalone: true,
  imports: [CommonModule, BmbIconComponent, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BmbInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => BmbInputComponent),
      multi: true,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputComponent
  implements ControlValueAccessor, AfterViewInit, OnChanges
{
  @ViewChild('inputWrapper', { read: ElementRef, static: false })
  inputWrapper: ElementRef | undefined;
  @ViewChild('input', { static: false })
  input: NgModel | undefined;

  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() errorMessage: string = '';
  @Input() isValid: boolean = true;
  @Input() isDisabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() value: string | undefined;
  @Input() isClearable: boolean = false;
  @Input() appearance: 'normal' | 'simple' | 'main' = 'normal';
  @Input() device: 'mobile' | 'desktop' = 'mobile';

  @Output() handleClick: EventEmitter<any> = new EventEmitter();
  @Output() handleFocus: EventEmitter<any> = new EventEmitter();
  @Output() handleBlur: EventEmitter<any> = new EventEmitter();
  @Output() handleMouseover: EventEmitter<any> = new EventEmitter();
  @Output() handleChange: EventEmitter<any> = new EventEmitter();

  public inputModel: string | undefined;
  formControl: FormControl | undefined;
  onTouch: Function | undefined;
  style = '';
  iconColor = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (this.isDisabled && this.formControl) {
      this.formControl.disable();
    }
    setTimeout(() => {
      if (this.value && this.inputModel !== undefined) {
        this.value = undefined;
      }
    }, 0);
    this.style = `bmb__field--input-${this.appearance}`;
    this.iconColor = `bmb__field--icon-${this.appearance}`;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.formControl && changes?.['isDisabled'] !== undefined) {
      if (this.formControl.disabled !== changes?.['isDisabled']?.currentValue) {
        changes?.['isDisabled']?.currentValue
          ? this.formControl.disable()
          : this.formControl.enable();
      }
    }
  }

  onClear() {
    this.inputModel = undefined;
    this.value = undefined;
    this.inputWrapper?.nativeElement
      .querySelector('.bmb__field--input')
      .focus();

    if (this.isClearable && this.formControl) {
      this.formControl.reset();
    }

    this.cdr.detectChanges();

    this.handleChange.emit(this.getValue());
  }

  getComponent() {
    return this.input;
  }

  getValue() {
    return this.input?.['viewModel'];
  }

  setValidation(validation: any) {
    this.isValid = validation;
  }

  onParentClick() {
    this.inputWrapper?.nativeElement
      .querySelector('.bmb__field--input')
      .focus();
  }

  onClick() {
    this.handleChange.emit(this.getValue());
    this.handleClick.emit(this.getValue());
  }

  onFocus() {
    this.handleFocus.emit(this.getValue());
    if (this.onTouch) {
      this.onTouch();
    }
  }

  onBlur() {
    this.handleBlur.emit(this.getValue());
  }

  onMouseover() {
    this.handleMouseover.emit(this.getValue());
  }

  onChange(value: any): void {}

  writeValue(value: string): void {
    this.inputModel = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(state: boolean): void {
    if (this.formControl) {
      this.isDisabled = state;
    }
  }

  validate(form: FormControl) {
    this.formControl = form;
    if (!form?.value && this.isRequired === true) {
      return { invalid: true };
    } else {
      return null;
    }
  }

  setValue(value: string) {
    this.onChange(value);
    if (this.input?.['viewModel'] === '') {
      this.inputModel = undefined;
      this.value = undefined;
      this.cdr.detectChanges();
    }
    this.handleChange.emit(this.getValue());
    if (this.onTouch) {
      this.onTouch();
    }
  }
}

import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';

export type IBbmInputType = 'text' | 'password' | 'number' | 'text-area';

@Component({
  selector: 'bmb-input',
  styleUrls: ['./bmb-input.component.scss'],
  templateUrl: './bmb-input.component.html',
  standalone: true,
  imports: [
    CommonModule,
    BmbIconComponent,
    ReactiveFormsModule,
    BmbTooltipComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() type: IBbmInputType = 'text';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() errorMessage: string = '';
  @Input() helperMessage: string = '';
  @Input() appearance: string = 'normal';
  @Input() disabled: boolean = false;
  @Input() isRequired: boolean = false;
  @Input() showError: boolean = false;
  @Input() control: FormControl = new FormControl();
  @Input() name: string = '';
  @Input() spellcheck: boolean = false;
  @Input() maxlength!: number;
  @Input() minlength!: number;
  @Input() pattern!: string;
  @Input() size!: number;
  @Input() max!: number;
  @Input() min!: number;
  tooltip = input<string>('');
  rows = input<number>(3);
  showMaxTextLength = input<boolean>(true);

  @Output() isFocus: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() isBlur: EventEmitter<boolean> = new EventEmitter<boolean>();

  textLength: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl();
    }

    if (this.isRequired) {
      this.control.addValidators(Validators.required);
    }

    this.control.updateValueAndValidity();

    this.control.valueChanges.subscribe(() => {
      this.textLength = this.control.value.toString().length;
      this.updateErrorState();
      this.cdr.markForCheck();
    });
  }

  private updateErrorState(): void {
    this.showError =
      this.isRequired &&
      this.control.invalid &&
      (this.control.touched || this.control.dirty);
  }

  onFocus() {
    this.isFocus.emit(true);
  }

  onBlur() {
    this.isFocus.emit(false);
    this.isBlur.emit(true);
  }

  get inputClasses(): { [key: string]: boolean } {
    const appearance = this.type === 'text-area' ? 'normal' : this.appearance;
    return {
      ['bmb_field-input-' + appearance]: true,
      'bmb_field-input-error': this.shouldShowError,
      disabled: this.disabled,
    };
  }

  get shouldShowError(): boolean {
    return this.showError;
  }
}

import {
  Component,
  Input,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';
import { IBbmSidePosition } from '../../types';

export type IBbmInputType =
  | 'text'
  | 'password'
  | 'number'
  | 'text-area'
  | 'radio';

export type IBbmInputAppearance = 'main' | 'normal' | 'simple';

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
export class BmbInputComponent {
  label = input<string>('');
  type = input<IBbmInputType>('text');
  placeholder = input<string>('');
  icon = input<string>('');
  appearance = input<IBbmInputAppearance | string>('normal');
  errorMessage = input<string>('');
  helperMessage = input<string>('');
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  @Input() showError: boolean = false;
  @Input() control: FormControl = new FormControl();
  name = input<string>('');
  spellcheck = input<boolean>(false);
  maxlength = input<number>();
  minlength = input<number>();
  pattern = input<string>();
  size = input<number>();
  max = input<number>();
  min = input<number>();
  id = input<string>();
  checked = input<boolean>(false);
  value = input<string>();
  labelPosition = input<IBbmSidePosition>('after');
  ariaDescribedBy = input<string>('');
  ariaLabel = input<string>('');
  ariaLabelledBy = input<string>('');
  tooltip = input<string>('');
  rows = input<number>(3);
  showMaxTextLength = input<boolean>(true);

  isFocus = output<boolean>();
  isBlur = output<boolean>();
  onChange = output<HTMLInputElement>();

  textLength: number = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl();
    }

    if (this.isRequired()) {
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
      this.isRequired() &&
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

  getPositionClass(className: string): string {
    if (!!this.labelPosition()) return `${className}-${this.labelPosition()}`;
    return '';
  }

  getLabelClass(className: string): string {
    return this.getPositionClass(className) || `${className}-main`;
  }

  getRadioErrorClass(className: string): string {
    if (this.errorMessage() && this.shouldShowError)
      return `${className}-error`;
    return '';
  }

  getClasses(className: string): string[] {
    if (this.type() === 'radio') {
      const baseName: string = `${className}-radio`;
      const classes: string[] = [baseName];
      return [
        ...classes,
        this.getPositionClass(`${className}-direction`),
        this.getRadioErrorClass(baseName),
      ];
    }
    return [];
  }

  get inputClasses(): { [key: string]: boolean } {
    const appearance =
      this.type() === 'text-area' ? 'normal' : this.appearance();
    return {
      ['bmb_field-input-' + appearance]: true,
      'bmb_field-input-error': this.shouldShowError,
      disabled: this.disabled(),
    };
  }

  get shouldShowError(): boolean {
    return this.showError;
  }

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement | null;
    if (target && target.checked) {
      target.value = this.value()!;
      this.control.setValue(target.value);
      this.onChange.emit(target);
    }
    event.stopPropagation();
  }

  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement | null;

    if (event.key === 'Enter' && target && !target.checked) {
      target.checked = true;
      this.onChange.emit(target);
      event.preventDefault();
      event.stopPropagation();
    }
  }
}

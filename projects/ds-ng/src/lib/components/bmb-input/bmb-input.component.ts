import {
  Component,
  Input,
  ChangeDetectorRef,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  BmbTooltipComponent,
  IBmbAlignTooltip,
  IBmbJustifyTooltip,
} from '../bmb-tooltip/bmb-tooltip.component';
import { IBbmSidePosition } from '../../types';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';

export type IBmbInputType =
  | 'text'
  | 'password'
  | 'number'
  | 'text-area'
  | 'radio';
export type IBmbInputAppearance = 'main' | 'normal' | 'simple';
export type IBmbAdditionalAction = 'copy' | 'showHide' | 'none';

export interface IBmbInputError {
  required?: string;
  min?: string;
  max?: string;
  minLength?: string;
  pattern?: string;
  jsonFormat?: string;
}

export interface IBmbInputTooltipPosition {
  align: IBmbAlignTooltip;
  justify: IBmbJustifyTooltip;
}

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
    BmbActionIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputComponent {
  label = input<string>('');
  type = input<IBmbInputType>('text');
  placeholder = input<string>('');
  icon = input<string>('');
  appearance = input<IBmbInputAppearance | string>('normal');
  errorMessage = input<string | IBmbInputError>('');
  helperMessage = input<string>('');
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  @Input() showError: boolean = false;
  @Input() control: FormControl = new FormControl();
  name = input<string>('');
  spellcheck = input<boolean>(false);
  jsonFormat = input<boolean>(false);
  heightTextArea = input<number>();
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
  tooltipTitle = input<string>('');
  rows = input<number>(3);
  showMaxTextLength = input<boolean>(true);
  additionalAction = input<IBmbAdditionalAction>('none');
  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  });
  isClearable = input<boolean>(false);

  controlTest = model<FormControl>();

  isFocus = output<boolean>();
  isBlur = output<boolean>();
  onChange = output<HTMLInputElement>();
  myName = output<string>();

  textLength: number = 0;
  isHide: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}


  ngOnInit(): void {
    if (!this.control) {
      this.control = new FormControl();
    }

    this.addValidators();
    this.control.updateValueAndValidity();
    this.control.valueChanges.subscribe(() => {
      this.textLength = this.control.value?.toString().length;
      this.updateErrorState();
      this.cdr.markForCheck();
    });

    if (this.control.value) {
      this.textLength = this.control.value?.toString().length;
    }
  }

  ngAfterViewInit(): void {
    if (this.name()) {
      this.myName.emit(this.name());
    }
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

  getType() {
    if (this.showAdditionalAction()) {
      if (this.additionalAction() === 'showHide' && !this.isHide) {
        return 'text';
      }
    }

    return this.type();
  }

  showAdditionalAction(): boolean {
    if (this.additionalAction() !== 'none') {
      if (this.additionalAction() === 'showHide') {
        return this.type() === 'password';
      }

      return true;
    }

    return false;
  }

  actionToExecute(): void {
    if (this.additionalAction() === 'copy') {
      const textToCopy = this.control?.value;
      if (textToCopy) {
        navigator.clipboard
          .writeText(textToCopy.toString())
          .then(() => console.log('Text copied to clipboard!'))
          .catch((err) => console.error('Error copying text: ', err));
      }
    }

    if (this.additionalAction() === 'showHide') {
      this.isHide = !this.isHide;
    }
  }

  getAdditionalActionIcon(): string {
    if (this.additionalAction() === 'copy') return 'content_copy';
    if (this.additionalAction() === 'showHide') {
      if (this.isHide) return 'visibility';
      return 'visibility_off';
    }
    return '';
  }

  addValidators(): void {
    if (this.isRequired()) {
      this.control.addValidators(Validators.required);
    }

    if (this.min()) {
      this.control.addValidators(Validators.min(this.min()!));
    }

    if (this.max()) {
      this.control.addValidators(Validators.max(this.max()!));
    }

    if (this.minlength()) {
      this.control.addValidators(Validators.minLength(this.minlength()!));
    }

    if (this.pattern()) {
      this.control.addValidators(Validators.pattern(this.pattern()!));
    }

    if (this.jsonFormat()) {
      this.control.addValidators(this.jsonValidator());
    }
  }

  private jsonValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!this.jsonFormat() || !control.value) {
        return null;
      }

      try {
        JSON.parse(control.value);
        return null;
      } catch (e) {
        return { invalidJson: true };
      }
    };
  }

  getErrorMessage(): string {
    if (typeof this.errorMessage() === 'string') {
      return this.errorMessage().toString();
    }

    if (this.control['errors'] !== null) {
      const errorType = this.control['errors'];
      const error = this.errorMessage() as IBmbInputError;

      if (errorType['invalidJson'] && error.jsonFormat) return error.jsonFormat;
      if (errorType['pattern'] && error.pattern) return error.pattern;
      if (errorType['min'] && error.min) return error.min;
      if (errorType['max'] && error.max) return error.max;
      if (errorType['minlength'] && error.minLength) return error.minLength;
      if (errorType['required'] && error.required) return error.required;
    }

    return '';
  }

  clearValue() {
    this.control.reset();
  }
}

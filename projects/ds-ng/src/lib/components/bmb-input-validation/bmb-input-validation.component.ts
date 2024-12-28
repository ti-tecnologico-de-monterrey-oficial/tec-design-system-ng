import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  ChangeDetectorRef,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import { BmbTooltipComponent } from '../bmb-tooltip/bmb-tooltip.component';
import { IBbmSidePosition } from '../../types';
import { BmbFormService } from '../../directives/bmb-form-control/bmb-form-control.service';
import { BmbInputControlDirective } from '../../../public-api';
import { NgxMatIntlTelInputComponent } from 'ngx-mat-intl-tel-input';
import { MatFormFieldModule } from '@angular/material/form-field';

export type IBmbInputType =
  | 'text'
  | 'password'
  | 'number'
  | 'text-area'
  | 'radio'
  | 'checkbox'
  | 'email'
  | 'phone'
  | 'switch';
export type IBmbInputAppearance = 'main' | 'normal' | 'simple';
export type IBmbAdditionalAction = 'copy' | 'showHide' | 'none';

export interface IBmbInputError {
  required?: string;
  min?: string;
  max?: string;
  minLength?: string;
  pattern?: string;
}

@Component({
  selector: 'bmb-input-validation',
  styleUrls: ['./bmb-input-validation.component.scss'],
  templateUrl: './bmb-input-validation.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbInputControlDirective,
    BmbIconComponent,
    BmbTooltipComponent,
    NgxMatIntlTelInputComponent,
    MatFormFieldModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputValidationComponent {
  label = input<string>('');
  type = input<IBmbInputType>('text');
  placeholder = input<string>('');
  icon = input<string>('');
  appearance = input<IBmbInputAppearance | string>('normal');
  errorMessage = input<string | IBmbInputError>('');
  helperMessage = input<string>('');
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  name = input.required<string>();
  spellcheck = input<boolean>(false);
  maxlength = input<number>();
  minlength = input<number>();
  pattern = input<string>();
  size = input<number>();
  max = input<number>();
  min = input<number>();
  id = input<string>();
  checked = model<boolean>(false);
  value = input<string>();
  labelPosition = input<IBbmSidePosition>();
  ariaDescribedBy = input<string>('');
  ariaLabel = input<string>('');
  ariaLabelledBy = input<string>('');
  tooltip = input<string>('');
  rows = input<number>(3);
  showMaxTextLength = input<boolean>(false);
  indeterminate = model<boolean>(false);
  leftText = input<string>('');
  leftIcon = input<string>('');
  rightText = input<string>('');
  rightIcon = input<string>('');
  control = model<FormControl>();
  additionalAction = input<IBmbAdditionalAction>('none');

  onFocus = output<boolean>();
  onBlur = output<FormControl>();
  onChange = output<Event>();

  validValuePhone: string = '';
  isHide: boolean = true;

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: BmbFormService,
  ) {}

  ngOnInit(): void {
    this.formService.setFormControl(this.control()!, this.type(), this.name());
    this.formService.addControlConfig(
      this.type(),
      this.name(),
      this.value(),
      this.checked(),
      this.isRequired(),
      this.min()!,
      this.max()!,
      this.minlength()!,
      this.pattern()!,
      this.cdr,
    );
  }

  getPositionClass(className: string): string {
    if (!!this.labelPosition())
      return `${className}-${this.labelPosition()?.toLocaleLowerCase()}`;
    return '';
  }

  getLabelClass(className: string): string {
    return this.getPositionClass(className) || `${className}-main`;
  }

  getTypeErrorClass(className: string): string {
    if (this.errorMessage() && this.shouldShowError)
      return `${className}-error`;
    return '';
  }

  getClasses(className: string, isContent?: boolean): string[] {
    const type = this.type().toLocaleLowerCase();
    if (type === 'radio' || type === 'checkbox') {
      const baseName: string = `${className}-${type}`;
      const classes: string[] = [baseName];
      return [
        ...classes,
        this.getPositionClass(`${className}-direction`),
        this.getTypeErrorClass(baseName),
      ];
    }

    if (type === 'switch') {
      if (isContent) {
        return [`${className}-switch_content`];
      }

      return [`${className}-switch_direction`];
    }

    return [];
  }

  get inputClasses(): { [key: string]: boolean } {
    const appearance =
      this.type() === 'text-area' ? 'normal' : this.appearance().toLocaleLowerCase();
    return {
      ['bmb_field-input-' + appearance]: true,
      'bmb_field-input-error': this.shouldShowError,
      disabled: this.disabled(),
    };
  }

  getTextLength(): number {
    return this.formService.getTextLength(this.name());
  }

  getFormControl(): FormControl {
    return this.formService.getFormControlByName(this.name());
  }

  get shouldShowError(): boolean {
    return this.formService.showError(this.type(), this.name());
  }

  getSwitchIcon(): string {
    if (
      !!this.rightIcon() &&
      !!this.leftIcon() &&
      !!!this.rightText() &&
      !!!this.leftText()
    ) {
      if (this.checked()) return this.rightIcon();
      return this.leftIcon();
    }

    return '';
  }

  showSwitchLabel(position: string): boolean {
    if (
      !!!this.rightIcon() &&
      !!!this.leftIcon() &&
      !!this.rightText() &&
      !!this.leftText()
    ) {
      if (position === 'left') return !!this.leftText();
      if (position === 'right') return !!this.rightText();
    }

    return false;
  }

  handleRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.checked) {
      target.value = this.value()!;
      this.formService.getFormControlByName(this.name()).setValue(target.value);
      this.onChange.emit(event);
    }
    event.stopPropagation();
  }

  handleRadioKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (event.key.toLocaleUpperCase() === 'ENTER' && target.checked) {
      this.formService.getFormControlByName(this.name()).setValue(target.value);
      this.onChange.emit(event);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  handleCheckChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (
      this.type().toLocaleLowerCase() === 'checkbox' &&
      this.indeterminate()
    ) {
      this.indeterminate.set(false);
    }

    this.checked.set(target.checked);

    this.onChange.emit(event);
    event.preventDefault();
    event.stopPropagation();
  }

  handleFocus() {
    this.onFocus.emit(true);
  }

  handleBlur() {
    this.onBlur.emit(this.control()!);
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
      const textToCopy = this.formService.getFormControlByName(
        this.name(),
      ).value;
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

  getErrorMessage(): string {
    const control = this.formService.getFormControlByName(this.name());
    if (typeof this.errorMessage() === 'string') {
      return this.errorMessage().toString();
    }

    if (control['errors'] !== null) {
      const errorType = control['errors'];
      const error = this.errorMessage() as IBmbInputError;

      if (errorType['pattern'] && error.pattern) return error.pattern;
      if (errorType['min'] && error.min) return error.min;
      if (errorType['max'] && error.max) return error.max;
      if (errorType['minlength'] && error.minLength) return error.minLength;
      if (errorType['required'] && error.required) return error.required;
    }

    return '';
  }
}

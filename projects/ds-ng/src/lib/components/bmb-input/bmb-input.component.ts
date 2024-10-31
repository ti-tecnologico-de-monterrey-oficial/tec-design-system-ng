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

export type IBbmInputType =
  | 'text'
  | 'password'
  | 'number'
  | 'text-area'
  | 'radio'
  | 'email'
  | 'phone';
export type IBbmInputAppearance = 'main' | 'normal' | 'simple';

@Component({
  selector: 'bmb-input',
  styleUrls: ['./bmb-input.component.scss'],
  templateUrl: './bmb-input.component.html',
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
  name = input.required<string>();
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
  showMaxTextLength = input<boolean>(false);
  control = model<FormControl>();
  showError = input<boolean>(false);

  isFocus = output<boolean>();
  isBlur = output<boolean>();
  onChange = output<HTMLInputElement>();

  validValuePhone: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: BmbFormService,
  ) {}

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

  getTextLength(): number {
    return this.formService.getTextLength(this.name());
  }

  getControl(): FormControl {
    return this.formService.getControl(
      this.type(),
      this.name(),
      this.value(),
      this.type() === 'radio' || this.type() === 'phone',
      this.isRequired(),
      this.cdr,
      this.control()!,
    );
  }

  get shouldShowError(): boolean {
    return this.formService.showError(this.name());
  }

  handleRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.checked) {
      target.value = this.value()!;
      this.formService.getFormControl(this.name()).setValue(target.value);
      this.onChange.emit(target);
    }
    event.stopPropagation();
  }

  handleRadioKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (event.key.toLocaleUpperCase() === 'ENTER' && target.checked) {
      this.formService.getFormControl(this.name()).setValue(target.value);
      this.onChange.emit(target);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  onFocus() {
    this.isFocus.emit(true);
  }

  onBlur() {
    this.isFocus.emit(false);
    this.isBlur.emit(true);
  }
}

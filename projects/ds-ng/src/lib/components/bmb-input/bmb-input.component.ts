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
  | 'checkbox'
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
  control = model<FormControl>();
  showError = input<boolean>(false);

  isFocus = output<boolean>();
  isBlur = output<boolean>();
  onRadioChange = output<HTMLInputElement>();
  onCheckboxChange = output<any>();

  validValuePhone: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private formService: BmbFormService,
  ) {}

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

  getClasses(type: string, className: string): string[] {
    if (
      this.type().toLocaleLowerCase() === 'radio' ||
      this.type().toLocaleLowerCase() === 'checkbox'
    ) {
      const baseName: string = `${className}-${type}`;
      const classes: string[] = [baseName];
      return [
        ...classes,
        this.getPositionClass(`${className}-direction`),
        this.getTypeErrorClass(baseName),
      ];
    }
    return [];
  }

  get inputClasses(): { [key: string]: boolean } {
    const appearance =
      this.type() === 'text-area'
        ? 'normal'
        : this.appearance().toLocaleLowerCase();
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
    const type = this.type().toLocaleLowerCase();
    return this.formService.getControl(
      type,
      this.name(),
      this.value(),
      type === 'radio' || type === 'checkbox' || type === 'phone',
      this.isRequired(),
      this.cdr,
      this.control()!,
    );
  }

  get shouldShowError(): boolean {
    return this.formService.showError(this.type(), this.name());
  }

  isChecked(): boolean {
    return (
      this.checked() ||
      this.formService.getFormControl(this.name())?.value === this.value()
    );
  }

  handleRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target && target.checked) {
      target.value = this.value()!;
      this.formService.getFormControl(this.name()).setValue(target.value);
      this.onRadioChange.emit(target);
    }
    event.stopPropagation();
  }

  handleRadioKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    if (event.key.toLocaleUpperCase() === 'ENTER' && target.checked) {
      this.formService.getFormControl(this.name()).setValue(target.value);
      this.onRadioChange.emit(target);
      event.preventDefault();
      event.stopPropagation();
    }
  }

  handleCheckboxChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked.set(target.checked);

    this.formService.getFormControl(this.name()).setValue(this.checked());
    this.onCheckboxChange.emit(event);
    event.stopPropagation();
  }

  handleCheckboxKeyDown(event: KeyboardEvent) {
    if (event.key.toLocaleUpperCase() === 'ENTER') {
      if (this.indeterminate()) {
        this.indeterminate.set(false);
        this.checked.set(true);
      } else {
        this.checked.update((value) => !value);
      }

      this.formService.getFormControl(this.name()).setValue(this.checked());
      this.onCheckboxChange.emit(event);
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

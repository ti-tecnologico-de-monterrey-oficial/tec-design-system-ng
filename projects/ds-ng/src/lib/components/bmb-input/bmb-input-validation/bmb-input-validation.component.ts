import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  model,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  IBmbInputAppearance,
  IBmbInputError,
  IBmbInputTooltipPosition,
  IBmbInputType,
} from '../bmb-input.component';
import { FormControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IBbmSidePosition } from '../../../types';
import { CommonModule } from '@angular/common';
import { BmbTooltipComponent } from '../../bmb-tooltip/bmb-tooltip.component';
import { getPositionClass } from '../../../utils/utils';
import { BmbInputValidationService } from './bmb-input-validation.service';

export type IBmbInputValType = 'checkbox' | 'email' | 'phone' | 'switch';

@Component({
  selector: 'bmb-input-validation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BmbTooltipComponent],
  templateUrl: './bmb-input-validation.component.html',
  styleUrl: './bmb-input-validation.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInputValidationComponent implements OnInit {
  inputId = input<string>('');
  type = input<IBmbInputType | IBmbInputValType>('text');
  appearance = input<IBmbInputAppearance | string>('normal');
  label = input<string>('');
  labelPosition = input<IBbmSidePosition | null>();
  name = input<string>('');
  value = input<string | string[]>();
  checked = input<boolean>(false);
  isRequired = input<boolean>(false);
  idDisabled = input<boolean>(false);
  max = input<number>();
  min = input<number>();
  maxLength = input<number>();
  minLength = input<number>();
  pattern = input<string>();
  jsonFormat = input<boolean>(false);
  tooltip = input<string>('');
  rows = input<number>(3);
  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  });
  showMaxTextLength = input<boolean | null>(true);
  helperMessage = input<string>('');
  errorMessage = input<string | IBmbInputError>('');
  customValidation = input<ValidatorFn>();

  isCustomError = model<boolean>(false);
  showError = model<boolean>(false);
  control = model<FormControl>();

  constructor(
    private cdr: ChangeDetectorRef,
    private ivs: BmbInputValidationService,
  ) {}

  ngOnInit(): void {
    this.ivs.setFormControl(this.control()!, this.type(), this.name());
    this.ivs.addControlConfig(
      this.type(),
      this.name(),
      this.value(),
      this.checked(),
      this.isRequired(),
      this.min()!,
      this.max()!,
      this.minLength()!,
      this.pattern()!,
      this.jsonFormat(),
      this.isCustomError(),
      this.customValidation()!,
      this.cdr,
    );
  }

  getClasses(className: string): string {
    if (this.type() === 'radio' || this.type() === 'checkbox') {
      return getPositionClass(`${className}-direction`, this.labelPosition()!);
    }

    return '';
  }

  getFormControl(): FormControl {
    return this.ivs.getFormControlByName(this.name());
  }

  getErrorMessage(): string {
    if (typeof this.errorMessage() === 'string') {
      return this.errorMessage().toString();
    }

    const control = this.ivs.getFormControlByName(this.name());
    const error = this.errorMessage() as IBmbInputError;

    if (control.hasError('pattern') && !!error.pattern) return error.pattern;
    if (control.hasError('min') && !!error.min) return error.min;
    if (control.hasError('max') && !!error.max) return error.max;
    if (control.hasError('minlength') && !!error.minLength)
      return error.minLength;
    if (control.hasError('maxlength') && !!error.maxLength)
      return error.maxLength;
    if (control.hasError('required') && !!error.required) return error.required;
    if (control.hasError('invalidJson') && !!error.jsonFormat)
      return error.jsonFormat;
    if (control.hasError('customValidation') && !!error.customValidation)
      return error.customValidation;

    return '';
  }
}

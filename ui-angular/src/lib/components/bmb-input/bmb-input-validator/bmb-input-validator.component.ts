import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  input,
  model,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {} from '../bmb-input.component';
import { FormControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
import { IBbmSidePosition } from '../../../_shared/types/utils';
import {
  IBmbInputError,
  IBmbInputAppearance,
  IBmbInputType,
  IBmbInputValType,
} from '../../../_shared/types/input';
import { CommonModule } from '@angular/common';
import { BmbTooltipComponent } from '../../bmb-tooltip/bmb-tooltip.component';
import {
  addInputValidatorValue,
  configureInputValidatorControl,
  getInputValidatorClasses,
  getInputValidatorErrorMessage,
  getInputValidatorErrorType,
  getInputValidatorIsFieldRequired,
  getInputValidatorValidatorError,
} from '../../../_shared/logic/components/input-validator';

@Component({
  selector: 'bmb-input-validator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    forwardRef(() => BmbTooltipComponent), // avoid circular dependency on Storybook
  ],
  templateUrl: './bmb-input-validator.component.html',
  styleUrl: './bmb-input-validator.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInputValidatorComponent implements OnInit {
  inputId = input<string>('');
  type = input<IBmbInputType | IBmbInputValType>('text');
  appearance = input<IBmbInputAppearance | string>('normal');
  label = input<string>('');
  labelPosition = input<IBbmSidePosition | null>();
  name = input<string>('');
  value = input<string | string[]>();
  checked = input<boolean>(false);
  isRequired = input<boolean>(false);
  isDisabled = input<boolean>(false);
  max = input<number>();
  min = input<number>();
  maxLength = input<number>();
  minLength = input<number>();
  pattern = input<string>();
  jsonFormat = input<boolean>(false);
  tooltip = input<string>('');
  rows = input<number>(3);
  showMaxTextLength = input<boolean | null>(true);
  helperMessage = input<string>('');
  errorMessage = input<string | IBmbInputError>('');
  customValidation = input<ValidatorFn | ValidatorFn[]>();
  isMultipleFile = input<boolean | null>(true);

  showError = model<boolean>(false);
  control = model<FormControl>();

  private cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  ngOnInit(): void {
    if (!!this.min() && !!this.max() && this.max()! < this.min()!) {
      throw new Error(
        `
          [${this.name()}]: Please enter a value greater or equal than min.
          The values ​​entered are:
          -min: ${this.min()}
          -max: ${this.max()}
          `,
      );
    }

    this.addControlConfig(
      this.type(),
      this.value(),
      this.checked(),
      this.isRequired(),
      this.min()!,
      this.max()!,
      this.minLength()!,
      this.pattern()!,
      this.jsonFormat(),
      this.customValidation()!,
    );
  }

  addControlConfig(
    type: string,
    value: unknown,
    checked: boolean,
    isRequired: boolean,
    min: number,
    max: number,
    minLength: number,
    pattern: string,
    isJsonFormat: boolean,
    customValidation: ValidatorFn | ValidatorFn[],
  ): void {
    configureInputValidatorControl({
      control: this.control(),
      type,
      value,
      checked,
      isRequired,
      min,
      max,
      minLength,
      pattern,
      isJsonFormat,
      customValidation,
      isDisabled: this.isDisabled(),
    });

    this.control()?.valueChanges.subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  validatorError(errorType: string | ValidatorFn): ValidatorFn {
    return getInputValidatorValidatorError(errorType);
  }

  addValue(
    control: FormControl,
    type: string,
    value: unknown,
    checked: boolean,
  ): void {
    addInputValidatorValue(control, type, value, checked);
  }

  getClasses(className: string): string {
    return getInputValidatorClasses({
      type: this.type(),
      className,
      labelPosition: this.labelPosition(),
    });
  }

  getErrorType(
    errorMessages: IBmbInputError,
    type: string,
    alternativeMessage: string,
  ): string {
    return getInputValidatorErrorType(errorMessages, type, alternativeMessage);
  }

  isFieldRequired(): boolean {
    return getInputValidatorIsFieldRequired({
      control: this.control(),
      isRequired: this.isRequired(),
    });
  }

  getErrorMessage(): string {
    return getInputValidatorErrorMessage({
      control: this.control(),
      errorMessage: this.errorMessage(),
      pattern: this.pattern(),
      min: this.min(),
      max: this.max(),
      minLength: this.minLength(),
      maxLength: this.maxLength(),
      label: this.label(),
    });
  }
}

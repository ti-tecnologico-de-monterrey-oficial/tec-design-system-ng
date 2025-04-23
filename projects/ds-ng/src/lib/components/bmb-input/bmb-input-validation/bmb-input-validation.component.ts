import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  input,
  model,
  ViewEncapsulation,
} from '@angular/core';
import {
  IBmbInputError,
  IBmbInputTooltipPosition,
  IBmbInputType,
} from '../bmb-input.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IBbmSidePosition } from '../../../types';
import { CommonModule } from '@angular/common';
import { BmbTooltipComponent } from '../../bmb-tooltip/bmb-tooltip.component';
import { getPositionClass } from '../../../utils/utils';
import { BmbInputValidationService } from './bmb-input-validation.service';

@Component({
  selector: 'bmb-input-validation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BmbTooltipComponent],
  templateUrl: './bmb-input-validation.component.html',
  styleUrl: './bmb-input-validation.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BmbInputValidationComponent {
  type = input<IBmbInputType>('text');
  label = input<string>('');
  labelPosition = input<IBbmSidePosition>('after');
  name = input<string>('');
  value = input<string>();
  checked = input<boolean>(false);
  isRequired = input<boolean>(false);
  disabled = input<boolean>(false);
  max = input<number>();
  min = input<number>();
  maxlength = input<number>();
  minlength = input<number>();
  pattern = input<string>();
  tooltip = input<string>('');
  rows = input<number>(3);
  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  });
  errorMessage = input<string | IBmbInputError>('');
  helperMessage = input<string>('');
  showError = input<boolean>(false);

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
      this.minlength()!,
      this.pattern()!,
      this.cdr,
    );
  }

  getPositionClass(className: string): string {
    return getPositionClass(className, this.labelPosition());
  }

  getLabelClass(className: string): string {
    return this.getPositionClass(className) || `${className}-main`;
  }

  getTypeErrorClass(className: string): string {
    if (!!this.errorMessage() && this.shouldShowError)
      return `${className}-error`;
    return '';
  }

  getClasses(className: string, isContent?: boolean): string[] {
    const type = this.type().toLocaleLowerCase();
    if (type === 'radio' || type === 'checkbox') {
      const baseName: string = `${className}`;
      const classes: string[] = [baseName];

      return [
        ...classes,
        this.getPositionClass(`${className}-direction`),
        this.getTypeErrorClass(baseName),
      ];
    }

    return [];
  }

  getFormControl(): FormControl {
    return this.ivs.getFormControlByName(this.name());
  }

  get shouldShowError(): boolean {
    return this.showError() || this.ivs.showError(this.name());
  }

  getErrorMessage(): string {
    const control = this.ivs.getFormControlByName(this.name());
    const error = this.errorMessage() as IBmbInputError;

    if (typeof this.errorMessage() === 'string') {
      return this.errorMessage().toString();
    }

    if(this.showError() && !!error.validation) return error.validation;

    if (control['errors'] !== null) {
      const errorType = control['errors'];

      if (errorType['pattern'] && !!error.pattern) return error.pattern;
      if (errorType['min'] && !!error.min) return error.min;
      if (errorType['max'] && !!error.max) return error.max;
      if (errorType['minlength'] && !!error.minLength) return error.minLength;
      if (errorType['required'] && !!error.required) return error.required;
    }

    return '';
  }
}

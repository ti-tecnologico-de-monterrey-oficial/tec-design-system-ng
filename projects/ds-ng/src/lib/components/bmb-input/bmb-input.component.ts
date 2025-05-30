import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  TemplateRef,
  ContentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ValidatorFn } from '@angular/forms';
import {
  IBmbAlignTooltip,
  IBmbJustifyTooltip,
} from '../bmb-tooltip/bmb-tooltip.component';
import { IBbmSidePosition } from '../../types';
import { BmbInputValidationService } from './bmb-input-validation/bmb-input-validation.service';
import { BmbInputValidationComponent } from './bmb-input-validation/bmb-input-validation.component';
import { getUUID } from '../../utils/utils';
import { BmbInputContentComponent } from './bmb-input-content/bmb-input-content.component';

export type IBmbInputType =
  | 'text'
  | 'password'
  | 'number'
  | 'text-area'
  | 'radio'
  | 'date_range';
export type IBmbInputAppearance = 'main' | 'normal' | 'simple';
export type IBmbAdditionalAction = 'copy' | 'showHide' | 'none';

export interface IBmbInputError {
  required?: string;
  min?: string;
  max?: string;
  minLength?: string;
  maxLength?: string;
  pattern?: string;
  jsonFormat?: string;
  customValidation?: string;
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
    BmbInputValidationComponent,
    BmbInputContentComponent,
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
  name = input<string>(getUUID());
  spellcheck = input<boolean>(false);
  jsonFormat = input<boolean>(false);
  heightTextArea = input<number>();
  maxlength = input<number>();
  minlength = input<number>();
  pattern = input<string>();
  size = input<number>(); //Deprecated
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
  additionalAction = input<IBmbAdditionalAction>('none');
  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  });
  isClearable = input<boolean>(false);
  customValidation = input<ValidatorFn>();

  isCustomError = model<boolean>(false);

  showError = model<boolean>(false);
  control = model<FormControl>(new FormControl());

  isFocus = output<boolean>();
  isBlur = output<boolean>();
  onChange = output<HTMLInputElement>();
  onKeyDown = output<KeyboardEvent>();

  @ContentChild('customInputContent') customInputContent!: TemplateRef<any>;

  constructor(private ivs: BmbInputValidationService) {}

  onFocus(value: boolean) {
    this.isFocus.emit(value);
  }

  onBlur(value: boolean) {
    this.isBlur.emit(value);
  }

  get shouldShowError(): boolean {
    return this.ivs.showError(this.name());
  }

  handleKeyPress(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.onKeyDown.emit(event);
    }
  }

  handleChange(value: HTMLInputElement) {
    this.onChange.emit(value);
  }

  clearValue() {
    this.getFormControl()?.reset();
  }

  getFormControl(): FormControl {
    return this.ivs.getFormControlByName(this.name());
  }
}

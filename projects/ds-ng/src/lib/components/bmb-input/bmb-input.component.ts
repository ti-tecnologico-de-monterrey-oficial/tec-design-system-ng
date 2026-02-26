import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  TemplateRef,
  OnInit,
  contentChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ValidatorFn } from '@angular/forms';
import type {
  IBmbAlignTooltip,
  IBmbJustifyTooltip,
} from '../bmb-tooltip/bmb-tooltip.component';
import { BmbInputValidatorComponent } from './bmb-input-validator/bmb-input-validator.component';
import { getUUID } from '../../utils/utils';
import { BmbInputContentComponent } from './bmb-input-content/bmb-input-content.component';
import {
  assignNewFormControl,
  newFormControlByType,
  showError,
} from '../../utils/formControl';

export type IBmbInputType = 'text' | 'password' | 'number' | 'text-area';
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
  styleUrl: './bmb-input.component.scss',
  templateUrl: './bmb-input.component.html',
  standalone: true,
  imports: [CommonModule, BmbInputValidatorComponent, BmbInputContentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputComponent implements OnInit {
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
  max = input<number>();
  min = input<number>();
  value = input<string>();
  autocomplete = input<string>('off');
  tooltip = input<string>('');
  rows = input<number>(3);
  showMaxTextLength = input<boolean>(true);
  additionalAction = input<IBmbAdditionalAction>('none');
  isClearable = input<boolean>(false);
  customValidation = input<ValidatorFn>();
  inputId = input<string>(this.name());
  isLoading = input<boolean>(false); // internal

  showError = model<boolean>(false);
  control = model<FormControl>(newFormControlByType(this.type()));

  isFocus = output<boolean>();
  isBlur = output<boolean>();
  onChange = output<HTMLInputElement>();
  onKeyDown = output<KeyboardEvent>();

  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  }); // Deprecated

  customInputContent = contentChild<TemplateRef<any>>('customInputContent');
  isControlNull: boolean = false;

  ngOnInit() {
    if (!this.control()) {
      this.control.set(
        assignNewFormControl(this.name(), this.control(), this.type())!,
      );
      this.isControlNull = true;
    }
  }

  onFocus(value: boolean) {
    this.isFocus.emit(value);
  }

  onBlur(value: boolean) {
    this.isBlur.emit(value);
  }

  get shouldShowError(): boolean {
    return showError(this.control());
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
}

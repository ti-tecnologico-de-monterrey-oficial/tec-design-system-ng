import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  IBmbAlignTooltip,
  IBmbJustifyTooltip,
} from '../bmb-tooltip/bmb-tooltip.component';
import { IBbmSidePosition } from '../../types';
import { BmbActionIconComponent } from '../bmb-action-icon/bmb-action-icon.component';
import { BmbInputValidationService } from './bmb-input-validation/bmb-input-validation.service';
import { BmbInputValidationComponent } from './bmb-input-validation/bmb-input-validation.component';

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
    BmbActionIconComponent,
    BmbInputValidationComponent,
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
  name = input<string>(window.crypto.randomUUID());
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
  rows = input<number>(3);
  showMaxTextLength = input<boolean>(true);
  additionalAction = input<IBmbAdditionalAction>('none');
  tooltipPosition = input<IBmbInputTooltipPosition>({
    align: 'above',
    justify: 'before',
  });
  isClearable = input<boolean>(false);

  showError = model<boolean>(false);
  control = model<FormControl>();

  isFocus = output<boolean>();
  isBlur = output<boolean>();
  onChange = output<HTMLInputElement>();
  onKeyDown = output<KeyboardEvent>();

  isHide: boolean = true;

  constructor(private ivs: BmbInputValidationService) {}

  onFocus() {
    this.isFocus.emit(true);
  }

  onBlur() {
    const control = this.ivs.getFormControlByName(this.name());
    control.updateValueAndValidity();
    this.isFocus.emit(false);
    this.isBlur.emit(true);
  }

  get inputClasses(): { [key: string]: boolean } {
    const appearance =
      this.type() === 'text-area' ? 'normal' : this.appearance();
    const baseName = 'bmb_field-input';
    const classes = [`${baseName}-${appearance}`];
    if (this.shouldShowError) {
      classes.push(`${baseName}-error`);
    }

    return classes.reduce(
      (acc, className) => {
        acc[className] = true;
        return acc;
      },
      {} as { [key: string]: boolean },
    );
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
      const textToCopy = this.getFormControl()?.value;
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

  clearValue() {
    this.getFormControl()?.reset();
  }

  getFormControl(): FormControl {
    return this.ivs.getFormControlByName(this.name());
  }
}

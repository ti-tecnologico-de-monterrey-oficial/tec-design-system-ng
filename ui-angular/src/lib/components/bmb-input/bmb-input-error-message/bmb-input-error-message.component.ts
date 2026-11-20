import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { getInputValidatorErrorMessage } from '../../../_shared/logic/components/input-validator';
import { FormControl } from '@angular/forms';
import type { IBmbInputError } from '../../../_shared/types/input';

@Component({
  selector: 'bmb-input-error-message',
  standalone: true,
  templateUrl: './bmb-input-error-message.component.html',
  styleUrl: './bmb-input-error-message.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'bmb_input-error-message' },
})
export class BmbInputErrorMessageComponent {
  inputId = input<string>('');
  control = input<FormControl>();
  showError = input<boolean>(false);
  errorMessage = input<string | IBmbInputError>('');
  pattern = input<string>();
  min = input<number>();
  max = input<number>();
  minLength = input<number>();
  maxLength = input<number>();
  label = input<string>('');
  helperMessage = input<string>('');
  appearance = input<string>('normal');

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

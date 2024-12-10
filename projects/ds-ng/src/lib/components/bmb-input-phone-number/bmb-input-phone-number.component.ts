import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BmbInputValidationComponent } from '../bmb-input-validation/bmb-input-validation.component';
import { IBbmInputAppearance } from 'ds-ng';

@Component({
  selector: 'bmb-input-phone-number',
  template: `
    <bmb-input-validation
      [appearance]="appearance()"
      type="phone"
      [name]="name()"
      [label]="label()"
      [value]="value()"
      [disabled]="disabled()"
      [isRequired]="isRequired()"
      [helperMessage]="helperMessage()"
      [errorMessage]="errorMessage()"
      [control]="control()"
    />
  `,
  standalone: true,
  imports: [BmbInputValidationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbInputPhoneNumberComponent {
  appearance = input<IBbmInputAppearance | string>('normal');
  name = input.required<string>();
  label = input<string>('');
  value = input<string>();
  disabled = input<boolean>(false);
  isRequired = input<boolean>(false);
  helperMessage = input<string>('');
  errorMessage = input<string>('');
  control = input<FormControl>();
}

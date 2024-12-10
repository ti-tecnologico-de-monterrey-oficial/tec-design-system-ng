import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { IBbmSidePosition } from '../../types';
import { FormControl } from '@angular/forms';
import { BmbInputValidationComponent } from '../bmb-input-validation/bmb-input-validation.component';

@Component({
  selector: 'bmb-radial',
  template: `
    <bmb-input-validation
      type="radio"
      [id]="id()"
      [name]="name()"
      [value]="value()"
      [label]="label()"
      [checked]="checked()"
      [isRequired]="required()"
      [errorMessage]="errorMessage()"
      [helperMessage]="helperMessage()"
      [disabled]="disabled()"
      [labelPosition]="labelPosition()"
      [control]="control()"
      [ariaDescribedBy]="ariaDescribedby()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledBy]="ariaLabelledby()"
      (onChange)="handleChange($event)"
    />
  `,
  standalone: true,
  imports: [BmbInputValidationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbRadialComponent {
  id = input<string>('');
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  name = input.required<string>();
  value = input.required<string>();
  label = input<string>('');
  labelPosition = input<IBbmSidePosition>('after');
  ariaDescribedby = input<string>('');
  ariaLabel = input<string>('');
  ariaLabelledby = input<string>('');
  required = input<boolean>(false);
  errorMessage = input<string>('');
  helperMessage = input<string>('');
  control = input<FormControl>();

  change = output<HTMLInputElement>();

  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.change.emit(target);
  }
}

import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
} from '@angular/core';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { IBbmSidePosition } from '../../types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bmb-radial',
  template: `
    <bmb-input
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
      (onChange)="handleChange($event)"
      [control]="control()"
      [ariaDescribedBy]="ariaDescribedby()"
      [ariaLabel]="ariaLabel()"
      [ariaLabelledBy]="ariaLabelledby()"
    />
  `,
  standalone: true,
  imports: [BmbInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbRadialComponent {
  id = input<string>('');
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  value = input<string>('');
  name = input.required<string>();
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

  handleChange(event: any) {
    this.change.emit(event);
  }
}

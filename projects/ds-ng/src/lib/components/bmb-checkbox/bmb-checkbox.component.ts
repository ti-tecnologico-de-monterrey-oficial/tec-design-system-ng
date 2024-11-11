import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  model,
} from '@angular/core';
import { BmbInputComponent } from '../bmb-input/bmb-input.component';
import { IBbmSidePosition } from '../../types';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'bmb-checkbox',
  template: `
    <bmb-input
      type="checkbox"
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
      [indeterminate]="indeterminate()"
    />
  `,
  standalone: true,
  imports: [BmbInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCheckboxComponent {
  id = input<string>('');
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  indeterminate = input<boolean>(false);
  required = input<boolean>(false);
  value = input<string>();
  name = input.required<string>();
  label = input<string>('');
  labelPosition = input<IBbmSidePosition>('after');
  ariaDescribedby = input<string>('');
  ariaLabel = input<string>('');
  ariaLabelledby = input<string>('');
  helperMessage = input<string>('');
  errorMessage = input<string>('');
  control = model<FormControl>();

  change = output<Event>();

  handleChange(event: Event) {
    this.change.emit(event);
  }
}

import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  Input,
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
      [value]="value()"
      [name]="name()"
      [label]="label()"
      [checked]="checked()"
      [isRequired]="required()"
      [control]="control"
      [showError]="showError"
      [errorMessage]="errorMessage()"
      [helperMessage]="helperMessage()"
      [disabled]="disabled()"
      (onChange)="handleChange($event)"
      [labelPosition]="labelPosition()"
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
  name = input<string>('');
  label = input<string>('');
  labelPosition = input<IBbmSidePosition>('after');
  ariaDescribedby = input<string>('');
  ariaLabel = input<string>('');
  ariaLabelledby = input<string>('');
  required = input<boolean>(false);
  errorMessage = input<string>('');
  helperMessage = input<string>('');
  @Input() showError: boolean = false;
  @Input() control: FormControl = new FormControl();

  change = output<HTMLInputElement>();

  handleChange(event: any) {
    this.change.emit(event);
  }
}

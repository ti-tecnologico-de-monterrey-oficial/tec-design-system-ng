import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  OnInit,
} from '@angular/core';
import { IBbmSidePosition } from '../../types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BmbInputValidationComponent } from '../bmb-input/bmb-input-validation/bmb-input-validation.component';
import { CommonModule } from '@angular/common';
import { getUUID } from '../../utils/utils';
import { IBmbInputError } from '../bmb-input/bmb-input.component';
import {
  assignNewFormControl,
  newFormControlByType,
  showError,
} from '../../utils/formControl';

@Component({
  selector: 'bmb-radial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BmbInputValidationComponent],
  templateUrl: './bmb-radial.component.html',
  styleUrl: './bmb-radial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbRadialComponent implements OnInit {
  id = input<string>('');
  checked = input<boolean>(false);
  disabled = input<boolean>(false);
  value = input<string>('');
  name = input<string>(getUUID());
  label = input<string>('');
  labelPosition = input<IBbmSidePosition>('after');
  ariaDescribedby = input<string>('');
  ariaLabel = input<string>('');
  ariaLabelledby = input<string>('');
  required = input<boolean>(false);
  errorMessage = input<string | IBmbInputError>('');
  helperMessage = input<string>('');

  showError = model<boolean>(false);
  control = model<FormControl>(newFormControlByType('radio'));

  change = output<HTMLInputElement>();
  onKeyDown = output<KeyboardEvent>();

  isControlNull: boolean = false;

  ngOnInit() {
    if (!this.control()) {
      this.control.set(
        assignNewFormControl(this.name(), this.control(), 'radio')!,
      );
      this.isControlNull = true;
    }
  }

  get shouldShowError(): boolean {
    return showError(this.control());
  }

  handleRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target && target.checked) {
      this.control().setValue(target.value);
      target.name = this.name();
      this.change.emit(target);
    }
    event.stopPropagation();
  }

  handleRadioKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    if (event.key === 'Enter' || event.key === ' ') {
      if (!target.checked) {
        this.control().setValue(target.value);
        target.name = this.name();
        this.change.emit(target);
      }
      event.preventDefault();
    }
    event.stopPropagation();
  }

  handleKeyPress(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement | null;
    if (target) {
      this.onKeyDown.emit(event);
    }
  }
}

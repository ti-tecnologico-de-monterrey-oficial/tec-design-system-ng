import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IBbmSidePosition } from '../../types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';
import { getUUID } from '../../utils/utils';
import { IBmbInputError } from '../bmb-input/bmb-input.component';
import {
  assignNewFormControl,
  newFormControlByType,
  showError,
} from '../../utils/formControl';

@Component({
  selector: 'bmb-checkbox',
  templateUrl: './bmb-checkbox.component.html',
  styleUrl: './bmb-checkbox.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BmbInputValidatorComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCheckboxComponent implements OnInit {
  id = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  value = input<string>('');
  name = input<string>(getUUID());
  label = input<string>('');
  labelPosition = input<IBbmSidePosition>('after');
  ariaDescribedby = input<string>('');
  ariaLabel = input<string>('');
  ariaLabelledby = input<string>('');
  errorMessage = input<string | IBmbInputError>('');
  helperMessage = input<string>('');

  control = model<FormControl>(newFormControlByType('checkbox'));
  checked = model<boolean>();
  showError = model<boolean>(false);
  indeterminate = model<boolean>(false);

  change = output<Event>();

  isControlNull: boolean = false;

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(
        assignNewFormControl(this.name(), this.control(), 'checkbox')!,
      );
      this.isControlNull = true;
    }

    if (this.indeterminate()) {
      this.checked.set(false);
    }
  }

  get shouldShowError(): boolean {
    return showError(this.control());
  }

  handleChange(event: Event): void {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;

    if (this.indeterminate()) {
      this.indeterminate.set(false);
    }

    this.checked.set(target.checked);
    this.control().setValue(this.checked());
    this.change.emit(event);
    event.preventDefault();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (this.indeterminate()) {
        this.indeterminate.set(false);
        this.checked.set(true);
      } else {
        this.checked.update((value) => !value);
      }

      this.control().setValue(this.checked());

      event.preventDefault();
      this.change.emit(event);
    }
  }
}

import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  model,
  OnInit,
} from '@angular/core';
import {
  getCheckboxStateOnChange,
  getCheckboxStateOnEnter,
  initializeCheckboxState,
} from '@ti-tecnologico-de-monterrey-oficial/core/logic/components/checkbox';
import { CommonModule } from '@angular/common';
import { IBbmSidePosition } from '../../types';
import { FormControl, ReactiveFormsModule, ValidatorFn } from '@angular/forms';
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
  name = input<string>(getUUID());
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  value = input<string>('');
  label = input<string>('');
  labelPosition = input<IBbmSidePosition>('after');
  ariaDescribedby = input<string>('');
  ariaLabel = input<string>('');
  ariaLabelledby = input<string>('');
  errorMessage = input<string | IBmbInputError>('');
  helperMessage = input<string>('');
  customValidation = input<ValidatorFn>();

  control = model<FormControl>(newFormControlByType('checkbox'));
  checked = model<boolean>();
  showError = model<boolean>(false);
  indeterminate = model<boolean>(false);
  inputId = model<string>(getUUID());

  change = output<Event>();

  isControlNull: boolean = false;

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(
        assignNewFormControl(this.name(), this.control(), 'checkbox')!,
      );
      this.isControlNull = true;
    }

    const state = initializeCheckboxState(
      this.checked(),
      this.indeterminate(),
    );

    this.checked.set(state.checked);
    this.indeterminate.set(state.indeterminate);
  }

  get shouldShowError(): boolean {
    return showError(this.control());
  }

  handleChange(event: Event): void {
    event.stopPropagation();

    const target = event.target as HTMLInputElement;

    const state = getCheckboxStateOnChange(
      target.checked,
      this.indeterminate(),
    );

    this.checked.set(state.checked);
    this.indeterminate.set(state.indeterminate);

    this.control().setValue(state.checked);

    this.change.emit(event);

    event.preventDefault();
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key !== 'Enter') return;

    const state = getCheckboxStateOnEnter(
      this.checked() ?? false,
      this.indeterminate(),
    );

    this.checked.set(state.checked);
    this.indeterminate.set(state.indeterminate);

    this.control().setValue(state.checked);

    event.preventDefault();

    this.change.emit(event);
  }
}

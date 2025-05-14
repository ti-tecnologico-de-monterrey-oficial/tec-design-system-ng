import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  input,
  output,
  model,
} from '@angular/core';
import { IBbmSidePosition } from '../../types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BmbInputValidationComponent } from '../bmb-input/bmb-input-validation/bmb-input-validation.component';
import { CommonModule } from '@angular/common';
import { getUUID } from '../../utils/utils';
import { BmbInputValidationService } from '../bmb-input/bmb-input-validation/bmb-input-validation.service';
import { IBmbInputError } from '../bmb-input/bmb-input.component';

@Component({
  selector: 'bmb-radial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BmbInputValidationComponent],
  templateUrl: './bmb-radial.component.html',
  styleUrl: './bmb-radial.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbRadialComponent {
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
  control = model<FormControl>();

  change = output<HTMLInputElement>();
  onKeyDown = output<KeyboardEvent>();

  constructor(private ivs: BmbInputValidationService) {}

  getFormControl(): FormControl {
    return this.ivs.getFormControlByName(this.name());
  }

  get shouldShowError(): boolean {
    return this.ivs.showError(this.name());
  }

  handleRadioChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target && target.checked) {
      this.ivs.getFormControlByName(this.name()).setValue(target.value);
      target.name = this.name();
      this.change.emit(target);
    }
    event.stopPropagation();
  }

  handleRadioKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLInputElement;

    if (event.key === 'Enter' || event.key === ' ') {
      if (!target.checked) {
        this.ivs.getFormControlByName(this.name()).setValue(target.value);
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

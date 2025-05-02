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
import { BmbInputValidationService } from '../bmb-input/bmb-input-validation/bmb-input-validation.service';
import { BmbInputValidationComponent } from '../bmb-input/bmb-input-validation/bmb-input-validation.component';
import { getPositionClass } from '../../utils/utils';
import { IBmbInputError } from '../bmb-input/bmb-input.component';

@Component({
  selector: 'bmb-checkbox',
  templateUrl: './bmb-checkbox.component.html',
  styleUrls: ['./bmb-checkbox.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BmbInputValidationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbCheckboxComponent implements OnInit {
  id = input<string>('');
  disabled = input<boolean>(false);
  required = input<boolean>(false);
  value = input<string>('');
  name = input<string>(window.crypto.randomUUID());
  label = input<string>('');
  labelPosition = input<IBbmSidePosition>('after');
  ariaDescribedby = input<string>('');
  ariaLabel = input<string>('');
  ariaLabelledby = input<string>('');
  errorMessage = input<string | IBmbInputError>('');
  helperMessage = input<string>('');
  control = model<FormControl>();

  checked = model<boolean>();
  showError = model<boolean>(false);
  indeterminate = model<boolean>(false);

  change = output<Event>();

  constructor(private ivs: BmbInputValidationService) {}

  ngOnInit(): void {
    if (this.indeterminate()) {
      this.checked.set(false);
    }
  }

  getPositionClass(className: string): string {
    return getPositionClass(className, this.labelPosition());
  }

  getFormControl(): FormControl {
    return this.ivs.getFormControlByName(this.name());
  }

  get shouldShowError(): boolean {
    return this.ivs.showError(this.name());
  }

  handleChange(event: Event): void {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    if (this.indeterminate()) {
      this.indeterminate.set(false);
    }
    this.checked.set(target.checked);
    this.ivs.getFormControlByName(this.name()).setValue(this.checked());
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

      this.ivs.getFormControlByName(this.name()).setValue(this.checked());

      event.preventDefault();
      this.change.emit(event);
    }
  }
}

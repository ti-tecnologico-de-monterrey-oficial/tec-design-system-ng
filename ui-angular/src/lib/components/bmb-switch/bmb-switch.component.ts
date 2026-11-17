import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  output,
  input,
  model,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  assignNewFormControl,
  newFormControlByType,
} from '../../_shared/logic/formControl';
import { getUUID } from '../../_shared/logic/utils';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';
import { TranslatePipe } from '../../pipes/translations';
import { logDeprecatedInput } from '../../_shared/logic/logDeprecatedInput';

@Component({
  selector: 'bmb-switch',
  templateUrl: './bmb-switch.component.html',
  styleUrl: './bmb-switch.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BmbInputValidatorComponent,
    FormsModule,
    TranslatePipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSwitchComponent implements OnInit {
  isChecked = model<boolean>(false);
  ariaLabel = input<string>();
  disabled = input<boolean>(false);
  name = input<string>(getUUID());

  inputId = model<string>(`bmb-switch-${this.name()}`);
  control = model<FormControl>(newFormControlByType('checkbox'));

  change = output<boolean>();

  leftText = input<string>(''); // deprecated
  leftIcon = input<string>(''); // deprecated
  rightText = input<string>(''); // deprecated
  rightIcon = input<string>(''); // deprecated

  isControlNull = false;

  constructor() {
    logDeprecatedInput({ name: 'leftText', hasValue: !!this.leftText() }, null);
    logDeprecatedInput({ name: 'leftIcon', hasValue: !!this.leftIcon() }, null);
    logDeprecatedInput({ name: 'rightText', hasValue: !!this.rightText() }, null);
    logDeprecatedInput({ name: 'rightIcon', hasValue: !!this.rightIcon() }, null);
  }

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(
        assignNewFormControl(this.name(), this.control(), 'checkbox') ??
          newFormControlByType('checkbox'),
      );
      this.isControlNull = true;
    }
  }

  handleChange(event: Event): void {
    event.stopPropagation();
    const target = event.target as HTMLInputElement;
    this.isChecked.set(target.checked);
    this.control().setValue(this.isChecked());
    this.change.emit(target.checked);
    event.preventDefault();
  }

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.isChecked.update((value) => !value);
      this.control().setValue(this.isChecked());
      event.preventDefault();
      this.change.emit(this.isChecked());
    }
  }
}

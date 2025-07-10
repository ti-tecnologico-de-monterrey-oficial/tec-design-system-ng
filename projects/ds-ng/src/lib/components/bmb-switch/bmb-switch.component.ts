import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  output,
  input,
  model,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BmbIconComponent } from '../bmb-icon/bmb-icon.component';
import {
  assignNewFormControl,
  newFormControlByType,
} from '../../utils/formControl';
import { getUUID } from '../../utils/utils';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';

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
    BmbIconComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class BmbSwitchComponent {
  private static nextId = 0;
  leftText = input<string>('');
  leftIcon = input<string>('');
  rightText = input<string>('');
  rightIcon = input<string>('');
  isChecked = model<boolean>(false);
  ariaLabel = input<string>('Describe the button function here');
  id = input<string>('');
  disabled = input<boolean>(false);
  name = input<string>(getUUID());

  inputId = model<string>(`bmb-switch-${BmbSwitchComponent.nextId++}`);
  control = model<FormControl>(newFormControlByType('checkbox'));

  change = output<boolean>();

  isControlNull: boolean = false;

  ngOnInit(): void {
    if (!!this.id()) {
      this.inputId.set(this.id()!);
    }

    if (!this.control()) {
      this.control.set(
        assignNewFormControl(this.name(), this.control(), 'checkbox')!,
      );
      this.isControlNull = true;
    }
  }

  getSwitchIcon(): string {
    if (
      !!this.rightIcon() &&
      !!this.leftIcon() &&
      !!!this.rightText() &&
      !!!this.leftText()
    ) {
      if (this.isChecked()) return this.rightIcon();
      return this.leftIcon();
    }

    return '';
  }

  showSwitchLabel(position: string): boolean {
    if (
      !!!this.rightIcon() &&
      !!!this.leftIcon() &&
      !!this.rightText() &&
      !!this.leftText()
    ) {
      if (position === 'left') return !!this.leftText();
      if (position === 'right') return !!this.rightText();
    }

    return false;
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

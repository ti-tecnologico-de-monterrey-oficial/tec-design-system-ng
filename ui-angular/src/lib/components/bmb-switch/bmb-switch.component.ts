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
} from '../../_shared/logic/formControl';
import { getUUID } from '../../_shared/logic/utils';
import { BmbInputValidatorComponent } from '../bmb-input/bmb-input-validator/bmb-input-validator.component';
import { TranslatePipe } from '../../pipes/translations';
import {
  computeSwitchIcon,
  shouldShowSwitchLabel,
} from '../../_shared/logic/components/switch';

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
    TranslatePipe,
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
  ariaLabel = input<string>();
  disabled = input<boolean>(false);
  name = input<string>(getUUID());

  inputId = model<string>(`bmb-switch-${this.name()}`);
  control = model<FormControl>(newFormControlByType('checkbox'));

  change = output<boolean>();

  isControlNull: boolean = false;

  ngOnInit(): void {
    if (!this.control()) {
      this.control.set(
        assignNewFormControl(this.name(), this.control(), 'checkbox')!,
      );
      this.isControlNull = true;
    }
  }

  getSwitchIcon(): string {
    return computeSwitchIcon({
      rightIcon: this.rightIcon(),
      leftIcon: this.leftIcon(),
      rightText: this.rightText(),
      leftText: this.leftText(),
      isChecked: this.isChecked(),
    });
  }

  showSwitchLabel(position: string): boolean {
    return shouldShowSwitchLabel({
      position,
      rightIcon: this.rightIcon(),
      leftIcon: this.leftIcon(),
      rightText: this.rightText(),
      leftText: this.leftText(),
    });
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
